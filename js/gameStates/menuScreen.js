var cloud1X = 750;
var velWaterfallY = 2;
var velRiverY = 0.5;
var waterfallY = [165, 200, 235, 270];
var waterFallPFX = [];
var riverY = [290, 330, 370, 400, 450, 500, 550, 600]; 
var isMenuSetUp = true;

function drawMenuScreen() {
  var instructionsXPos = 550;
  var instructionsYPos = 550;
  
  canvasContext.save();
  if(isMenuSetUp){
	  warriorEyes = new eyesAnimationClass(338, 395, 0, animatedEyesPic);
	  setUpWaterFall();
	  isMenuSetUp = false;
  }
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
  drawWaterFall();
  moveWaterFall();
  addRiver();
  moveRiver();  
  var baseOfWaterFallSplashY = 290;
  for(var i = 0; i < 11; i++){
	addParticle(470 + i * 10, baseOfWaterFallSplashY, 10);
  }
  canvasContext.drawImage(falldalePic, 190, 100);

  drawParticles();

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

function setUpWaterFall(){
	var waterFallLeftX = 490; 
	var waterFallRightX = 580;
	var waterFallTopY = 165;
	var waterFallBottomY = 270;
	waterFallPFX = [];
	var waterFallAmount = 50;
	for(var i = 0; i < waterFallAmount; i++){
		waterFallPFX.push({x: randomIntFromInterval(waterFallLeftX,waterFallRightX), y:randomIntFromInterval(waterFallTopY,waterFallBottomY)})
	}
	
}

function drawWaterFall(x, y, width, height){
	
	for(var i = 0; i < waterFallPFX.length; i++){
		colorRect(waterFallPFX[i].x, waterFallPFX[i].y, 2, 15, "white");
	}	
	colorRect(470,145, 110, 20, "rgba(112,146,191,1)");
}

function moveWaterFall(){
	for(var i = 0; i < waterFallPFX.length; i++){
		waterFallPFX[i].y += velWaterfallY;
		if(waterFallPFX[i].y > 290){
			waterFallPFX[i].y = 165;
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
