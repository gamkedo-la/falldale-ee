function scrollBackgroundScreenClick(evt) {
  var gameKeeperFeedback = null;

  scrollBackgroundScreen = false;
}

function scrollBackgroundScreenInput(whichKeyCode) {
  var gameKeeperFeedback = null;

  switch (whichKeyCode) {

    case KEY_SPACEBAR:
    case ENTER: {
      scrollBackgroundScreen = false;
    }
      break;

    default:
      gameKeeperFeedback = "";
      break;
  }

//	dialog = gameKeeperFeedback;
  dialogManager.setDialogWithCountdown(gameKeeperFeedback, 5);
}

function drawScrollNarrative() {
  let maxWidth = canvas.width * 0.2;
  let resizeFactor = 0.9;
  canvasContext.save();
  canvasContext.translate(stateScreenOffsetX, stateScreenOffsetY);
  colorRect(0, 0, canvas.width, canvas.height, 'orange');
  var textXPos = 10;
  var textYPos = 100;
  var textYIncrements = 30
  //canvasContext.drawImage(scrollBackgroundPic, 0, 0);
  colorRect(0,0,canvas.width,canvas.height,"orange");
  //colorText("Falldale - Enhanced Edition!", textXPos, 75, "black", font = "bold 42px Georgia");
  colorText("It’s been several years since I’ve adventured outside of Falldale.  ", textXPos, textYPos, "black", font = "bold 24px Georgia");
  colorText("Things have become very dangerous outside of town.", textXPos, textYPos + textYIncrements, "black", font = "bold 24px Georgia");
  colorText("Lately, the supply chains have been attacked, ", textXPos, textYPos + (textYIncrements * 2), "black", font = "bold 24px Georgia");
  colorText("and I fear our supplies are starting to run low.", textXPos, textYPos + (textYIncrements * 3), "black", font = "bold 24px Georgia");
  colorText("As I lay in bed, I heard what sounds like dogs barking", textXPos, textYPos + (textYIncrements * 4), "black", font = "bold 24px Georgia");
  colorText("and boxes braking.  ", textXPos, textYPos + (textYIncrements * 5), "black", font = "bold 24px Georgia");
  colorText("I must leave the security of my house and see what’s going on?!", textXPos, textYPos + (textYIncrements * 6), "black", font = "bold 24px Georgia");
  

  canvasContext.restore();
}