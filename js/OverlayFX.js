// OverlayFX system by McFunky
// night mode, light glows, detail decals, footsteps etc

// this can draw a huge amount of decorations using a spritesheet
// too many for good perf unless we batch into a single fat bitmap
// we draw everything ONCE only, cache it, and then reuse the cached img

var decorationOverlay = document.createElement("canvas");
var decorationContext = decorationOverlay.getContext('2d');

var OverlayFX = new function () {

  var needToInit = true;

  // experimental night mode: darken world and make lights glow
  this.nightMode = false; // toggled in Input.js KEY_N
  var nightModeOverlay = document.createElement("canvas");
  var nightModeContext = nightModeOverlay.getContext('2d');

  // smooth transition from day to night
  var nightModePercent = this.nightMode ? 1 : 0;
  var nightModeTransitionSpeed = 0.01; // opacity change per frame
  var MAX_DARKNESS = 0.66; // maximum night mode opacity

  // flowers, pebbles, grass tufts, cracks, etc
  this.drawDecorations = true;

  // simplistic level editor: in debug mode, click all over the place
  // and look at the console log for a full list to copy n paste below
  this.editorClicks = "";

  // must be in the same order as the decorations.png spritesheet
  // to generate, play game in debug mode [1] and click all over
  // then copy n paste the console log array as desired
  this.deco = [
    // 0 small grass
    [ [ 10, 200 ], [ 20, 300 ],[ 654, 305 ], [ 533, 356 ] ],
    // 1 big grass
    [ [ 300, 254 ], [ 300, 252 ], [ 300, 253 ], [ 254, 342 ], [ 263, 349 ], [ 493, 204 ], [ 486, 209 ], [ 496, 222 ], [ 258, 501 ], [ 270, 496 ], [ 278, 509 ], [ 273, 599 ], [ 283, 605 ], [ 292, 764 ], [ 320, 731 ], [ 399, 799 ], [ 410, 808 ], [ 430, 798 ], [ 847, 52 ], [ 862, 60 ], [ 713, 355 ], [ 748, 330 ], [ 366, 289 ], [ 410, 345 ], [ 418, 350 ], [ 183, 337 ], [ 180, 308 ], [ 383, 157 ], [ 410, 152 ], [ 404, 165 ], [ 320, 699 ], [ 695, 807 ], [ 707, 810 ], [ 702, 826 ], [ 781, 799 ], [ 788, 805 ], [ 297, 998 ], [ 290, 1019 ], [ 194, 1297 ], [ 200, 1280 ], [ 257, 1346 ], [ 264, 1352 ], [ 166, 1352 ], [ 200, 1248 ], [ 300, 1249 ], [ 200, 1236 ], [ 400, 1002 ], [ 400, 988 ], [ 400, 822 ], [ 500, 851 ], [ 600, 825 ], [ 178, 784 ], [ 160, 523 ], [ 156, 542 ], [ 789, 500 ], [ 817, 450 ], [ 832, 444 ], [ 943, 503 ], [ 933, 498 ], [ 1014, 448 ], [ 1022, 439 ], [ 845, 702 ], [ 859, 772 ], [ 773, 1202 ], [ 785, 1196 ], [ 794, 1202 ], [ 812, 1199 ], [ 621, 1200 ], [ 637, 1196 ], [ 551, 1200 ], [ 368, 1250 ], [ 385, 1253 ], [ 293, 1298 ], [ 249, 1299 ], [ 135, 1507 ], [ 261, 1600 ], [ 272, 1594 ], [ 891, 1550 ], [ 594, 1550 ], [ 609, 1545 ], [ 389, 1548 ], [ 412, 1547 ], [ 931, 1544 ], [ 918, 1540 ], [ 1064, 1449 ], [ 1072, 1451 ], [ 919, 1176 ], [ 924, 1195 ], [ 1004, 1005 ] ],
    // 2 cracks
    [ [ 329, 874 ], [ 219, 958 ], [ 737, 1574 ], [ 168, 1652 ], [ 184, 1691 ], [ 218, 418 ], [ 524, 247 ], [ 988, 473 ], [ 934, 1575 ], [ 1128, 1584 ], [ 336, 1225 ], [ 239, 503 ], [ 545, 890 ], [ 729, 868 ], [ 346, 1575 ], [ 1088, 1564 ], [ 340, 342 ] ],
    // 3 pebble
    [ [ 369, 508 ], [ 272, 547 ], [ 183, 1004 ], [ 835, 1240 ], [ 845, 1247 ], [ 186, 255 ] ],
    // 4 pebbles vert
    [ [ 199, 436 ], [ 202, 455 ], [ 203, 852 ], [ 200, 973 ], [ 751, 939 ]
      // extras around the river
      , [ 954, 673 ], [ 996, 874 ], [ 972, 1292 ], [ 977, 1308 ], [ 959, 1491 ], [ 986, 1649 ], [ 970, 52 ], [ 995, 264 ], [ 954, 359 ], [ 977, 522 ], [ 983, 504 ]],
    // 5 pebbles horiz
    [ [ 285, 447 ], [ 333, 446 ], [ 1160, 1550 ] ],
    // 6 white flower
    [ [ 530, 829 ], [ 284, 839 ], [ 579, 418 ], [ 652, 434 ], [ 595, 235 ], [ 830, 1216 ], [ 856, 1251 ], [ 355, 1369 ], [ 291, 1666 ], [ 400, 1676 ], [ 33, 1481 ], [ 148, 927 ], [ 1066, 291 ], [ 1035, 748 ], [ 1080, 730 ], [ 1069, 772 ], [ 1179, 1611 ], [ 604, 247 ] ],
    // 7 red flowers
    [ [ 517, 430 ], [ 745, 348 ], [ 131, 768 ], [ 366, 1395 ], [ 857, 1669 ], [ 1038, 1634 ], [ 1089, 1671 ], [ 1151, 1379 ] ],
    // 8 tufts of grass on the riverbank
    [ [ 950, 187 ], [ 949, 212 ], [ 949, 436 ], [ 1003, 1046 ], [ 1003, 1241 ], [ 1001, 1256 ], [ 1002, 1468 ], [ 1002, 1451 ], [ 1001, 1530 ], [ 948, 1618 ], [ 955, 1628 ], [ 951, 1639 ], [ 948, 1655 ], [ 948, 1684 ], [ 951, 1757 ] ],
    // 9 grass tuft facing other way
    [],
    // 10 horizontal footprint
    [],
    // 11 vertical footprint
    []
  ];
  // size of decoration tiles
  var decoW = 25;
  var decoH = 25;
  // draw offset so they are centered
  var ofsX = -Math.round(decoW / 2);
  var ofsY = -Math.round(decoH / 2);

  this.currentEditingDecoration = 8; // which sprite number are we painting?

  // to add more decals at runtime:
  this.add = function (x, y, decorationNumber) {
    decorationContext.drawImage(decorationsImg,
        decorationNumber * decoW, 0, // src x,y
        decoW, decoH, // src w,h
        x, y, // dst x,y
        decoW, decoH); // dst w,h);
  };

  // for using any image (as opposed to the internal spritesheet)
  this.addDecal = function (img, x, y) { // can be any image
    decorationContext.drawImage(img, x, y);
  };

  // used by the debug mode click level editor
  this.addDecoration = function (x, y) {
    // console.log('new overlayFX decoration at ' + x + ',' + y);
    decorationContext.drawImage(decorationsImg,
        this.currentEditingDecoration * decoW, 0, // src x,y
        decoW, decoH, // src w,h
        x + ofsX, y + ofsY, // dst x,y
        decoW, decoH); // dst w,h
  };

  function distance(x1, y1, x2, y2) {
    var XD = x2 - x1;
    var YD = y2 - y1;
    return Math.sqrt(XD * XD + YD * YD);
  }

  // used by warrior and enemyClass and NPCs in their .draw()
  this.maybeLeaveFootprint = function (who) {

    // see OverlayFX for numbers
    var FOOTPRINT_DECORATION_NUM = 10; // 10=horiz 11=vert
    var FOOTPRINT_OFSX = 15;
    var FOOTPRINT_OFSY = 35;
    var FOOTPRINT_DISTANCE = 15;

    // first time init
    if (who.footstepX == undefined) who.footstepX = who.x;
    if (who.footstepY == undefined) who.footstepY = who.y;
    if (who.stepsTaken == undefined) who.stepsTaken = 0;

    var vert = 0; // 0 or 1 so switch the sprite we use
    if (distance(who.x, 0, who.footstepX, 0) < distance(0, who.y, 0, who.footstepY))
      vert = 1;

    // measure dist
    var dist = distance(who.x, who.y, who.footstepX, who.footstepY);
    if (dist > FOOTPRINT_DISTANCE) {
      //console.log("new footstep required at "+who.x+","+who.y);
      OverlayFX.add(who.x + FOOTPRINT_OFSX, who.y + FOOTPRINT_OFSY, FOOTPRINT_DECORATION_NUM + vert);
      who.footstepX = who.x;
      who.footstepY = who.y;
      who.stepsTaken++; // for side quest
    }
  };

  // run every frame: draws extremely fast
  this.draw = function () {

    if (needToInit) this.init(); // run once only: draws extremely slow

    // decoration mode (flowers, pebbles, grass tufts, etc)
    if (this.drawDecorations) {
      canvasContext.globalAlpha = 1;
      canvasContext.drawImage(decorationOverlay, 0, 0);
    }

    // smooth transition from day to night
    if (this.nightMode) {
      nightModePercent += nightModeTransitionSpeed;
      if (nightModePercent > MAX_DARKNESS) nightModePercent = MAX_DARKNESS;
    } else {
      nightModePercent -= nightModeTransitionSpeed;
      if (nightModePercent < 0) nightModePercent = 0;
    }

    // experimental night mode
    if (nightModePercent != 0) {
      canvasContext.globalAlpha = nightModePercent;
      canvasContext.drawImage(nightModeOverlay, 0, 0);
      canvasContext.globalAlpha = 1;
    }

  };

  // tiles that cast a glow during night mode
  const glowingTiles = [
    TILE_GREEN_DOOR,
    TILE_BLUE_DOOR,
    TILE_RED_DOOR,
    TILE_GRAVE_YARD_PORTAL,
    TILE_HOME_VILLAGE_PORTAL,
    TILE_FOREST_PORTAL,
    TILE_KEY,
    TILE_YELLOW_KEY,
    TILE_GREEN_KEY,
    TILE_BLUE_KEY,
    TILE_RED_KEY,
    TILE_TREASURE,
    TILE_FRONTDOOR_YELLOW,
    TILE_HOUSE_FRONT_WINDOW,
    TILE_HOUSE_FRONT_WINDOW_BROKEN,
    TILE_HOUSE_BW_WINDOW,
    TILE_BS_FW_LS,
    TILE_GRAVEYARD_FENCE_BR,
    TILE_GRAVEYARD_FENCE_TR,
    TILE_GRAVEYARD_FENCE_BL,
    TILE_GRAVEYARD_FENCE_TL,
    TILE_GRAVEYARD_FENCE_LEFT,
    TILE_GRAVEYARD_FENCE_RIGHT,
  ];

  this.init = function () {

    // console.log("Initializing OverlayFX...");

    needToInit = false;

    // init decorations
    decorationOverlay.width = TILE_W * ROOM_ROWS;
    decorationOverlay.height = TILE_H * ROOM_COLS;

    for (var spr = 0; spr < this.deco.length; spr++) {
      for (var i = 0; i < this.deco[ spr ].length; i++) {
        decorationContext.drawImage(decorationsImg,
            spr * decoW, 0, // src x,y
            decoW, decoH, // src w,h
            this.deco[ spr ][ i ][ 0 ] + ofsX, this.deco[ spr ][ i ][ 1 ] + ofsY, // dst x,y
            decoW, decoH); // dst w,h
      }
    }

    // init night mode
    nightModeOverlay.width = TILE_W * ROOM_COLS;
    nightModeOverlay.height = TILE_H * ROOM_ROWS;
    nightModeContext.fillStyle = "black";
    nightModeContext.fillRect(0, 0, nightModeOverlay.width, nightModeOverlay.height);
    nightModeContext.globalCompositeOperation = "destination-out"; // cut out
    // look for things that glow
    var drawTileX = 0;
    var drawTileY = 0;
    for (var eachRow = 0; eachRow < ROOM_ROWS; eachRow++) {
      for (var eachCol = 0; eachCol < ROOM_COLS; eachCol++) {
        var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
        var tileKindHere = roomGrid[ arrayIndex ];
        if (glowingTiles.includes(tileKindHere)) {
        	if (tileKindHere == TILE_GRAVEYARD_FENCE_LEFT) {
        		nightModeContext.drawImage(shinyPic, drawTileX - shinyPic.width/2 + 6, drawTileY - shinyPic.height/3);
        	} else if (tileKindHere == TILE_GRAVEYARD_FENCE_RIGHT) {
        		nightModeContext.drawImage(shinyPic, drawTileX - shinyPic.width/6, drawTileY - shinyPic.height/3);
        	} else if (tileKindHere == TILE_GRAVEYARD_FENCE_BL || tileKindHere == TILE_GRAVEYARD_FENCE_TL) {
        		nightModeContext.drawImage(shinyPic, drawTileX - shinyPic.width/2.25, drawTileY - shinyPic.height/3);
        	} else if (tileKindHere == TILE_GRAVEYARD_FENCE_BR || tileKindHere == TILE_GRAVEYARD_FENCE_TR) {
        		nightModeContext.drawImage(shinyPic, drawTileX - 20, drawTileY - shinyPic.height/3);
        	} else {
        		nightModeContext.drawImage(shinyPic, drawTileX - 40, drawTileY - 25);
        	}
        }
        drawTileX += TILE_W;
      }
      drawTileY += TILE_H;
      drawTileX = 0;
    }

  }

}();