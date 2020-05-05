// =========================================================================
const spriteJson = "maps/tiles.json";
const spritePath = "images/tiles/";
const spriteDfltSize = TILE_W;
const tilesetPath = "images/tiles_sz50_only_by_json_id.png"

// autogenerated by the same script as tiles_sz50_only_by_json_id
// commenting out something here will cause it to look for individual asset instead
// (i.e. if it ISN'T commented out, it'll use sprite sheet version)
// note that transparency/collision is weird/undefined from spritesheet
// so if seeig a problematic tile, walk against it to see the name, comment it here
// and be sure to move its image back into the tiles/ directory
const tilesheetMap = { // }; var testIgnore = {
1: {name: "1 grave", id: 1},
2: {name: "2 graves", id: 2},
4: {name: "alchemist", id: 4},
5: {name: "alchemist1", id: 5},
9: {name: "backwall", id: 9},
//10: {name: "backwallcabinetlowerhalf", id: 10},
//11: {name: "backwallcabinettophalf", id: 11},
//12: {name: "backwallemptycabinet", id: 12},
13: {name: "backwallrightside", id: 13},
//14: {name: "bar2", id: 14},
//16: {name: "bedleftside", id: 16},
17: {name: "bedleftsidets", id: 17},
19: {name: "blacksmith", id: 19},
20: {name: "blacksmith1", id: 20},
23: {name: "bonfire_unlit_s", id: 23},
26: {name: "brickwall_tl", id: 26},
27: {name: "brickWindow", id: 27},
//28: {name: "bridge-lower", id: 28},
//29: {name: "bridge-upper", id: 29},
//31: {name: "bush", id: 31},
//32: {name: "bush_tall", id: 32},
//33: {name: "bush2", id: 33},
//34: {name: "campring_lg_l", id: 34}, // no tiles file?
// 35: {name: "campring_lg_r", id: 35}, // no tiles file?
36: {name: "cart", id: 36},
37: {name: "cart_broken", id: 37},
53: {name: "cave_lg_bl", id: 53},
54: {name: "cave_lg_br", id: 54},
55: {name: "cave_lg_tl", id: 55},
56: {name: "cave_lg_tr", id: 56},
57: {name: "cave_sm", id: 57},
58: {name: "cave_smd", id: 58},
59: {name: "cliff", id: 59},
/*60: {name: "cliff_b", id: 60},
61: {name: "cliff_c_btl", id: 61},
62: {name: "cliff_c_btr", id: 62},
63: {name: "cliff_c_ltb", id: 63},
64: {name: "cliff_c_ltt", id: 64},
65: {name: "cliff_c_rtb", id: 65},
66: {name: "cliff_c_rtt", id: 66},
67: {name: "cliff_c_ttl", id: 67},
68: {name: "cliff_c_ttr", id: 68},
69: {name: "cliff_l", id: 69},
70: {name: "cliff_r", id: 70},
71: {name: "cliff_t", id: 71},*/
72: {name: "cliffBottomLeft", id: 72},
73: {name: "cliffFullShadow", id: 73},
//74: {name: "cliffLeft", id: 74},
75: {name: "cliffRight", id: 75},
76: {name: "cliffRightCorner", id: 76},
77: {name: "cliffShadow", id: 77},
78: {name: "cliffTop", id: 78},
79: {name: "cliffTop1", id: 79},
80: {name: "cliffTopLeft", id: 80},
81: {name: "cliffTopRightCorner", id: 81},
84: {name: "dcliff_bb", id: 84},
85: {name: "dcliff_bt", id: 85},
86: {name: "dcliff_c_btl", id: 86},
87: {name: "dcliff_c_rtb", id: 87},
88: {name: "dcliff_j_double_bl", id: 88},
89: {name: "dcliff_j_double_br", id: 89},
90: {name: "dcliff_j_double_tl", id: 90},
91: {name: "dcliff_j_double_tr", id: 91},
92: {name: "dcliff_j_single_l", id: 92},
93: {name: "dcliff_j_single_r", id: 93},
94: {name: "dcliff_lc_btr", id: 94},
95: {name: "dcliff_lc_ltb", id: 95},
96: {name: "dcliff_uc_btr", id: 96},
97: {name: "dcliff_uc_ltb", id: 97},
98: {name: "dressertop", id: 98},
100: {name: "druidcircle1", id: 100},
101: {name: "druidcircle2", id: 101},
102: {name: "druidcircle3", id: 102},
103: {name: "druidcircle4", id: 103},
104: {name: "druidcircle5", id: 104},
105: {name: "druidcircle6", id: 105},
106: {name: "druidcircle7", id: 106},
107: {name: "druidcircle8", id: 107},
108: {name: "druidcircle9", id: 108},
109: {name: "druidhouse_fl", id: 109},
110: {name: "druidhouse_fm", id: 110},
111: {name: "druidhouse_fr", id: 111},
112: {name: "druidhouse_ml", id: 112},
113: {name: "druidhouse_mr", id: 113},
114: {name: "druidhouse_tl", id: 114},
115: {name: "druidhouse_tm", id: 115},
116: {name: "druidhouse_tr", id: 116},
//117: {name: "fence", id: 117},
//118: {name: "fencebottomleftpost", id: 118},
//119: {name: "fencebottomrightpost", id: 119},
//120: {name: "fenceleftpost", id: 120},
//121: {name: "fenceleftside", id: 121},
/*123: {name: "fencerightpost", id: 123},
124: {name: "fenceside", id: 124},
125: {name: "fencetopleftpost", id: 125},
126: {name: "fencetoprightpost", id: 126},*/
// 128: {name: "fountain", id: 128},
129: {name: "garden_1", id: 129},
130: {name: "garden_2", id: 130},
131: {name: "garden_3", id: 131},
132: {name: "garden_4", id: 132},
133: {name: "garden_5", id: 133},
134: {name: "garden_6", id: 134},
135: {name: "garden_7", id: 135},
136: {name: "garden_8", id: 136},
137: {name: "garden_9", id: 137},
139: {name: "grass", id: 139},
// 140: {name: "grave_3", id: 140},
143: {name: "houseWall", id: 143},
145: {name: "join_bar_wwall_l", id: 145},
146: {name: "join_bar_wwall_r", id: 146},
148: {name: "lflagstone1", id: 148},
149: {name: "lflagstone2", id: 149},
//151: {name: "mausoleum_1", id: 151},
152: {name: "mausoleum_2", id: 152},
153: {name: "mausoleum_3", id: 153},
154: {name: "mausoleum_4", id: 154},
// 155: {name: "mausoleumB_1", id: 155},
156: {name: "mausoleumB_2", id: 156},
157: {name: "mausoleumB_3", id: 157},
158: {name: "mausoleumB_4", id: 158},
159: {name: "oblisk grave", id: 159},
//160: {name: "OpenDoorway", id: 160},
161: {name: "orc_hut_bl", id: 161},
162: {name: "orc_hut_br", id: 162},
163: {name: "orc_hut_tl", id: 163},
164: {name: "orc_hut_tr", id: 164},
165: {name: "pub", id: 165},
167: {name: "roofbackleft", id: 167},
168: {name: "roofbackright", id: 168},
169: {name: "roofbackside", id: 169},
170: {name: "roofbottomright", id: 170},
171: {name: "roofcenter", id: 171},
172: {name: "rooffront", id: 172},
173: {name: "rooffrontleft", id: 173},
174: {name: "roofFrontRight", id: 174},
175: {name: "roofleftside", id: 175},
//176: {name: "stool", id: 176},
177: {name: "table", id: 177},
//178: {name: "throwingRocks", id: 178},
179: {name: "treasure", id: 179},
//187: {name: "tree1", id: 187}, // was in Trees/ folder, not tiles/ - does it matter here?
//188: {name: "tree2", id: 188}, // was in Trees/ folder, not tiles/ - does it matter here?
189: {name: "tree2bottomhalf", id: 189},
190: {name: "tree2tophalf", id: 190},
//191: {name: "tree3", id: 191}, // was in Trees/ folder, not tiles/ - does it matter here?
192: {name: "tree3bottomhalf", id: 192},
193: {name: "tree3tophalf", id: 193},
//194: {name: "tree4", id: 194}, // was in Trees/ folder, not tiles/ - does it matter here?
195: {name: "tree4bottomhalf", id: 195},
196: {name: "tree4tophalf", id: 196},
//197: {name: "tree5FallenBottom", id: 197},
//198: {name: "tree5FallenTopHalf", id: 198},
/*199: {name: "treeA1", id: 199},
200: {name: "treeA2", id: 200},
201: {name: "treeA3", id: 201},
202: {name: "treeA4", id: 202},*/
//205: {name: "weaponsrack", id: 205},
//206: {name: "weaponsracklh", id: 206},
207: {name: "woodwall_bc", id: 207, collider: "none"},
208: {name: "woodwall_bl", id: 208, collider: "leftQtr"},
209: {name: "woodwall_br", id: 209, collider: "rightQtr"},
210: {name: "woodwall_ml", id: 210, collider: "leftQtr"},
211: {name: "woodwall_mr", id: 211, collider: "rightQtr"},
212: {name: "woodwall_tc", id: 212},
213: {name: "woodwall_tl", id: 213},
214: {name: "woodwall_tr", id: 214},
216: {name: "woodwall_wdw_tc", id: 216},
217: {name: "worldRoad", id: 217},
218: {name: "frontdoor", id: 218},
//219: {name: "dresserbottom", id: 219},
/*408: {name: "castle_door_lr1", id: 408},
409: {name: "castle_door_lr2", id: 409},
410: {name: "castle_door_lr3", id: 410},
411: {name: "castle_door_lr4", id: 411},
412: {name: "castle_door_lr5", id: 412},
413: {name: "castle_door_lr6", id: 413},
414: {name: "castle_door_lr7", id: 414},
415: {name: "castle_door_lr8", id: 415},
416: {name: "castle_door_lr9", id: 416},
417: {name: "castle_door_lr10", id: 417},
418: {name: "castle_door_lr11", id: 418},
419: {name: "castle_door_lr12", id: 419},
420: {name: "castle_door_lr13", id: 420},
421: {name: "castle_door_lr14", id: 421},
422: {name: "castle_door_lr15", id: 422},
423: {name: "castle_door_lr16", id: 423},*/
424: {name: "castle_door_t1", id: 424},
425: {name: "castle_door_t2", id: 425, collider: "none"},
//426: {name: "castle_wall_b1", id: 426},
427: {name: "castle_wall_b2", id: 427},
428: {name: "castle_wall_b3", id: 428},
//429: {name: "castle_wall_btl1", id: 429},
430: {name: "castle_wall_btl2", id: 430},
431: {name: "castle_wall_btl3", id: 431},
432: {name: "castle_wall_btl4", id: 432},
433: {name: "castle_wall_btl5", id: 433},
434: {name: "castle_wall_btr1", id: 434},
435: {name: "castle_wall_btr2", id: 435},
436: {name: "castle_wall_btr3", id: 436},
/*437: {name: "castle_wall_lr1", id: 437},
438: {name: "castle_wall_lr2", id: 438},
439: {name: "castle_wall_lr3", id: 439},
440: {name: "castle_wall_lr4", id: 440},
441: {name: "castle_wall_lr5", id: 441},
442: {name: "castle_wall_lr6", id: 442},
443: {name: "castle_wall_lr7", id: 443},
444: {name: "castle_wall_lr8", id: 444},*/
445: {name: "castle_wall_ltb1", id: 445},
446: {name: "castle_wall_ltb2", id: 446},
447: {name: "castle_wall_ltb3", id: 447},
448: {name: "castle_wall_ltt1", id: 448},
449: {name: "castle_wall_ltt2", id: 449},
//450: {name: "castle_wall_rtb1", id: 450},
451: {name: "castle_wall_rtb2", id: 451},
452: {name: "castle_wall_rtb3", id: 452},
453: {name: "castle_wall_rtb4", id: 453},
454: {name: "castle_wall_rtb5", id: 454},
455: {name: "castle_wall_rtt1", id: 455},
456: {name: "castle_wall_rtt2", id: 456},
457: {name: "castle_wall_rtt3", id: 457},
458: {name: "castle_wall_rtt4", id: 458},
459: {name: "castle_wall_tc1", id: 459},
460: {name: "castle_wall_tc2", id: 460},
461: {name: "castle_wall_tc3_b", id: 461},
462: {name: "castle_wall_tc3_t", id: 462},
463: {name: "castle_wall_tc4_b", id: 463},
464: {name: "castle_wall_tc4_t", id: 464},
465: {name: "castle_wall_tc5", id: 465},
466: {name: "castle_wall_ttl1", id: 466},
467: {name: "castle_wall_ttl2", id: 467},
468: {name: "castle_wall_ttl3", id: 468},
469: {name: "castle_wall_ttl4", id: 469},
470: {name: "castle_wall_ttr1", id: 470},
471: {name: "castle_wall_ttr2", id: 471},
//472: {name: "castle_window1", id: 472},
473: {name: "castle_wall_btr4", id: 473},
474: {name: "castle_wall_ltb4", id: 474},
475: {name: "castle_wall_rtt5", id: 475},
476: {name: "castle_wall_ttl5", id: 476},
477: {name: "castle_battlement_b1", id: 477},
478: {name: "castle_battlement_b2", id: 478},
479: {name: "castle_battlement_btl", id: 479},
480: {name: "castle_battlement_btr", id: 480},
481: {name: "castle_battlement_l1", id: 481},
482: {name: "castle_battlement_l2", id: 482},
//483: {name: "castle_battlement_l3", id: 483},
484: {name: "castle_battlement_ltb", id: 484},
485: {name: "castle_battlement_ltt1", id: 485},
486: {name: "castle_battlement_ltt2", id: 486},
487: {name: "castle_battlement_mc1", id: 487},
488: {name: "castle_battlement_mc2", id: 488},
489: {name: "castle_battlement_mc3", id: 489},
490: {name: "castle_battlement_mc4", id: 490},
491: {name: "castle_battlement_mc5", id: 491},
492: {name: "castle_battlement_mc6", id: 492},
493: {name: "castle_battlement_mc7", id: 493},
494: {name: "castle_battlement_mc8", id: 494},
495: {name: "castle_battlement_mc9", id: 495},
496: {name: "castle_battlement_mc10", id: 496},
497: {name: "castle_battlement_r1", id: 497},
498: {name: "castle_battlement_r2", id: 498},
//499: {name: "castle_battlement_r3", id: 499},
500: {name: "castle_battlement_rtb", id: 500},
//501: {name: "castle_battlement_rtt", id: 501},
//502: {name: "castle_battlement_t", id: 502},
//503: {name: "castle_battlement_ttl", id: 503},
504: {name: "castle_battlement_ttr1", id: 504},
505: {name: "castle_battlement_ttr2", id: 505},
506: {name: "castle_door_b1", id: 506, collider: "none"},
507: {name: "castle_door_b2", id: 507},
//508: {name: "castle_gate1_bl", id: 508},
//509: {name: "castle_gate1_br", id: 509},
//510: {name: "castle_gate1_tl", id: 510},
//511: {name: "castle_gate1_tr", id: 511},
//512: {name: "castle_gate2_bl", id: 512},
//513: {name: "castle_gate2_br", id: 513},
// 514: {name: "castle_gate2_tl", id: 514},
515: {name: "castle_gate2_tr", id: 515},
516: {name: "castle_gate3_bl", id: 516},
517: {name: "castle_gate3_br", id: 517},
//518: {name: "castle_gate3_tl", id: 518},
519: {name: "castle_gate3_tr", id: 519},
520: {name: "castle_gate4_bl", id: 520},
521: {name: "castle_gate4_br", id: 521},
//522: {name: "castle_gate4_tl", id: 522},
523: {name: "castle_gate4_tr", id: 523},
// 524: {name: "castle_gate5_tl", id: 524},
525: {name: "castle_gate5_tr", id: 525},
/*526: {name: "castle_pillar_bl", id: 526},
527: {name: "castle_pillar_br", id: 527},
528: {name: "castle_pillar_ml", id: 528},
529: {name: "castle_pillar_mr", id: 529},
530: {name: "castle_pillar_tl", id: 530},
531: {name: "castle_pillar_tr", id: 531},*/
//532: {name: "castle_wall_l1", id: 532},
//533: {name: "castle_wall_l2", id: 533},
//534: {name: "castle_wall_l3", id: 534},
535: {name: "castle_wall_l4", id: 535},
536: {name: "castle_wall_l5", id: 536},
537: {name: "castle_wall_mc1", id: 537},
//538: {name: "castle_wall_r1", id: 538},
//539: {name: "castle_wall_r2", id: 539},
540: {name: "castle_wall_r3", id: 540},
541: {name: "castle_wall_r4", id: 541},
542: {name: "castle_wall_r5", id: 542},
543: {name: "castle_window2", id: 543},
544: {name: "castle_bg1", id: 544},
545: {name: "castle_bg2", id: 545},
546: {name: "castle_bg3", id: 546},
547: {name: "castle_bg4", id: 547},
548: {name: "castle_bg5", id: 548},
549: {name: "castle_bg6", id: 549},
550: {name: "castle_bg7", id: 550},
551: {name: "castle_bg8", id: 551},
552: {name: "castle_bg9", id: 552},
553: {name: "castle_bg10", id: 553},
554: {name: "castle_bg11", id: 554},
//555: {name: "castle_bg12", id: 555},
//556: {name: "castle_bg13", id: 556},
557: {name: "castle_bg14", id: 557},
558: {name: "castle_bg15", id: 558},
559: {name: "castle_bg16", id: 559},
560: {name: "castle_bg17", id: 560},
561: {name: "castle_bg18", id: 561},
562: {name: "castle_bg19", id: 562},
563: {name: "castle_bg20", id: 563},
//564: {name: "castle_bg21", id: 564},
//565: {name: "castle_bg22", id: 565},
566: {name: "castle_bg23", id: 566},
//567: {name: "castleb_gate1_tl", id: 567},
//568: {name: "castleb_gate1_tr", id: 568},
//569: {name: "castleb_gate2_tl", id: 569},
//570: {name: "castleb_gate2_tr", id: 570},
571: {name: "castleb_gate3_tl", id: 571},
572: {name: "castleb_gate3_tr", id: 572},
573: {name: "castleb_gate4_tl", id: 573},
574: {name: "castleb_gate4_tr", id: 574},
//575: {name: "castleb_gate5_tl", id: 575},
//576: {name: "castleb_gate5_tr", id: 576},
577: {name: "castleb_wall_l1", id: 577},
578: {name: "castleb_wall_l2", id: 578},
579: {name: "castleb_wall_l3", id: 579},
580: {name: "castleb_wall_l4", id: 580},
581: {name: "castleb_wall_l5", id: 581},
582: {name: "castleb_wall_mc1", id: 582},
/*583: {name: "castleb_wall_r1", id: 583},
584: {name: "castleb_wall_r2", id: 584},
585: {name: "castleb_wall_r3", id: 585},*/
586: {name: "castleb_wall_r4", id: 586},
587: {name: "castleb_wall_r5", id: 587},
588: {name: "castleb_window2", id: 588},
589: {name: "castle_battlement_mc11", id: 589},
//590: {name: "waterFallPlaceholder", id: 590},
//591: {name: "waterPlaceholder", id: 591},
594: {name: "bonfire_s_PH", id: 594},
/*595: {name: "grass_b", id: 595},
596: {name: "grass_btl", id: 596},
597: {name: "grass_btr", id: 597},
598: {name: "grass_l", id: 598},
599: {name: "grass_ltb", id: 599},
600: {name: "grass_ltt", id: 600},
601: {name: "grass_r", id: 601},
602: {name: "grass_rtb", id: 602},
603: {name: "grass_rtt", id: 603},
604: {name: "grass_t", id: 604},
605: {name: "grass_ttl", id: 605},
606: {name: "grass_ttr", id: 606},*/
607: {name: "cliff_stairs_l", id: 607},
608: {name: "cliff_stairs_u", id: 608},
};

// =========================================================================
class Sprites {
    constructor() {
        this.spriteMap = {};
        this.spriteNameMap = {};
        this.spriteSize = spriteDfltSize;
        this.spritesheet = {}
    }

    loadTilesheet(doneCB) {
        console.log("loading tilesheet...");
        let img = new Image();
        img.onload = () => {
            let tilesX = img.width / TILE_W;
            let tilesY = img.height / TILE_H;
            let id = 1;
            // create tilebuffer to be used to extract images from tilesheet
            let tileBuffer = document.createElement('canvas');
            let ctx = tileBuffer.getContext('2d');
            tileBuffer.width = TILE_W;
            tileBuffer.height = TILE_H;
            // iterate through tilesheet
            for (let i=0; i<tilesY; i++) {
                for (let j=0; j<tilesX; j++) {
                    ctx.clearRect(0, 0, tileBuffer.width, tileBuffer.height);
                    // draw the image
                    ctx.drawImage(img, j*TILE_W, i*TILE_H, TILE_W, TILE_H, 0, 0, TILE_W, TILE_H);
                    // extract the image from canvas
                    let spriteImg = new Image();
                    /*
                    spriteImg.onload = () => {
                        console.log("spriteImg.height: " + spriteImg.height);
                        console.log("spriteImg.width: " + spriteImg.width);
                    }
                    */
                    spriteImg.src = tileBuffer.toDataURL();

                    let tileInfo = tilesheetMap[id];
                    if (tileInfo) {
                        let sprite = new ImgSprite(tileInfo.name, spriteImg, tileInfo.id, tileInfo.collider || "");
                        this.spriteMap[tileInfo.id] = sprite;
                        this.spriteNameMap[tileInfo.name] = sprite;
                    }
                    id++;
                }
            }
            doneCB();
        }
        img.src = tilesetPath;
        this.spritesheet = img;
    }

    loadSprites(doneCb) {
        console.log("loading sprites...");
        // read json file contents
        let xhr = new XMLHttpRequest();
        xhr.onload = () => {
            var loadCount = 0;
            var rootRef = JSON.parse(xhr.responseText);
            var records = rootRef["tiles"];
            records.forEach(record => {
				var path = record.image;
				path = spritePath + path.replace(/^.*[\\\/]/, '');
				let name = path.replace(/^.*[\\\/]/, '');
				name = name.substring(0, name.lastIndexOf('.'));
                var width = record.imagewidth || spriteDfltSize;
                var height = record.imageheight || spriteDfltSize;
                var collider = "";
                var speed = PLAYER_SPEED;
                var id = record.id + 1;
                // parse custom properties
                if (record.properties) {
                    console.log("record has properties: " + record.properties);
                    record.properties.forEach(property => {
                        if (property.name == "collider") {
                            collider = property.value;
                        }
                        if (property.name == "speed") {
                            speed = property.value;
                        }
                    });
                }
                var sprite = new Sprite(name, path, width, height, id, collider, () => {
                    if (++loadCount >= records.length) doneCb();
                });
                sprite.speed = speed;
                // only update sprite maps for tiles if sprite isn't coming from tilesheet
                if (!tilesheetMap[id]) {
                    this.spriteMap[id] = sprite;
                    this.spriteNameMap[name] = sprite;
                }
            });
        }
        xhr.open("GET", spriteJson, true);
        xhr.setRequestHeader("Cache-Control", "no-store");
        xhr.send();
    }

    Load(doneCb) {
        let loadCount = 0;
        let loaders = [this.loadSprites.bind(this), this.loadTilesheet.bind(this)];
        for (const loader of loaders) {
            loader(() => {
                if (++loadCount >= loaders.length) doneCb();
            });
        }
    }

    get(id) {
        return this.spriteMap[id];
    }
    getname(name) {
        return this.spriteNameMap[name];
    }

}

// =========================================================================
class ImgSprite {
    constructor(name, img, id, collider) {
        this.name = name;
        this.img = img;
        this.width = img.width;
        this.height = img.height;
        this.id = id;
        this.collider = collider;
        this.speed = PLAYER_SPEED;
    }

    toString() {
        return this.name;
    }
}

// =========================================================================
class Sprite {
    // CONSTRUCTOR ---------------------------------------------------------
    constructor(name, url, width, height, id, collider, onload_cb) {
		this.name = name;
        this.width = width;
        this.height = height;
        this.id = id;
        this.collider = collider;
        this.speed = PLAYER_SPEED;
        if (url) {
            this.img = new Image();
            if (onload_cb != null) this.img.onload = onload_cb;
            this.img.src = url;
        } else {
            this.img = {};
        }
    }

    toString() {
        return this.name;
    }
}

const dfltSprite = new Sprite("dflt", "", TILE_W, TILE_H, -1, "", null);