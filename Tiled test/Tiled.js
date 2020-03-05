let canvas, ctx, tileBuffer;
let tileSheets = {};
let objects = [];

window.onload = function() {
	initCanvas()
	let tm = Object.getOwnPropertyNames(TileMaps)
	for (let m of tm) {
		let map = TileMaps[m];
		loadTiledMap(map);
	}
	ctx.translate(0, -300);
	setTimeout(drawTiledMap, 500, TileMaps[tm[0]]);
}

function initCanvas() {
	canvas = document.getElementById("gameCanvas");
	ctx = canvas.getContext("2d");

	tileBuffer = document.createElement('canvas');
	tileBuffer.ctx = tileBuffer.getContext('2d');
	tileBuffer.width = 50;
	tileBuffer.height = 50;
}

function loadTiledMap(map) {
	loadTileSets(map.tilesets);
	for (let layer of map.layers) {
		if (layer.type === "objectgroup") loadObjects(layer);
	}
}

function drawTiledMap(map) {
	for (let layer of map.layers) {
		if (layer.type === "tilelayer") drawTileLayer(layer);
	}
	for (let o of objects) {
		o.draw();
	}
}

function drawTileLayer(layer) {
	let ts = Object.getOwnPropertyNames(tileSheets)
	for (let y = 0; y < layer.height; y++) {
		for (let x = 0; x < layer.width; x++) {

			let tile = layer.data[y * layer.width + x];
			
			if (tile === 0) continue;

			let sheet = "";
			for (let s of ts) {
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
	let width = sheet.tileWidth;
	let height = sheet.tileHeight;
	let tX = index % (sheet.width/width);
	let tY = (index - tX) / (sheet.width/width);

	tileBuffer.ctx.drawImage(sheet, tX * width, tY * height, width, height, 0, 0, width, height);
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
		let newItem = new ITEM_TYPES[item.type](item.x, item.y);
		newItem.name = item.type;
		objects.push(newItem);
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