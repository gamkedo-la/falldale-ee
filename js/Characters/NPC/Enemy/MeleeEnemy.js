class MeleeEnemy extends Enemy {
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

  attack() {

  }

  draw() {
    super.draw();
    this.arrow.draw();
  }
}
