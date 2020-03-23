// Clearing Falldale of the Goblins

var goblinsKilledInFallDale = 0;
var firstQuestLoad = false;

function startQuestOne() {
	console.log("NOW STARTING QUEST ONE");
	firstQuestEnemyList = [];
  	for (var e = 0; e < enemyList.length; e++) {
		firstQuestEnemyList.push(enemyList[e]);
  	}
	var cutSceneOrders = [
	{id: 316, toX: 207, toY: 405},
	{id: 327, toX: 511, toY: 208}
	];
	for(var i=0; i<cutSceneOrders.length; i++){
		var foundMatch = false;
		for (var e = 0; e < enemyList.length; e++){
			if(enemyList[e].scriptID == cutSceneOrders[i].id){
				enemyList[e].goToMode = GOTO_CUTSCENE;
				enemyList[e].goToX = cutSceneOrders[i].toX;
				enemyList[e].goToY = cutSceneOrders[i].toY;
				console.log(cutSceneOrders[i].id + " has cutscene orders");
				foundMatch = true;
				break;
			}
		}
		if(foundMatch == false){
			console.log("No Script ID found for " + cutSceneOrders[i].id);
		}
	}
}

function countGoblinforQuestOne() {
  if (redWarrior.questOneComplete == false) {
    if (levelNow == 7) { // located in Falldale
      goblinsKilledInFallDale++;
      checkForQuestOneComplete();
    }
  }
}

function checkForQuestOneComplete() {
  if (goblinsKilledInFallDale >= 5) {
    redWarrior.questOneComplete = true;
    dialogManager.setDialogWithCountdown("I have van-quest all the Goblins from Falldale!", 8);
    backgroundMusic.loopSong("have-a-nice-beer");
    OverlayFX.nightMode = false;
    levelList[ 7 ] = fallDale2;
    redWarrior.questOneActive = false;
    questOneCompletionScreenActive  = true;
  }

}