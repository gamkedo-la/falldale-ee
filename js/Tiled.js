
// =========================================================================
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
	//Bonfire
}

let npcParams = {
	'Taran': {height:52, width:36, frames:5},
	'Dodd': {height:52, width:36, frames:5},
	'Delkon': {height:52, width:36, frames:5},
	'Healer': {height:52, width:36, frames:5},
	'Gabriel': {height:52, width:36, frames:5},
	'Fenton': {height:52, width:36, frames:5},
	'Addy': {height:52, width:36, frames:5},
}

let objectSprites = {
	"Bat": batPic, 
	"Skeleton": skeletonPic,
	"Skeleton2": skeletonPic,
	"Skeleton3": skeletonPic,
	"Skeleton Dead" : deadSkeletonPic,
	"Zombie": zombiePic,
	"Zombie2": zombiePic2,
	"Zombie3": zombiePic3,
	'Zombie Dead' : deadZombiePic,
	'Goblin': goblinPic,
	'Goblin2': goblinPic2,
	'Goblin3': goblinPic3,
	'Goblin4': goblinPic4,
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
	'Bonfire Large' : null,
	'Bonfire Small' : null,
	'Waterfall' : waterFallsImg,
	'River' : waterScrollImg,
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
	'Bonfire Large': 8,
	'Bonfire Small': 8,
	'Waterfall' : waterFallsImg,
	'River' : waterScrollImg,
};

let levels;
let tileSheets = {};

function initTiledMaps() {
	levels = Object.getOwnPropertyNames(TileMaps);
	for (let l of levels) {
		let level = TileMaps[l];
		loadTileSets(level.tilesets);
	}
}

function loadTileSets(tileset) {
	for (let sheet of tileset) {
		if (sheet.hasOwnProperty('image')) {
			if (!tileSheets.hasOwnProperty(sheet.image)) { //Only load if not a duplicate tilesheet
				loadTileSheet(sheet);
			}
		} else if (sheet.hasOwnProperty('tiles')) {
			if (!tileSheets.hasOwnProperty(sheet.name)) { //Only load if not a duplicate tilelist
				loadTileList(sheet);
			}
		}
	}
}

function loadTileSheet(sheet) {
	let newSheet = document.createElement("img");
	newSheet.firstgid = sheet.firstgid;
	newSheet.src = sheet.image;
	newSheet.tileHeight = sheet.tileheight;
	newSheet.tileWidth = sheet.tilewidth;
	tileSheets[sheet.image] = newSheet;
}

function loadTileList(sheet) {
	let newSheet = {}
	newSheet.firstgid = sheet.firstgid;
	newSheet.tileHeight = sheet.tileheight;
	newSheet.tileWidth = sheet.tilewidth;
	newSheet.tileList = [];
	for (let t = 0; t < sheet.tiles.length; t++) {
		let tile = sheet.tiles[t];
		let tileImage = document.createElement("img");
		tileImage.src = tile.image;
		newSheet.tileList[tile.id] = tileImage;
	}
	tileSheets[sheet.name] = newSheet;
}


function getTile(tileID) {
	let ts = Object.getOwnPropertyNames(tileSheets)
	let sheet;
	for (let s of ts) {
		if (tileID >= tileSheets[s].firstgid) {
			sheet = tileSheets[s];
		}
	}
	if (sheet.hasOwnProperty("tileList")) {
		return sheet.tileList[tileID - sheet.firstgid];
	}

	let index = tileID - sheet.firstgid;
	let width = sheet.tileWidth;
	let height = sheet.tileHeight;
	let tX = index % (sheet.width/width);
	let tY = (index - tX) / (sheet.width/width);
	let tileBuffer = document.createElement('canvas');
	tileBuffer.ctx = tileBuffer.getContext('2d');

	tileBuffer.ctx.drawImage(sheet, tX * width, tY * height, width, height, 0, 0, width, height);
	return tileBuffer;
}

function loadTiledMap(map) {
	enemyList.length = 0;
	tileList.length = 0;
	let depth = 0;
	for (let layer of map.layers) {
		console.log("layer: " + layer.name + " type: " + layer.type);
		if (layer.type === "tilelayer") {
			createTileObjects(layer, depth);
			if (layer.name === 'Midground') {
				roomGrid = layer.data.slice();
			}
		}
		if (layer.type === "objectgroup") loadObjects(layer, depth);
		depth++;
	}
	console.log("tileList.length: " + tileList.length);
}

function createTileObjects(layer, depth) {
	let type;
	console.log("loading layer: " + layer.name);
	//Values used for depth sorted draw
	if (layer.name === 'Background' || layer.name === 'BG Overlay' || layer.name === 'Background Overlay') type = 0;
	else type = 50;

	let arrayIndex = 0;
	let dfltCollider = "none";
	if (layer.name == 'Midground') dfltCollider = "full";
	for (let row = 0; row < layer.height; row++) {
		for (let col = 0; col < layer.width; col++) {
			if (layer.data[arrayIndex] > 0) {
				let newTile = new TiledObject(layer.name, arrayIndex, type, layer.data[arrayIndex], depth);
				if (newTile.collider) {
					zoneCollider.add(newTile.collider);
				}
				// if tile is part of a roof layer, set checkRoofZone which will force tile to look for roof zone when drawing
				if (layer.name == "Roof" || layer.name == "RoofOverlay") {
					newTile.checkRoofZone = true;
				}
				tileList.push(newTile);
			}
			arrayIndex++;
		}
	}
}

function loadObjects(objectgroup, depth) {
	let objects = objectgroup.objects;
	console.log("loading objects for layer: " + objectgroup.name);
	for (let object of objects) {
		if (object.type === 'Rooftop') {
			let newRoof = new Rooftop(object.x, object.y, object.height, object.width, depth);
			newRoof.type = 50;
			tileList.push(newRoof);
		} else if (object.type == 'RoofZone') {
			let roofZone = new RoofZone(object.x, object.y, object.width, object.height);
			roofZones.add(roofZone);
		} else if (object.type == 'Area') {
			let name = object.name;
			let area = new Area(name, object.x, object.y, object.width, object.height);
			areas.add(area);
		} else if (objectDefinitions[object.type]) {
			let newObject = loadCharacter(object.type);
			newObject.x = object.x;
			newObject.y = object.y;
			enemyList.push(newObject)
		} 
	}
}

function loadCharacter(type) {
	let sprite = objectSprites[type];
	let frames = spriteFrames[type];
	let character = new objectDefinitions[type](type, sprite, frames);
	character.initialize(type, sprite, frames);
	let params = npcParams[type];
	if (params) {
		character.width = params.width;
		character.height = params.height;
		character.numberOfFrames = params.frames;
	}

	return character;
}

function spawnCharacter(pos, type) {
	let newObject = loadCharacter(type);
	newObject.setPos(pos.x,pos.y);
	enemyList.push(newObject)
	return newObject;
}

function getLayer(name) {
	if (currentLevel) {
		for (var layer of currentLevel.layers) {
			if (layer.name == name) {
				return layer;
			}
		}
	}
	return {}
}

function getFloorSprite(x, y) {
	var layer = getLayer("Background");
	if (layer) {
		let i = clampInt(floorInt(x, TILE_H), 0, ROOM_COLS);
		let j = clampInt(floorInt(y, TILE_W), 0, ROOM_ROWS);
		let index = i % ROOM_COLS + ROOM_COLS * j;
		let id = layer.data[index];
		let sprite = sprites.get(id);
		if (!sprite) return dfltSprite;
		return sprite;
	}
	return dfltSprite;
}

function getFloorSpriteIndex(idx) {
	var layer = getLayer("Background");
	if (layer) {
		let id = layer.data[idx];
		let sprite = sprites.get(id);
		if (!sprite) return dfltSprite;
		return sprite;
	}
	return dfltSprite;
}

function getMidSprite(x, y) {
	var layer = getLayer("Midground");
	if (layer) {
		let i = clampInt(floorInt(x, TILE_H), 0, ROOM_COLS);
		let j = clampInt(floorInt(y, TILE_W), 0, ROOM_ROWS);
		let index = i % ROOM_COLS + ROOM_COLS * j;
		let id = layer.data[index];
		return sprites.get(id);
	}
	return dfltSprite;
}

function getMidSpriteIndex(idx) {
	var layer = getLayer("Midground");
	if (layer) {
		let id = layer.data[idx];
		return sprites.get(id);
	}
	return dfltSprite;
}

function getHitIndices(hit) {
	var indices = [];
	if (hit) {
		// minX, minY
		let i = clampInt(floorInt(hit.minX, TILE_H), 0, ROOM_COLS);
		let j = clampInt(floorInt(hit.minY, TILE_W), 0, ROOM_ROWS);
		let index = i % ROOM_COLS + ROOM_COLS * j;
		indices.push(index);
		// minX, maxY
		i = clampInt(floorInt(hit.minX, TILE_H), 0, ROOM_COLS);
		j = clampInt(floorInt(hit.maxY, TILE_W), 0, ROOM_ROWS);
		index = i % ROOM_COLS + ROOM_COLS * j;
		if (!indices.includes(index)) indices.push(index);
		// maxX, minY
		i = clampInt(floorInt(hit.maxX, TILE_H), 0, ROOM_COLS);
		j = clampInt(floorInt(hit.minY, TILE_W), 0, ROOM_ROWS);
		index = i % ROOM_COLS + ROOM_COLS * j;
		if (!indices.includes(index)) indices.push(index);
		// maxX, maxY
		i = clampInt(floorInt(hit.maxX, TILE_H), 0, ROOM_COLS);
		j = clampInt(floorInt(hit.maxY, TILE_W), 0, ROOM_ROWS);
		index = i % ROOM_COLS + ROOM_COLS * j;
		if (!indices.includes(index)) indices.push(index);
	}
	return indices;
}

function setMidTileSpriteIdx(index, sprite) {
	console.log("trying to set tile at index: " + index + " to sprite: " + sprite);
	if (!sprite) return;
	for (var tile of tileList) {
		//console.log("tile is: " + tile.layer + ":" + tile.index);
		if (tile.layer == "Midground" && tile.index == index) {
			// clear current tile collider
			zoneCollider.clearTile(tile);
			// set new sprite
			tile.setSprite(sprite);
			// reset room grid and layer data
			roomGrid[index] = sprite.id;
			var layer = getLayer("Midground");
			if (layer) {
				layer.data[index] = sprite.id;
			}
			// reassign zone collider
			if (tile.collider) zoneCollider.add(tile.collider);
			break;
		}
	}
}

function setMidTileSprite(x, y, sprite) {
	if (!sprite) return;
	let i = clampInt(floorInt(x, TILE_H), 0, ROOM_COLS);
	let j = clampInt(floorInt(y, TILE_W), 0, ROOM_ROWS);
	let index = i % ROOM_COLS + ROOM_COLS * j;
	setMidTileSpriteIdx(index, sprite);
}

function getTileIdx(layer, index) {
	for (var tile of tileList) {
		if (tile.layer == layer && tile.index == index) {
			return tile;
		}
	}
	return false;
}

function getMidTileIdx(index) {
	return getTileIdx("Midground", index);
}