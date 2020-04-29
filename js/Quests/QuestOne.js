// Clearing Falldale of the Goblins

var goblinsKilledInFallDale = 0;
var firstQuestLoad = false;
var barrelOneX = 100, barrelOneY = 850; //ID:  217
var barrelTwoX = 300, barrelTwoY = 850; //ID:  617
var barrelThreeX = 400, barrelThreeY = 850; //ID:  817
var barrelFourX = 350, barrelFourY = 400; //ID: 708
var barrelFiveX = 400, barrelFiveY = 700; //ID: 814 

var goblinSpawn = [
	{x:250, y:900},
	{x:100, y:900},
	{x:600, y:1200},
	{x:550, y:1250},
	{x:550, y:400},
];

function startQuestOne() {
	console.log("NOW STARTING QUEST ONE");
	// spawn the goblins
	for (var pos of goblinSpawn) {
		console.log("spawning at " + pos.x + "," + pos.y);
		spawnCharacter(pos, "Goblin");
	}
	/*
	firstQuestEnemyList = [];
  	for (var e = 0; e < enemyList.length; e++) {
		firstQuestEnemyList.push(enemyList[e]);
	  }
	  */
		
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
  console.log("count goblin for q1");
  if (redWarrior.questOneComplete == false) {
    if (levelNow == falldaleZone) { // located in Falldale
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
    //levelList[ 7 ] = fallDale2;
    redWarrior.quest.oneActive = false;
    questOneCompletionScreenActive  = true;
  }

}