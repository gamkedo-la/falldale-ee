class LevelUp {
    constructor(stats) {
        this.stats = stats
        this.increasedHitPoints = 0;
    }

    levelup() {
        this.stats.experienceLevel++;
        this.increaseStatsRandomly();

        if (this.isCurrentHealthGreaterThanMaxHealth())  {
          this.fullHeal()
        }

        this.levelupDialog()
        return this.stats
    }
    
    levelupDialog() {
        dialogManager.setDialogWithCountdown(`I feel stronger!. LEVEL UP. I've gained \ 
        ${ this.increasedHitPoints }  Hit Points`);
    }

    increaseStatsRandomly() {
        this.increaseMaxHealthRandomlyUpTo(6);
        this.stats.strength = this.randomNumberUpTo(3);
        this.stats.dexterity += this.randomNumberUpTo(2);
        this.stats.constitution += this.randomNumberUpTo(1);
        this.stats.intelligence += this.randomNumberUpTo(1);
        this.stats.wisdom += this.randomNumberUpTo(1);
        this.stats.charisma += this.randomNumberUpTo(1);
    }
    
    fullHeal() {
        this.stats.health = this.stats.maxHealth;
    }
    
    isCurrentHealthGreaterThanMaxHealth() {
        return this.stats.health > this.stats.maxHealth;
    }
    
    increaseMaxHealthRandomlyUpTo(max) {
        this.increasedHitPoints = this.randomNumberUpTo(max);
        this.stats.maxHealth +=  this.increasedHitPoints;
        this.stats.health += this.increasedHitPoints;
    }
    
    randomNumberUpTo = function(max) {
        return Math.floor(Math.random() * max) + 1
    }

}