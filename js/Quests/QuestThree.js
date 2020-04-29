// Killing the Orc King and returning the first Crystal to the Princess

// coords in tile position (not absolute x,y)
let q3Spawn = [
  { name: "bob", type: "Goblin", x:10, y:10 },
  { name: "sue", type: "OrcSword", x:40, y:40 },
  { name: "billybob", type: "Orc Boss", x:15, y:40 },
];

// keep track of enemies killed, so we don't respawn on lvl load
let q3KillList = [];

// handle q3 spawns
function startQuestThree() {
  console.log("NOW STARTING QUEST THREE");

  for (const spawn of q3Spawn) {
    if (q3KillList.includes(spawn.name)) continue;
    let pos = {x: spawn.x * TILE_W, y: spawn.y * TILE_H};
		console.log("spawning " + spawn.type + " at " + pos.x + "," + pos.y);
    let enemy = spawnCharacter(pos, spawn.type);
    enemy.q3 = true;
    enemy.myName = spawn.name;
  }

}

// handle q3 enemy kill
function q3HandleEnemyKill(enemy) {
  console.log("oh noes!  " + enemy.myName + " died!");
  if (enemy.q3) {
    q3KillList.push(enemy.myName);
  }
}

function questThreeComplete() {
  redWarrior.quest.threeComplete = true;
  dialogManager.setDialogWithCountdown("The Orc King is dead!", 8);
  //levelList[ 0 ] = orcKingforest2;
  redWarrior.quest.threeActive = false;
  questThreeCompletionScreenActive = true;
}
