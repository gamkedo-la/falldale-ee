var clothList = [];

function clothReadyToRemove() {
  for (var i = 0; i < clothList.length; i++) {
    if (clothList[ i ].x < redWarrior.centerX &&
        (clothList[ i ].x + clothList[ i ].width) > redWarrior.centerX &&
        clothList[ i ].y < redWarrior.centerY &&
        (clothList[ i ].y + clothList[ i ].height) > redWarrior.centerY) {
      clothList[ i ].readyToRemove = true;
    }
  }
}

function removeCloth() {
  for (var i = clothList.length - 1; i >= 0; i--) {
    if (clothList[ i ].readyToRemove) {
      if (clothList[ i ].available) {
        var distributedCloth = redWarrior.inventory.cloths + clothList[ i ].clothValue;
        redWarrior.inventory.cloths = distributedCloth;
        clothList[ i ].available = false;
      }
      clothList.splice(i, 1);
    }
  }
}

function clothClass(cloth, xPosition, yPosition) {
  this.clothValue = cloth;
  this.x = xPosition;
  this.y = yPosition;
  this.height = 50;
  this.width = 50;
  this.available = true;

  this.draw = function () {
    canvasContext.drawImage(clothPic, this.x, this.y);
  }
}
	
	