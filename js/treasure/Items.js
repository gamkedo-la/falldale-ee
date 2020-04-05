let itemList = [];

function itemCollision() {
	for (let item of itemList) {
		if (item.x < redWarrior.centerX &&
			(item.x + item.width) > redWarrior.centerX &&
			item.y < redWarrior.centerY &&
			(item.y + item.height) > redWarrior.centerY) {
			item.readyToRemove = true;
		}
	}
}

function distributeItems() {
	for (let i = itemList.length - 1; i >= 0; i--) {
		let item = itemList[i];
		if (item.readyToRemove) {
			if (item.available) {
				item.distribute();
			}
			itemList.splice(i, 1);
		}
	}
}

function itemClass() {
	this.height = 50;
	this.width = 50;
	this.readyToRemove = false;
	this.available = true;

	this.draw = function () {
		if (!this.pic) return;
		canvasContext.drawImage(this.pic, this.x, this.y);
	}
}

clothClass.prototype = new itemClass();
function clothClass(cloth, xPosition, yPosition) {
	this.amount = cloth;
	this.x = xPosition;
	this.y = yPosition;
	this.pic = clothPic;

	this.distribute = function () {
		redWarrior.inventory.cloths += this.amount;
		this.available = false;
	}
}

goldClass.prototype = new itemClass();
function goldClass(gold, xPosition, yPosition) {
	this.amount = gold;
	this.x = xPosition;
	this.y = yPosition;
	this.pic = goldPic;

	this.distribute = function () {
		redWarrior.inventory.goldpieces += this.amount;
		this.available = false;
	}
}

healingPotionClass.prototype = new itemClass();
function healingPotionClass(healingPotion, xPosition, yPosition) {
	this.amount = healingPotion;
	this.x = xPosition;
	this.y = yPosition;
	this.pic = healingPotionPic;

	this.distribute = function () {
		redWarrior.inventory.healingPotion += this.amount;
		this.available = false;
	}
}

heartClass.prototype = new itemClass();
function heartClass(hearts, xPosition, yPosition) {
	this.amount = hearts;
	this.x = xPosition;
	this.y = yPosition;
	this.pic = heartPic;

	this.distribute = function () {
		redWarrior.stats.health += this.amount
		if (redWarrior.stats.health > redWarrior.stats.maxHealth) {
			redWarrior.stats.health = redWarrior.stats.maxHealth;
		}
		redWarrior.displayHealth = true;
		redWarrior.isTakingDamage = false;
	}
}

mapClass.prototype = new itemClass();
function mapClass(xPosition, yPosition) {
	this.x = xPosition;
	this.y = yPosition;
	this.pic = mapPic;

	this.distribute = function () {
		redWarrior.haveMap = true;
		this.available = false;
	}
}

twigClass.prototype = new itemClass();
function twigClass(twigs, xPosition, yPosition) {
	this.amount = twigs;
	this.x = xPosition;
	this.y = yPosition;
	this.pic = twigPic;

	this.distribute = function () {
		redWarrior.inventory.sticks += this.amount;
		this.available = false;
	}
}