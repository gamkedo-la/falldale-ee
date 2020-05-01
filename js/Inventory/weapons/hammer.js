// hammer for orc boss
const HAMMER_LIFE = 8;
const BASE_HAMMER_COOLDOWN = 60;

hammerClass.prototype = new weaponClass();

function hammerClass() {
  this.damageDice = 9; // 6 Sided Dice
  this.damagePoints = 0;
  this.attackDice = 20;
  this.attackBonus = 3;
  this.width = 72;
  this.height = 25;
  this.collider;
  this.range = 90;
  this.life = 0;
  this.baseHammerLife = HAMMER_LIFE;
  this.coolDownTime = 0;
  this.hammerCooldown = BASE_HAMMER_COOLDOWN;

  this.southOffset = {x: 35, y:55};
  this.northOffset = {x: 40, y:48};
  this.westOffset = {x: 40, y:73};
  this.eastOffset = {x: 35, y:48};

  this.shootFrom = function (wielder) {
    this.x = wielder.x;
    this.y = wielder.y;

    this.life = this.baseHammerLife;
    this.coolDownTime = this.hammerCooldown;
    this.hammerCooldown = BASE_HAMMER_COOLDOWN * .5 + Math.floor(Math.random() * BASE_HAMMER_COOLDOWN*.5);
  };

  //override weaponClass.rangeTest
  this.rangeTest = function (wielder, adversary) {
    let cx = (wielder.collider ? wielder.collider.centerX : wielder.x);
    let cy = (wielder.collider ? wielder.collider.centerY : wielder.y);
    switch (wielder.direction) {
      case "north":
        this.collider = new Bounds(cx - (this.height-10), cy - (this.width + 5), this.height*2, this.width-10);
        break;
      case "south":
        this.collider = new Bounds(cx - (this.height), cy + 15, this.height*2, this.width-20);
        break;
      case "west":
        this.collider = new Bounds(cx - (this.width-5), cy - this.height, this.width, this.height*2);
        break;
      case "east":
        this.collider = new Bounds(cx, cy - this.height, this.width-5, this.height*2);
        break;
    }
    let hit = adversary.collider.hit(this.collider);
    //if (hit) console.log("hit: " + hit);
    return hit;
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
    let pos = {x: wielder.x, y: wielder.y};
    let rotation = 0;

    switch(wielder.direction) {
      case "north":
        pos = {x: wielder.x + this.northOffset.x, y: wielder.y + this.northOffset.y};
        rotation = -(Math.PI * .5);
        break;
      case "south":
        pos = {x: wielder.x + this.southOffset.x, y: wielder.y + this.southOffset.y};
        rotation = (Math.PI * .5);
        break;
      case "west":
        pos = {x: wielder.x + this.westOffset.x, y: wielder.y + this.westOffset.y};
        rotation = Math.PI;
        break;
      case "east":
        pos = {x: wielder.x + this.eastOffset.x, y: wielder.y + this.eastOffset.y};
        break;
    }
    //console.log("draw pos: " + pos.x + "," + pos.y);

    if (this.life > 0) {
      this.myHammerPic = hammerPic;
      canvasContext.save();

      if (rotation != 0) {
        canvasContext.translate(pos.x, pos.y);
        canvasContext.rotate(rotation);
        canvasContext.drawImage(this.myHammerPic, 0, 0);
      } else {
        canvasContext.drawImage(this.myHammerPic, pos.x, pos.y);
      }

      canvasContext.restore();
    }
  }
}