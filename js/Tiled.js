let classTileNames = [];
classTileNames[TILE_SKELETON] = 'Skeleton';
classTileNames[TILE_GOBLIN] = 'Goblin';
classTileNames[TILE_BAT] = 'Bat';
classTileNames[TILE_ZOMBIE] = 'Zombie';
classTileNames[TILE_ZOMBIE2] = 'Zombie';
classTileNames[TILE_ZOMBIE3] = 'Zombie';
classTileNames[TILE_GREEN_ORC_SWORD] = 'OrcSword';
classTileNames[TILE_GREEN_ORC_CLUB] = 'OrcClub';
classTileNames[TILE_GREEN_ORC_AX] = 'OrcAxe';
classTileNames[TILE_ARCHER] = 'Archer';
classTileNames[TILE_DRUID] = 'Druid';
classTileNames[TILE_ORCBOSS] = 'Orc Boss';
classTileNames[TILE_BULLYWUG] = 'Bullywug';
classTileNames[TILE_WIZARD] = 'Wizard';
classTileNames[TILE_SHOPKEEPER] = 'Shopkeeper';
classTileNames[TILE_HEALER] = 'Healer';
classTileNames[TILE_PRINCESS] = 'Princess Pauline';
classTileNames[TILE_DODD] = 'Dodd';
classTileNames[TILE_TARAN] = 'Taran';
classTileNames[TILE_DELKON] = 'Delkon';
classTileNames[TILE_ADDY] = 'Addy';
classTileNames[TILE_GABRIEL] = 'Gabriel';
classTileNames[TILE_FENTON] = 'Fenton';
//classTileNames[TILE_CAT] = 'Fido';
classTileNames[TILE_ARYA] = 'Arya';
classTileNames[TILE_LAWRENCE] = 'Lawrence';
classTileNames[TILE_ROWAN] = 'Rowan';
classTileNames[TILE_BOX] = 'Box';

let objectDefinitions = {
	"Bat": batClass, 
	"Skeleton": skeletonClass,
	"Zombie": zombieClass,
	"Zombie2": zombieClass,
	"Zombie3": zombieClass,
	'Goblin': goblinClass,
	'OrcSword': orcClass,
	'OrcAxe': orcClass,
	'OrcClub': orcClass,
	'Box': boxClass,
	'Archer': archerClass,
	'Bullywug': bullywugClass,
	'Druid': druidClass,
	'Wizard': wizardClass,
	'Orc Boss': orcBossClass,
	'Addy': npcClass,
	'Delkon': npcClass,
	'Dodd': npcClass,
	'Fenton': npcClass,
	'Gabriel': npcClass,
	'Healer': npcClass,
	'Princess Pauline': npcClass,
	'Shopkeeper': npcClass,
	'Arya': npcClass,
	'Lawrence': npcClass,
	'Rowan': npcClass,
	'Taran': npcClass,
	'Fido': npcClass,
}

let objectSprites = {
	"Bat": batPic, 
	"Skeleton": skeletonPic,
	"Zombie": zombiePic,
	"Zombie2": zombiePic2,
	"Zombie3": zombiePic3,
	'Goblin': goblinPic,
	'OrcSword': orcPic,
	'OrcAxe': orcPic3,
	'OrcClub': orcPic2,
	'Box': boxPic,
	'Archer': archerPic3,
	'Bullywug': bullywugPic,
	'Druid': druidPic,
	'Wizard': wizardPic,
	'Orc Boss': orcBossPic,
	'Addy': addyPic,
	'Delkon': delkonPic,
	'Dodd': doddPic,
	'Fenton': fentonPic,
	'Gabriel': gabrielPic,
	'Healer': healerPic,
	'Princess Pauline': princessPic,
	'Shopkeeper': shopkeeperPic,
	'Arya': aryaPic,
	'Lawrence': lawrencePic,
	'Rowan': rowanPic,
	'Taran': taranPic,
	'Fido': catPic,
};

let spriteFrames = {
	"Bat": 4, 
	"Skeleton": 4,
	"Zombie": 4,
	"Zombie2": 6,
	"Zombie3": 4,
	'Goblin': 4,
	'OrcSword': 4,
	'OrcAxe': 4,
	'OrcClub': 4,
	'Box': 1,
	'Archer': 4,
	'Bullywug': 0,
	'Druid': 1,
	'Wizard': 1,
	'Orc Boss': 8,
	'Addy': 4,
	'Delkon': 4,
	'Dodd': 4,
	'Fenton': 4,
	'Gabriel': 4,
	'Healer': 4,
	'Princess Pauline': 4,
	'Shopkeeper': 4,
	'Arya': 4,
	'Lawrence': 4,
	'Rowan': 4,
	'Taran': 4,
	'Fido': 6,
};

function loadCharacter(type) {
	let sprite = objectSprites[type];
	let frames = spriteFrames[type];
	let character = new objectDefinitions[type](type, sprite, frames);
	character.initialize(type, sprite, frames);

	return character;
}