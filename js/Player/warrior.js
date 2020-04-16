// TODO: Probably want to set direction per object instead of
//       putting it in a global variable
// this also doesn't allow diagonal movement
var direction = {x: 0, y: 1};

const PLAYER_SPEED = 6.0;
const PLAYER_SPEED_DEBUFF = 4.0;

var levelExperienceArray = [ 0, 500, 2000, 4000, 6000, 10000, 16000, 26000, 42000, 68000 ];

function warriorClass(whichPlayerPic) {
  this.stats = new Stats();
  this.inventory = new Inventory();
  this.quest = new Quest();
  this.direction = {x: 0, y: 1};
  this.rotation = this.direction;
  this.mySword = new swordClass();
  this.myArrow = new arrowClass(direction);
  this.myRock = new rockClass();
  this.recentWeapon = this.mySword;
  this.arrowList = [];
  this.x =200;
  this.prevX = this.x;
  this.centerX = 40;
  this.y = 200;
  this.prevY = this.y;
  this.resetPositionCoords = {x: this.x, y: this.y};
  this.speed = PLAYER_SPEED;
  this.isFrozen = false;
  this.isEnemyCollision = false;
  this.myWarriorPic = null; // which picture to use
  this.name = "Untitled warrior";
  
  this.isTakingDamage = false;
  this.warriorHealthCountdownSeconds = 5;
  this.warriorDisplayHealthCountdown = this.warriorHealthCountdownSeconds * FRAMES_PER_SECOND;
  this.waitTime = 0;
  this.walkIntoTileIndex = 0;
  this.previousTileType = -1;
  this.tickCount = 0;
  this.frameIndex = 0;
  this.width = 50;
  this.numberOfFrames = 6;
  this.height = 50;
  this.ticksPerFrame = 5;
  this.sx = 50;
  this.sy = this.height;
  this.playerMove = false;
  this.armor = 10;
  this.haveMap = false;
  this.delkonRewardOffer = false;
  this.goblinsKilledInFallDale = 0;


  // side quests
  this.catsMet = 0;
  this.stepsTaken = 0;
  this.attackCount = 0;
  this.doorOpenCount = 0;

  this.keyHeld_WalkNorth = false;
  this.keyHeld_WalkSouth = false;
  this.keyHeld_WalkWest = false;
  this.keyHeld_WalkEast = false;
  this.keyHeld_Sword = false;

  this.controlKeyUp;
  this.controlKeyRight;
  this.controlKeyDown;
  this.controlKeyLeft;
  this.controlKeySword;

  this.isInsideAnyBuilding = false;
  this.lastOpenDoorIndex = -1;
  this.lastOpenDoorTile = TILE_FRONTDOOR_YELLOW;

  this.savePrefix = "player_";
  this.saveVariables = [ "x", "y", "health", "maxHealth", "name", "experience", "keysHeld", "goldpieces",
    "experienceLevel", "healingPotion", "haveMap", "questOneComplete", "delkonRewardOffer",
    "goblinsKilledInFallDale" ];

  this.setupInput = function (upKey, rightKey, downKey, leftKey, swordKey, arrowKey, rockKey, inventoryKey, statsKey, healthKey) {
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
  };

  this.releaseKeys = function () {
    this.keyHeld_WalkNorth = false;
    this.keyHeld_WalkSouth = false;
    this.keyHeld_WalkWest = false;
    this.keyHeld_WalkEast = false;
    this.keyHeld_Sword = false;
  };

  this.saveData = function () {
    for (var variable in this.saveVariables) {
      localStorage[ this.savePrefix + this.saveVariables[ variable ] ] = this[ this.saveVariables[ variable ] ];
      console.log("saving " + this[ this.saveVariables[ variable ] ] + " which is " + this.saveVariables[ variable ]);
    }
  };

  this.loadData = function () {
    for (var variable in this.saveVariables) {
      this[ this.saveVariables[ variable ] ] = parseInt(localStorage[ this.savePrefix + this.saveVariables[ variable ] ]);
      console.log("loaded " + this[ this.saveVariables[ variable ] ] + " which is " + this.saveVariables[ variable ]);
    }
  };

  this.initialize = function (warriorName) {
    this.name = warriorName;
    this.keysHeld = {"yellow": 0, "green": 0, "blue": 0, "red": 0};
    this.stats.maxHealth = this.stats.health = 4;

    this.mySword.reset();
    this.myArrow.reset();
    this.myRock.reset();
  }; // end of warrior initialize function

  this.storePos = function () {
    this.prevX = this.x;
    this.prevY = this.y;
  };

  this.restorePos = function () {
    this.x = this.prevX;
    this.y = this.prevY;
  };

  this.checkIfInBar = function (xPos, yPos) {
	  if(xPos > (38 * TILE_W) && xPos < (48 * TILE_W) &&
		 yPos > (13 * TILE_H) && yPos < (20 * TILE_H))
	  {
		  backgroundMusic.loopSong("have-a-nice-beer");
	  } else { 
		  backgroundMusic.loopSong("goblinRaid");
	  }
  }


  this.move = function () {
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

    this.checkForLevelUp()
    this.mySword.move();
    this.myArrow.move();
    this.myRock.move();

    this.tryToTriggerMonsterSpawnAt(skeletonClass, skeletonPic, skeletonSpawnTiles, this.x + this.width / 2, this.y + this.height / 2, direction, 6);
	if(levelNow == 7){
		this.checkIfInBar(this.x, this.y);
	}
};

  this.freeze = function (duration) {
    this.isFrozen = true;

    (function (warrior) {
      setTimeout(function () {
        warrior.isFrozen = false;
      }, duration);
    })(this);
  };

  this.tryToTriggerMonsterSpawnAt = function (monsterClass, monsterPic, spawnTiles, x, y, dir = direction, frameCount, chance = 0.3) { // 0.0 to less than 2.0 chance
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
  };

  this.checkForLevelUp = function () {
    if (this.stats.experience >= levelExperienceArray[ this.stats.experienceLevel ]) {
      this.stats = new LevelUp(this.stats).levelup();
    }
  };



  this.death = function () {
    this.stats.health = this.stats.maxHealth;
    this.x = this.resetPositionCoords.x;
    this.y = this.resetPositionCoords.y;
    camera.x = this.x - 150;
    camera.y = this.y - 150;
  };

  this.rangeTest = function (adversary) {
    return !(adversary.x > (this.x + this.width) ||
        (adversary.x + adversary.width) < this.x ||
        adversary.y > (this.y + this.height) ||
        (adversary.y + adversary.height) < this.y);
  };

  this.checkWarriorandWeaponCollisionAgainst = function (thisEnemy) {
    this.centerX = this.x + this.width / 2;
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
  };

  this.useWeapon = function(weapon, sound) {
    if (weapon.isReady()) {
      this.recentWeapon = weapon;
      weapon.shootFrom(this, this.rotation);
      sound.play();
    }
  }

  this.takeDamage = function (howMuch) {
    this.stats.health -= howMuch / 10;
    playerHurtSound.play();
    this.displayHealth = true;
    this.isTakingDamage = true;
    if (this.stats.health <= 0) {
    	this.death();
    	resetLevel();
    }
  };

  this.updateTickCountAndFrameIndex = function () {
    if (this.playerMove) {
      this.tickCount++;
      let currentTileIndex = getTileIndexAtPixelCoord(this.x, this.y);
      let currentTileType = roomGrid[currentTileIndex];
      //console.log(currentTileIndex, currentTileType);
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
  };

  this.drawFlashingWarriorAndHealth = function () {
    if (this.isTakingDamage && this.warriorDisplayHealthCountdown % 10 >= 4) {
      this.drawWarriorAndShadow();
    } else {
      this.drawWarriorAndShadow();
    }

    colorRect(this.x, this.y - 16, 40, 12, "black");
    colorRect(this.x + 2, this.y - 14, 35, 8, "red");
    colorRect(this.x + 2, this.y - 14, (this.stats.health / this.stats.maxHealth) * 35, 8, "green");

    this.warriorDisplayHealthCountdown--;
    if (this.warriorDisplayHealthCountdown <= 0) {
      this.displayHealth = false;
      this.isTakingDamage = false;
      this.warriorDisplayHealthCountdown = this.warriorHealthCountdownSeconds * FRAMES_PER_SECOND;
    }
  };

  this.drawDebug = function () {
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



    OverlayFX.maybeLeaveFootprint(this);
  };

  this.draw = function () {
    this.updateTickCountAndFrameIndex();

    this.sx = this.frameIndex * this.width;
	  //console.log(this.sx);

    if (this.rotation.y < 0 || this.rotation.x < 0) {
      this.mySword.draw(this);
    }

    if (this.displayHealth) {
      this.drawFlashingWarriorAndHealth();
    } else {
      this.drawWarriorAndShadow();
    }

    if (debugMode) {
      this.drawDebug();
    }

    if (this.rotation.y > 0 || this.rotation.x > 0) {
      this.mySword.draw(this);
    }

    this.myArrow.draw();
    this.myRock.draw();

  };

  this.getWalkSpeed = function () {

    let xSpeed = this.direction.x * this.speed,
        ySpeed = this.direction.y * this.speed;

    return { x: xSpeed, y: ySpeed };
  };

  this.setDirection = function () {
    let dirX = dirY = 0;
    if (this.keyHeld_WalkWest) {
      dirX -= 1;
    } if (this.keyHeld_WalkEast) {
      dirX += 1;
    } if (this.keyHeld_WalkNorth) {
      dirY -= 1;
    } if (this.keyHeld_WalkSouth) {
      dirY += 1;
    }

    if (dirX != 0 || dirY != 0) {
      if (dirY > 0) this.sy = this.height;
      else if (dirY < 0) this.sy = 0;
    
      if (dirX > 0) this.sy = this.height * 3;
      else if (dirX < 0) this.sy = this.height * 2;
    
      //normalize direction vector
      if (dirX != 0 && dirY != 0) {
        dirX *= 0.85;
        dirY *= 0.85;
      }

      this.rotation = {x: dirX, y: dirY};
    }

    this.direction = {x: dirX, y: dirY};
  };

  this.nextPosWithInput = function () {
    let x = this.x;
    let y = this.y;

    let speed = this.getWalkSpeed();
    x += speed.x;
    y += speed.y;

    return { nextX: x, nextY: y };
  };

  this.loadNewLevelIfAtEdge = function (tileC, tileR) {
    if (tileC <= 0 && (levelCol-1) >= 0) {
      console.log("Touching left edge of map");
      levelCol--;
      console.log("this.x before is " + this.x);
      this.x = (ROOM_COLS - 3) * TILE_W;
      this.resetPositionCoords.x = this.x;
      this.resetPositionCoords.y = this.y;
      loadLevel();
      return true;
    }

    if (tileR <= 0 && (levelRow - 1) >= 0) {
      console.log("Touching top edge of map");
      levelRow--;
      this.y = (ROOM_ROWS - 3) * TILE_H;
      this.resetPositionCoords.x = this.x;
      this.resetPositionCoords.y = this.y;
      loadLevel();
      return true;
    }

    if (tileC >= ROOM_COLS - 1 && levelCol < MAP_WIDTH) {
      console.log("Touching right edge of map");
      levelCol++;
      this.x = TILE_W;
      this.resetPositionCoords.x = this.x;
      this.resetPositionCoords.y = this.y;
      loadLevel();
      return true;
    }

    if (tileR >= ROOM_ROWS - 1 && levelRow < MAP_WIDTH) {
      console.log("Touching bottom edge of map");
      levelRow++;
      this.y = TILE_H;
      this.resetPositionCoords.x = this.x;
      this.resetPositionCoords.y = this.y;
      loadLevel();
      return true;
    }

    return false;
  };

  this.indexOfNextTile = function (nextX, nextY) {

    let xOffset = 0;
    let yOffset = 0;

    if (this.keyHeld_WalkNorth) {
      yOffset = 0;
    } else if (this.keyHeld_WalkSouth) {
      yOffset = this.height;
    } else {
      yOffset = this.height / 2;
    }

    if (this.keyHeld_WalkWest) {
      xOffset = 0;
    } else if (this.keyHeld_WalkEast) {
      xOffset = this.width;
    } else {
      xOffset = this.width / 2;
    }

    return getTileIndexAtPixelCoord(nextX + xOffset, nextY + yOffset);
  };

  this.tileTypeForIndex = function (tileIndex) {
    if (tileIndex == undefined) {
      return TILE_WALL;
    } else {
      return roomGrid[ tileIndex ];
    }
  };

  this.setSpeedAndPosition = function (speed, xPos, yPos) {
    if (debugMode) {
      this.speed = 20;
    } else if (this.isFrozen) {
      this.speed = 0;
    } else {
      this.speed = speed;
    }

    this.x = xPos;
    this.y = yPos;
  };

  this.loadNextLevel = function (newRow, newCol) {
    levelRow = newRow;
    levelCol = newCol;
    loadLevel();
  };

  this.replaceTileAtIndexWithTileOfTypeAndPlaySound = function (aTileIndex, aTileType, sound = null) {
    if (sound != null) {
      sound.play();
    }
    setNewTypeForTileObjectAtIndex(aTileType, aTileIndex);
    roomGrid[ aTileIndex ] = aTileType;
  };

  this.unlockDoor = function (tileIndex, color) {
    if (this.keysHeld[color] || debugMode) {
      this.keysHeld[color]--; // one less key

      for (let t of tileList) {
        if (t.index === tileIndex && t.type != TILE_ROAD) {
          tileList.splice(tileList.indexOf(t), 1);
          break;
        }
      }

      this.replaceTileAtIndexWithTileOfTypeAndPlaySound(tileIndex, TILE_ROAD, doorSound);
      dialogManager.setDialogWithCountdown("I've used a " + color + " key.");
    } else {
      dialogManager.setDialogWithCountdown("I need a " + color + " key to open this door.");
    }
  };

  this.removeFallenTree = function (tileIndex, groundTile) {
    if (this.inventory.woodAx || debugMode) {
      this.replaceTileAtIndexWithTileOfTypeAndPlaySound(tileIndex, groundTile);
      dialogManager.setDialogWithCountdown("Chop Chop");
    } else {
      dialogManager.setDialogWithCountdown("This tree is in my way.  If I only had an Ax.");
    }
  };

  this.pickUpKey = function (tileIndex, color) {
    this.keysHeld[color]++; // one more key
    for (let t of tileList) {
      if (t.index === tileIndex && t.type != TILE_ROAD) {
        tileList.splice(tileList.indexOf(t), 1);
        break;
      }
    }
    this.replaceTileAtIndexWithTileOfTypeAndPlaySound(tileIndex, TILE_ROAD, keySound);
    dialogManager.setDialogWithCountdown("I've found a " + color + " key.");
  }

  this.pickupItem = function(item, tileIndex, groundTile) {
    let message = "";
    switch(item) {
      case "map":
        this.haveMap = true; // treasure map found
        message = "So this is what this place looks like.  [PRESS 3] for map";
        break;
      case "rocks":
        this.myRock.quantity += 5;
        message = "What luck!  I can use these rocks for throwing at enemies.";
        break;
      case "arrows":
        this.myArrow.quantity += 5;
        message = "I'll add these 5 arrows to my inventory.";
        break;
    }
    this.replaceTileAtIndexWithTileOfTypeAndPlaySound(tileIndex, groundTile, null);
    dialogManager.setDialogWithCountdown(message);
  }

  this.unlockTreasure = function (tileIndex, color) {
    if (this.keysHeld[color]) {
      this.keysHeld[color]--;
      this.inventory.goldpieces += 50;
      this.myArrow.quantity += 5;
      this.replaceTileAtIndexWithTileOfTypeAndPlaySound(tileIndex, TILE_ROAD, null);
      dialogManager.setDialogWithCountdown("I've used a " + color + " key and found 50 gold pieces, and 5 arrows");
    } else {
      dialogManager.setDialogWithCountdown("I need a " + color + " key to open this treasure chest.");
    }
  };

  this.impaledOnFreshSpikes = function (tileIndex, nextX, nextY) {
    this.setSpeedAndPosition(this.speed, nextX, nextY);
    this.stats.health -= 0.5;
    this.replaceTileAtIndexWithTileOfTypeAndPlaySound(tileIndex, TILE_SPIKES_BLOODY, spikeSound);
  };

  this.impaledOnBloodySpikes = function (nextX, nextY) {
    this.setSpeedAndPosition(this.speed, nextX, nextY);
    dialogManager.setDialogWithCountdown("OUCH! Bloody Spikes!");
  };

  this.tryOpenDoor = function (walkIntoTileIndex, doorTileType, message) {
    if (this.isInsideAnyBuilding || this.lastOpenDoorIndex > 0)
      return;

    this.replaceTileAtIndexWithTileOfTypeAndPlaySound(walkIntoTileIndex, TILE_OPEN_DOORWAY, shutDoor);
    this.lastOpenDoorIndex = walkIntoTileIndex;
    this.lastOpenDoorTile = doorTileType;
    dialogManager.setDialogWithCountdown(message);
  };

  this.tryCloseDoor = function () {
    if (!this.isInsideAnyBuilding && this.lastOpenDoorIndex > 0) {
      this.replaceTileAtIndexWithTileOfTypeAndPlaySound(this.lastOpenDoorIndex, this.lastOpenDoorTile, shutDoor);
      this.lastOpenDoorIndex = -1;
      return true;
    }
    return false;
  };

  this.collisionCheck = function (nextX, nextY) {

    let col = [];
    col[ 0 ] = { index: this.indexOfNextTile(nextX, nextY), x: nextX, y: nextY };
    col[ 1 ] = { index: this.indexOfNextTile(nextX, this.y), x: nextX, y: this.y };
    col[ 2 ] = { index: this.indexOfNextTile(this.x, nextY), x: this.x, y: nextY };

    for (i = 0; i <= 2; i++) {
      const walkIntoTileType = this.tileTypeForIndex(col[ i ].index);

      if (this.isPassableTile(walkIntoTileType)) {
        nextX = col[ i ].x;
        nextY = col[ i ].y;
        break;
      }
    }

    //speed buffs/debuffs
    const walkIntoTileTypeIndex = this.indexOfNextTile(nextX, nextY + (this.height / 2));
    const walkIntoTileTypeFeet = this.tileTypeForIndex(walkIntoTileTypeIndex);

    switch (walkIntoTileTypeFeet) {
      case TILE_GRASS:
      case TILE_GARDEN:
	  case TILE_GARDEN_1:
	  case TILE_GARDEN_2:
	  case TILE_GARDEN_3:
	  case TILE_GARDEN_4:
	  case TILE_GARDEN_5:
	  case TILE_GARDEN_6:
	  case TILE_GARDEN_7:
	  case TILE_GARDEN_6:
	  case TILE_GARDEN_7:
        this.setSpeedAndPosition(PLAYER_SPEED_DEBUFF, nextX, nextY);
        break;
      default:
        const index = this.indexOfNextTile(nextX, nextY);
        const type = this.tileTypeForIndex(index);
        if (this.isPassableTile(type))
          this.setSpeedAndPosition(PLAYER_SPEED, nextX, nextY);
    }

    return { x: nextX, y: nextY };
  };

  this.updatePosition = function (nextX, nextY) {

    let walkIntoTileIndex = this.indexOfNextTile(nextX, nextY);
    const walkIntoTileType = this.tileTypeForIndex(walkIntoTileIndex);

    switch (walkIntoTileType) {
      case TILE_TREE5FALLEN_BOTTOM:
        this.removeFallenTree(walkIntoTileIndex. TILE_ROAD);
        break;
      case TILE_TREE5FALLEN_TOP:
      case TILE_TREE5FALLEN_BOTTOM_GRASS:
        this.removeFallenTree(walkIntoTileIndex, TILE_GRASS);
        break;
      case TILE_HEALER_FRONTDOOR:
        if (this.lastOpenDoorIndex = -1)
          this.tryOpenDoor(walkIntoTileIndex, TILE_HEALER_FRONTDOOR,
              "This place smells nice.  Is that lavender?");
        return;
      case TILE_YELLOW_DOOR:
        this.unlockDoor(walkIntoTileIndex, "yellow");
        break;
      case TILE_GREEN_DOOR:
        this.unlockDoor(walkIntoTileIndex, "green");
        break;
      case TILE_FRONTDOOR_YELLOW:
        if (this.lastOpenDoorIndex = -1)
          this.tryOpenDoor(walkIntoTileIndex, TILE_FRONTDOOR_YELLOW);
        return;
      case TILE_RED_DOOR:
        this.unlockDoor(walkIntoTileIndex, "red");
        break;
      case TILE_BLUE_DOOR:
        this.unlockDoor(walkIntoTileIndex, "blue");
        break;
      case TILE_YELLOW_KEY:
        this.pickUpKey(walkIntoTileIndex, "yellow");
        break;
      case TILE_RED_KEY:
        this.pickUpKey(walkIntoTileIndex, "red");
        break;
      case TILE_BLUE_KEY:
        this.pickUpKey(walkIntoTileIndex, "blue");
        break;
      case TILE_GREEN_KEY:
        this.pickUpKey(walkIntoTileIndex, "green");
        break;
      case TILE_MAP:
        this.pickupItem("map", walkIntoTileIndex, TILE_GRASS);
        break;
      case TILE_GRAVEYARD_YELLOW_GATE:
        this.unlockDoor(walkIntoTileIndex, "yellow");
        break;
      case TILE_TREASURE:
        this.unlockTreasure(walkIntoTileIndex, "yellow");
        break;
      case TILE_THROWINGROCKS:
        this.pickupItem("rock", walkIntoTileIndex, TILE_GRASS);
        break;
      case TILE_ARROWS:
        this.pickupItem("arrows", walkIntoTileIndex, TILE_GRASS);
        break;
      case TILE_GRAVE_1:
      case TILE_GRAVE_2:
      case TILE_GRAVE_3:
        dialogManager.setDialogWithCountdown("Too many good people have died from the Skeleton King and his army of the dead.");
        break;
      case TILE_GRAVE_4:
        dialogManager.setDialogWithCountdown("I need to avenge my friend.  The Skeleton King and his army of the dead must be destroyed!.");
        break;
      case TILE_FOUNTAIN:
        dialogManager.setDialogWithCountdown("What a beautiful fountain.");
        break;
      case TILE_SPIKES:
        this.impaledOnFreshSpikes(walkIntoTileIndex, nextX, nextY);
        break;
      case TILE_SPIKES_BLOODY:
        this.impaledOnBloodySpikes(nextX, nextY);
        break;
      case TILE_HOUSE_DRESSER_BOTTOM:
        dialogManager.setDialogWithCountdown("I really need to get some new clothes.");
        break;
      case TILE_HOUSE_LS_BED_BOTTOM:
        dialogManager.setDialogWithCountdown("No time to sleep!.");
        break;
      case TILE_BRICK_BW_WEAPONSRACKBOTTOM:
        dialogManager.setDialogWithCountdown("No swords?!  Isn't this a blacksmith's shop?");
        break;
      case TILE_CHAIR:
        dialogManager.setDialogWithCountdown("I really need a drink!");
        break;
      case TILE_WALL:
      case TILE_OPEN_DOORWAY:
        return;
      default:
        break;
    } // end of switch

    this.tryCloseDoor();

  };// end of updatePosition()

  this.isPassableTile = function (aTile) {

    if (debugMode)
      return true;

    switch (aTile) {
      case TILE_WALL:
      case TILE_DOOR:
      case TILE_YELLOW_DOOR:
        if (this.keysHeld["yellow"]) return true;
      case TILE_GREEN_DOOR:
        if (this.keysHeld["green"]) return true;
      case TILE_BLUE_DOOR:
        if (this.keysHeld["blue"]) return true;
      case TILE_RED_DOOR:
        if (this.keysHeld["red"]) return true;
      case TILE_ROOF_FRONTRIGHT:
      case TILE_ROOF_SIDERIGHT:
      case TILE_ROOF_BACKRIGHT:
      case TILE_FRONTWALL_WINDOW:
      case TILE_ROOF_BACKSIDE:
      case TILE_ROOF_BACKLEFT:
      case TILE_ROOF_LEFTSIDE:
      case TILE_ROOF_FRONTLEFT:
      case TILE_ROOF_FRONT:
      case TILE_ROOF_CENTER:
      case TILE_HEALER_BW_CABINET_POTIONS:
	  case TILE_CABINET_LH:
      case TILE_HEALER_DESK:
	  case TILE_HEALER_FRONTDOOR:
      case TILE_BS_BW:
      case TILE_BS_BW_CABINET_POTIONS:
      case TILE_BS_BW_CABINET_EMPTY:
      case TILE_BRICK_TL:
      case TILE_BRICK_TR:
      case TILE_BS_DESK:
      case TILE_BRICK_BW_WEAPONSRACK:
      case TILE_BS_FW_LS:
      case TILE_BS_LW:
      case TILE_BS_FW_RS:
      case TILE_HOUSE_FRONT_WALL:
      case TILE_HOUSE_FRONT_WINDOW:
      case TILE_HOUSE_FRONT_WINDOW_BROKEN:
      case TILE_HOUSE_FW_RS:
      case TILE_HOUSE_FW_LS:
      case TILE_HOUSE_BW:
      case TILE_HOUSE_BW_LS:
      case TILE_HOUSE_BW_RS:
      case TILE_HOUSE_BW_WINDOW:
      case TILE_HOUSE_LS_BED_TOP:
      case TILE_HOUSE_LS_BED_BOTTOM:
      case TILE_HOUSE_DRESSER_TOP:
      case TILE_BAR_CABINET:
      case TILE_BAR:
      case TILE_BAR_TOP:
      case TILE_CHAIR:
      case TILE_MAUSOLEUM_1:
      case TILE_MAUSOLEUM_2:
      case TILE_MAUSOLEUM_3:
      case TILE_MAUSOLEUM_4:
	  case TILE_MAUSOLEUM_B_1:
      case TILE_MAUSOLEUM_B_2:
      case TILE_MAUSOLEUM_B_3:
      case TILE_MAUSOLEUM_B_4:
	  case TILE_GRAVE_1:
	  case TILE_GRAVE_2:
	  case TILE_GRAVE_3:
	  case TILE_GRAVE_4:
      case TILE_GRAVEYARD_FENCE_LEFT:
      case TILE_GRAVEYARD_FENCE_RIGHT:
      case TILE_GRAVEYARD_FENCE:
      case TILE_GRAVEYARD_FENCE_SIDE:
      case TILE_GRAVEYARD_FENCE_BR:
      case TILE_GRAVEYARD_FENCE_TR:
      case TILE_GRAVEYARD_FENCE_LEFTSIDE:
      case TILE_GRAVEYARD_FENCE_BL:
      case TILE_GRAVEYARD_FENCE_TL:
      case TILE_WATER:
      case TILE_BUSH:
      case TILE_BUSH:
	  case TILE_TREE_1_SW:
	  case TILE_TREE_1_SE:
      case TILE_TREE2BOTTOMHALF:
      case TILE_TREE3TOPHALF:
      case TILE_TREE3BOTTOMHALF:
      case TILE_TREE4TOPHALF:
      case TILE_TREE4BOTTOMHALF:
      case TILE_TREE5FALLEN_TOP:
      case TILE_TREE5FALLEN_BOTTOM:
      case TILE_TREE5FALLEN_BOTTOM_GRASS:
      case TILE_ORC_HOUSE_FL:
      case TILE_ORC_HOUSE_FR:
      case TILE_ORC_HOUSE_BL:
      case TILE_ORC_HOUSE_BR:
      case TILE_ORC_HOUSE_WALL:
      case TILE_ORC_HOUSE_LS:
      case TILE_ORC_HOUSE_RS:
      case TILE_ORC_HOUSE_WINDOW:
      case TILE_WIZARD_BW_TS:
      case TILE_WIZARD_BW_BS:
      case TILE_WIZARD_BW_LC_TS:
      case TILE_WIZARD_BW_RC_TS:
      case TILE_WIZARD_LW:
      case TILE_WIZARD_RW:
      case TILE_WIZARD_BOTTOM_W:
      case TILE_WIZARD_BOTTOM_L:
      case TILE_WIZARD_BOTTOM_R:
      case TILE_WIZARD_FIREPLACE_TS:
      case TILE_WIZARD_FIREPLACE_BS:
      case TILE_CLIFF:
      case TILE_CLIFF_EDGE_TOP_LEFT_CORNOR:
      case TILE_CLIFF_EDGE_TOP:
      case TILE_CLIFF_EDGE_TOP_RIGHT_CORNOR:
      case TILE_CLIFF_EDGE_RIGHT:
      case TILE_CLIFF_EDGE_BOTTOM_RIGHT_CORNOR:
      case TILE_CLIFF_EDGE_BOTTOM:
      case TILE_CLIFF_EDGE_BOTTOM_LEFT_CORNOR:
      case TILE_CLIFF_EDGE_LEFT:
          return false;
      case TILE_GRAVEYARD_YELLOW_GATE:
        if (this.keysHeld["yellow"]) {
          return true;
        } else {
          return false;
        }
      default:
        return true;
    }
  }

}// end of warriorClass
