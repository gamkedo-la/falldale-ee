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
            xhr.send();
        });
    }

    get(name) {
        return this.zoneMap[name];
    }
}