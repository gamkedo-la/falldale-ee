// Rooftops that go away when the player enters a house
// used by World.js drawRoom()

// TODO: add to level editor
var fallDaleRooftops = [ // x1,y1,x2,y2
  //rooftops for the town area

  [3, 3, 9, 6], // player's house
  [17, 19, 23, 24], // blacksmith
  [7, 36, 11, 43], // Dodd / Taran
  [27, 19, 33, 24], // Healer
  [28, 29, 34, 32], // Delkan
  [38, 13, 48, 20], // Bar
  [39, 33, 43, 37], // Addy
  [46, 30, 55, 35], // Gabriel, Princess, Fenton

];

var orcKingforestRoofTops = [
  []
];

var forestRoofTops = [
  []
];

var eastWoodsRoofTops = [
  []
];

var eastMiddleWoodsRoofTops = [
  []
];

var wizardsRoofTops = [
  []
]


//TILE_ROOF_SIDERIGHT
//TILE_ROOF_BACKRIGHT
//TILE_ROOF_FRONTRIGHT
//TILE_ROOF_BACKSIDE
//TILE_ROOF_BACKLEFT
//TILE_ROOF_LEFTSIDE
//TILE_ROOF_FRONTLEFT
//TILE_ROOF_FRONT
//TILE_ROOF_CENTER

function drawRooftops(rooftops) {
  var px = Math.round(redWarrior.x / TILE_W);
  var py = Math.round(redWarrior.y / TILE_H);

  redWarrior.isInsideAnyBuilding = false;

  for (var roofnum = 0; roofnum < rooftops.length; roofnum++) {

    var firstRow = rooftops[roofnum][1];
    var lastRow = rooftops[roofnum][3];
    var firstCol = rooftops[roofnum][0];
    var lastCol = rooftops[roofnum][2];
    var pic = TILE_ROOF_CENTER;
    var playerInsideBuilding = false;
    var mouseInsideBuilding = false;

    // only draw roof if player is not underneath it
    if (px >= firstCol && px <= lastCol && py >= firstRow && py <= lastRow) {
      playerInsideBuilding = true;
      redWarrior.isInsideAnyBuilding = true;
    }

    var mx = Math.round((mouseX + camera.x - TILE_W / 2) / TILE_W);
    var my = Math.round((mouseY + camera.y - TILE_H / 2) / TILE_H);
    if (mx >= firstCol && mx <= lastCol && my >= firstRow && my <= lastRow) {
      //  mouseInsideBuilding = true;
    }

    if (!playerInsideBuilding) {

      if (mouseInsideBuilding) canvasContext.globalAlpha = 0.85;

      for (var row = firstRow; row < lastRow + 1; row++) {
        for (var col = firstCol; col < lastCol + 1; col++) {

          pic = TILE_ROOF_CENTER;
          if (row == firstRow) {
            if (col == firstCol) pic = TILE_ROOF_BACKLEFT;
            else if (col == lastCol) pic = TILE_ROOF_BACKRIGHT;
            else pic = TILE_ROOF_BACKSIDE;
          } else if (row == lastRow) {
            if (col == firstCol) pic = TILE_ROOF_FRONTLEFT;
            else if (col == lastCol) pic = TILE_ROOF_FRONTRIGHT;
            else pic = TILE_ROOF_FRONT;
          } else { // not first or last row
            if (col == firstCol) pic = TILE_ROOF_LEFTSIDE;
            else if (col == lastCol) pic = TILE_ROOF_SIDERIGHT;
            else pic = TILE_ROOF_CENTER;
          }

          canvasContext.drawImage(worldPics[pic], col * TILE_H, row * TILE_W);
        }
      }

      canvasContext.globalAlpha = 1.0;

    }
  }
} //End of drawRooftops

class Roof {
  constructor(x, y, height, width) {
    this.x = x;
    this.y = y;
    this.index = rowColToArrayIndex(Math.floor(this.x / TILE_W), Math.floor(this.y / TILE_H));
    this.height = height;
    this.width = width;
    this.visible = true;
  }

  checkVisibility() {
    this.visible = true;
    // only draw roof if player is not underneath it
    let px = redWarrior.x;
    let py = redWarrior.y;
    if (px >= this.x && px <= this.x + this.width && py >= this.y && py <= this.y + this.height) {
      this.visible = false;
      redWarrior.isInsideAnyBuilding = true;
    }

    let mx = (mouseX + camera.x - TILE_W / 2)
    let my = (mouseY + camera.y - TILE_H / 2)
    if (mx >= this.x && mx <= this.x + this.width && my >= this.y && my <= this.y + this.height) {
      this.visible = false;
    }
  }



  draw() {
    this.checkVisibility();
    if (!this.visible) return;
    let lastRow = Math.floor(this.height / TILE_H) - 1;
    let lastCol = Math.floor(this.width / TILE_W) - 1;

    let tileX = 0;
    let tileY = 0;
    for (var row = 0; row <= lastRow; row++) {
      for (var col = 0; col <= lastCol; col++) {
        let pic = TILE_ROOF_CENTER;
        if (row == 0) {
          if (col == 0) pic = TILE_ROOF_BACKLEFT;
          else if (col == lastCol) pic = TILE_ROOF_BACKRIGHT;
          else pic = TILE_ROOF_BACKSIDE;
        } else if (row == lastRow) {
          if (col == 0) pic = TILE_ROOF_FRONTLEFT;
          else if (col == lastCol) pic = TILE_ROOF_FRONTRIGHT;
          else pic = TILE_ROOF_FRONT;
        } else { // not first or last row
          if (col == 0) pic = TILE_ROOF_LEFTSIDE;
          else if (col == lastCol) pic = TILE_ROOF_SIDERIGHT;
          else pic = TILE_ROOF_CENTER;
        }

        canvasContext.drawImage(worldPics[pic], this.x + tileX, this.y + tileY);
        tileX += TILE_W;
      }
      tileX = 0;
      tileY += TILE_H;
    }
  }
}