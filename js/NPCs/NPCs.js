const NPC_SPEED = 0.5;
const NPC_INTERACTION_DELAY = 1.0;

npcClass.prototype = new enemyClass();

function npcClass(npcName, npcPic, npcFrames) {
  this.speed = NPC_SPEED;
  this.myNPCPic = npcPic; // which picture to use
  this.myName = "Untitled character";
  this.myName = npcName;
  this.type = "npc";

  this.tickCount = 0;
  this.frameIndex = 0;
  this.width = 50;
  this.numberOfFrames = npcFrames ? npcFrames : 4;
  this.height = 54;
  this.ticksPerFrame = 5;
  this.npcMove = true;
  this.npcTimeBetweenChangeDir = 100;

  this.superClassReset = this.reset;
  this.reset = function (resetX, resetY) {
    this.superClassReset(resetX, resetY);
    this.myNPCPic = npcPic;
    this.npcTimeBetweenChangeDir = Math.floor(Math.random() * 1000) + 1;
  };

  this.superClassMove = this.move;
  this.move = function () {
    this.superClassMove(this.npcTimeBetweenChangeDir);

    if (this.walkNorth) {
      this.sy = this.height;
    }

    if (this.walkSouth) {
      this.sy = 0;
    }
    if (this.walkWest) {
      this.sy = this.height * 3;
      if (this.myName == "Fido") {
      	this.sy = 0;
      }
    }
    if (this.walkEast) {
      this.sy = this.height * 2;
      if (this.myName == "Fido") {
      	this.sy = this.height;
      }
    }
    if (this.npcMove == false) {
      this.sy = this.height * 4;
    }
  };

  var meows = [ 'meow', 'meOOOWW!', 'purr', 'me-roww', 'purrrrrrrr', 'mmmmyow', 'mowmow', 'mew', 'mew mew', 'HISS!', 'meow', 'meeeeeow', 'me. ow.', 'me? ow!', 'mew meow purr', 'purr meow!', 'meow?', 'MEOW?', 'MEOW?!?!', 'meow!', 'meROWE', 'purr purr', 'purr purr purr' ];
  var meowframes = 90;
  var meowcount = 0;

  this.isOverlappingPoint = function (testX, testY) { // textX is redWarrior.x and testY is redWarrior.y

    if (this.x < testX && (this.x + this.width) > testX && this.y < testY && (this.y + this.height) > testY)
    {
      this.interractWithPlayer();
    }
  };

  this.interractWithPlayer = function () {

    var nextInterractionTime = lastShopScreenTime + (NPC_INTERACTION_DELAY * 1000.0);
    var now = new Date().getTime();
    if(now < nextInterractionTime)
      return;
    
    var dialogcount = 0;
    //test if redWarrior is inside box of NPC
    let NPCDialog = "";
    {
      if (this.myName == "Addy") {
        humanMaleHello.play();
        if (redWarrior.quest.twoComplete && redWarrior.quest.threeActive == false) {
          NPCDialog = "Addy:  The Shop Keeper has a present for you."
        } else if (redWarrior.quest.twoActive) {
          NPCDialog = "Addy:  You are brave to adventure into the Forest."
        } else if (redWarrior.questOneComplete && redWarrior.quest.twoActive == false) {
          NPCDialog = "Addy:  Thank you for saving Falldale!  You should talk to the Princess.  We are very grateful.";
        } else if (redWarrior.quest.oneActive) {
          NPCDialog = "Addy:  I'm Addy, there's no time to talk right now.  We are invaded by Goblins!";
        } 
      } else if (this.myName == "Dodd") {
        humanMaleHi.play();
        if (redWarrior.quest.oneActive) {
          NPCDialog = "Dodd:  I'm Dodd, we need to clear all the Goblins from the town!";
        } else if (redWarrior.questOneComplete && redWarrior.quest.twoActive == false) {
          NPCDialog = "Dodd:  We are in debt to you for saving our town.  The Princess has concerns over the recent goblin raids.";
        } else if (redWarrior.quest.twoActive) {
          NPCDialog = "Dodd:  Wow, you're going to clear the Goblins and Orcs from the forest?";
        } else if (redWarrior.quest.twoComplete) {
          NPCDialog = "Dodd:  The Shop Keeper has a present for you."
        }
      } else if (this.myName == "Taran") {
        humanMaleGoodDay.play();
        if (redWarrior.quest.oneActive) {
          NPCDialog = "Taran:  I'm Taran.  Now is not the best time to talk.  These Goblins are destroying the town!";
        } else if (redWarrior.questOneComplete && redWarrior.quest.twoActive == false) {
          NPCDialog = "Taran:  You are such a brave individual!  Do you think you can enter the forests and clear them of the goblins and orcs?";
        } else if (redWarrior.quest.twoActive) {
          NPCDialog = "Taran:  That's amazing that you're going to enter the forest.  I would be afraid too.";
        } else if (redWarrior.quest.twoComplete) {
          NPCDialog = "Taran:  The Shop Keeper has a present for you."
        }
      } else if (this.myName == "Delkon") {
        humanMaleHi4.play();
        if (redWarrior.quest.oneActive) {
          NPCDialog = "The name is Delkon.  I have 50 gold pieces I can give you if you clear the town of the Goblins!";
          redWarrior.delkonRewardOffer = true;
        } else if (redWarrior.questOneComplete && redWarrior.delkonRewardOffer) {
          redWarrior.inventory.goldpieces = redWarrior.inventory.goldpieces + 50;
          NPCDialog = "Thank you for clearing the town of those horrible beasts!  Please take this reward of 50 gold pieces";
          redWarrior.delkonRewardOffer = false;
        } else if (redWarrior.questOneComplete) {
          NPCDialog = "Thank you for clearing the town of those horrible beasts!";
        } else if (redWarrior.quest.twoComplete) {
          NPCDialog = "Delkon:  The Shop Keeper has a present for you."
        }
      } else if (this.myName == "Princess Pauline") {
		princesHello.play();
		if (redWarrior.quest.twoComplete) {
          NPCDialog = "Princess:  You cleared the forest! The Shop Keeper asked to see you."
        } else if (redWarrior.quest.twoActive) {
          NPCDialog = "Princess:  Thank you for going into the forest."
        } else if (redWarrior.questOneComplete && redWarrior.quest.twoActive == false) {
          NPCDialog = "Princess:  I am incredible grateful for you saving our town of Falldale.  These Goblin attacks have been happening more often of late.  I need you to enter the forest and clear the Goblins and Orcs.";
          redWarrior.yellowKeysHeld++;
          redWarrior.quest.twoActive = true;
        } else if (redWarrior.quest.oneActive) {
          NPCDialog = "Princess:  My town is being destroyed by these horrible Goblins.  Please do something!";
        } 
      } else if (this.myName == "Gabriel") {
        humanMaleGoodAfternoon.play();
        if (redWarrior.quest.oneActive) {
          NPCDialog = "Gabriel:  Please clear this town of all these Goblins!";
        } else if (redWarrior.questOneComplete && redWarrior.quest.twoActive == false) {
          NPCDialog = "Gabriel:  Sorry we couldn't talk earlier.  My name is Gabriel, I am grateful you saved our town.  These Goblins have been attacking us a lot lately.";
        } else if (redWarrior.quest.twoActive) {
          NPCDialog = "Gabriel:  You're going to stop future Goblin attacks?!"
        }
      } else if (this.myName == "Fenton") {
        humanMaleWelcome.play();
        if (redWarrior.quest.oneActive) {
          NPCDialog = "Fenton:  I'm Fenton, our town is being overran by Goblins!  Please do something!";
        } else if (redWarrior.questOneComplete && redWarrior.quest.twoActive == false) {
          NPCDialog = "Fenton:  Thank you for saving our town!  Something needs to be done about these goblins";
        } else if (redWarrior.quest.twoActive) {
          NPCDialog = "Fenton:  You're going to do something about the goblins and orcs?!"
        } else if (redWarrior.quest.twoComplete) {
          NPCDialog = "Fenton:  The Shop Keeper has a present for you."
        }
      } else if (this.myName == "Healer") {
        NPCDialog = "Healer:  Hi, I'm the Henry the Healer.";
        isAtHealer = true;
        humanMaleHi2.play();
      } else if (this.myName == "Shop Keeper") {
        // dialogue handled in shop.js
        isInShop = true;
        humanMaleHi3.play();
        if (redWarrior.quest.twoComplete && redWarrior.inventory.woodAx == 0) {
          redWarrior.inventory.woodAx = 1;
          redWarrior.quest.threeActive = true;
        }
      } else if (this.myName == "Arya") {
        humanFemaleHello.play();
        if (redWarrior.quest.oneActive) {
          NPCDialog = "Arya:  I'm Arya, our town is being overran by Goblins!  Please do something!";
        } else if (redWarrior.questOneComplete && redWarrior.quest.twoActive == false) {
          NPCDialog = "Arya:  Thank you for saving our town!";
        } else if (redWarrior.quest.twoComplete) {
          NPCDialog = "Arya:  The Shop Keeper has a present for you."
        }
      } else if (this.myName == "Lawrence") {
        humanMaleHi2.play();
        if (redWarrior.quest.oneActive) {
          NPCDialog = "Lawrence:  I'm Lawrence, our town is being overran by Goblins!  Please do something!  I'm to scared and going to stay here in the bar.";
        } else if (redWarrior.questOneComplete && redWarrior.quest.twoActive == false) {
          NPCDialog = "Lawrence:  Thank you for saving our town!";
        } else if (redWarrior.quest.twoActive) {
          NPCDialog = "Lawrence:  I'm too scared to leave the bar."
        } else if (redWarrior.quest.twoComplete) {
          NPCDialog = "Lawrence:  The Shop Keeper has a present for you."
        }
      } else if (this.myName == "Rowan") {
        humanFemaleHi.play();
        if (redWarrior.quest.oneActive) {
          NPCDialog = "Rowan:  I'm Rowan, our town is being overran by Goblins!  Please do something!";
        } else if (redWarrior.questOneComplete && redWarrior.quest.twoActive == false) {
          NPCDialog = "Rowan:  Thank you for saving our town!  The Princess is concerned over the recent goblin raids.  Maybe you can comfort her?";
        } else if (redWarrior.quest.twoActive) {
          NPCDialog = "Rowan:  You're entering the woods?  You're my hero!";
        } else if (redWarrior.quest.twoComplete) {
          NPCDialog = "Rowan:  The Shop Keeper has a present for you."
        }
      } else if (this.myName == "Fido") {
        // alternately, we can choose a random one from the array
        // NPCDialog = meows[Math.floor(Math.random()*meows.length)];

        
        //every 30 frames, switch to the next one and loop around
        meowcount++;
        NPCDialog = meows[ Math.floor(meowcount / meowframes) % meows.length ];
        if (meowcount % meowframes == 1) {
          redWarrior.catsMet++; // side quest
          meowPurrSound.play();
        }
      }
    }

    if (NPCDialog != "") {
      dialogManager.setDialogWithCountdown(NPCDialog, 5);
    }
  }

  this.draw = function () {

    if (this.npcMove) {
      if (this.myNPCPic.width >= (this.width * this.numberOfFrames)) {
        this.tickCount++; // this makes spritesheet animation work
      } else {
        // unfinished artwork, stay at frame 0 forever
        // and just slide around for now
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

    this.sx = 0;

    if (gamePaused == false) {
      this.sx = this.frameIndex * this.width;
    }

    canvasContext.drawImage(shadowPic, this.x - 16, this.y + 32);

    OverlayFX.maybeLeaveFootprint(this);

    // draw a mirror image when walking other way? use row 2
    if (this.walkEast || this.walkNorth) {
      canvasContext.drawImage(this.myNPCPic, this.sx, this.sy, this.width, this.height, Math.round(this.x), Math.round(this.y), this.width, this.height);
    } else {
      // normal drawing, never flipped, used by nearly all entities
      canvasContext.drawImage(this.myNPCPic, this.sx, this.sy, this.width, this.height, Math.round(this.x), Math.round(this.y), this.width, this.height);
    }

    if (debugMode) {
      colorText(this.myName, this.x, this.y - 20, "red");
      colorText("HP: " + this.health, this.x, this.y - 10, "red");

      colorRect(this.x, this.y, 5, 5, "red");
      colorRect(this.x, this.y + this.height, 5, 5, "red");
      colorRect(this.x + this.width, this.y, 5, 5, "red");
      colorRect(this.x + this.width, this.y + this.height, 5, 5, "red")
    }
  }
}