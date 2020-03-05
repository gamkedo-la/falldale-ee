class NPC {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.name = 'NPC'
    }

    draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x - 25, this.y - 25, 50, 50);
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText(this.name, this.x, this.y);
    }
}

class Skeleton extends NPC {
    constructor(x, y){
        super(x, y);
    }
}

class Goblin extends NPC {
    constructor(x, y){
        super(x, y);
    }
}

class Bat extends NPC {
    constructor(x, y){
        super(x, y);
    }
}

class Zombie extends NPC {
    constructor(x, y){
        super(x, y);
    }
}

class Orc extends NPC {
    constructor(x, y){
        super(x, y);
    }
}

class Archer extends NPC {
    constructor(x, y){
        super(x, y);
    }
}

class Bullywug extends NPC {
    constructor(x, y){
        super(x, y);
    }
}

class Druid extends NPC {
    constructor(x, y){
        super(x, y);
    }
}

class Wizard extends NPC {
    constructor(x, y){
        super(x, y);
    }
}

const NPC_TYPES = 	{
    "skeleton": Skeleton,
    "goblin": Goblin,
    "bat": Bat,
    "zombie": Zombie,
    "orc": Orc,
    "archer": Archer,
    "bullywug": Bullywug,
    "druid": Druid,
    "wizard": Wizard,
    }