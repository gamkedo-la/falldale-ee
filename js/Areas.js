
class Areas {
    constructor() {
        this.areas = {}
    }

    add(area) {
        this.areas[area.name] = area;
    }

    get(name) {
        return this.areas[name];
    }

    update() {
        for (var area of Object.values(this.areas)) {
            area.update();
        }
    }

    draw() {
        for (var area of Object.values(this.areas)) {
            area.draw();
        }
    }

    reset() {
        this.areas = {};
    }

}

class Area {
    constructor(name, x, y, width, height) {
        this.name = name;
        this.bounds = new Bounds(x,y,width,height)
        console.log("creating area: " + this);
        this.active = false;
    }

    update() {
        // track player position
        if (redWarrior.collider.hit(this.bounds)) {
            if (!this.active) {
                console.log("warrior entered area: " + this);
                this.active = true;
                if (!redWarrior.areas.includes(this.name)) {
                    redWarrior.areas.push(this.name);
                }
            }
        } else if (this.active) {
            console.log("warrior left area: " + this);
            this.active = false;
            let idx = redWarrior.areas.indexOf(this.name);
            if (idx >= 0) redWarrior.areas.splice(idx, 1);
        }
    }

    contains(pos) {
        return this.bounds.contains(pos);
    }

    hasIndex(idx) {
        let x = idx % ROOM_COLS * TILE_W;
        let y = Math.floor(idx / ROOM_COLS) * TILE_H;
        return this.contains({x:x, y:y});
    }

    draw() {
        this.bounds.draw(canvasContext);
    }

    toString() {
        return "[Area:" + this.name + "]";
    }

}