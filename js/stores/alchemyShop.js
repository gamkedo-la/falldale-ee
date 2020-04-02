var welcomeSpeech = false;

function drawAlchemyShop() {
  canvasContext.save();
  canvasContext.translate(stateScreenOffsetX, stateScreenOffsetY);
  canvasContext.drawImage(storeFrontPic, 0, 0);
  colorText("Please let me know if you would craft any Items", 25, 50, "white");
  colorText("of our items in stock.", 25, 65, "white");
  colorText("1.) Torch - 1 Stick 1 Cloth ", 50, 100, "white");
  colorText("2.) 'Nothing at this time'", 50, 160, "white");
  colorRect(630, 25, 150, 40, "black");
  colorText(`Sticks: ${ redWarrior.inventory.sticks } Cloths: ${ redWarrior.inventory.cloths } `, 650, 50, "gold");
  canvasContext.restore();

  if (!welcomeSpeech) {
	  shopKeeperFeedback = "Merlin :  Hi, I'm Merlin.";
  }
  welcomeSpeech = true;
  dialogManager.setDialogWithCountdown(shopKeeperFeedback, 3);
}

function alchemyShopInput(whichKeyCode) {
  var shopKeeperFeedback = null;

  switch (whichKeyCode) {
      
    case NUM_1:
      if (redWarrior.inventory.sticks > 0 && redWarrior.inventory.cloths > 0 ) {
        --redWarrior.inventory.sticks
        --redWarrior.inventory.cloths
        ++redWarrior.inventory.torch
        shopKeeperFeedback = "Shop Keeper:  Thank you! Here is your Torch.  Please come again.";
      } else {
        shopKeeperFeedback = "Shop Keeper:  You don't have enough items";
      }
      break;
    case NUM_2:
      shopKeeperFeedback = "Shop Keeper:  Please come again.";
      break;
    default:
      shopKeeperFeedback = "Shop Keeper:  Please come again.";
      break;
  }
  isInAlchemyShop = false;
  welcomeSpeech = false;
  lastShopScreenTime = new Date().getTime();
  dialogManager.setDialogWithCountdown(shopKeeperFeedback, 3);
}