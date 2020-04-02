const ROCK_LIFE = 30;
const ROCK_SPEED = 2.0;
const ROCK_DAMAGE = 1;

rockClass.prototype = new rangedWeaponClass();

function rockClass() {
	this.name = "rock";
	this.pluralName = "rocks";
	this.quantity = 5;
	this.baseLife = ROCK_LIFE;
	this.baseDamage = ROCK_DAMAGE;
	this.damageDice = 4;//4 sided die, overrides default 6
	this.damagePoints = 4;//overrides default 6
	this.color = "grey";
	this.movementAng = 0;

	this.draw = function () {
		if (this.life > 0) {
	  		canvasContext.drawImage(rockPic, this.x - 4, this.y - 4);
		}
	}
}