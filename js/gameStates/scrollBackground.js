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
  canvasContext.drawImage(scrollBackgroundPic, 0, 0);
  colorText("Falldale - Enhanced Edition!", 310, 75, "black", font = "bold 42px Georgia");

  canvasContext.restore();
}