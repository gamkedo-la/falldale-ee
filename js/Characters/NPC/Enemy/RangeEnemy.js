class RangeEnemy extends Enemy {
  constructor(builder) {
    super(builder);

    // default variables
    this.arrowList = [];
    this.range = new rangedWeaponClass();

    // builder variables
    this.originalNumberOfFrames = builder.numberOfFrames;
    this.arrow = new arrowClass(builder.direction);
    this.shotlaneThickness = builder.shotlaneThickness;


  }

  checkToFire() {
    if(!redWarrior.isInsideAnyBuilding) {
      if (this.direction == "south") {
        if (this.y <= redWarrior.y) { //Archer above the player
          if ((this.x <= redWarrior.x + this.shotlaneThickness) &&
              (this.x >= redWarrior.x - this.shotlaneThickness)) {
            // console.log("I'm facing South and above the player");
            this.shotArrow();
          }
        }
      }
      if (this.direction == "north") { //Archer is below the Archer
        if (this.y >= redWarrior.y) {
          if ((this.x <= redWarrior.x + this.shotlaneThickness) &&
              (this.x >= redWarrior.x - this.shotlaneThickness)) {
            // console.log("I'm facing North and below the player");
            this.shotArrow();
          }
        }
      }
      if (this.direction == "east") { // Archer is West of the Archer
        if (this.x <= redWarrior.x) {
          if ((this.y <= redWarrior.y + this.shotlaneThickness) &&
              (this.y >= redWarrior.y - this.shotlaneThickness)) {
            // console.log("I'm facing East and West of the player");
            this.shotArrow();
          }
        }
      }
      if (this.direction == "west") { // Archer is East of the Archer
        if (this.x >= redWarrior.x) {
          if ((this.y <= redWarrior.y + this.shotlaneThickness) &&
              (this.y >= redWarrior.y - this.shotlaneThickness)) {
            // console.log("I'm facing West and East of the player");
            this.shotArrow();
          }
        }
      }
    }
  }

  shotArrow() {
    if (this.arrow.isReady()) {
      this.arrow.shootFrom(this, this.direction);
      arrowShotSound.play();
    }
  }

  attack() {

  }

  draw() {
    super.draw();
    this.arrow.draw();
  }
}
