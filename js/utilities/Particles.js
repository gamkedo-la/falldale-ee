const MIN_DECAY_TIME = .25;
const MAX_DECAY_TIME = 3;
const MIN_PARTICLE_SPEED = .1;
const MAX_PARTICLE_SPEED = 3;
const PARTICLE_SIZE = 5;
const DEFAULT_GRAVITY = .03;
const PARTICLES_PER_TICK = 3;
const TIME_PER_TICK = 5;

var remX = 0,
    remY = 0;
var remW = 800,
    remH = 600;

function particleClass() {
    this.x = 75;
    this.y = 75;
    this.velX = 5;
    this.velY = -7;
    this.amountOfParticles = 100;
    this.readyToRemove = false;
    this.cyclesLeft = 300;
    this.myColor;

    this.move = function() {
        this.cyclesLeft--;

        if (this.cyclesLeft < 0) {
            this.readyToRemove = true;
        }

        this.x += this.velX;
        this.y += this.velY;

    }

    this.draw = function() {
        colorCircle(this.x, this.y, (20 * this.cyclesLeft / 130.0), this.myColor);
    }
}

var smokeList = [];

function addParticle(particleX, particleY, amount) {
    var tempSmoke;

    tempParticle = new particleClass();
    tempParticle.x = particleX;
    tempParticle.y = particleY;
    tempParticle.velX = getRndInteger(-1, 1);
    tempParticle.velY = getRndInteger(-7, 1);
    tempParticle.cyclesLeft = 30 + Math.floor(Math.random() * 20);
    tempParticle.amountOfParticles = amount;

    var colorOptions = Math.random();
    if (colorOptions < 0.25) {
        tempParticle.myColor = "white";
    } else if (colorOptions >= 0.25 && colorOptions <= 0.5) {
        tempParticle.myColor = "rgba(100,149,237,.2)";
    } else if (colorOptions > 0.5 && colorOptions <= 0.6) {
        tempParticle.myColor = "rgba(100,149,237,.4)";
    } else {
        tempParticle.myColor = "rgba(100,149,237,.2)";
    }

    particleList.push(tempParticle);
}

function removeSmoke() {
    for (var i = 0; i < particleList.length; i++) {
        if (particleList[i].x > remX &&
            particleList[i].x < remX + remW &&
            particleList[i].y > remY &&
            particleList[i].y < remY + remH) {

            particleList[i].readyToRemove = true;
        }
    }
}

function moveParticles() {
    for (var i = 0; i < particleList.length; i++) {
        particleList[i].move();
    }
    for (var i = particleList.length - 1; i >= 0; i--) {
        if (particleList[i].readyToRemove) {
            particleList.splice(i, 1);
        }
    }
}

function drawParticles() {
    for (var i = 0; i < particleList.length; i++) {
        particleList[i].draw();
    }
}