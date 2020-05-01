
class Rooftop {
	constructor(x, y, height, width, depth) {
		this.x = x;
		this.y = y;
		this.index = rowColToArrayIndex(Math.floor(this.x / TILE_W), Math.floor(this.y / TILE_H));
		this.height = height;
		this.width = width;
		this.depth = depth;
		this.visible = true;
	}

	checkVisibility() {
		this.visible = true;
		// only draw roof if player is not underneath it
		let px = redWarrior.x;
		let py = redWarrior.y;
		if (px >= this.x && px <= this.x + this.width && py >= this.y && py <= this.y + this.height) {
			this.visible = false;
			//console.log("setting inside to true");
			redWarrior.isInsideAnyBuilding = true;
		} else {
			//console.log("setting inside to false");
			redWarrior.isInsideAnyBuilding = false;
		}

		let scaleFactor = canvas.clientHeight / canvas.height;
		let mx = (mouseX) / scaleFactor + camera.x;
		let my = (mouseY) / scaleFactor + camera.y;
		if (mx >= this.x && mx <= this.x + this.width && my >= this.y && my <= this.y + this.height) {
			this.visible = false;
		}
	}



	draw() {
		this.checkVisibility();
		if (!this.visible) return;
		let lastRow = Math.floor(this.height / TILE_H) - 1;
		let lastCol = Math.floor(this.width / TILE_W) - 1;

		let tileX = 0;
		let tileY = 0;
		for (var row = 0; row <= lastRow; row++) {
			for (var col = 0; col <= lastCol; col++) {
				let pic;
				if (row == 0) {
					if (col == 0) pic = sprites.spriteNameMap['roofbackleft'];
					else if (col == lastCol) pic = sprites.spriteNameMap['roofbackright'];
					else pic = sprites.spriteNameMap['roofbackside'];
				} else if (row == lastRow) {
					if (col == 0) pic = sprites.spriteNameMap['rooffrontleft'];
					else if (col == lastCol) pic = sprites.spriteNameMap['roofFrontRight'];
					else pic = sprites.spriteNameMap['rooffront'];
				} else { // not first or last row
					if (col == 0) pic = sprites.spriteNameMap['roofleftside'];
					else if (col == lastCol) pic = sprites.spriteNameMap['roofbottomright'];
					else pic = sprites.spriteNameMap['roofcenter'];
				}

				if (pic) canvasContext.drawImage(pic.img, this.x + tileX, this.y + tileY);
				tileX += TILE_W;
			}
			tileX = 0;
			tileY += TILE_H;
		}
	}
}