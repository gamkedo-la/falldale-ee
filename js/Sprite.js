// =========================================================================
const spriteJson = "maps/tiles.json";
const spritePath = "images/tiles/";
const spriteDfltSize = 50;

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
                var collider = record.collider;
                var sprite = new Sprite(name, path, width, height, record.id, collider, () => {
                    if (++loadCount >= records.length) doneCb();
                });
				this.spriteMap[record.id] = sprite;
				this.spriteNameMap[name] = sprite;
            });
        }
        xhr.open("GET", spriteJson, true);
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
        this.img = new Image();
        if (onload_cb != null) this.img.onload = onload_cb;
        this.img.src = url;
    }
}