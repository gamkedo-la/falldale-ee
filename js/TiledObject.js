function TiledObject(index, type, tile) {
	this.width = TILE_W;
	this.height = TILE_H;
	// derive x,y from grid index based on width/height of grid
	this.x = index % ROOM_COLS * TILE_W;
	this.y = Math.floor(index / ROOM_COLS) * TILE_H;
	this.index = index;
	this.type = type;
	if (tile > 0) {
		this.sprite = sprites.get(tile-1);
		if (this.sprite) {
			this.image = this.sprite.img;
			this.width = this.sprite.width;
			this.height = this.sprite.height;
		}
	}
	// adjust position based on height of tile
	if (this.height > TILE_H) {
		this.y -= (this.height - TILE_H);
		if (this.y < 0) this.y = 0;
	}

	//this.image = getTile(tile);

	// add special fx for tiles that need it (glows, water, etc)
	this.drawTileFX = function () {

		// scrolling water effect
		if (this.type == TILE_WATER ||
			this.type == TILE_BRIDGE_UPPER ||
			this.type == TILE_BRIDGE_LOWER) {
			//console.log("we have scrolling water!");

			var offset = TILE_H - ((frameCounter * 0.5) % (TILE_H));

			// the water-scroll image is large enough to have two tiles worth

			canvasContext.drawImage(waterScrollImg,
				0, offset, 					// src x,y
				TILE_W, TILE_H,	            // src w,h
				this.x, this.y,		        // dst x,y
				TILE_W, TILE_H);        	// dst w,h
		}

		if (this.type == TILE_WATERFALLS) {

			var offset = TILE_H - ((frameCounter * 0.5) % (TILE_H));

			canvasContext.drawImage(waterFallsImg,
				0, offset, 					// src x,y
				TILE_W, TILE_H,	            // src w,h
				this.x, this.y,		        // dst x,y
				TILE_W, TILE_H);        	// dst w,h
			particleFX(this.x, this.y, 10, "white", .5, .5, 500, 5);
			particleFX(200, 300, 30, 'white');
		}

	};

	this.draw = function () {
		if (!this.image) return;
		// draw the tile
		canvasContext.drawImage(this.image, this.x, this.y);

		// optional sparkles, splashes, glows are drawn on top
		this.drawTileFX();

		// bridge needs to be drawn over top of flowing water
		if (this.type == TILE_BRIDGE_UPPER ||
			this.type == TILE_BRIDGE_LOWER) {
			canvasContext.drawImage(this.image, this.x, this.y);
		}

	};

	this.setNewType = function (newType) {
		this.type = newType;
	}
}
