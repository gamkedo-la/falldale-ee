// Player travels to kill the Wizard and return the Crystal to the Princess

function questSixComplete() {
  redWarrior.quest.sixComplete = true;
  dialogManager.setDialogWithCountdown("The Wizard is dead!", 8);
  //levelList[ 1 ] = wizardsLayer2;
  redWarrior.quest.sixActive = false;
  questSixCompletionScreenActive = true;
}