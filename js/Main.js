var debugSkipToGame = false;

// Characters //

var canvas, canvasContext;
var minimapCanvas, minimapContext;
const FRAMES_PER_SECOND = 30;
var frameCounter = 0;
var damageUICountdown = 3;//in seconds
var diceWidth = 40;
var diceHeight = 40;
var stateScreenOffsetX, stateScreenOffsetY;
var camera;
var redWarrior = new warriorClass();
var enemyList = [];
var tileList = [];
var particleList = [];
var animateList = [];
const dialogManager = new DialogManager();
dialogManager.setDialogWithCountdown("H: Hides health, I: Inventory, O: Stats", 3);
var inventory = " ";
var inventoryScreen = false;
var mapShow = false;
var statsScreen = false;
var scrollBackgroundScreen = true;
var sprites = {};
var zones = {};
var zoneCollider = new ZoneCollider(ROOM_COLS, ROOM_ROWS, TILE_W);
var roofZones = new RoofZones();
var areas = new Areas();

// Game States //

var menuScreen = true;
var shownCreditsYet = false;
var scrollBackground = false;
var characterCreationScreen = false;
var characterSelectionScreen = false;
var isInShop = false;
var isInAlchemyShop = false;
var isAtHealer = false;
var lastShopScreenTime = new Date().getTime();
var firstQuestEnemyList = [];
var questOneCompletionScreenActive = false;
var questTwoCompletionScreenActive = false;
var questThreeCompletionScreenActive = false;
var questFourCompletionScreenActive = false;
var questFiveCompletionScreenActive = false;
var questSixCompletionScreenActive = false;
var debugMode = false;
var displayHealth = false;
var tileEditor = false;
var gamePaused = false;
var muteInputCycle = 0;
var saveGame = new SaveGame();
var continueGame = false;
var instructions = false;
var movementInstructionsShown = false;

// Sounds //

var backgroundMusic = new BackgroundMusicClass("goblinRaid");
var doorSound = new SoundOverlapsClass("woodDoorOpen");
var keySound = new SoundOverlapsClass("keys");
var spikeSound = new SoundOverlapsClass("spikes");
var zombieHurtSound = new SoundOverlapsClass("zombiehurt");
var zombieAlertSound = new SoundOverlapsClass("zombieAlert");
var goblinHurtSound = new SoundOverlapsClass("goblinDeath");
var skeletonHurtSound = new SoundOverlapsClass("skeletonhurt");
var batHurtSound = new SoundOverlapsClass("bathurt");
var playerHurtSound = new SoundOverlapsClass("playerHurt");
var bugbearHurtSound = new SoundOverlapsClass("bugbearHurt");
var arrowShotSound = new SoundOverlapsClass("arrowShot");
var swordSwingSound = new SoundOverlapsClass("swordSwing");
var rockThrowSound1 = new SoundOverlapsClass("rock1");
var rockThrowSound2 = new SoundOverlapsClass("rock2");
var rockThrowSound3 = new SoundOverlapsClass("rock3");
var meowPurrSound = new SoundOverlapsClass("meow_purr");
var humanMaleHello = new SoundOverlapsClass("humanMaleHello");
var humanMaleHi = new SoundOverlapsClass("humanMaleHi");
var humanMaleHi2 = new SoundOverlapsClass("humanMaleHi2");
var humanMaleHi3 = new SoundOverlapsClass("humanMaleHi3");
var humanMaleHi4 = new SoundOverlapsClass("humanMaleHi4");
var humanMaleGoodDay = new SoundOverlapsClass("humanMaleGoodDay");
var humanMaleWelcome = new SoundOverlapsClass("humanMaleWelcome");
var humanMaleGoodAfternoon = new SoundOverlapsClass("humanMaleGoodAfternoon");
var humanFemaleHello = new SoundOverlapsClass("humanFemaleHello");
var humanFemaleHi = new SoundOverlapsClass("humanFemaleHi");
var princesHello = new SoundOverlapsClass("PrincessPauline");
var shutDoor = new SoundOverlapsClass("closeDoor");

var groundFootsteps = new Audio("sound/falldale_ground_footsteps"+ audioFormat);
groundFootsteps.playbackRate = 1.7;
var groundFootStepsPlaying = false;
groundFootsteps.volume = 0.25;

var stoneFootsteps = new Audio("sound/falldale_stone_footsteps" + audioFormat);
stoneFootsteps.playbackRate = 1.7;
var stoneFootstepsPlaying = false;
stoneFootsteps.volume = 0.75;

const DIALOG_BOX_HEIGHT = 50;


//var dialogUIVisibilityCountdown = 3;


function resizeCanvas() {
  /*canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  stateScreenOffsetX = canvas.width / 2 - 400;
  stateScreenOffsetY = canvas.height / 2 - 300; */
}

window.onload = function () {
  canvas = document.getElementById('gameCanvas');
  minimapCanvas = document.createElement('canvas');
  canvasContext = canvas.getContext('2d');
  //canvasContext.dbgCollider = true;
  minimapContext = minimapCanvas.getContext('2d');
  minimapCanvas.width = ROOM_COLS * 4;
  minimapCanvas.height = ROOM_ROWS * 4;

  minimapContext.fillStyle = 'red';
  minimapContext.fillRect(0, 0, minimapCanvas.width, minimapCanvas.height);

  window.addEventListener("resize", resizeCanvas);
  window.addEventListener('focus', function () {
    gamePaused = false;
  });
  window.addEventListener('blur', function () {
    gamePaused = true;
  });

  resizeCanvas();
  camera = new Camera();

  colorRect(0, 0, canvas.width, canvas.height, 'orange'); // startup page
  centerText("Loading Images... please wait", 400, 300, 'black');

  // initTiledMaps();
  sprites = new Sprites();
  zones = new Zones();
  sprites.Load(() => {
    console.log("sprites done loading");
    zones.Load(() => {
        console.log("zones done loading");
        imageLoadingDoneSoStartGame();
    })
  });
  loadImages(); // Once images are loaded, imageLoadingDoneSoStartGame() is called to setup the rest.

};

var zoneAndOtherImagesLoaded = 0; // 0 = nothing loaded, 1 for zone load or images, 2 for both 

function imageLoadingDoneSoStartGame() {
  zoneAndOtherImagesLoaded++;

  console.log("state of load: " + zoneAndOtherImagesLoaded);
  if(zoneAndOtherImagesLoaded<2) {
    centerText("50% done, still loading...", 400, 330, 'gray');
    return;
  }
  console.log("starting game...");
  colorRect(0, 0, canvas.width, canvas.height, 'orange');
  setInterval(updateAll, 1000 / FRAMES_PER_SECOND);

  setupInput();
  console.log("setupInput should run - Main.js");
  OverlayFX.nightMode = false;
  // levelNow = 3; // Use this line to skip to level being worked on.
  if (continueGame === false) {
    redWarrior.initialize("Red warrior");
  } else {
    saveGame.loadData();
  }
  canvas.addEventListener('mousedown', handleMouseClick);
  //backgroundMusic.loopSong("hauntedHoedownSound");
  if (debugSkipToGame) {
    console.log("Debug Mode is on, skip directly to game");
  }
}

function backgroundMusicSelect() {
  var musicLevel = levelNow;
  switch (musicLevel) {
    case castleZone:
      backgroundMusic.loopSong("wizard-tower");
      break;
    case falldaleZone:
      if (redWarrior.questOneComplete) {
        backgroundMusic.loopSong("have-a-nice-beer");
      } else {
        backgroundMusic.loopSong("goblinRaid");
      }
      break;
    case graveyardZone:
    case oldGraveyardZone:
      backgroundMusic.loopSong("cemeteryBGM");
      break;
    default:
      backgroundMusic.loopSong("woodsbgm");
      break;
  }
}

function loadLevel() {
  areas.reset();
  roofZones.reset();
  zoneCollider.reset();
  recalulateLevelNow();
  var whichLevel = levelList[ levelNow ];
  // load the level
  currentLevel = zones.get(whichLevel);
  loadTiledMap(currentLevel)

  //roomGrid = whichLevel.slice();
  console.log("levelNow: " + levelNow);
  if (levelNow == falldaleZone && !redWarrior.questOneComplete) {
    startQuestOne();
  }
  if (levelNow == castleZone && !redWarrior.questThreeComplete) {
    startQuestThree();
  }
  
  //enemyList.splice(0, enemyList.length); //Empty enemyList
  //tileList.splice(0, tileList.length); //Empty tileList
  //animateList.splice(0, animateList.length); //Empty animateList
  backgroundMusicSelect();

  redrawMinimapTiles();
}

function updateAll() {
  areas.update();
  roofZones.update();
  moveAll();
  updateItems();
  drawAll();
}

function moveAll() {

  if (menuScreen || isAtHealer || tileEditor || gamePaused) {
    moveParticles();
  } else if (!gamePaused) {
    redWarrior.move();
    moveParticles();
    for (var i = 0; i < enemyList.length; i++) {
      enemyList[ i ].move();
      if (enemyList[ i ].health > 0) {
        redWarrior.checkWarriorandWeaponCollisionAgainst(enemyList[ i ]);
      }
    }
    camera.follow(redWarrior);
  }
}
function updateItems() {
  itemCollision();
  distributeItems();
}

function resetGame() { // @TODO: WIP full game reset, not connected to anything for now
	levelNow = falldaleZone;
  startQuestOne();
	loadLevel();
}

function damageDraw() {
  var sx = 0;
  var sy = 0;
  damageUIVisibilityCountdown--;

  if (damageUIVisibilityCountdown <= 0) {
    return;
  } else {
    sx = (displayDamagePoints - 1) * diceWidth;
    if (redWarrior.recentWeapon == redWarrior.myRock) {
      sy = diceHeight;
    }
  }

  if (redWarrior.recentWeapon.toHitPoints > 0) {
    colorText("Attack", canvas.width - 230, canvas.height - 32, "Black");
    colorText("Roll", canvas.width - 230, canvas.height - 12, "Black");
    canvasContext.drawImage(twentySidedDicePic, canvas.width - 170, canvas.height - 40, 30, 30);
    colorText(redWarrior.recentWeapon.toHitPoints, canvas.width - 162, canvas.height - 20, "Black");

    if (redWarrior.recentWeapon.toHitPoints > 10) { /////////  eventually would like to incorporate armor and weapon to determine if a hit is done.... for now, greater than 10. //////
      colorText("Damage", canvas.width - 120, canvas.height - 32, "Black");
      colorText("Roll", canvas.width - 120, canvas.height - 12, "Black");
      canvasContext.drawImage(dicePic, sx, sy, diceWidth, diceHeight, canvas.width - 50, canvas.height - 40, 30, 30);
    }
  }
}

function inventoryDraw() {
  
  //Old Inventory
  /*
  colorRect(canvas.width - 200, canvas.height - 200, 200, 150, "black");
  colorRect(canvas.width - 195, canvas.height - 195, 190, 140, "white");
  colorText("Arrows: " + redWarrior.myArrow.quantity, canvas.width - 170, canvas.height - 180, "Black");
  colorText("Rocks: " + redWarrior.myRock.quantity, canvas.width - 170, canvas.height - 160, "Black");
  colorText("Gold Pieces: " + redWarrior.goldpieces, canvas.width - 170, canvas.height - 140, "Black");
  colorText("Yellow Keys: " + redWarrior.yellowKeysHeld, canvas.width - 170, canvas.height - 120, "Black");
  colorText("Red Keys: " + redWarrior.redKeysHeld, canvas.width - 170, canvas.height - 100, "Black");
  colorText("Blue Keys: " + redWarrior.blueKeysHeld, canvas.width - 170, canvas.height - 80, "Black");
  colorText("Green Keys: " + redWarrior.greenKeysHeld, canvas.width - 170, canvas.height - 60, "Black");
  */

  //Inventory Content
  var InventoryName   = ["Arrows", "Rocks", "Gold Pieces", "Yellow Keys", "Red Keys", "Blue Keys", "Green Keys"];
  var InventoryAmount = [redWarrior.myArrow.quantity, redWarrior.myRock.quantity, redWarrior.inventory.goldpieces, redWarrior.yellowKeysHeld, redWarrior.redKeysHeld, redWarrior.blueKeysHeld, redWarrior.greenKeysHeld];
  var InventoryImage  = [arrowPic, rockPic, goldPic, clothPic, clothPic, clothPic, clothPic];
  var InventoryIndex  = 0;
  var InventoryMaxItems = 7;

  //Variable for display
  var InventoryWidth    = 250;
  var InventoryHeight   = 250;
  var InventoryPosX     = canvas.width - 260;
  var InventoryPosY     = canvas.height - 310;
  var InventoryOffsetX  = 12;
  var InventoryOffsetY  = 12;

  var ItemStartPosX     = InventoryPosX + InventoryOffsetX;
  var ItemMaxX          = InventoryPosX + InventoryWidth;

  var ItemStartPosY     = InventoryPosY + InventoryOffsetY;
  var ItemMaxY          = InventoryPosY + InventoryHeight;
  
  var ItemWidth         = 60;
  var ItemHeight        = 60;

  var ItemGapX          = ItemWidth + InventoryOffsetX*2;
  var ItemGapY          = ItemHeight + InventoryOffsetY*2;
  
  colorRect(InventoryPosX, InventoryPosY, InventoryWidth, InventoryHeight, "black");
  
  for (var y = ItemStartPosY; y <= ItemMaxY;  y += ItemGapY) {
    for (var x = ItemStartPosX; x < ItemMaxX; x += ItemGapX) {

      if(InventoryIndex < InventoryMaxItems) {
        colorRect(x, y, ItemWidth, ItemHeight, "white");

        //Item name display
        drawTextCentered(InventoryName[InventoryIndex], x+ItemWidth/2, y+ItemHeight-3, "Black", "8px sans-serif");

        //Item amount display
        var ItemAmount = InventoryAmount[InventoryIndex];
        if(ItemAmount == null) ItemAmount = "0";
        drawTextWithShadowCentered(ItemAmount, x+ItemWidth-8, y+ItemHeight-45);
        
        //Item icon display
        ImagePosX = (x+ItemWidth/2)-(InventoryImage[InventoryIndex].width/2);
        ImagePosY = (y+ItemHeight/2)-(InventoryImage[InventoryIndex].height/2);
        canvasContext.drawImage(InventoryImage[InventoryIndex], ImagePosX, ImagePosY);
      } else {
        emptyRect(x, y, ItemWidth, ItemHeight, 4, "white");
      }
      InventoryIndex += 1;
    }
  }
}

function miniMapDraw() {
  const width = 180;
  const height = 180;
  const posX = canvas.width - width - 5;
  const posY = 60;
  drawMiniMap(posX, posY, width, height, 4);
}

function mapDraw() {
  let maxScreenLength = canvas.width < canvas.height ? canvas.width : canvas.height;
  let mapLength = maxScreenLength * 0.8;
  let mapPosX = (canvas.width - mapLength) / 2;
  let mapPosY = (canvas.height - mapLength) / 2;
  colorRect(0, 0, canvas.width, canvas.height, "rgba(0,0,0,0.7)");
  canvasContext.drawImage(falldaleMap, mapPosX, mapPosY, mapLength, mapLength); // temp map
}

function statsDraw() {
  colorRect(canvas.width - 210, canvas.height - 320, 210, 270, "black");
  colorRect(canvas.width - 205, canvas.height - 315, 200, 265, "white");
  colorText("Experience Level: " + redWarrior.stats.experienceLevel, canvas.width - 190, canvas.height - 300, "Black");
  colorText("Level Up at: " + levelExperienceArray[ redWarrior.stats.experienceLevel ],
              canvas.width - 190, canvas.height - 280, "Black");
  colorText("Armor Class: " + redWarrior.armor, canvas.width - 190, canvas.height - 260, "Black");
  colorText("Hit Point: " + redWarrior.stats.health.toFixed(1), canvas.width - 190, canvas.height - 240, "Black");
  colorText("Experience: " + redWarrior.stats.experience, canvas.width - 190, canvas.height - 220, "Black");
  colorText("Max Sword Roll: " + redWarrior.mySword.damageDice, canvas.width - 190, canvas.height - 200, "Black");
  colorText("Max Arrow Roll: " + redWarrior.myArrow.damageDice, canvas.width - 190, canvas.height - 180, "Black");
  colorText("Max Stone Roll: " + redWarrior.myRock.damageDice, canvas.width - 190, canvas.height - 160, "Black");
  colorText("STR: " + redWarrior.stats.strength + "     DEX: " + redWarrior.stats.dexterity, canvas.width - 190, canvas.height - 120, "Black");
  colorText("CON: " + redWarrior.stats.constitution + "     INT: " + redWarrior.stats.intelligence, canvas.width - 190, canvas.height - 100, "Black");
  colorText("WIS: " + redWarrior.stats.wisdom + "     CHA: " + redWarrior.stats.charisma, canvas.width - 190, canvas.height - 80, "Black");
}

function drawCredits() {
    var creditsArray = [

        "                                                                                                                                                CLICK ANYWHERE TO BEGIN THE GAME",
        "",
"Falldale is brought to you by the following members of HomeTeam GameDev:",
"Vince McKeown: Project lead (also for the original Falldale), core gameplay, cliff tiles, player animation updates, bush tiles, blacksmith shop, new goblin animations, assorted map updates, tree update, town redesign,","    Orc and Arya updates, optimizations, character creation screen graphics, music integration, garden tiles, mausoleum art, GUI buttons, skeleton animations, Rowan animations, asset cleanup, pahtfinding refinement,","    cloth and stick items, destroyable boxes, quest art, intro illustration, particles, wizard's map",
"Tylor Allison: Art (tables, bar stools, wooden walls, flagstones, bar joints, top wall updates, window, pine tree, cliffs, caves, bonfire animation, castle walls), level design (castle, east woods), Tiled integration (with Andrew),","    map data conversion, assorted bug fixes, collision system updates, new quest code features, AI zone support, orc boss AI improvements, hammer weapon, wizard area colliders, transitions, enemy placement & tuning",
"Andrew Mushel: Control improvements, Tiled integration (with Tylor), code refactoring (lock and key, item, treasure, weapon, minimap), additional rooftops",
"Allan Regush: Help screen, bartender voice, alchemy shop, stats data (incl. for enemies and quests), levelling up, healer name",
"Catherine San Luis: NE Woods and East Woods, assorted map fixes, image loading bug fix",
"Ashleigh M.: Druid addition to Old Graveyard, Old Graveyard tile improvements, Old Graveyard design, bridge, layer collision fix",
"Powerproust: Updated inventory display",
"Yong Wei: Initial character class code, minimap diagonal movement",
"John Eversole: Goblin AI update to support variable chase speeds",
"Joshua Rigley: Achievements list",
"------------Original (pre-EE) Falldale Credits------------",
"Vince McKeown: Project lead, core gameplay and initial functionality, leveling, level and quest design, many sprites (including healer, princess, villagers, goblin, NPCs, non-chief orcs, zombies, skeletons,","    druid boss, bullywug), blacksmith shop, trees, editor, pause support, mausoleums, fireballs, treasure, quest dialog writing, NPC voices, Goblinraid song, assorted sounds, princess audio",
"Christer \"McFunkypants\" Kaitila: game scaling, gamead support, shadows,rays of light, shine effect, rooftop mouse peek feature, editor improvements, bridge, cat, night mode, minimap, optimization, decoration","    tiles, footprints, water effect, side quests",
"Steve Driscoll: Archer sprite and integration, goblin club tuning, initial bite support, door functionality and audio, improved word collision test, diagonal movement support, player-monster collisions,","    assorted bug fixes",
"H Trayford: AI path finding, dialog manager, screen culling optimization, organization of weapon code (swords, rocks, arrows, clubs, biting, magic sword), zombie movement tweaks, tile, transparency support,","    additional input for character selection screen, assorted bug fixes",
"Gonzalo Delgado: Orc chief art and animations, house art (door, window,and walls), file case issue fix, missing tile error handling, shoe attack prototype, ranged weapon improvements, Firefox compatibility fix",
"Randy Tan Shaoxian: Projectile directionality, flashing effect after recent damage, skeleton spawning from disturbed graves, speed adjustments, camera improvements, assorted refactoring, enemy point collision code",
"Klaim (A. Joël Lamotte): \"Have A Nice Beer\" pub/happy song, title menu music, wizard tower music, graveyard music, character and sprite selector improvements, boundary checks, charater portrait display",
"Vismaya Menon (Quenzel201Aliza): Sprites for Player and several characters (Smally, Teeny, Weeny) including facings and animations, initial overall storyline",
"Trolzie: Minimap feature, sword UI fade after delay, image display fix, pause screen improvements",
"Jeremy Kenyon: Save and load feature, question one rewards, map edge transition, movement debug features, reset improvements",
"Andrew Mushel: Enemy spawn improvements, bat spawn and collision fixes, orc sprite randomization, state screen positioning",
"Cyriel De Neve: Health shows only after hit (players and zombies): Bugbear hurt sound and integration, opening story writing",
"Daniel Peach: In-game instructions, character roll UI improvements, prevention of ranged attacks if player is indoors",
"Terrence McDonnell: out of ammo message, health rounding, loading flicker fix, improvements to mute and dice rolling, assorted polish",
"Michelly Oliveira: Mute feature, background music initialization",
"Kumar Daryanani: Bow and arrow weapon art, including arrow and quiver items",
"Eugene Meidinger: Level up feature improvements, armor rating calculation, refactor of directional code",
"Justin Horner: Rock sounds, player freeze feature",
"Ryan Malm: New grass and road tiles, improved perspective of roof tiles",
"I-wei Chen: Retouched art for grass, house garden, and road",
"Dominick Aiudi: Character creation update, rock and arrow tile collisions",
"Charlene A.: Kenku art and animation",
"Kise: Woods background music",
"Vaan Hope Khani: Computer distance to the player from AI",
"                                                                                                                             Apply to join us at HomeTeamGameDev.com, let's make games together!"
    ];
  canvasContext.save();
  canvasContext.font = "8px Arial, Helvetica, sans-serif";
  //canvasContext.translate(stateScreenOffsetX, stateScreenOffsetY);
  canvasContext.drawImage(titlepagePic, 0, 0); // blanks out the screen
   canvasContext.globalAlpha=0.7;
  colorRect(0, 0, titlepagePic.width, titlepagePic.height, "midnightblue");
  canvasContext.globalAlpha=1.0;

  canvasContext.fillStyle = "white";
  canvasContext.textAlign = "left";
  for(var i=0;i<creditsArray.length;i++) {    
    canvasContext.fillText(creditsArray[i], 8, 12+i*13);
  }
  canvasContext.restore();

}

function depthSortedDraw() {
  let tilesOnscreen = tileList.filter(
      tile => camera.canShow(tile.x, tile.y, tile.width, tile.height)
  );

  let floorTiles = tilesOnscreen.filter(
      tile => tileIsAFloor(tile.type)
  );

  let objectsToDraw = tilesOnscreen.filter(
      tile => (!tileIsAFloor(tile.type))
  );

  let visibleEnemies = enemyList.filter(
      enemy => camera.canShow(enemy.x, enemy.y, enemy.width, enemy.height)
  );

  let visibleAnims = animateList.filter(
      anim => camera.canShow(anim.x, anim.y, anim.width, anim.height)
  );

  let flyingEnemies = visibleEnemies.filter(
      enemy => (enemy.isFlying)
  );

  let deadEnemies = visibleEnemies.filter(
      enemy => (!enemy.alive)
  );

  objectsToDraw = objectsToDraw.concat(visibleEnemies.filter(
      enemy => (!enemy.isFlying && enemy.alive)
  ));

  objectsToDraw = objectsToDraw.concat(visibleAnims);

  objectsToDraw = objectsToDraw.concat(itemList.filter(
      item => camera.canShow(item.x, item.y, item.width, item.height)
  ));

  objectsToDraw.push(redWarrior);

  objectsToDraw.sort(
      function (a, b) {
        let ao = (a.depth) ? a.depth * TILE_H : 0;
        let bo = (b.depth) ? b.depth * TILE_H : 0;
        return ((a.y + a.height + ao) - (b.y + b.height + bo));
      }
  );

  for (let i = 0; i < floorTiles.length; i++) {
    floorTiles[ i ].draw();
  }

  OverlayFX.draw(); // grass, pebbles, cracks, flowers, night mode

  for (let i = 0; i < deadEnemies.length; i++) {
    deadEnemies[ i ].draw();
  }

  for (let i = 0; i < objectsToDraw.length; i++) {
    objectsToDraw[ i ].draw();
  }

  for (let i = 0; i < flyingEnemies.length; i++) {
    flyingEnemies[ i ].draw();
  }
  drawParticles();
}

function drawQuestGUI() {

var tx = 156;
var ty1 = 22;
var ty2 = 41
var barMaxW = 256;
var barH = 16;
var barX = 28;
var barY = 28;
var barC = "rgba(0,255,0,0.2)";
var guiW = 248; // cramped intentionally to fit all 3 on screen
var guiH = 54;
var guiOffsetX = -1; // intentionally shifted left to help balance all 3 in 800 px wide

  canvasContext.drawImage(questGUIPic,4+guiOffsetX,4);
  questionProgressionFont = "25px endor_altregular"

  if (redWarrior.quest.oneActive) {
    barW = Math.floor(barMaxW*goblinsKilledInFallDale/10);
    colorRect(barX,barY,barW,barH,barC);
    drawTextCentered("Falldale Quest Progress:", tx+guiOffsetX, ty1, "#3d3126", questionProgressionFont);
    drawTextCentered(goblinsKilledInFallDale + " of 5 Goblins Killed", tx+guiOffsetX, ty2, "#3d3126", questionProgressionFont);
  }
  else if (redWarrior.quest.twoActive) {
    barW = Math.floor(barMaxW*(goblinsKilledInForest+orcsKilledInForest)/20);
    colorRect(barX,barY,barW,barH,barC);
    //drawTextCentered(goblinsKilledInForest + "  of 10 Goblins killed in the forest.", tx, ty1, "#3d3126", "14px");
    //drawTextCentered(orcsKilledInForest + " of 10 Orcs killed in the forest.", tx, ty2, "#3d3126", "14px");
    drawTextCentered("Forest Quest Progress:", tx+guiOffsetX, ty1, "#3d3126", questionProgressionFont);
    drawTextCentered(goblinsKilledInForest + "  of 10 Goblins and " +
      orcsKilledInForest + " of 10 Orcs", tx+guiOffsetX, ty2, "#3d3126", questionProgressionFont);
  }
  else if (redWarrior.quest.threeActive) {
    barW = Math.floor(barMaxW*(skeletonsKilledInGraveyardOneorTwo+zombiesKilledInGraveyardOneorTwo)/40);
    colorRect(barX,barY,barW,barH,barC);
    //drawTextCentered(skeletonsKilledInGraveyardOneorTwo + " of 20 Skeletons killed in the forest.", tx, ty1, "#3d3126", "14px");
    //drawTextCentered(zombiesKilledInGraveyardOneorTwo + " of 20 Zombies killed in the forest.", tx, ty2, "#3d3126", "14px");
    drawTextCentered("Graveyard Quest Progress:", tx+guiOffsetX, ty1, "#3d3126", questionProgressionFont);
    drawTextCentered(skeletonsKilledInGraveyardOneorTwo + "  of 20 Skeletons and " +
      zombiesKilledInGraveyardOneorTwo + " of 20 Zombies", tx+guiOffsetX, ty2, "#3d3126", questionProgressionFont);
  }
  else { // no current quest
    drawTextCentered("Current Quest:", tx+guiOffsetX, ty1, "#3d3126", "14px endor_altregular");
    drawTextCentered("Talk to the Princess", tx+guiOffsetX, ty2, "#3d3126", questionProgressionFont);
  }

  // side quests, just for fun! =)
  if (redWarrior.catsMet < 10) {
    guiOffsetX += guiW;
    canvasContext.drawImage(questGUIPic,4+guiOffsetX,4);
    barW = Math.floor(barMaxW*(redWarrior.catsMet)/10);
    colorRect(barX+guiOffsetX,barY,barW,barH,barC);
    drawTextCentered("Wilderness Quest Progress:", tx+guiOffsetX, ty1, "#3d3126", "14px");
    drawTextCentered(redWarrior.catsMet + " of 10 Cats Pet", tx+guiOffsetX, ty2, "#3d3126", "14px");
  }
  if (redWarrior.stepsTaken < 1000) {
    guiOffsetX += guiW;
    canvasContext.drawImage(questGUIPic,4+guiOffsetX,4);
    barW = Math.floor(barMaxW*(redWarrior.stepsTaken)/1000);
    colorRect(barX+guiOffsetX,barY,barW,barH,barC);
    drawTextCentered("Explorer Quest Progress:", tx+guiOffsetX, ty1, "#3d3126", "14px");
    drawTextCentered(redWarrior.stepsTaken + " of 1000 Steps Taken", tx+guiOffsetX, ty2, "#3d3126", "14px");
  }
}

/////// To do:  Change if/else statements to a gameState condition
function drawAll() {
  frameCounter++;
  if (menuScreen) {
    if(shownCreditsYet) {
        drawCredits();
    } else {
        drawMenuScreen();
    }
    if (debugSkipToGame) {
      handleMouseClick(null);
    }
  } else if (isInShop) {
    drawShop();
    dialogManager.drawDialog();
  } else if (isAtHealer) {
    drawHealerShop();
    dialogManager.drawDialog();
  } else if (isInAlchemyShop) {
    drawAlchemyShop();
    dialogManager.drawDialog();
  } else if (characterCreationScreen) {
    drawCreationScreen(strength);
    drawDice(Dice1);
    drawDice(Dice2);
    drawDice(Dice3);
    if (debugSkipToGame) {
//      characterCreationScreenInput(KEY_SPACEBAR);
//      characterCreationScreenInput(ENTER);
    }
  } else if (characterSelectionScreen) {
    drawSelectorScreen();
    if (debugSkipToGame) {
      characterSelectorScreenInput(ENTER);
    }
  } else if (scrollBackgroundScreen) {
      drawScrollNarrative();
    if (debugSkipToGame) {
      scrollBackgroundScreenInput(KEY_SPACEBAR);
    }
  } else if (tileEditor) {
    drawEditorMode();
  } else if (questOneCompletionScreenActive) {
    drawQuestOneCompletionScreen();
  } else if (questTwoCompletionScreenActive) {
    drawQuestTwoCompletionScreen();
  } else if (questThreeCompletionScreenActive) {
    drawQuestThreeCompletionScreen();
  } else if (questFourCompletionScreenActive) {
    drawQuestFourCompletionScreen();
  } else if (questFiveCompletionScreenActive) {
    drawQuestFiveCompletionScreen();
  } else if (questSixCompletionScreenActive) {
    drawQuestSixCompletionScreen();
  } else {
    colorRect(0, 0, canvas.width, canvas.height, "#008000"); // fill areas not covered by room on wide displays
    canvasContext.save();
    canvasContext.translate(-camera.x, -camera.y);

    depthSortedDraw();

    if (debugMode) {
      roofZones.draw();
      areas.draw();
    }

    if (levelNow == falldaleZone) { //7=fallDale??? elsewhere it is listed as 0 FIXME
      // this is now rendered inside depthSortedDraw right after floor tiles
      //OverlayFX.draw(); // night mode, light glows, detail decals, footsteps etc
      if (! movementInstructionsShown ) {
        instructions = true;
        movementInstructionsShown = true;
      }
    }

    drawParticles();
    canvasContext.restore();

    drawQuestGUI();

    dialogManager.drawDialog();
//        messageDraw();
    damageDraw();
    //canvasContext.drawImage(minimapCanvas, canvas.width-minimapCanvas.width-20, 20);
    miniMapDraw();

    if (muteInputCycle >= 1) {
      canvasContext.drawImage(muteMusicPic, 6, 57);
    }
    if (muteInputCycle >= 2) {
      canvasContext.drawImage(muteSFXPic, 6 + muteSFXPic.width+5, 57);
    }
    if (inventoryScreen) {
      inventoryDraw();
    }
    if (statsScreen) {
      statsDraw();
    }
    if (mapShow) {
      mapDraw();
    }
    if (gamePaused) {
      colorRect(0, 0, canvas.width, canvas.height, "rgba(0,0,0,0.8");
      colorRect(canvas.width / 2 - 150, canvas.height / 2 - 75, 300, 4, "rgba(255,255,255,0.7)");
      colorRect(canvas.width / 2 - 150, canvas.height / 2 + 50, 300, 4, "rgba(255,255,255,0.7 )");
      drawTextWithShadowCentered("Game Paused", canvas.width / 2, canvas.height / 2 - 20, "white", "20px endorregular");
      drawTextWithShadowCentered("Press 'P' to resume", canvas.width / 2, canvas.height / 2 + 15, "white", "12px endorregular");
    }
    if(instructions) {
      const seconds = 6;
      const interval = seconds * 1000;
      drawInstructionPrompt("Press UP DOWN RIGHT LEFT ARROWS To Move");
      setInterval( function() { instructions = false; }, interval );
    }
  }
  function drawInstructionPrompt( message ) {
    const messageX = 400;
    const messageY = 400;
    const boxOffsetX = 160;
    const boxOffsetY = 15;
    const boxWidth = 320;
    const boxHeight = 30;
    colorRect(messageX - boxOffsetX, messageY - boxOffsetY, boxWidth, boxHeight, 'white' );
    drawTextWithShadowCentered( message, messageX, messageY, 'black');
  }
}
