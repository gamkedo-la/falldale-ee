
class RoofZones {
    constructor() {
        this.zones = []
    }

    add(zone) {
        this.zones.push(zone);
    }

    update() {
        for (var zone of this.zones) {
            zone.update();
        }
    }

    draw() {
        for (var zone of this.zones) {
            zone.draw();
        }
    }

    reset() {
        this.zones = [];
    }

    checkTileVisibility(tile) {
        var visible = true;
        for (var zone of this.zones) {
            if (zone.bounds.contains({x:tile.x, y:tile.y})) {
                visible &= zone.visible;
            }
        }
        return visible;
    }
}

class RoofZone {
    constructor(x, y, width, height) {
        this.bounds = new Bounds(x,y,width,height)
        console.log("creating roof zone: " + this.bounds);
        this.visible = true;
    }

    update() {
        // track player position
        if (redWarrior.collider.hit(this.bounds)) {
            if (this.visible) console.log("warrior entered roof zone: " + this.bounds);
            this.visible = false;
        } else if (!this.visible) {
            console.log("warrior left from under roof");
            this.visible = true;
        }
    }

    draw() {
        this.bounds.draw(canvasContext);
    }

}