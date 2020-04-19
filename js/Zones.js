// =========================================================================
const zoneFiles = [
	"maps/castle.json",
	"maps/wizard.json",
    "maps/eastNorthWoods.json",
	"maps/upperForest.json",
	"maps/middleWoods.json",
	"maps/eastMiddleWoods.json",
	"maps/forest.json",
	"maps/falldale2.json",
	"maps/eastWoods.json",
	"maps/druidsGroove.json",
	"maps/graveyard.json",
	"maps/oldGraveYard.json",
]
const startingZone = "falldale2";

// =========================================================================
class Zones {
    constructor() {
        this.zoneMap = {};
        this.startingZone = {};
        this.currentZone = {};
    }

    Load(doneCb) {
        var loadCount = 0;
        zoneFiles.forEach( (path) => {
			// parse name
			let name = path.replace(/^.*[\\\/]/, '');
			name = name.substring(0, name.lastIndexOf('.'));
            // read json file contents
            let xhr = new XMLHttpRequest();
            xhr.onload = () => {
                var zone = JSON.parse(xhr.responseText);
                //var zone = Zone.fromObj(zoneObj);
                // assign zone map
                this.zoneMap[name] = zone;
                // assign starting zone
                if (name == startingZone) this.startingZone = zone;
                // check for completion
                if (++loadCount >= zoneFiles.length) doneCb();
            };
            xhr.open("GET", path, true);
            xhr.setRequestHeader("Cache-Control", "no-store");
            xhr.send();
        });
    }

    get(name) {
        return this.zoneMap[name];
    }
}

// =========================================================================
class ZoneCollider {
    constructor(gwidth, gheight, tileSize) {
        this.gwidth = gwidth;
        this.gheight = gheight;
        this.tileSize = tileSize;
        this.grid = new Array(gwidth*gheight);
    }

    get(i, j) {
        i = clampInt(i, 0, this.gwidth);
        j = clampInt(j, 0, this.gheight);
        let index = i % this.gwidth + this.gwidth * j;
        return this.grid[index];
    }

    add(collider) {
        var i = clampInt(floorInt(collider.minX, this.tileSize), 0, this.gwidth);
        var j = clampInt(floorInt(collider.minY, this.tileSize), 0, this.gheight);
        let index = i % this.gwidth + this.gwidth * j;
        if (this.grid[index]) {
            this.grid[index].push(collider);
        } else {
            this.grid[index] = [ collider ];
        }
    }

    clearTile(tile) {
        if (tile.index >= 0 && tile.index < this.grid.length && this.grid[tile.index]) {
            for (var i=0; i<this.grid[tile.index].length; i++) {
                if (this.grid[tile.index][i] == tile.collider) {
                    this.grid[tile.index].splice(i, 1);
                }
            }
        }
    }

    // given other collider, lookup collider based on grid coordinates that overlap w/ bounds of other collider to determine hit
    hit(other) {
        var starti = clampInt(floorInt(other.minX, this.tileSize), 0, this.gwidth);
        var endi = clampInt(floorInt(other.maxX, this.tileSize), 0, this.gwidth);
        var startj = clampInt(floorInt(other.minY, this.tileSize), 0, this.gheight);
        var endj = clampInt(floorInt(other.maxY, this.tileSize), 0, this.gheight);
        var totalHit = false;
        for (var i=starti; i<=endi; i++) {
            for (var j=startj; j<=endj; j++) {
                var colliders = this.get(i,j);
                if (colliders) {
                    for (var x=0; x<colliders.length; x++) {
                        var hit = colliders[x].hit(other); 
                        if (!totalHit) {
                            totalHit = hit;
                        } else {
                            totalHit.extend(hit);
                        }
                    }
                }
            }
        }
        return totalHit;
    }

    reset() {
        this.grid = new Array(this.gwidth*this.gheight);
    }

}
