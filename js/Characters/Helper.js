const CharType = {
  PLAYER: 0,
  ENEMY: 1,
  FRIEND: 2
};

const Classes = {
  WARRIOR: 0,
  WIZARD: 1
}

const CharacterMap = {
  // Enemies
  [TILE_SKELETON]: function() { return new Skeleton(); },
  [TILE_BAT]: function() { return new Bat(); },
  [TILE_ZOMBIE]: function() { return new Zombie(); },
  [TILE_ZOMBIE2]: function() { return new Zombie1(); },
  [TILE_ZOMBIE3]: function() { return new Zombie3(); },
  [TILE_GREEN_ORC_SWORD]: function() { return new GreenOrcSword(); },
  [TILE_GREEN_ORC_CLUB]: function() { return new GreenOrcClub(); },
  [TILE_GREEN_ORC_AX]: function() { return new GreenOrcAx(); },
  [TILE_ARCHER]: function() { return new Archer(); },
  [TILE_DRUID]: function() { return new Druid(); },
  [TILE_ORCBOSS]: function() { return new OrcBoss(); },
  [TILE_BULLYWUG]: function() { return new Bullywug(); },
  [TILE_WIZARD]: function() { return new Wizard(); },

  // Friends
  [TILE_SHOPKEEPER]: function() { return new Friend(); },
  [TILE_HEALER]: function() { return new Friend(); },
  [TILE_PRINCESS]: function() { return new Friend(); },
  [TILE_DODD]: function() { return new Friend(); },
  [TILE_TARAN]: function() { return new Friend(); },
  [TILE_DELKON]: function() { return new Friend(); },
  [TILE_ADDY]: function() { return new Friend(); },
  [TILE_GABRIEL]: function() { return new Friend(); },
  [TILE_FENTON]: function() { return new Friend(); },
  [TILE_CAT]: function() { return new Friend(); },
  [TILE_ARYA]: function() { return new Friend(); },
  [TILE_LAWRENCE]: function() { return new Friend(); },
  [TILE_ROWAN]: function() { return new Friend(); }
}

// factory
class Spawn {
  static createPlayer(classID) {

  }

  static createNPC(tileIndex) {
    
  }
}


// builder
class NPCBuilder {
  constructor() {
    this.charater = null;
  }

  setType(type) {

  }
}
