// Killing the Orc King and returning the first Crystal to the Princess

// coords in tile position (not absolute x,y)
let q3Spawn = [
  // goblins
  { name: "bob", type: "Goblin", x:22, y:22, area: "entranceHall" },
  { name: "fred", type: "Goblin", x:9, y:42, area: "" },             // outside campground
  { name: "gus", type: "Goblin", x:8, y:38, area: "" },              // outside campground
  { name: "gaston", type: "Goblin", x:15, y:13, area: "kitchen" },        
  { name: "anton", type: "Goblin", x:13, y:13, area: "kitchen" },         
  { name: "wren", type: "Goblin", x:15, y:17, area: "storage" },         
  { name: "wilbur", type: "Goblin", x:13, y:21, area: "warRoom" },         
  { name: "max", type: "Goblin", x:13, y:24, area: "warRoom" },         
  { name: "niels", type: "Goblin", x:23, y:11, area: "diningHall" },         
  { name: "goyle", type: "Goblin", x:28, y:9, area: "throneRoom" },         
  { name: "krab", type: "Goblin", x:28, y:13, area: "throneRoom" },         
  // orcs
  { name: "sue", type: "OrcSword", x:33, y:6, area: "" },           // throne room
  { name: "pam", type: "OrcClub", x:33, y:16, area: "" },           // throne room
  { name: "pat", type: "OrcClub", x:23, y:17, area: "entranceHall" },
  { name: "thelma", type: "OrcSword", x:21, y:29, area: "" },         // guards front door
  { name: "louise", type: "OrcAxe", x:24, y:29, area: "" },         // guards front door
  { name: "sal", type: "OrcSword", x:5, y:42, area: "" },           // outside campground
  { name: "stimpy", type: "OrcSword", x:13, y:17, area: "storage" },
  { name: "mal", type: "OrcClub", x:16, y:21, area: "warRoom" },
  { name: "peg", type: "OrcAxe", x:8, y:26, area: "westHall" },
  { name: "gal", type: "OrcAxe", x:8, y:8, area: "westHall" },
  { name: "lucy", type: "OrcAxe", x:37, y:26, area: "eastHall" },
  { name: "myrtle", type: "OrcAxe", x:47, y:26, area: "eastGuard" },
  { name: "millie", type: "OrcClub", x:43, y:20, area: "courtyard" },
  // boss
  { name: "billybob", type: "Orc Boss", x:38, y:11, area: "throneRoom" },
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
    enemy.assignedArea = spawn.area;
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
