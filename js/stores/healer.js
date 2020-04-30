function drawHealerShop() {
  canvasContext.save();
  canvasContext.translate(stateScreenOffsetX, stateScreenOffsetY);
  canvasContext.drawImage(healerStorePic, 0, 0); // replace with healer background
  colorText("Please make a donation to our mission.", 25, 50, "white");
  colorText("Suggested Donations.", 25, 65, "white");
  colorText("1.) Restore 1 Hit Point - 			10 gp", 50, 100, "white");
  colorText("2.) Restore 5 Hit Points - 	 		40 gp", 50, 120, "white");
  colorText("3.) Healing Potion (cures 5 HP) -	50 gp", 50, 140, "white");
  colorText("4.) 'Nothing at this time'", 50, 160, "white");
  canvasContext.restore();
}

function healerInput(whichKeyCode) {
  var shopKeeperFeedback = null;

  switch (whichKeyCode) {
    case NUM_1:
      if (redWarrior.inventory.goldpieces >= 10) {
        if (redWarrior.stats.health <= redWarrior.stats.maxHealth - 1) {
          redWarrior.inventory.goldpieces = redWarrior.inventory.goldpieces - 10;
          redWarrior.stats.health = redWarrior.stats.health + 1;
          shopKeeperFeedback = "Henry:  Thank you for your donation.  Please come again.";
        } else {
          shopKeeperFeedback = "Henry:  I can not heal you any more.";
        }
      } else {
        shopKeeperFeedback = "Henry:  You don't have enough gold pieces";
      }
      break;
    case NUM_2:
      if (redWarrior.inventory.goldpieces >= 40) {
        if (redWarrior.stats.health <= redWarrior.stats.maxHealth - 5) {
          redWarrior.inventory.goldpieces = redWarrior.inventory.goldpieces - 40;
          redWarrior.stats.health = redWarrior.stats.health + 5;
          shopKeeperFeedback = "Henry:  Thank you for your generous donation.  Please come again.";
        } else {
          shopKeeperFeedback = "Henry:  I can not heal you that much.";
        }
      } else {
        shopKeeperFeedback = "Henry:  You don't have enough gold pieces";
      }
      break;
    case NUM_3:
      if (redWarrior.inventory.goldpieces >= 50) {
        redWarrior.inventory.goldpieces = redWarrior.inventory.goldpieces - 50;
        redWarrior.inventory.healingPotion++;
        shopKeeperFeedback = "Henry:  Thank you for your very generous donation.  Enjoy your healing potion when it's needed.";
      } else {
        shopKeeperFeedback = "Henry:  You don't have enough gold pieces";
      }
      break;
    case NUM_4:
      shopKeeperFeedback = "Henry:  Thanks for stopping by.  Please come again.";
      break;
    default:
      shopKeeperFeedback = "Henry:  Please come again.";
      break;
  }
  console.log("healer interraction done");
  isAtHealer = false;
  lastShopScreenTime = new Date().getTime();
  dialogManager.setDialogWithCountdown(shopKeeperFeedback, 3);
}