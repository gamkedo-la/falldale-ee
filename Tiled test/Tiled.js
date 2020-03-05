let canvas, ctx, tileBuffer;
let tileSheets = {};
let objects = [];

window.onload = function() {
	initCanvas()
	let tm = Object.getOwnPropertyNames(TileMaps)
	for (let l of tm) {
		let level = TileMaps[l];
		loadTileSets(level.tilesets);
	}
	ctx.translate(0, -300);
	setTimeout(drawTiledMap, 500);
}

function drawTiledMap() {
	let tm = Object.getOwnPropertyNames(TileMaps)
	for (let l of tm) {
		let level = TileMaps[l];
		for (let layer of level.layers) {
			switch(layer.type){
				case "tilelayer":
					drawTileLayer(layer);
					break;
				case "objectgroup":
					loadObjects(layer);
					break;
				default:
					break;
			}
		}
	}
	for (s of objects) {
		s.draw();
	}
}

function initCanvas() {
	canvas = document.getElementById("gameCanvas");
	ctx = canvas.getContext("2d");

	tileBuffer = document.createElement('canvas');
	tileBuffer.ctx = tileBuffer.getContext('2d');
	tileBuffer.width = 50;
	tileBuffer.height = 50;
}

function drawTileLayer(layer) {
	let ts = Object.getOwnPropertyNames(tileSheets)
	for (let y = 0; y < layer.height; y++) {
		for (let x = 0; x < layer.width; x++) {

			let tile = layer.data[y * layer.width + x];
			
			if (tile === 0) continue;

			let sheet = "";
			for (s of ts) {
				if (tile >= tileSheets[s].firstgid) {
					sheet = s;
				}
			}
			let tileImage = getTile(tile, tileSheets[sheet]);
			if (tileImage) ctx.drawImage(tileImage, x * 50, y * 50);
		}
	}
}

function getTile(tileID, sheet) {
	if (sheet.hasOwnProperty("tileList")) {
		return sheet.tileList[tileID - sheet.firstgid - 1];
	}
	let index = tileID - sheet.firstgid;
	let width = sheet.width/50;
	let height = sheet.height/50;
	let tX = index % 10;
	let tY = (index - tX) / 10;

	tileBuffer.ctx.drawImage(sheet, tX * 50, tY * 50, 50, 50, 0, 0, 50, 50);
	return tileBuffer;
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
	let tileSheet = document.createElement("img");
	//sheet.firstgid is the starting index for the tile sheet
	//sheet.firstgid + tile index = index used in map layer
	tileSheet.firstgid = sheet.firstgid;
	tileSheet.src = sheet.image;
	tileSheets[sheet.image] = tileSheet;
}

function loadTileList(sheet) {
	let newSheet = {}
	newSheet.firstgid = sheet.firstgid;
	newSheet.tileList = [];
	for (let t = 0; t < sheet.tiles.length; t++) {
		let tile = sheet.tiles[t];
		let tileImage = document.createElement("img");
		tileImage.src = tile.image;
		newSheet.tileList.push(tileImage);
	}
	tileSheets[sheet.name] = newSheet;
}

function loadObjects(objectgroup) {
	switch(objectgroup.name) {
		case "Items":
			spawnItems(objectgroup);
			break;
		case "NPCs":
			spawnNPCs(objectgroup);
			break;
		default:
			break;
	}
}

function spawnItems(objectgroup) {
	let items = objectgroup.objects;
	for (item of items) {
		console.log(item.type);
	}
}

function spawnNPCs(objectgroup) {
	let npcs = objectgroup.objects;
	for (character of npcs) {
		let newNPC = new NPC_TYPES[character.type](character.x, character.y);
		newNPC.name = character.type;
		objects.push(newNPC);
	}
}