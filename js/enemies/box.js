var boxMoveSpeed = 0;

boxClass.prototype = new enemyClass();

function boxClass() {
    this.speed = boxMoveSpeed;
    this.maxhealth = 20;
    this.width = 50;
    this.numberOfFrames = 0;
    this.height = 50;
    this.ticksPerFrame = 0;
    this.treasureAvailable = true;
    this.chanceToProvideTreasure = 1;
    //this.hurtSound = boxHurtSound;
    this.deadPic = brokenBoxPic;
    this.faceNorthMul = 1;
    this.faceSouthMul = 0;
    this.shadowXOffset = 0;
    this.shadowYOffset = 0;

    this.superClassInitialize = this.initialize;
    this.initialize = function(enemyName, enemyPic, numberOfFrames) {
        this.superClassInitialize(enemyName, enemyPic, numberOfFrames);
        this.originalNumberOfFrames = this.numberOfFrames;
    };

    this.superClassMove = this.move;
    this.move = function() {
		//console.log("Box: " + this.scriptID + " X: " + this.x + " Y: " + this.y);
        //No Movement
    };

    this.distributeTreasure = function() {
        // TODO: port back to enemyClass
        var chanceOnTreasure = Math.round(Math.random() * 10);
        if (chanceOnTreasure >= 5) {
            console.log("Treasure Provided");
            var randomTreasure = Math.round(Math.random() * 5);
            switch (randomTreasure) {
                case 1:
                    itemList.push(new heartClass(1, this.x, this.y));
                    break;
                case 2:
                    itemList.push(new goldClass(5, this.x, this.y));
                    break;
                case 3:
                    itemList.push(new healingPotionClass(1, this.x, this.y));
                    break;
                case 4:
                    itemList.push(new clothClass(1, this.x, this.y));;
                    break;
                case 5:
                    itemList.push(new twigClass(1, this.x, this.y));
                    break;
            }
        }
    };

    this.superClassTakeDamage = this.takeDamage;
    this.takeDamage = function(howMuch, fromX, fromY) {
        this.superClassTakeDamage(howMuch, fromX, fromY);
        if (!this.alive && this.treasureAvailable) {
            this.distributeTreasure();
            this.treasureAvailable = false;
            //boxsKilled++;
        }
    };

    this.superClassIsOverlappingPoint = this.isOverlappingPoint;
    this.isOverlappingPoint = function() {
        if (this.superClassIsOverlappingPoint()) {
            // add function here for hit chance
            dialogManager.setDialogWithCountdown("Boom!", 5);
            return true;
        }
        return false;
    };

    this.superClassNewRandomPic = this.newRandomPic;
    this.newRandomPic = function() {
        this.superClassNewRandomPic();
        this.numberOfFrames = this.originalNumberOfFrames;
    }
}