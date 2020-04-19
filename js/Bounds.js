// =========================================================================
class Bounds {
    // CONSTRUCTOR ---------------------------------------------------------
    constructor(minX,minY,width,height) {
        this.minX = minX;
        this.minY = minY;
        this.width = width;
        this.height = height;
        this.maxX = minX+width;
        this.maxY = minY+height;
        this.centerX = minX+width/2;
        this.centerY = minY+height/2;
    }

    // STATIC FUNCTIONS ----------------------------------------------------
    static parse(name, pos, tileSize) {
        switch (name) {
            case "full":
                return new Bounds(pos.x, pos.y, tileSize, tileSize);
            case "leftHalf":
                return new Bounds(pos.x, pos.y, tileSize*.5, tileSize);
            case "rightHalf":
                return new Bounds(pos.x+tileSize*.5, pos.y, tileSize*.5, tileSize);
            case "topHalf":
                return new Bounds(pos.x, pos.y, tileSize, tileSize*.5);
            case "bottomHalf":
                return new Bounds(pos.x, pos.y+tileSize*.5, tileSize, tileSize*.5);
            case "leftQtr":
                return new Bounds(pos.x, pos.y, tileSize*.25, tileSize);
            case "rightQtr":
                return new Bounds(pos.x+tileSize*.75, pos.y, tileSize*.25, tileSize);
            case "topQtr":
                return new Bounds(pos.x, pos.y, tileSize, tileSize*.25);
            case "bottomQtr":
                return new Bounds(pos.x, pos.y+tileSize*.75, tileSize, tileSize*.25);
            case "middle":
                return new Bounds(pos.x+tileSize*.25, pos.y+tileSize*.25, tileSize*.75, tileSize*.75);
            case "tl":
                return new Bounds(pos.x, pos.y, tileSize*.5, tileSize*.5);
            case "tr":
                return new Bounds(pos.x+tileSize*.5, pos.y, tileSize*.5, tileSize*.5);
            case "bl":
                return new Bounds(pos.x, pos.y+tileSize*.5, tileSize*.5, tileSize*.5);
            case "br":
                return new Bounds(pos.x+tileSize*.5, pos.y+tileSize*.5, tileSize*.5, tileSize*.5);
            case "ltr":
                return new BoundsSet([
                    new Bounds(pos.x, pos.y, tileSize*.5, tileSize),
                    new Bounds(pos.x+tileSize*.5, pos.y, tileSize*.5, tileSize*.5),
                ]);
            case "lbr":
                return new BoundsSet([
                    new Bounds(pos.x, pos.y, tileSize*.5, tileSize),
                    new Bounds(pos.x+tileSize*.5, pos.y+tileSize*.5, tileSize*.5, tileSize*.5),
                ]);
            case "lbrq":
                return new BoundsSet([
                    new Bounds(pos.x, pos.y, tileSize*.25, tileSize),
                    new Bounds(pos.x, pos.y+tileSize*.75, tileSize, tileSize*.25),
                ]);
            case "rtl":
                return new BoundsSet([
                    new Bounds(pos.x+tileSize*.5, pos.y, tileSize*.5, tileSize),
                    new Bounds(pos.x, pos.y, tileSize*.5, tileSize*.5),
                ]);
            case "rbl":
                return new BoundsSet([
                    new Bounds(pos.x+tileSize*.5, pos.y, tileSize*.5, tileSize),
                    new Bounds(pos.x, pos.y+tileSize*.5, tileSize*.5, tileSize*.5),
                ]);
            case "rblq":
                return new BoundsSet([
                    new Bounds(pos.x+tileSize*.75, pos.y, tileSize*.25, tileSize),
                    new Bounds(pos.x, pos.y+tileSize*.75, tileSize, tileSize*.25),
                ]);
        }
        return false;
    }

    // INSTANCE FUNCTIONS --------------------------------------------------
    contains(pos) {
        return pos.x >= this.minX && pos.x <= this.maxX &&
               pos.y >= this.minY && pos.y <= this.maxY;
    }

    hit(other) {
        var xoverlap = (this.minX >= other.minX && this.minX <= other.maxX) ||
                       (this.maxX >= other.minX && this.maxX <= other.maxX) ||
                       (other.minX >= this.minX && other.minX <= this.maxX) ||
                       (other.maxX >= this.minX && other.maxX <= this.maxX);
        var yoverlap = (this.minY >= other.minY && this.minY <= other.maxY) ||
                       (this.maxY >= other.minY && this.maxY <= other.maxY) ||
                       (other.minY >= this.minY && other.minY <= this.maxY) ||
                       (other.maxY >= this.minY && other.maxY <= this.maxY);
        if (xoverlap && yoverlap) {
            var minX = Math.max(this.minX, other.minX);
            var maxX = Math.min(this.maxX, other.maxX) - .01;
            var minY = Math.max(this.minY, other.minY);
            var maxY = Math.min(this.maxY, other.maxY) - .01;
            return new Bounds(minX, minY, maxX-minX, maxY-minY);
        }
        return false;
    }

    extend(other) {
        if (other.minX < this.minX) this.minX = other.minX;
        if (other.maxX > this.maxX) this.maxX = other.maxX;
        if (other.minY < this.minY) this.minY = other.minY;
        if (other.maxY > this.maxY) this.maxY = other.maxY;
        this.centerX = this.minX+this.width/2;
        this.centerY = this.minY+this.height/2;
    }

    draw(ctx) {
        ctx.strokeStyle = "red";
        if (ctx) ctx.strokeRect(this.minX, this.minY, this.width, this.height);
    }

    toString() {
        return "bounds[" + this.minX + "," + this.minY + ":" + this.maxX + "," + this.maxY + "]";
    }
}

// =========================================================================
class BoundsSet {
    // CONSTRUCTOR ---------------------------------------------------------
    constructor(items) {
        this.items = items || [];
        this.minX = Number.MAX_SAFE_INTEGER;
        this.minY = Number.MAX_SAFE_INTEGER;
        for (var x=0; x<this.items.length; x++) {
            if (items[x].minX < this.minX) this.minX = items[x].minX;
            if (items[x].minY < this.minY) this.minY = items[x].minY;
        }
    }

    // PROPERTIES ----------------------------------------------------------
    get length() {
        return this.items.length;
    }
 
    // INSTANCE FUNCTIONS --------------------------------------------------
    add(bounds) {
        this.items.push(bounds);
        if (bounds.minX < this.minX) this.minX = bounds.minX;
        if (bounds.minY < this.minY) this.minY = bounds.minY;
    }

    contains(pos) {
        for (var x=0; x<this.items.length; x++) {
            if (this.items[x].contains(pos)) return true;
        }
        return false;
    }

    hit(other) {
        for (var x=0; x<this.items.length; x++) {
            var hit = this.items[x].hit(other);
            if (hit) return hit;
        }
        return false;
    }

    draw(ctx) {
        for (var x=0; x<this.items.length; x++) {
            this.items[x].draw(ctx);
        }
    }

    toString() {
        return "set[" + this.length + "]: " + this.items.toString();
    }
}