var twigList = [];

function twigsReadyToRemove() {
  for (var i = 0; i < twigList.length; i++) {
    if (twigList[ i ].x < redWarrior.centerX &&
        (twigList[ i ].x + twigList[ i ].width) > redWarrior.centerX &&
        twigList[ i ].y < redWarrior.centerY &&
        (twigList[ i ].y + twigList[ i ].height) > redWarrior.centerY) {
      twigList[ i ].readyToRemove = true;
    }
  }
}

function removeTwigs() {
  for (var i = twigList.length - 1; i >= 0; i--) {
    if (twigList[ i ].readyToRemove) {
      if (twigList[ i ].available) {
        var distributedSticks = redWarrior.sticks + twigList[ i ].twigValue;
        redWarrior.sticks = distributedSticks;
        twigList[ i ].available = false;
      }
      twigList.splice(i, 1);
    }
  }
}

function twigClass(twigs, xPosition, yPosition) {
  this.twigValue = twigs;
  this.x = xPosition;
  this.y = yPosition;
  this.height = 50;
  this.width = 50;
  this.available = true;

  this.draw = function () {
    canvasContext.drawImage(twigPic, this.x, this.y);
  }
}
	
	