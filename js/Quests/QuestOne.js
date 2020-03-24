// Clearing Falldale of the Goblins

var goblinsKilledInFallDale = 0;
var firstQuestLoad = false;
var barrelOneX = 207, barrelOneY = 405;
var barrelTwoX = 327, barrelTwoY = 208;
var barrelThreeX = 100, barrelThreeY = 400;
var barrelFourX = 200, barrelFourY = 400;
var barrelFiveX = 300, barrelFiveY = 400;

function startQuestOne() {
	console.log("NOW STARTING QUEST ONE");
	firstQuestEnemyList = [];
  	for (var e = 0; e < enemyList.length; e++) {
		firstQuestEnemyList.push(enemyList[e]);
  	}
	var cutSceneOrders = [
	{id: 316, toX: barrelOneX, toY: barrelOneY},
	{id: 327, toX: barrelTwoX, toY: barrelTwoY},
	{id: 527, toX: barrelThreeX, toY: barrelThreeY},
	{id: 727, toX: barrelFourX, toY: barrelFourY},
	{id: 1027, toX: barrelFiveX, toY: barrelFiveY}
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