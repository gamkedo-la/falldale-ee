var cloud1X = 750;

function drawMenuScreen() {
  var instructionsXPos = 550;
  var instructionsYPos = 550;
  
  canvasContext.save();
  //canvasContext.translate(stateScreenOffsetX, stateScreenOffsetY);
  canvasContext.drawImage(titlepagePic, 0, 0); // blanks out the screen
 // colorRect(instructionsXPos - 20, 550, 250, 50, "midnightblue");
  canvasContext.fillStyle = "white";
  canvasContext.font = "45px Georgia";  
  canvasContext.fillText("Falldale", 180, 200);
  canvasContext.font = "20px Georgia";
  colorText("", instructionsXPos, 150, "white");
  colorText("", instructionsXPos, 200, "white");
  colorText("", instructionsXPos, 225, "white");
  colorText("Click anywhere to play", instructionsXPos, 530, "white");
  canvasContext.drawImage(cloudPic, cloud1X, 0);
  canvasContext.drawImage(cloudPic, cloud1X + 900, 0);
  moveCloud();
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
  
  drawParticles();
  canvasContext.restore();
}

function moveCloud(){
	cloud1X = cloud1X - 0.2;
}