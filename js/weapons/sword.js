const SWORD_LIFE = 5;
const SWORD_SPEED = 1.0;
const SWORD_COOLDOWN = 2;
//var swordAlive = false;
var displayDamagePoints = 0;
var damageUIVisibilityCountdown = 0;

swordClass.prototype = new weaponClass();

function swordClass() {
  this.life = SWORD_LIFE;
  this.coolDownTime = 0;
  this.isMagic = false;
  this.mySwordPic = swordPic;
  this.immunity = false;
  this.attackHitBonus = 10;

  this.shootFrom = function (wielder) {
    this.x = wielder.x;
    this.y = wielder.y;

    this.rollToDetermineIfHit();
    if (this.toHitPoints > 0) {
      this.rollForDamage();
    }

    this.life = SWORD_LIFE;
    this.coolDownTime = SWORD_COOLDOWN;
  };

  this.checkhit = function (adversary) {
    if (this.toHitPoints >= 10) {

      if (this.damagePoints > 0) {
        dialogManager.setDialogWithCountdown("Successful hit " + adversary.myName + " for " + this.damagePoints + " damage point!");
        if (adversary.takeDamage) { // this can sometimes be undefined
          adversary.takeDamage(this.damagePoints, this.x, this.y);
        }
        this.damagePoints = 0;
      }

      if (adversary.health < 0) {
        wielder.experience = wielder.experience + 100;
        wielder.checkForLevelUp();
      }
    } else {
      dialogManager.setDialogWithCountdown(adversary.myName + " dodged your sword swing.  You rolled a " + this.toHitPoints + ".");
    }
  };

  //override weaponClass.hitTest
  this.hitTest = function (wielder, adversary) {
    if (this.life <= 0) {
      return false;
    }

    let enemyRect = adversary;
    let weaponRect = {};
    let swordLength = 50;
    let swordWidth = 50;

    weaponRect.width = swordLength;
    weaponRect.height = swordWidth;

    weaponRect.x = wielder.x + (swordLength - 20) * wielder.rotation.x;
    weaponRect.y = wielder.y + (swordWidth - 30) * wielder.rotation.y;

    if (this.rangeTest(weaponRect, enemyRect))
      this.checkhit(adversary)
  };

  this.rangeTest = function (weaponRect, enemyRect) {
    return !(enemyRect.x > (weaponRect.x + weaponRect.width) ||
        (enemyRect.x + enemyRect.width) < weaponRect.x ||
        enemyRect.y > (weaponRect.y + weaponRect.height) ||
        (enemyRect.y + enemyRect.height) < weaponRect.y);
  };

  this.draw = function (wielder) {
    var swordWidth = 10;
    var swordLength = 30;
    var rotation = Math.atan2(wielder.rotation.y, wielder.rotation.x);
    var swordXLocation = wielder.centerX + Math.cos(rotation) * swordLength;
    var swordYLocation = wielder.centerY  + Math.sin(rotation) * swordLength + swordWidth;
    rotation += + Math.PI * 0.5;//Account for rotation of source image
    
    weaponRectX = wielder.x + (30) * wielder.rotation.x;
    weaponRectY = wielder.y + (20) * wielder.rotation.y;
    //colorRect(weaponRectX, weaponRectY, 50, 50, 'red');

    if (this.life > 0) {
      if (this.isMagic) {
        this.mySwordPic = magicSwordPic;
      } else {
        this.mySwordPic = swordPic;
      }
      canvasContext.save();
      canvasContext.translate(swordXLocation, swordYLocation);
      canvasContext.rotate(rotation);
      canvasContext.drawImage(this.mySwordPic, -this.mySwordPic.width/2, -this.mySwordPic.height/2);
      canvasContext.restore();
    }
  }
}

