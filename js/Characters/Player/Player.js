// TODO: Probably want to set direction per object instead of
//       putting it in a global variable
// this also doesn't allow diagonal movement
var direction = {x: 0, y: 1};

const PLAYER_SPEED = 6.0;
const PLAYER_SPEED_DEBUFF = 4.0;

var levelExperienceArray = [ 500, 2000, 4000, 6000, 10000, 16000, 26000, 42000, 68000 ];

class Player extends Character {
  constructor() {
    super();

    // default variables
    this.direction = { x: 0, y: 1 };
    this.rotation = this.direction;
    super.setLocation(65, 100);
    this.centerX = 40;
    this.centerY = 80;
    super.setDimensions(50, 50);
    this.sx = 50;
    this.sy = this.height;

    // stats
    this.strength = 0;
    this.dexterity = 0;
    this.constitution = 0;
    this.intelligence = 0;
    this.wisdom = 0;
    this.charisma = 0;
    this.experience = 0;
    this.experienceLevel = 1;
    this.armor = 10;
    this.healingPotion = 0;
    super.setSpeed(PLAYER_SPEED);

    // weapons
    this.sword = new swordClass();
    this.arrow = new arrowClass(direction);
    this.rock = new rockClass();
    this.recentWeapon = this.sword;
    this.arrowList = [];

    // location
    this.prevX = this.x;
    this.prevY = this.y;
    this.resetPositionCoords = { x: this.x, y: this.y };


    // parts offset
    this.head = this.y - 25;
    this.feet = this.y + 25;
    this.leftArm = this.x + 25;
    this.rightArm = this.x - 25;

    // boolean guards
    this.isFrozen = false;
    this.isEnemyCollision = false;
    this.haveMap = false;

    // quest booleans
    this.questOneActive = true;
    this.delkonRewardOffer = false;
    this.questOneComplete = false;
    this.questTwoActive = false;
    this.questTwoComplete = false;
    this.questThreeActive = false;
    this.questThreeComplete = false;
    this.questFourActive = false;
    this.questFourComplete = false;
    this.questFiveActive = false;
    this.questFiveComplete = false;
    this.questSixActive = false;
    this.questSixComplete = false;
    this.goblinsKilledInFallDale = 0;

    // side quests
    this.catsMet = 0;
    this.stepsTaken = 0;
    this.attackCount = 0;
    this.doorOpenCount = 0;

    // movement
    this.keyHeld_WalkNorth = false;
    this.keyHeld_WalkSouth = false;
    this.keyHeld_WalkWest = false;
    this.keyHeld_WalkEast = false;

    this.isInsideAnyBuilding = false;
    this.lastOpenDoorIndex = rowColToArrayIndex(4, 7);
    this.lastOpenDoorTile = TILE_FRONTDOOR_YELLOW;

    this.savePrefix = "player_";
    this.saveVariables = [ "x", "y", "health", "maxHealth", "name", "experience", "keysHeld", "goldpieces",
      "experienceLevel", "healingPotion", "haveMap", "questOneComplete", "delkonRewardOffer",
      "goblinsKilledInFallDale" ];
  }

  setupInput(upKey, rightKey, downKey, leftKey, swordKey, arrowKey, rockKey, inventoryKey, statsKey, healthKey) {
    this.controlKeyUp = upKey;
    this.controlKeyRight = rightKey;
    this.controlKeyDown = downKey;
    this.controlKeyLeft = leftKey;
    this.controlKeySword = swordKey;
    this.controlKeyArrow = arrowKey;
    this.controlKeyRock = rockKey;
    this.controlKeyInventory = inventoryKey;
    this.controlKeyStats = statsKey;
    this.controlKeyDisplayHealth = healthKey;
  }

  storePos() {
    this.prevX = this.x;
    this.prevY = this.y;
  }

  restorePos() {
    this.x = this.prevX;
    this.y = this.prevY;
  }

  checkIfInBar(xPos, yPos) {
    if(xPos > (38 * TILE_W) && xPos < (48 * TILE_W) &&
		 yPos > (13 * TILE_H) && yPos < (20 * TILE_H))
	  {
		  backgroundMusic.loopSong("have-a-nice-beer");
	  } else {
		  backgroundMusic.loopSong("goblinRaid");
	  }
  }

  move() {
    this.playerMove = !this.isFrozen && (this.keyHeld_WalkNorth || this.keyHeld_WalkSouth || this.keyHeld_WalkWest || this.keyHeld_WalkEast);

    this.storePos();
    this.setDirection();
    var { nextX, nextY } = this.nextPosWithInput(nextY, nextX);

    const tileC = pixelXtoTileCol(nextX);
    const tileR = pixelYtoTileRow(nextY + (this.height / 2));

    const didLoadNewLevel = this.loadNewLevelIfAtEdge(tileC, tileR);
    if (didLoadNewLevel) {
      OverlayFX.init();
      return;
    }

    if (this.prevX != nextX || this.prevY != nextY) {
      let collision = this.collisionCheck(nextX, nextY);
      this.updatePosition(collision.x, collision.y);
    }

    this.mySword.move();
    this.myArrow.move();
    this.myRock.move();

    this.tryToTriggerMonsterSpawnAt(skeletonClass, skeletonPic, skeletonSpawnTiles, this.x + this.width / 2, this.y + this.height / 2, direction, 6);

      if(levelNow == 7)
		     this.checkIfInBar(this.x, this.y);
  }

  freeze(duration) {
    this.isFrozen = true;

    setTimeout(function() {
      this.isFrozen = false;
    }, duration)
  }

  tryToTriggerMonsterSpawnAt(monsterClass, monsterPic, spawnTiles, x, y, dir = direction, frameCount, chance = 0.3) { // 0.0 to less than 2.0 chance
    for (var i = 0; i < spawnTiles.length; i++) {
      if (isTileIndexAdjacentToPixelCoord(x, y, spawnTiles[ i ])) {
        // TODO: Find a better way to determine the chance?
        if (this.tickCount * 12 % 10 == 0 && Math.random() + Math.random() > 2.0 - chance) {
          var monsterInstance = new monsterClass('Papyrus', monsterPic, frameCount);
          x += dir * 2 * TILE_W;
          y += dir * 2 * TILE_H;
          monsterInstance.reset(x, y);
          enemyList.push(monsterInstance);
		      monsterInstance.initialize('Skeleton1', skeletonPic, frameCount);
          return;
        }
      }
    }
  }

  checkForLevelUp() {
    if (this.experience >= levelExperienceArray[this.experienceLevel])
      this.levelup();
  }

  levelup() {
    // results when player hits certain experience
    var increasedHitPoints = 0;
    this.experienceLevel++;
    increasedHitPoints = Math.floor(Math.random() * 6) + 1;
    this.maxHealth += increasedHitPoints;
    this.health += increasedHitPoints;

    if (this.health > this.maxHealth)
      this.health = this.maxHealth;

    dialogManager.setDialogWithCountdown("I feel stronger!.  LEVEL UP. I've gained " + increasedHitPoints + " Hit Points");
  }

  death() {
    this.health = this.maxHealth;
    this.x = this.resetPositionCoords.x;
    this.y = this.resetPositionCoords.y;
    camera.x = this.x - 150;
    camera.y = this.y - 150;
  }

  rangeText(adversary) {
    return !(adversary.x > (this.x + this.width) ||
        (adversary.x + adversary.width) < this.x ||
        adversary.y > (this.y + this.height) ||
        (adversary.y + adversary.height) < this.y);
  }

  checkWarriorandWeaponCollisionAgainst(enemy) {
    this.centerX = this.x + this.wdith / 2;
    this.centerY = this.y + this.height / 2;

    if (!debugMode && this.rangeTest(thisEnemy) && thisEnemy.type == "enemy") {
      this.restorePos();
      thisEnemy.restorePos();
      thisEnemy.enemyMove = false;
    } else if (thisEnemy.type == "enemy") {
      thisEnemy.enemyMove = true;
    }

    if (thisEnemy.isOverlappingPoint(this.centerX, this.centerY)) {
      // thisEnemy.interractWithPlayer(); // TODO: once all isOverlappingPoint are refactored to return true/false AND not react directly
    }

    if (this.mySword.hitTest(this, thisEnemy)) {
      //empty
    }

    if (this.myArrow.rangeTest(thisEnemy)) {
      if (this.myArrow.hitTest(this, thisEnemy)) {
        //empty
      }
    }

    if (this.myRock.rangeTest(thisEnemy)) {
      if (this.myRock.hitTest(this, thisEnemy)) {
        //empty
      }
    }
  }

  useWeapon(weapon, sound) {
    if (weapon.isReady()) {
      this.recentWeapon = weapon;

      weapon.shootFrom(this, this.rotation);
      sound.play();
    }
  }

  takeDamage(value) {
    this.health -= value / 10;
    playerHurtSound.play();

    this.displayHealth = true;
    this.isTakingDamage = true;

    if (this.health <= 0) {
      this.death();
      resetLevel();
    }
  }

  updateTickCountAndFrameIndex() {
    if (this.playerMove) {
      this.tickCount++;
      let currentTileType = getTileIndexAtPixelCoord(this.x, this.y);
      let currentTileType = roomGrid[currentTileIndex];

      if (groundFootsteps.currentTime > groundFootsteps.duration - 0.2) {
        groundFootsteps.currentTime = 0;
      }
      if (stoneFootsteps.currentTime > stoneFootsteps.duration - 0.2) {
        stoneFootsteps.currentTime = 0;
      }
      if (currentTileType === 18 && !groundFootStepsPlaying) {
        groundFootsteps.play();
        groundFootStepsPlaying = true;
        stoneFootsteps.pause();
        stoneFootstepsPlaying = false;
      }
      if (currentTileType === 0 && !stoneFootstepsPlaying) {
        stoneFootsteps.play();
        stoneFootstepsPlaying = true;
        groundFootsteps.pause();
        groundFootStepsPlaying = false;
      }
    }

    if (!this.playerMove) {
      if (groundFootStepsPlaying || stoneFootstepsPlaying) {
        groundFootsteps.pause();
        groundFootStepsPlaying = false;
        stoneFootsteps.pause();
        stoneFootstepsPlaying = false;
      }
    }

    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;
      if (this.frameIndex < this.numberOfFrames - 1) {
        this.frameIndex += 1;
      } else {
        this.frameIndex = 0;
      }
    }
  }

  drawFlashAndHealth() {
    if (this.isTakingDamage && this.warriorDisplayHealthCountdown % 10 >= 4) {
      this.drawWarriorAndShadow();
    } else {
      this.drawWarriorAndShadow();
    }

    colorRect(this.x, this.y - 16, 40, 12, "black");
    colorRect(this.x + 2, this.y - 14, 35, 8, "red");
    colorRect(this.x + 2, this.y - 14, (this.health / this.maxHealth) * 35, 8, "green");

    this.warriorDisplayHealthCountdown--;
    if (this.warriorDisplayHealthCountdown <= 0) {
      this.displayHealth = false;
      this.isTakingDamage = false;
      this.warriorDisplayHealthCountdown = this.warriorHealthCountdownSeconds * FRAMES_PER_SECOND;
    }
  }

  drawDebug() {
    colorRect(this.x, this.y, 5, 5, "white");
    colorRect(this.x, this.y + this.height, 5, 5, "white");
    colorRect(this.x + this.width, this.y, 5, 5, "white");
    colorRect(this.x + this.width, this.y + this.height, 5, 5, "white");

    colorRect(this.centerX, this.centerY, 5, 5, 'white');
  };

  this.drawWarriorAndShadow = function () {
    canvasContext.drawImage(shadowPic, this.x - 16, this.y + 32);
	this.width = 50; //temp solution until discovering what is overriding this.width????
    canvasContext.drawImage(this.myWarriorPic, this.sx, this.sy, this.width, this.height, Math.round(this.x), Math.round(this.y), this.width, this.height);

    // for (var i = 0; i < PARTICLES_PER_TICK; i++) {
    //   var tempParticle = new particleClass(this.x + 20, this.y, 'lime');
    //   particle.push(tempParticle);
    // }

    OverlayFX.maybeLeaveFootprint(this);
  }

  draw() {
    this.updateTickCountAndFrameIndex();

    this.sx = this.frameIndex * this.width;


  }
}
