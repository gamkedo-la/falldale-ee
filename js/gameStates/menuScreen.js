var cloud1X = 750;
var waterfallY = 165;
var velWaterfallY = 2;
var velRiverY = 0.5;
var waterfallY = [165, 200, 235, 270];
var riverY = [290, 330, 370, 400, 450, 500, 550, 600]; 
var warriorEyeNotSet = true;

function drawMenuScreen() {
  var instructionsXPos = 550;
  var instructionsYPos = 550;
  
  canvasContext.save();
  //canvasContext.translate(stateScreenOffsetX, stateScreenOffsetY);
  canvasContext.drawImage(titlepagePic, 0, 0); // blanks out the screen
 // colorRect(instructionsXPos - 20, 550, 250, 50, "midnightblue");
  canvasContext.fillStyle = "white";
  canvasContext.font = "45px Georgia";  
  canvasContext.font = "20px Georgia";
  colorText("Click anywhere to play", instructionsXPos, 530, "white");
  canvasContext.drawImage(cloudPic, cloud1X-600, 0);
  canvasContext.drawImage(cloudPic, cloud1X, 0);
  canvasContext.drawImage(cloudPic, cloud1X + 900, 0);
  moveCloud();
  addWaterFall();
  moveWaterFall();
  addRiver();
  moveRiver();  
  addParticle(470, 290, 10);
  addParticle(480, 290, 10);
  addParticle(490, 290, 10);
  addParticle(500, 290, 10);
  addParticle(510, 290, 10);
  addParticle(520, 290, 10);
  addParticle(530, 290, 10);
  addParticle(540, 290, 10);
  addParticle(550, 290, 10);
  addParticle(560, 290, 10);
  addParticle(570, 290, 10);
  addParticle(580, 290, 10);
  canvasContext.drawImage(falldalePic, 190, 100);

  drawParticles();
  if(warriorEyeNotSet){
	  warriorEyes = new eyesAnimationClass(338, 395, 0, animatedEyesPic);
	  warriorEyeNotSet = false;
  }
  warriorEyes.draw();
  canvasContext.restore();
}

function addRiver(){
	for(var i = 0; i < riverY.length; i++){
		colorRect(490, riverY[i], 70, 2, "white");
	}
}

function moveRiver(){
	for(var i = 0; i < riverY.length; i++){
		riverY[i] += velRiverY;
		if(riverY[i] > canvas.height){
			riverY[i] = 290;
		}
	}
	
}

function moveCloud(){
	cloud1X = cloud1X - 0.2;
}

function addWaterFall(x, y, width, height){
	for(var i = 0; i < waterfallY.length; i++){
		colorRect(490, waterfallY[i], 2, 15, "white");
		colorRect(500, waterfallY[i]-10, 3, 13, "white");
		colorRect(510, waterfallY[i], 3, 13, "white");
		colorRect(520, waterfallY[i]-15, 2, 15, "white");
		colorRect(530, waterfallY[i]-20, 3, 13, "white");
		colorRect(540, waterfallY[i]-10, 3, 13, "white");
		colorRect(550, waterfallY[i]-15, 2, 15, "white");
		colorRect(560, waterfallY[i]-5, 3, 13, "white");
		colorRect(570, waterfallY[i]-10, 3, 13, "white");
		colorRect(580, waterfallY[i], 3, 13, "white");
	}	
	colorRect(470,145, 110, 20, "rgba(112,146,191,1)");
}

function moveWaterFall(){
	for(var i = 0; i < waterfallY.length; i++){
		waterfallY[i] += velWaterfallY;
		if(waterfallY[i] > 290){
			waterfallY[i] = 165;
		}
	}
}

function eyesAnimationClass(xPos,yPos, startFrame, whichPic){
	this.x = xPos;
	this.y = yPos;
	this.eyesPicHeight = 20;
	this.eyesPicWidth = 60;
	this.eyesFrames = 5;
	this.animCycle = 0;
	this.animCycleAdvance = startFrame;
	this.blink = false;
	this.eyesPicture = whichPic

	this.draw = function(){
		if(this.blink == false){
			var toBlink = Math.random();
			if(toBlink < .005){
				this.blink = true;
			} else {
				this.blink = false;
			}
		}

		if(this.blink){
			this.animCycle++;
			console.log(this.animCycle);
			if(this.animCycle > 6){
				this.animCycle = 0;
				this.animCycleAdvance++
			}
			if(this.animCycleAdvance > this.eyesFrames){
				this.animCycleAdvance = 0;
				this.blink = false;
			}
		}



		canvasContext.drawImage(this.eyesPicture,
			this.animCycleAdvance * this.eyesPicWidth, 0, this.eyesPicWidth, this.eyesPicHeight,
			this.x, this.y, this.eyesPicWidth, this.eyesPicHeight);
	}
}
