const ORCBOSS_SPEED = 1.1;
const ORCBOSS_AGGRO = 2.5;

orcBossClass.prototype = new enemyClass();

function orcBossClass() {
  this.speed = ORCBOSS_SPEED;
  this.defaultSpeed = ORCBOSS_SPEED;
  this.aggroSpeed = ORCBOSS_AGGRO;
  this.maxhealth = 100;
  this.width = 82;
  this.height = 100;
  this.bounds = new Bounds(15,35,52,50);
  this.myMelee = new hammerClass();
  this.ticksPerFrame = 5;
  this.faceNorthMul = 1;
  this.faceSouthMul = 0;
  this.shadowOffsetX = 4;
  this.shadowOffsetY = 54;
  this.deadPic = deadOrcBossPic;
  this.framesPerDeadOrcBoss = 0;
  this.debugMovement = true
  this.hurtSound = bugbearHurtSound;
  this.pather = new pathFinder()

  this.superClassReset = this.reset;
  this.reset = function (resetX, resetY) {
    this.superClassReset(resetX, resetY);
    this.timeBetweenChangeDir = Math.floor(Math.random() * 1000) + 1;
  };

  this.superClassIsOverlappingPoint = this.isOverlappingPoint;
  this.isOverlappingPoint = function () {
    if (this.superClassIsOverlappingPoint()) {
      dialogManager.setDialogWithCountdown("Ouch! I've been bitten by the Orc King! That really hurts.", 5);
      return true;
    }
    return false;
  }
  this.countFramesForDeadOrcBoss = function () {
    this.framesPerDeadOrcBoss++;
    if (this.framesPerDeadOrcBoss == 120) {
      enemyReadyToRemove();
    }
  };
  
  this.superClassMove = this.move;
  this.move = function () {
   this.superClassMove(ORC_TIME_BETWEEN_CHANGE_DIR);
   this.myMelee.move();
   this.myMelee.x = this.x;
   this.myMelee.y = this.y;
  };
  
    
  this.superClassDraw = this.draw;
  this.draw = function () {
    this.superClassDraw();
    //console.log(this.health)
    if (!this.alive) {
	  if(displayQ3){
		questThreeComplete();
	  }
      this.countFramesForDeadOrcBoss();
      removeEnemy();
    }
  }
}
