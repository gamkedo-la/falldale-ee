var pathDebugIndexList = [10,61,62,63,64];

function drawDebugPath(){
	var toTileC;
	var toTileR;
	for(var i = 0; i < pathDebugIndexList.length; i++){
		toTileC = pathDebugIndexList[i]%ROOM_COLS;
		toTileR = Math.floor(pathDebugIndexList[i]/ROOM_COLS);
		colorText(""+i, toTileC, toTileR, "cyan", "24px Arial Black" );
	}
}

function pathFinder() {
    this.pathFrom_To_ = function(start, target, isPassableFunction) {

        var frontier = [];
        frontier.push(start);
        var cameFrom = {};
        cameFrom[start] = "S";

        //console.log(frontier.length);
        
        while (frontier.length > 0) {
            var current = frontier.shift();
            var neighbors = neighborsForIndex(current, isPassableFunction);
            //console.log("==> checking current: " + current + " neighbors: " + neighbors + " cf.length: " + Object.getOwnPropertyNames(cameFrom).length);

            for (let i = 0; i < neighbors.length; i++) {
                const next = neighbors[i];
                if (next == undefined || next == null) continue;
                if (cameFrom[next] == undefined) {
                    frontier.push(next);
                    cameFrom[next] = current;
                    //console.log("extending frontier, next: " + next + " current: " + current + "updated cameFrom:" + cameFrom[next]);
                }

                if (next == target) {
                    break;
                }
            }
        }

        //console.log("cameFrom.length" + cameFrom.length);
        //console.log("have potential path: current: " + current + " start: " + start);

        var path = [];

        var current = target;

        let iters = 1000;
        while (current != start) {
            //console.log("current: " + current);
            if (iters-- <= 0) break;
            path.splice(0, 0, current);
            current = cameFrom[current];
            if (current == undefined) {
                return [];
            }
        }

        path.splice(0, 0, start);

        //console.log("path: " + path);

        return path;
    };

    var neighborsForIndex = function(index, isPassable) {
		var result = [];

		var above = indexAboveIndex(index);
		var below = indexBelowIndex(index);
		var left = indexLeftofIndex(index);
		var right = indexRightOfIndex(index);

		if (isPassable(above)) {
			result.push(above);
        }

        if (isPassable(below)) {
			result.push(below);
        }

        if (isPassable(left)) {
			result.push(left);
        }

        if (isPassable(right)) {
			result.push(right);
        }

        return result;
    };

    var indexAboveIndex = function(index) {
        var result = index - ROOM_COLS;
        if (result < 0) {
            return null;
        } else {
            return result;
        }
    };

    var indexBelowIndex = function(index) {
        var result = index + ROOM_COLS;
        if (result >= ROOM_COLS * ROOM_ROWS) { // WARNING:  NEED TO TEST FOR LEFT MOST EDGE
            return null;
        } else {
            return result;
        }
    };

    var indexLeftofIndex = function(index) {
        var result = index - 1;
        if ((result < 0) || (result % ROOM_COLS == (ROOM_COLS - 1))) {
            return null;
        } else {
            return result;
        }
    };

    var indexRightOfIndex = function(index) {
        var result = index + 1;
        if ((result >= ROOM_COLS * ROOM_ROWS) || (result % ROOM_COLS == 0)) {
            return null;
        } else {
            return result;
        }
    }


}

function isNotAPassableTile(aTile) {
	switch (aTile) { // THE TILES THAT CAN'T BE PASSED THROUGH FOR PATHFINDING
	  case TILE_WALL:
      case TILE_DOOR:
      case TILE_YELLOW_DOOR:
      case TILE_GREEN_DOOR:
      case TILE_BLUE_DOOR:
      case TILE_RED_DOOR:
      case TILE_ROOF_FRONTRIGHT:
      case TILE_ROOF_SIDERIGHT:
      case TILE_ROOF_BACKRIGHT:
      case TILE_FRONTWALL_WINDOW:
      case TILE_FRONTDOOR_YELLOW:
      case TILE_ROOF_BACKSIDE:
      case TILE_ROOF_BACKLEFT:
      case TILE_ROOF_LEFTSIDE:
      case TILE_ROOF_FRONTLEFT:
      case TILE_ROOF_FRONT:
      case TILE_ROOF_CENTER:
      case TILE_HEALER_BW_CABINET_POTIONS:
	  case TILE_CABINET_LH:
      case TILE_HEALER_DESK:
      case TILE_HEALER_FRONTDOOR:
      case TILE_BS_BW:
      case TILE_BS_BW_CABINET_POTIONS:
      case TILE_BS_BW_CABINET_EMPTY:
      case TILE_BRICK_TL:
      case TILE_BRICK_TR:
      case TILE_BS_DESK:
      case TILE_BRICK_BW_WEAPONSRACK:
      case TILE_BRICK_BW_WEAPONSRACKBOTTOM:
      case TILE_BS_FW_LS:
      case TILE_BS_LW:
      case TILE_BS_FW_RS:
      case TILE_BAR_CABINET:
      case TILE_BAR:
      case TILE_BAR_TOP:
      case TILE_CHAIR:
      case TILE_MAUSOLEUM_1:
      case TILE_MAUSOLEUM_2:
      case TILE_MAUSOLEUM_3:
      case TILE_MAUSOLEUM_4:
	  case TILE_MAUSOLEUM_B_1:
      case TILE_MAUSOLEUM_B_2:
      case TILE_MAUSOLEUM_B_3:
      case TILE_MAUSOLEUM_B_4:
      case TILE_ZOMBIE:
      case TILE_ZOMBIE2:
      case TILE_ZOMBIE3:
      case TILE_GREEN_ORC_SWORD:
      case TILE_GREEN_ORC_CLUB:
      case TILE_GREEN_ORC_AX:
      case TILE_ARCHER:
      case TILE_SHOPKEEPER:
      case TILE_HEALER:
      case TILE_PRINCESS:
      case TILE_DODD:
      case TILE_TARAN:
      case TILE_DELKON:
      case TILE_ADDY:
        // case TILE_GABRIEL:
      case TILE_FENTON:
      case TILE_BUSH:
      case TILE_BUSH:
      case TILE_TREE2BOTTOMHALF:
      case TILE_TREE3TOPHALF:
      case TILE_TREE3BOTTOMHALF:
      case TILE_GRAVEYARD_FENCE_LEFT:
      case TILE_GRAVEYARD_FENCE_RIGHT:
      case TILE_GRAVEYARD_FENCE:
      case TILE_GRAVE_1:
      case TILE_GRAVE_2:
      case TILE_GRAVE_3:
      case TILE_GRAVE_4:
      case TILE_SKELETON:
      case TILE_GOBLIN:
      case TILE_SPIKES:
      case TILE_SPIKES_BLOODY:
      case TILE_WATER:
      case TILE_FOUNTAIN:
        return false;
      default:
        return true;
	}
}
