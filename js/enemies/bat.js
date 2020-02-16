const BAT_SPEED = 1.9;
const BAT_TIME_BETWEEN_CHANGE_DIR = 50;
const BAT_COLLISION_RADIUS = 5;
const BAT_RESTING_TIME = 850;

batClass.prototype = new enemyClass();

function batClass() {
  this.x = Math.random() * 600;
  this.y = Math.random() * 800;
  this.width = 50;
  this.height = 21;
  this.speed = BAT_SPEED;
  this.xv = 0;
  this.yv = 0;
  this.sx = 0;
  this.sy = 0;
  this.maxhealth = 2;
  this.cyclesTilDirectionChange = 0;
  this.cyclesOfBatActive = 0;
  this.cyclesofBatResting = 200;
  this.isFlying = true;
  this.hurtSound = batHurtSound;
  this.ticksPerFrame = 10;
  this.timeBetweenChangeDir = BAT_TIME_BETWEEN_CHANGE_DIR;
  this.animateOnGamePause = true;
  this.shadowXOffset = this.width / 2;
  this.shadowYOffset = this.height / 26;

  this.superClassInitialize = this.initialize;
  this.initialize = function (enemyName, enemyPic, numberOfFrames = 4) {
    this.superClassInitialize(enemyName, enemyPic, numberOfFrames);
    this.myBite.baseBiteLife = 3;		//Bats bite, but only when they're not resting
    this.myBite.baseBiteCooldown = 3;	//
  };

  this.superClassReset = this.reset;
  this.reset = function (resetX, resetY) {
    this.superClassReset(resetX, resetY);
    this.numberOfFrames = 4;
    this.cyclesOfBatResting = 0;
    this.cyclesTilDirectionChange = 0;
    this.health = this.maxhealth;
  }; // end of batReset func

  this.superclassMove = this.move;
  this.move = function () {
    if (this.alive) {
      if (this.enemyMove) {
        this.superclassMove(this.timeBetweenChangeDir);
        this.cyclesOfBatActive++;
        this.cyclesOfBatResting = 0;
        this.sx = 0;
        this.sy = 0;
        this.enemyMove = this.cyclesOfBatActive < 300;
      } else {
        this.cyclesOfBatActive = 0;
        this.cyclesOfBatResting++;
        this.xv = 0;
        this.yv = 0;
        this.sx = 0;
        this.sy = 0;
        this.frameIndex = 0;
        this.enemyMove = this.cyclesOfBatResting >= 100;
      }
    }
  };

  this.superClassIsOverlappingPoint = this.isOverlappingPoint;
  this.isOverlappingPoint = function () {
    if (!this.batResting) {//Bats don't bite when they're resting
      if (this.superClassIsOverlappingPoint()) {
        dialogManager.setDialogWithCountdown("Ouch! I've been bitten by a bat.  Quick! I need some garlic.", 5);
        return true;
      }
      return false;
    }
  };

  this.superClassDraw = this.draw;
  this.draw = function () {
    this.superClassDraw();
    if (!this.enemyMove) {
      this.frameIndex = 4;
    }

    if (gamePaused) {
      this.frameIndex = 1;
    }
  };

  this.speedMultForTileType = function (tileType) {
    switch (tileType) {
      case TILE_YELLOW_DOOR:
      case TILE_GREEN_DOOR:
      case TILE_RED_DOOR:
      case TILE_BLUE_DOOR:
      case TILE_WALL:
        return 0;
      case TILE_TREE:
      case TILE_TREE2TOPHALF:
      case TILE_TREE2BOTTOMHALF:
      case TILE_TREE3TOPHALF:
      case TILE_TREE3BOTTOMHALF:
        return 0.5;
      case TILE_WATER:
      case TILE_BRIDGE_LOWER:
      case TILE_ROAD:
      case TILE_GRASS:
        return 1;
      default:
        return this.speedMult;
    }
  };

  this.isPassableTile = function (aTile) {
    switch (aTile) {
      case TILE_WALL:
      case TILE_DOOR:
        return false;
      case TILE_ROAD:
        return true;
      default:
        return true;
    }
  }
}

function movingWrapPositionClass() {

  this.handleScreenWrap = function () {
    if ((this.x < 0) || (this.x > canvas.width)) {
      this.x -= this.xv;
    }
    if ((this.y < 0) || (this.y > canvas.height)) {
      this.y -= this.yv;
    }
  };

  this.move = function () {
    this.x += this.xv;
    this.y += this.yv;
    this.handleScreenWrap();
  }
}
