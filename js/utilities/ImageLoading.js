var titlepagePic = document.createElement("img");
var falldalePic = document.createElement("img");
var wakingUpPic = document.createElement("img");
var scrollBackgroundPic = document.createElement("img");
var questOnePic = document.createElement("img");
var storeFrontPic = document.createElement("img");
var healerStorePic = document.createElement("img");
var muteMusicPic = document.createElement("img");
var muteSFXPic = document.createElement("img");
var questGUIPic = document.createElement("img");
var characterCreationBackgroundPic = document.createElement("img");
var blueButtonPic = document.createElement("img");
var greenButtonPic = document.createElement("img");
var cloudPic = document.createElement("img");
var warriorPic = document.createElement("img");
var warriorProfilePic = document.createElement("img");
var animatedEyesPic = document.createElement("img");
var swordPic = document.createElement("img");
var clubPic = document.createElement("img");
var hammerPic = document.createElement("img");
var bitePic = document.createElement("img");
var magicSwordPic = document.createElement("img");
var rockPic = document.createElement("img");
var arrowPic = document.createElement("img");
var archerPic = document.createElement("img");
var archerPic2 = document.createElement("img");
var archerPic3 = document.createElement("img");
var deadArcherPic = document.createElement("img");
var twigPic = document.createElement("img");
var clothPic = document.createElement("img");
var bonfireSmAnim = document.createElement("img");
var bonfireLeftAnim = document.createElement("img");
var bonfireRightAnim = document.createElement("img");

//NPCs
//Monsters
var skeletonPic = document.createElement("img");
var skeletonPic2 = document.createElement("img");
var skeletonPic3 = document.createElement("img");
var deadSkeletonPic = document.createElement("img");
var zombiePic = document.createElement("img");
var zombiePic2 = document.createElement("img");
var zombiePic3 = document.createElement("img");
var deadZombiePic = document.createElement("img");
var batPic = document.createElement("img");
var deadBatPic = document.createElement("img");
var goblinPic = document.createElement("img");
var goblinPic2 = document.createElement("img");
var goblinPic3 = document.createElement("img");
var goblinPic4 = document.createElement("img");
var deadGoblinPic = document.createElement("img");
var orcPic = document.createElement("img");
var orcPic2 = document.createElement("img");
var orcPic3 = document.createElement("img");
var deadOrcPic = document.createElement("img");
var bullywugPic = document.createElement("img");
var druidPic = document.createElement("img");
var orcBossPic = document.createElement("img");
var deadOrcBossPic = document.createElement("img");
var wizardPic = document.createElement("img");
var boxPic = document.createElement("img");
var brokenBoxPic = document.createElement("img");

//Town folk
var addyPic = document.createElement("img");
var delkonPic = document.createElement("img");
var doddPic = document.createElement("img");
var fentonPic = document.createElement("img");
var gabrielPic = document.createElement("img");
var healerPic = document.createElement("img");
var princessPic = document.createElement("img");
var shopkeeperPic = document.createElement("img");
var taranPic = document.createElement("img");
var catPic = document.createElement("img");
var aryaPic = document.createElement("img");
var lawrencePic = document.createElement("img");
var rowanPic = document.createElement("img");

var dicePic = document.createElement("img");
var twentySidedDicePic = document.createElement("img");

var shadowPic = document.createElement("img");
var shinyPic = document.createElement("img");

var falldaleMap = document.createElement("img");
var mapPic = document.createElement("img");
var heartPic = document.createElement("img");
var healingPotionPic = document.createElement("img");
var goldPic = document.createElement("img");
var fireballPic = document.createElement("img");
var miniMapPlayerNorth = document.createElement("img");
var miniMapPlayerSouth = document.createElement("img");
var miniMapPlayerEast = document.createElement("img");
var miniMapPlayerWest = document.createElement("img");
var playerMiniMap = document.createElement("img");
var waterScrollImg = document.createElement("img");
var waterFallsImg = document.createElement("img");
var decorationsImg = document.createElement("img");

var worldPics = [];

var picsToLoad = 0;

function countLoadedImagesAndLaunchIfReady() {
  picsToLoad--;
  //console.log(picsToLoad);
  if (picsToLoad == 0) {
    imageLoadingDoneSoStartGame();
  }
}

function beginLoadingImage(imgVar, fileName) {
  imgVar.onload = countLoadedImagesAndLaunchIfReady;
  imgVar.src = "images/" + fileName;
  //console.log("Downloading " + imgVar.src);
}

function loadImageForWorldCode(worldCode, fileName) {
  worldPics[ worldCode ] = document.createElement("img");
  beginLoadingImage(worldPics[ worldCode ], fileName);
}

function loadImages() {

  var imageList = [
  { varName: bonfireSmAnim, theFile: "forest/bonfire_s.png" },
  { varName: bonfireLeftAnim, theFile: "forest/bonfire_l.png" },
  { varName: bonfireRightAnim, theFile: "forest/bonfire_r.png" },
    { varName: characterCreationBackgroundPic, theFile: "gameStates/characterCreation.png" },
	{ varName: cloudPic, theFile: "gameStates/cloud.png" },
	{ varName: falldalePic, theFile: "gameStates/falldale.png" },
	{ varName: questOnePic, theFile: "Quests/Quest1.png" },
    { varName: muteMusicPic, theFile: "muteMusic.png" },
	{ varName: twigPic, theFile: "twigs.png" },
	{ varName: clothPic, theFile: "cloth.png" },
    { varName: muteSFXPic, theFile: "muteSFX.png" },
    { varName: warriorPic, theFile: "warrior1.png" },
    { varName: warriorProfilePic, theFile: "warrior-portrait.png" },
    { varName: swordPic, theFile: "Weapons/basicSword.png" },
    { varName: magicSwordPic, theFile: "Weapons/magicSword.png" },
    { varName: clubPic, theFile: "Weapons/club.png" },
    { varName: hammerPic, theFile: "Weapons/hammer.png" },
    { varName: bitePic, theFile: "Weapons/bite.png" },
    { varName: skeletonPic, theFile: "Monsters/skeleton.png" },
    { varName: skeletonPic2, theFile: "Monsters/skeleton.png" },
    { varName: skeletonPic3, theFile: "Monsters/skeleton.png" },
    { varName: deadSkeletonPic, theFile: "Monsters/deadSkeleton.png" },
    { varName: deadZombiePic, theFile: "Monsters/deadZombie.png" },
    { varName: batPic, theFile: "Monsters/bat.png" },
    { varName: deadBatPic, theFile: "Monsters/deadBat.png" },
    { varName: zombiePic, theFile: "Monsters/zombie1.png" },
    { varName: zombiePic2, theFile: "Monsters/zombie2.png" },
    { varName: zombiePic3, theFile: "Monsters/zombie3.png" },
    { varName: goblinPic, theFile: "Monsters/Goblin.png" },
    { varName: goblinPic2, theFile: "Monsters/Goblin2.png" },
    { varName: goblinPic3, theFile: "Monsters/Goblin3.png" },
    { varName: goblinPic4, theFile: "Monsters/Goblin4.png" },
    { varName: orcPic, theFile: "Monsters/Orc1.png" },
    { varName: orcPic2, theFile: "Monsters/Orc2.png" }, 
    { varName: orcPic3, theFile: "Monsters/Orc3.png" },
	{ varName: deadOrcPic, theFile: "Monsters/deadOrc.png" },
    { varName: orcBossPic, theFile: "Monsters/OrcChief.png" },
	{ varName: deadOrcBossPic, theFile: "Monsters/deadGoblin.png" },  //placeholder.  Need a dead Orc Boss Pic
    { varName: druidPic, theFile: "Monsters/druid.png" },
    { varName: wizardPic, theFile: "Monsters/wizard.png" },
	{ varName: deadGoblinPic, theFile: "Monsters/deadGoblin.png" },
    { varName: bullywugPic, theFile: "Monsters/Bullywug.png" },
    { varName: archerPic, theFile: "Monsters/archer.png" },
    { varName: archerPic2, theFile: "Monsters/archer2.png" },
    { varName: archerPic3, theFile: "Monsters/archer3.png" },
    { varName: deadArcherPic, theFile: "Monsters/deadGoblin.png" },
    { varName: storeFrontPic, theFile: "storefront.jpg" },
    { varName: healerStorePic, theFile: "healerStore.jpg" },
    { varName: dicePic, theFile: "dice.png" },
    { varName: twentySidedDicePic, theFile: "20sided.png" },
    { varName: scrollBackgroundPic, theFile: "scrollBackground.png" },
    { varName: titlepagePic, theFile: "gameStates/background.png" },
    { varName: shadowPic, theFile: "shadow.png" },
    { varName: shinyPic, theFile: "shiny.png" },
    { varName: falldaleMap, theFile: "falldaleMap.png" },
    { varName: addyPic, theFile: "NPCs/Addy.png" },
    { varName: delkonPic, theFile: "NPCs/Delkon.png" },
    { varName: doddPic, theFile: "NPCs/Dodd.png" },
    { varName: fentonPic, theFile: "NPCs/Fenton.png" },
    { varName: gabrielPic, theFile: "NPCs/Gabriel.png" },
    { varName: healerPic, theFile: "NPCs/healer.png" },
    { varName: aryaPic, theFile: "NPCs/Arya.png" },
    { varName: lawrencePic, theFile: "NPCs/Lawrence.png" },
    { varName: rowanPic, theFile: "NPCs/Rowan.png" },
    { varName: princessPic, theFile: "NPCs/princess.png" },
    { varName: shopkeeperPic, theFile: "NPCs/shopkeeper.png" },
    { varName: taranPic, theFile: "NPCs/Taran.png" },
    { varName: catPic, theFile: "NPCs/cat.png" },
    { varName: goldPic, theFile: "gold.png" },
    { varName: mapPic, theFile: "map.png" },
    { varName: healingPotionPic, theFile: "healingPotion.png" },
    { varName: heartPic, theFile: "heart.png" },
    { varName: fireballPic, theFile: "Weapons/fireball.png" },
    { varName: rockPic, theFile: "Weapons/rock.png" },
    { varName: arrowPic, theFile: "Weapons/arrow.png" },
    { varName: playerMiniMap, theFile: "playerMiniMap.png" },
    { varName: waterFallsImg, theFile: "waterFalls.png" },	
    { varName: waterScrollImg, theFile: "water_scroll.png" },
    { varName: decorationsImg, theFile: "decorations.png" },
    { varName: questGUIPic, theFile: "questGUI.png" },
	{ varName: blueButtonPic, theFile: "blueButton.png" },
	{ varName: greenButtonPic, theFile: "greenButton.png" },
	{ varName: boxPic, theFile: "box.png" },
	{ varName: brokenBoxPic, theFile: "brokenBox.png" },
	{ varName: wakingUpPic, theFile: "Quests/wakingUp.png" },
	{ varName: animatedEyesPic, theFile: "gameStates/eyes_original.png" },
  ];

  picsToLoad = imageList.length;

  for (var i = 0; i < imageList.length; i++) {
    if (imageList[ i ].varName != undefined) {
      beginLoadingImage(imageList[ i ].varName, imageList[ i ].theFile);
    } else {
      loadImageForWorldCode(imageList[ i ].tileType, imageList[ i ].theFile);
    }
  }
}
