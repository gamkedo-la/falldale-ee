//will use pathfinding if within this number
const AI_VISION_RANGE = 350;

class Enemy extends NPC {
  constructor() {
    super(builder);

    // default variables
    this.treasureAvailable = true;
    this.treasure = [ "heart", "gold", "healing potion" ];
    this.pather = new Patherfinder3();
    this.bounceX = 0;
    this.bounceY = 0;
    this.bounceTargetX = 0;
    this.bounceTargetY = 0;
    this.isBouncedBack = false;
    this.bounceSpeedFactor = 0.2;

    // builder variables
    this.deadPic = builder.deadPic;
    this.picVariants = builder.picVariants;
    this.hurtSound = builder.hurtSound;
    this.shadowXOffset = builder.shadowXOffset;
    this.shadowYOffset = builder.shadowYOffset;
    this.alive = this.health > 0;
    this.bite = new biteClass();
    this.displayHealthCountdown = this.healthCountdownSeconds * FRAMES_PER_SECOND;
  }

  reset(resetX, resetY) {
    super.reset(resetX, resetY);

    this.changeDirection();
    this.bite.reset();
    if (this.picVariants.length > 1)
      this.newRandomPic();
  }

  takeDamage(value, fromX, fromY) {
    if (!this.alive && this.treasureAvailable) {
      this.distributeTreasure();
      this.treasureAvailable = false;
    }
  }

  draw() {
    super.draw();

    if (this.alive) {
      if (this.displayHealth)
        this.drawHealth();

  }
}
