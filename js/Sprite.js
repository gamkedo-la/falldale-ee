// =========================================================================
const spriteJson = "maps/tiles.json";
const spritePath = "images/tiles/";
const spriteDfltSize = TILE_W;
const tilesetPath = "images/tiles_sz50_only_by_json_id.png"

const tilesheetMap = {
    1: {name: "1 grave", id: 1},
    /*
    2: {name: "2 graves.png", id: 2},
    3: {name: "alchemist.png", id: 3},
    1: {name: "alchemist1.png", id: 4},
    1: {name: "backwall.png", id: 9},
    1: {name: "backwallcabinetlowerhalf.png", id: 10, collider: "topQtr"},
    1: {name: "backwallcabinettophalf.png", id: 11},
    1: {name: "backwallemptycabinet.png", id: 12},
    1: {name: "backwallrightside.png", id: 13},
    1: {name: "bar2.png", id: 14},
    1: {name: "bedleftside.png", id: 16},
    1: {name: "bedleftsidets.png", id: 17},
    1: {name: "blacksmith.png", id: 19},
    1: {name: "blacksmith1.png", id: 20},
    1: {name: "bonfire_unlit_l.png", id: 21},
    1: {name: "bonfire_unlit_r.png", id: 22},
    1: {name: "bonfire_unlit_s.png", id: 23},
    1: {name: "brickwall_tl.png", id: 26},
    1: {name: "brickWindow.png", id: 27},
    1: {name: "bridge-lower.png", id: 28, collider: "none"},
    1: {name: "bridge-upper.png", id: 29},
    1: {name: "bush.png", id: 31, collider: "middle"},
    1: {name: "bush_tall.png", id: 32, collider: "ttbMidThird"},
    1: {name: "bush2.png", id: 33},
    1: {name: "campring_lg_l.png", id: 34},
    1: {name: "campring_lg_r.png", id: 35},
    1: {name: "cart.png", id: 36},
    1: {name: "cart_broken.png", id: 37},
    1: {name: "cave_lg_bl.png", id: 53},
    1: {name: "cave_lg_br.png", id: 54},
    1: {name: "cave_lg_tl.png", id: 55},
    1: {name: "cave_lg_tr.png", id: 56},
    1: {name: "cave_sm.png", id: 57},
    1: {name: "cave_smd.png", id: 58},
    1: {name: "cliff.png", id: 59},
    1: {name: "cliff_b.png", id: 60},
    1: {name: "cliff_c_btl.png", id: 61},
    */
};

/*
    1: {name: "cliff_c_btr.png", id: 1},
    1: {name: "cliff_c_ltb.png", id: 1},
    1: {name: "cliff_c_ltt.png", id: 1},
    1: {name: "cliff_c_rtb.png", id: 1},
    1: {name: "cliff_c_rtt.png", id: 1},
    1: {name: "cliff_c_ttl.png", id: 1},
    1: {name: "cliff_c_ttr.png", id: 1},
    1: {name: "cliff_l.png", id: 1},
    1: {name: "cliff_r.png", id: 1},
    1: {name: "cliff_t.png", id: 1},
    1: {name: "cliffBottomLeft.png", id: 1},
    1: {name: "cliffFullShadow.png", id: 1},
    1: {name: "cliffLeft.png", id: 1},
    1: {name: "cliffRight.png", id: 1},
    1: {name: "cliffRightCorner.png", id: 1},
    1: {name: "cliffShadow.png", id: 1},
    1: {name: "cliffTop.png", id: 1},
    1: {name: "cliffTop1.png", id: 1},
    1: {name: "cliffTopLeft.png", id: 1},
    1: {name: "cliffTopRightCorner.png", id: 1},
    1: {name: "dcliff_bb.png", id: 1},
    1: {name: "dcliff_bt.png", id: 1},
    1: {name: "dcliff_c_btl.png", id: 1},
    1: {name: "dcliff_c_rtb.png", id: 1},
    1: {name: "dcliff_j_double_bl.png", id: 1},
    1: {name: "dcliff_j_double_br.png", id: 1},
    1: {name: "dcliff_j_double_tl.png", id: 1},
    1: {name: "dcliff_j_double_tr.png", id: 1},
    1: {name: "dcliff_j_single_l.png", id: 1},
    1: {name: "dcliff_j_single_r.png", id: 1},
    1: {name: "dcliff_lc_btr.png", id: 1},
    1: {name: "dcliff_lc_ltb.png", id: 1},
    1: {name: "dcliff_uc_btr.png", id: 1},
    1: {name: "dcliff_uc_ltb.png", id: 1},
    1: {name: "dressertop.png", id: 1},
    1: {name: "druidcircle1.png", id: 1},
    1: {name: "druidcircle2.png", id: 1},
    1: {name: "druidcircle3.png", id: 1},
    1: {name: "druidcircle4.png", id: 1},
    1: {name: "druidcircle5.png", id: 1},
    1: {name: "druidcircle6.png", id: 1},
    1: {name: "druidcircle7.png", id: 1},
    1: {name: "druidcircle8.png", id: 1},
    1: {name: "druidcircle9.png", id: 1},
    1: {name: "druidhouse_fl.png", id: 1},
    1: {name: "druidhouse_fm.png", id: 1},
    1: {name: "druidhouse_fr.png", id: 1},
    1: {name: "druidhouse_ml.png", id: 1},
    1: {name: "druidhouse_mr.png", id: 1},
    1: {name: "druidhouse_tl.png", id: 1},
    1: {name: "druidhouse_tm.png", id: 1},
    1: {name: "druidhouse_tr.png", id: 1},
    1: {name: "fence.png", id: 1},
    1: {name: "fencebottomleftpost.png", id: 1},
    1: {name: "fencebottomrightpost.png", id: 1},
    1: {name: "fenceleftpost.png", id: 1},
    1: {name: "fenceleftside.png", id: 1},
    1: {name: "fencerightpost.png", id: 1},
    1: {name: "fenceside.png", id: 1},
    1: {name: "fencetopleftpost.png", id: 1},
    1: {name: "fencetoprightpost.png", id: 1},
    1: {name: "fountain.png", id: 1},
    1: {name: "garden_1.png", id: 1},
    1: {name: "garden_2.png", id: 1},
    1: {name: "garden_3.png", id: 1},
    1: {name: "garden_4.png", id: 1},
    1: {name: "garden_5.png", id: 1},
    1: {name: "garden_6.png", id: 1},
    1: {name: "garden_7.png", id: 1},
    1: {name: "garden_8.png", id: 1},
    1: {name: "garden_9.png", id: 1},
    1: {name: "grass.png", id: 1},
    1: {name: "grave_3.png", id: 1},
    1: {name: "houseWall.png", id: 1},
    1: {name: "join_bar_wwall_l.png", id: 1},
    1: {name: "join_bar_wwall_r.png", id: 1},
    1: {name: "lflagstone1.png", id: 1},
    1: {name: "lflagstone2.png", id: 1},
    1: {name: "mausoleum_1.png", id: 1},
    1: {name: "mausoleum_2.png", id: 1},
    1: {name: "mausoleum_3.png", id: 1},
    1: {name: "mausoleum_4.png", id: 1},
    1: {name: "mausoleumB_1.png", id: 1},
    1: {name: "mausoleumB_2.png", id: 1},
    1: {name: "mausoleumB_3.png", id: 1},
    1: {name: "mausoleumB_4.png", id: 1},
    1: {name: "oblisk grave.png", id: 1},
    1: {name: "OpenDoorway.png", id: 1},
    1: {name: "orc_hut_bl.png", id: 1},
    1: {name: "orc_hut_br.png", id: 1},
    1: {name: "orc_hut_tl.png", id: 1},
    1: {name: "orc_hut_tr.png", id: 1},
    1: {name: "pub.png", id: 1},
    1: {name: "roofbackleft.png", id: 1},
    1: {name: "roofbackright.png", id: 1},
    1: {name: "roofbackside.png", id: 1},
    1: {name: "roofbottomright.png", id: 1},
    1: {name: "roofcenter.png", id: 1},
    1: {name: "rooffront.png", id: 1},
    1: {name: "rooffrontleft.png", id: 1},
    1: {name: "roofFrontRight.png", id: 1},
    1: {name: "roofleftside.png", id: 1},
    1: {name: "stool.png", id: 1},
    1: {name: "table.png", id: 1},
    1: {name: "throwingRocks.png", id: 1},
    1: {name: "treasure.png", id: 1},
    1: {name: "tree_pine_blue_l.png", id: 1},
    1: {name: "tree_pine_blue_r.png", id: 1},
    1: {name: "tree_pine_l.png", id: 1},
    1: {name: "tree_pine_r.png", id: 1},
    1: {name: "tree_pine_yellow_l.png", id: 1},
    1: {name: "tree_pine_yellow_r.png", id: 1},
    1: {name: "Trees\1: {name: "tree1.png", id: 1},
    1: {name: "Trees\1: {name: "tree2.png", id: 1},
    1: {name: "tree2bottomhalf.png", id: 1},
    1: {name: "tree2tophalf.png", id: 1},
    1: {name: "Trees\1: {name: "tree3.png", id: 1},
    1: {name: "tree3bottomhalf.png", id: 1},
    1: {name: "tree3tophalf.png", id: 1},
    1: {name: "Trees\1: {name: "tree4.png", id: 1},
    1: {name: "tree4bottomhalf.png", id: 1},
    1: {name: "tree4tophalf.png", id: 1},
    1: {name: "tree5FallenBottom.png", id: 1},
    1: {name: "tree5FallenTopHalf.png", id: 1},
    1: {name: "treeA1.png", id: 1},
    1: {name: "treeA2.png", id: 1},
    1: {name: "treeA3.png", id: 1},
    1: {name: "treeA4.png", id: 1},
    1: {name: "weaponsrack.png", id: 1},
    1: {name: "weaponsracklh.png", id: 1},
    1: {name: "woodwall_bc.png", id: 1},
    1: {name: "woodwall_bl.png", id: 1},
    1: {name: "woodwall_br.png", id: 1},
    1: {name: "woodwall_ml.png", id: 1},
    1: {name: "woodwall_mr.png", id: 1},
    1: {name: "woodwall_tc.png", id: 1},
    1: {name: "woodwall_tl.png", id: 1},
    1: {name: "woodwall_tr.png", id: 1},
    1: {name: "woodwall_wdw_tc.png", id: 1},
    1: {name: "worldRoad.png", id: 1},
    1: {name: "frontdoor.png", id: 1},
    1: {name: "dresserbottom.png", id: 1},
    1: {name: "castle_door_lr1.png", id: 1},
    1: {name: "castle_door_lr2.png", id: 1},
    1: {name: "castle_door_lr3.png", id: 1},
    1: {name: "castle_door_lr4.png", id: 1},
    1: {name: "castle_door_lr5.png", id: 1},
    1: {name: "castle_door_lr6.png", id: 1},
    1: {name: "castle_door_lr7.png", id: 1},
    1: {name: "castle_door_lr8.png", id: 1},
    1: {name: "castle_door_lr9.png", id: 1},
    1: {name: "castle_door_lr10.png", id: 1},
    1: {name: "castle_door_lr11.png", id: 1},
    1: {name: "castle_door_lr12.png", id: 1},
    1: {name: "castle_door_lr13.png", id: 1},
    1: {name: "castle_door_lr14.png", id: 1},
    1: {name: "castle_door_lr15.png", id: 1},
    1: {name: "castle_door_lr16.png", id: 1},
    1: {name: "castle_door_t1.png", id: 1},
    1: {name: "castle_door_t2.png", id: 1},
    1: {name: "castle_wall_b1.png", id: 1},
    1: {name: "castle_wall_b2.png", id: 1},
    1: {name: "castle_wall_b3.png", id: 1},
    1: {name: "castle_wall_btl1.png", id: 1},
    1: {name: "castle_wall_btl2.png", id: 1},
    1: {name: "castle_wall_btl3.png", id: 1},
    1: {name: "castle_wall_btl4.png", id: 1},
    1: {name: "castle_wall_btl5.png", id: 1},
    1: {name: "castle_wall_btr1.png", id: 1},
    1: {name: "castle_wall_btr2.png", id: 1},
    1: {name: "castle_wall_btr3.png", id: 1},
    1: {name: "castle_wall_lr1.png", id: 1},
    1: {name: "castle_wall_lr2.png", id: 1},
    1: {name: "castle_wall_lr3.png", id: 1},
    1: {name: "castle_wall_lr4.png", id: 1},
    1: {name: "castle_wall_lr5.png", id: 1},
    1: {name: "castle_wall_lr6.png", id: 1},
    1: {name: "castle_wall_lr7.png", id: 1},
    1: {name: "castle_wall_lr8.png", id: 1},
    1: {name: "castle_wall_ltb1.png", id: 1},
    1: {name: "castle_wall_ltb2.png", id: 1},
    1: {name: "castle_wall_ltb3.png", id: 1},
    1: {name: "castle_wall_ltt1.png", id: 1},
    1: {name: "castle_wall_ltt2.png", id: 1},
    1: {name: "castle_wall_rtb1.png", id: 1},
    1: {name: "castle_wall_rtb2.png", id: 1},
    1: {name: "castle_wall_rtb3.png", id: 1},
    1: {name: "castle_wall_rtb4.png", id: 1},
    1: {name: "castle_wall_rtb5.png", id: 1},
    1: {name: "castle_wall_rtt1.png", id: 1},
    1: {name: "castle_wall_rtt2.png", id: 1},
    1: {name: "castle_wall_rtt3.png", id: 1},
    1: {name: "castle_wall_rtt4.png", id: 1},
    1: {name: "castle_wall_tc1.png", id: 1},
    1: {name: "castle_wall_tc2.png", id: 1},
    1: {name: "castle_wall_tc3_b.png", id: 1},
    1: {name: "castle_wall_tc3_t.png", id: 1},
    1: {name: "castle_wall_tc4_b.png", id: 1},
    1: {name: "castle_wall_tc4_t.png", id: 1},
    1: {name: "castle_wall_tc5.png", id: 1},
    1: {name: "castle_wall_ttl1.png", id: 1},
    1: {name: "castle_wall_ttl2.png", id: 1},
    1: {name: "castle_wall_ttl3.png", id: 1},
    1: {name: "castle_wall_ttl4.png", id: 1},
    1: {name: "castle_wall_ttr1.png", id: 1},
    1: {name: "castle_wall_ttr2.png", id: 1},
    1: {name: "castle_window1.png", id: 1},
    1: {name: "castle_wall_btr4.png", id: 1},
    1: {name: "castle_wall_ltb4.png", id: 1},
    1: {name: "castle_wall_rtt5.png", id: 1},
    1: {name: "castle_wall_ttl5.png", id: 1},
    1: {name: "castle_battlement_b1.png", id: 1},
    1: {name: "castle_battlement_b2.png", id: 1},
    1: {name: "castle_battlement_btl.png", id: 1},
    1: {name: "castle_battlement_btr.png", id: 1},
    1: {name: "castle_battlement_l1.png", id: 1},
    1: {name: "castle_battlement_l2.png", id: 1},
    1: {name: "castle_battlement_l3.png", id: 1},
    1: {name: "castle_battlement_ltb.png", id: 1},
    1: {name: "castle_battlement_ltt1.png", id: 1},
    1: {name: "castle_battlement_ltt2.png", id: 1},
    1: {name: "castle_battlement_mc1.png", id: 1},
    1: {name: "castle_battlement_mc2.png", id: 1},
    1: {name: "castle_battlement_mc3.png", id: 1},
    1: {name: "castle_battlement_mc4.png", id: 1},
    1: {name: "castle_battlement_mc5.png", id: 1},
    1: {name: "castle_battlement_mc6.png", id: 1},
    1: {name: "castle_battlement_mc7.png", id: 1},
    1: {name: "castle_battlement_mc8.png", id: 1},
    1: {name: "castle_battlement_mc9.png", id: 1},
    1: {name: "castle_battlement_mc10.png", id: 1},
    1: {name: "castle_battlement_r1.png", id: 1},
    1: {name: "castle_battlement_r2.png", id: 1},
    1: {name: "castle_battlement_r3.png", id: 1},
    1: {name: "castle_battlement_rtb.png", id: 1},
    1: {name: "castle_battlement_rtt.png", id: 1},
    1: {name: "castle_battlement_t.png", id: 1},
    1: {name: "castle_battlement_ttl.png", id: 1},
    1: {name: "castle_battlement_ttr1.png", id: 1},
    1: {name: "castle_battlement_ttr2.png", id: 1},
    1: {name: "castle_door_b1.png", id: 1},
    1: {name: "castle_door_b2.png", id: 1},
    1: {name: "castle_gate1_bl.png", id: 1},
    1: {name: "castle_gate1_br.png", id: 1},
    1: {name: "castle_gate1_tl.png", id: 1},
    1: {name: "castle_gate1_tr.png", id: 1},
    1: {name: "castle_gate2_bl.png", id: 1},
    1: {name: "castle_gate2_br.png", id: 1},
    1: {name: "castle_gate2_tl.png", id: 1},
    1: {name: "castle_gate2_tr.png", id: 1},
    1: {name: "castle_gate3_bl.png", id: 1},
    1: {name: "castle_gate3_br.png", id: 1},
    1: {name: "castle_gate3_tl.png", id: 1},
    1: {name: "castle_gate3_tr.png", id: 1},
    1: {name: "castle_gate4_bl.png", id: 1},
    1: {name: "castle_gate4_br.png", id: 1},
    1: {name: "castle_gate4_tl.png", id: 1},
    1: {name: "castle_gate4_tr.png", id: 1},
    1: {name: "castle_gate5_tl.png", id: 1},
    1: {name: "castle_gate5_tr.png", id: 1},
    1: {name: "castle_pillar_bl.png", id: 1},
    1: {name: "castle_pillar_br.png", id: 1},
    1: {name: "castle_pillar_ml.png", id: 1},
    1: {name: "castle_pillar_mr.png", id: 1},
    1: {name: "castle_pillar_tl.png", id: 1},
    1: {name: "castle_pillar_tr.png", id: 1},
    1: {name: "castle_wall_l1.png", id: 1},
    1: {name: "castle_wall_l2.png", id: 1},
    1: {name: "castle_wall_l3.png", id: 1},
    1: {name: "castle_wall_l4.png", id: 1},
    1: {name: "castle_wall_l5.png", id: 1},
    1: {name: "castle_wall_mc1.png", id: 1},
    1: {name: "castle_wall_r1.png", id: 1},
    1: {name: "castle_wall_r2.png", id: 1},
    1: {name: "castle_wall_r3.png", id: 1},
    1: {name: "castle_wall_r4.png", id: 1},
    1: {name: "castle_wall_r5.png", id: 1},
    1: {name: "castle_window2.png", id: 1},
    1: {name: "castle_bg1.png", id: 1},
    1: {name: "castle_bg2.png", id: 1},
    1: {name: "castle_bg3.png", id: 1},
    1: {name: "castle_bg4.png", id: 1},
    1: {name: "castle_bg5.png", id: 1},
    1: {name: "castle_bg6.png", id: 1},
    1: {name: "castle_bg7.png", id: 1},
    1: {name: "castle_bg8.png", id: 1},
    1: {name: "castle_bg9.png", id: 1},
    1: {name: "castle_bg10.png", id: 1},
    1: {name: "castle_bg11.png", id: 1},
    1: {name: "castle_bg12.png", id: 1},
    1: {name: "castle_bg13.png", id: 1},
    1: {name: "castle_bg14.png", id: 1},
    1: {name: "castle_bg15.png", id: 1},
    1: {name: "castle_bg16.png", id: 1},
    1: {name: "castle_bg17.png", id: 1},
    1: {name: "castle_bg18.png", id: 1},
    1: {name: "castle_bg19.png", id: 1},
    1: {name: "castle_bg20.png", id: 1},
    1: {name: "castle_bg21.png", id: 1},
    1: {name: "castle_bg22.png", id: 1},
    1: {name: "castle_bg23.png", id: 1},
    1: {name: "castleb_gate1_tl.png", id: 1},
    1: {name: "castleb_gate1_tr.png", id: 1},
    1: {name: "castleb_gate2_tl.png", id: 1},
    1: {name: "castleb_gate2_tr.png", id: 1},
    1: {name: "castleb_gate3_tl.png", id: 1},
    1: {name: "castleb_gate3_tr.png", id: 1},
    1: {name: "castleb_gate4_tl.png", id: 1},
    1: {name: "castleb_gate4_tr.png", id: 1},
    1: {name: "castleb_gate5_tl.png", id: 1},
    1: {name: "castleb_gate5_tr.png", id: 1},
    1: {name: "castleb_wall_l1.png", id: 1},
    1: {name: "castleb_wall_l2.png", id: 1},
    1: {name: "castleb_wall_l3.png", id: 1},
    1: {name: "castleb_wall_l4.png", id: 1},
    1: {name: "castleb_wall_l5.png", id: 1},
    1: {name: "castleb_wall_mc1.png", id: 1},
    1: {name: "castleb_wall_r1.png", id: 1},
    1: {name: "castleb_wall_r2.png", id: 1},
    1: {name: "castleb_wall_r3.png", id: 1},
    1: {name: "castleb_wall_r4.png", id: 1},
    1: {name: "castleb_wall_r5.png", id: 1},
    1: {name: "castleb_window2.png", id: 1},
    1: {name: "castle_battlement_mc11.png", id: 1},
    1: {name: "waterFallPlaceholder.png", id: 1},
    1: {name: "waterPlaceholder.png", id: 1},
    1: {name: "bonfire_l_PH.png", id: 1},
    1: {name: "bonfire_r_PH.png", id: 1},
    1: {name: "bonfire_s_PH.png", id: 1},
    1: {name: "grass_b.png", id: 1},
    1: {name: "grass_btl.png", id: 1},
    1: {name: "grass_btr.png", id: 1},
    1: {name: "grass_l.png", id: 1},
    1: {name: "grass_ltb.png", id: 1},
    1: {name: "grass_ltt.png", id: 1},
    1: {name: "grass_r.png", id: 1},
    1: {name: "grass_rtb.png", id: 1},
    1: {name: "grass_rtt.png", id: 1},
    1: {name: "grass_t.png", id: 1},
    1: {name: "grass_ttl.png", id: 1},
    1: {name: "grass_ttr.png", id: 1},
    1: {name: "cliff_stairs_l.png", id: 1},
    1: {name: "cliff_stairs_u.png", id: 1},
    */


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
				this.spriteMap[id] = sprite;
                this.spriteNameMap[name] = sprite;
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