class Character {
  constructor(builder) {
    // default variables
    this.tickCount = 0;
    this.frameIndex = 0;

    // metadata
    this.name = builder.name;
    this.pic = builder.pic;
    this.width = builder.width;
    this.height = builder.height;

    // location
    this.x = builder.x;
    this.y = builder.y;
    this.speed = builder.speed;

    // health
    this.maxHealth = builder.maxHealth;
    this.health = this.maxHealth;

    // animation
    this.ticksPerFrame = builder.ticksPerFrame;
    this.numberOfFrames = builder.numberOfFrames;
  }

  draw() {
    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;

      if (this.frameIndex < this.numberOfFrames - 1)
        this.frameIndex += 1;
      else
        this.frameIndex = 0;
    }
  }
}
