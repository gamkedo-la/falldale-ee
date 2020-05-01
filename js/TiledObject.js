const fxImgMap = {
	"waterPlaceholder": waterScrollImg,
	"waterFallPlaceholder": waterFallsImg,
};

const animImgMap = {
	"bonfire_l_PH": bonfireLeftAnim,
	"bonfire_r_PH": bonfireRightAnim,
	"bonfire_s_PH": bonfireSmAnim,
}

function TiledObject(layer, index, type, tile, depth) {
	this.layer = layer;
	this.width = TILE_W;
	this.height = TILE_H;
	this.depth = depth;
	// derive x,y from grid index based on width/height of grid
	this.x = index % ROOM_COLS * TILE_W;
	this.y = Math.floor(index / ROOM_COLS) * TILE_H;
	this.index = index;
	this.type = type;
	this.fxImage = false;
	this.collider = false;
	this.checkRoofZone = false;
	// animation variables
	this.frameOffsetX = 0;
	this.frameOffsetY = 0;
	this.frameWidth = TILE_W;
	this.frameHeight = TILE_H;
	this.frameCount = 1;
    this.ticksPerFrame = 3;
	this.animateOnGamePause = false;
	this.frameIndex = 0;
	this.tick = 0;

	this.setSprite = function(sprite) {
		var collider = "none";
		if (this.layer == "Midground") collider = "full";
		if (sprite) {
			// handle animated frames
			if (sprite.name in animImgMap) {
				this.frameCount = 8;
				this.image = animImgMap[sprite.name];
				// assumes animations are laid out in single row
				this.frameWidth = this.image.width/this.frameCount;
				this.frameHeight = this.image.height;
				console.log("fwidth: " + this.frameWidth);
				console.log("fheight: " + this.frameHeight);
			} else {
				this.image = sprite.img;
			}
			this.sprite = sprite;
			this.id = sprite.id;
			this.width = sprite.width;
			this.height = sprite.height;
			this.fxImage = fxImgMap[sprite.name];
			if (sprite.collider) collider = this.sprite.collider;
			this.collider = Bounds.parse(collider, {x: this.x, y: this.y}, TILE_W);
		}
	};

	this.setSprite( sprites.get(tile) );
	// adjust position based on height of tile
	if (this.height > TILE_H) {
		this.y -= (this.height - TILE_H);
		if (this.y < 0) this.y = 0;
	}

	//this.image = getTile(tile);

	// add special fx for tiles that need it (glows, water, etc)
	this.drawTileFX = function () {

		// scrolling water effect
		if (this.fxImage) {
			var offset = TILE_H - ((frameCounter * 0.5) % (TILE_H));
			// the water-scroll image is large enough to have two tiles worth
			canvasContext.drawImage(this.fxImage,
				0, offset, 					// src x,y
				TILE_W, TILE_H,	            // src w,h
				this.x, this.y,		        // dst x,y
				TILE_W, TILE_H);        	// dst w,h
		}

	};

	this.draw = function () {
		if (!this.image) return;
		// if tile is part of roof zone, check if roof zone is visible and if not don't draw roof tile
		if (this.checkRoofZone && !roofZones.checkTileVisibility(this)) return;
		// draw the tile
		if (this.frameCount == 1) {
			canvasContext.drawImage(this.image, this.x, this.y);
		} else {
			if (!gamePaused || this.animateOnGamePause) {
				this.tick++;
				if (this.tick > this.ticksPerFrame) {
					this.tick = 0;
					if (this.frameIndex < this.frameCount - 1) {
						this.frameIndex++;
					} else {
						this.frameIndex = 0;
					}
				}
				this.frameOffsetX = this.frameIndex * this.frameWidth;
				//console.log("tick: " + this.tick + " tpf: " + this.ticksPerFrame + " idx: " + this.frameIndex + " offsetx: " + this.frameOffsetX);
			}
			canvasContext.drawImage(this.image, this.frameOffsetX, this.frameOffsetY, this.frameWidth, this.frameHeight, this.x, this.y, this.width, this.height);
		}

		// optional sparkles, splashes, glows are drawn on top
		this.drawTileFX();

		if (this.collider && canvasContext.dbgCollider) {
			this.collider.draw(canvasContext)
		}

	};

	this.setNewType = function (newType) {
		this.type = newType;
	}
}
