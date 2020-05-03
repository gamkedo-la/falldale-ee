// ranged weapon superclass

rangedWeaponClass.prototype = new weaponClass();

function rangedWeaponClass() {
  this.name = "projectile";
  this.indefiniteArticle = "a";
  this.pluralName = this.name + "s";
  this.baseDamage = 0.5;
  this.baseLife = 100;
  this.quantity = 5;
  this.direction = direction; // take initial direction from global direction var
  this.superClassMove = this.move;
  this.length = 4;
  this.width = 20;
  
  this.move = function () {
    this.superClassMove();
    this.xv = this.direction.x * this.speed;
    this.yv = this.direction.y * this.speed;

    this.checkCollision();

    this.x += this.xv;
    this.y += this.yv;
  };

  this.shootFrom = function (wielder, dir = direction) {
  	if (this.quantity <= 0) {
  		dialogManager.setDialogWithCountdown("I need to find more " + this.pluralName + "!");
  		return;
  	}
    if (this.quantity > 0) {
      this.quantity--;
      this.setDialogForQuanitity();
    }
    this.direction = dir;

    this.setPositionForDirection(wielder, dir);

    this.life = this.baseLife;
  };

  this.superClassHitTest = this.hitTest;
  this.hitTest = function (wielder, adversary) {
    if (this.superClassHitTest(wielder, adversary)) {
      dialogManager.setDialogWithCountdown("Successful " + this.name + " hit on " + adversary.myName + "!");
    }
  };

  this.draw = function () {
    if (this.life > 0) {
      let dir = Math.atan2(this.direction.y, this.direction.x);
      if (this.name == "arrow"){
        canvasContext.save();
        canvasContext.translate(this.x, this.y);
        canvasContext.rotate(dir);
        console.log("arrow fired");
        canvasContext.drawImage(this.myArrowPic, 0, 0);
        canvasContext.restore();
      } else {
        canvasContext.translate(this.x, this.y);
        canvasContext.rotate(dir);
        colorRect(0, 0, this.width, this.length, this.color);
        canvasContext.rotate(-dir);
        canvasContext.translate(-this.x, -this.y);
      }
    }
  };

  // Check to see if projectile is inside collide-able tile
  this.checkCollision = function () {
    // Get the tile number in world
    let worldTileCheck = getTileIndexAtPixelCoord(this.x, this.y);

    // If not out of bounds
    if (worldTileCheck != undefined) {
      // Get the tile number in the index
      let tileIndexNum = roomGrid[ worldTileCheck ];
      // If the tile detected is NOT inside of the NO_COLLIDE list, reset
      if (!RANGED_NO_COLLIDE.includes(tileIndexNum)) {
        this.reset();
      }
    } else // reset if out of bounds
    {
      this.reset();
    }
  };

  this.setPositionForDirection = function (origin, dir) {
    this.x = origin.centerX + dir.x * 25;
    this.y = origin.centerY + dir.y * 25;
  };

  this.setDialogForQuanitity = function () {
    if (this.quantity > 1) {
      dialogManager.setDialogWithCountdown("I used " + this.indefiniteArticle + " " + this.name + ". I now have " + this.quantity + " " + this.pluralName + "!");
    } else if (this.quantity == 1) {
      dialogManager.setDialogWithCountdown("I used " + this.indefiniteArticle + " " + this.name + ". I now have only 1 " + this.name + " left.");
    } else if (this.quantity == 0) {
      dialogManager.setDialogWithCountdown("That was my last " + this.name + ". I need to find more!");
    }
  }
}
