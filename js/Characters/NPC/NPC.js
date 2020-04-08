class NPC extends Character {
  constructor(builder) {
    super(builder);

    // default variables
    this.npcMove = true;

    // builder variables
    this.timeBetweenChangeDir = builder.timeBetweenChangeDir;

  }

  reset(resetX, resetY) {
    this.pather = new Pathfinder3();
    this.x = resetX;
    this.y = resetY;
    this.health = this.maxHealth;
  }

}
