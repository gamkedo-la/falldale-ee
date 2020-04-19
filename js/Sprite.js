// =========================================================================
const spriteJson = "maps/tiles.json";
const spritePath = "images/tiles/";
const spriteDfltSize = TILE_W;

// =========================================================================
class Sprites {
    constructor() {
        this.spriteMap = {};
        this.spriteNameMap = {};
        this.spriteSize = spriteDfltSize;
    }

    Load(doneCb) {
        // read json file contents
        let xhr = new XMLHttpRequest();
        xhr.onload = () => {
            var loadCount = 0;
            var rootRef = JSON.parse(xhr.responseText);
            var records = rootRef["tiles"];
            records.forEach(record => {
				var path = record.image;
				path = spritePath + path.replace(/^.*[\\\/]/, '');
				let name = path.replace(/^.*[\\\/]/, '');
				name = name.substring(0, name.lastIndexOf('.'));
                var width = record.imagewidth || spriteDfltSize;
                var height = record.imageheight || spriteDfltSize;
                var collider = "";
                var speed = PLAYER_SPEED;
                var id = record.id + 1;
                // parse custom properties
                if (record.properties) {
                    console.log("record has properties: " + record.properties);
                    record.properties.forEach(property => {
                        if (property.name == "collider") {
                            collider = property.value;
                        }
                        if (property.name == "speed") {
                            speed = property.value;
                        }
                    });
                }
                var sprite = new Sprite(name, path, width, height, id, collider, () => {
                    if (++loadCount >= records.length) doneCb();
                });
                sprite.speed = speed;
				this.spriteMap[id] = sprite;
                this.spriteNameMap[name] = sprite;
            });
        }
        xhr.open("GET", spriteJson, true);
        xhr.setRequestHeader("Cache-Control", "no-store");
        xhr.send();
    }

    get(id) {
        return this.spriteMap[id];
    }
    getname(name) {
        return this.spriteNameMap[name];
    }

}

// =========================================================================
class Sprite {
    // CONSTRUCTOR ---------------------------------------------------------
    constructor(name, url, width, height, id, collider, onload_cb) {
		this.name = name;
        this.width = width;
        this.height = height;
        this.id = id;
        this.collider = collider;
        this.speed = PLAYER_SPEED;
        if (url) {
            this.img = new Image();
            if (onload_cb != null) this.img.onload = onload_cb;
            this.img.src = url;
        } else {
            this.img = {};
        }
    }

    toString() {
        return this.name;
    }
}

const dfltSprite = new Sprite("dflt", "", TILE_W, TILE_H, -1, "", null);