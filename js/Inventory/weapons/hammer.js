// hammer for orc boss
const HAMMER_LIFE = 6;
const BASE_HAMMER_COOLDOWN = 20;

hammerClass.prototype = new weaponClass();

function hammerClass() {
  //this.damageDice = 4; // 6 Sided Dice
  this.damageDice = 0; // 6 Sided Dice
  //this.damagePoints = 4;
  this.damagePoints = 0;
  //this.attackDice = 20;
  this.attackDice = 0;
  this.attackBonus = 1;

  this.life = 0;
  this.baseHammerLife = HAMMER_LIFE;
  this.coolDownTime = 0;
  this.hammerCooldown = BASE_HAMMER_COOLDOWN;

  this.shootFrom = function (wielder) {
    this.x = wielder.x;
    this.y = wielder.y;

    this.life = this.baseHammerLife;
    this.coolDownTime = this.hammerCooldown;
    this.hammerCooldown = Math.floor(Math.random() * BASE_HAMMER_COOLDOWN);
  };

  //override weaponClass.rangeTest
  this.rangeTest = function (wielder, adversary) {
    if (wielder.direction == "north") {// warrior facing North
      if (this.rangeHitTest(25, -20, adversary)) {
        return true;
      }
    } else if (wielder.direction == "south") {// warrior facing South
      if (this.rangeHitTest(10, 70, adversary)) {
        return true;
      }
    } else if (wielder.direction == "west") {// warrior facing West
      if (this.rangeHitTest(-30, 25, adversary)) {
        return true;
      }
    } else if (wielder.direction == "east") {// warrior facing East
      if (this.rangeHitTest(60, 25, adversary)) {
        return true;
      }
    }

    return false;
  };

  this.rangeHitTest = function (deltaX, deltaY, adversary) {
    if ((this.x + deltaX > adversary.x) &&
        (this.x + deltaX < (adversary.x + adversary.width)) &&
        (this.y + deltaY > adversary.y) &&
        (this.y + deltaY < (adversary.y + adversary.height))) {
      return true;
    }

    return false;
  };

  //override weaponClass.hitTest
  this.hitTest = function (wielder, adversary) {
    if (this.life <= 0) {
      return false;
    }

    this.rollToDetermineIfHit();
    if (this.toHitPoints > redWarrior.armor) {
      //this is a hit
      this.rollForDamage();
      adversary.takeDamage(this.damagePoints, this.x, this.y);
      return true;
    } else {
      //this is a miss
      return false;
    }
  };

  this.draw = function (wielder) {

    let width = 72;
    let height = 25;
    let x = wielder.x;
    let y = wielder.y;
    let rotation = 0;

    let centerX = wielder.x + wielder.width / 2;
    let centerY = wielder.y + wielder.height / 2;

    if (wielder.direction == "north") {
      //clubWidth = 10;
      //clubLength = 20;
      //clubXLocation = centerX + 5;
      //clubYLocation = wielder.y - clubLength + 10;
    } else if (wielder.direction == "south") {
      //clubWidth = 10;
      //clubLength = 40;
      //clubXLocation = centerX - 5;
      //clubYLocation = centerY + 35;
      //rotation = Math.PI;
    } else if (wielder.direction == "west") {
      //clubWidth = 40;
      //clubLength = 10;
      //clubXLocation = wielder.x - clubWidth + 10;
      //clubYLocation = centerY;
      //rotation = -Math.PI / 2;
    } else if (wielder.direction == "east") {
      //clubWidth = 40;
      //clubLength = 10;
      //clubXLocation = wielder.x + 60;
      //clubYLocation = centerY + 30;
      //rotation = Math.PI / 2;
    }

    if (this.life > 0) {
      this.myHammerPic = hammerPic;
      canvasContext.save();

      if (rotation != 0) {
        canvasContext.translate(clubXLocation, clubYLocation);
        canvasContext.rotate(rotation);
        canvasContext.drawImage(this.myHammerPic, -clubWidth / 2, -clubLength / 2);
      } else {
        canvasContext.drawImage(this.myHammerPic, x, y);
      }

      canvasContext.restore();
    }
  }
}