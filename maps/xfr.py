#!/usr/bin/env python3

import os
import sys
import re
import json

basePath = os.path.join(os.path.dirname(os.path.realpath(__file__)), '..')
jsPath = os.path.join(basePath, 'js')
mapPath = os.path.join(basePath, 'maps')
worldJs = os.path.join(jsPath, 'World.js')
imageJs = os.path.join(jsPath, 'utilities', 'imageLoading.js')
tilesetPath = os.path.join(mapPath, 'tiles.json')
zoneWidth = 64
zoneHeight = 48
tileWidth = 50
tileHeight = 50
dfltTile = 'TILE_GRASS'
bgTiles = [
    'TILE_GRASS',
    'TILE_ROAD',
    'TILE_BAR_FLOOR1',
    'TILE_BAR_FLOOR2',
]

# read zones from World.js
zones = [
    'druidsGroove', 
    'forest', 
    'graveYard', 
    'fallDale', 
    'fallDale2', 
    'upperForest',
    'middleWoods',
]

# parse desired map from world.js data
def parseZoneMap(data, mapName):
    p = r'^var\s*%s\s*=\s*\[([^]]*)\]' % mapName
    match = re.search(p, data, re.MULTILINE|re.DOTALL)
    tiles = []
    if match:
        grid = match.group(1)
        for tile in grid.split(','):
            tiles.append(tile.strip())
    return tiles

# parse tile constants from world data
def parseTileConsts(data):
    ignore = ['TILE_W', 'TILE_H']
    p = r'^const\s*(TILE_[A-Z0-9_]*)\s*=\s*(\d*);'
    consts = {}
    for match in re.finditer(p, data, re.MULTILINE):
        if match and not match.group(1) in ignore:
            consts[match.group(2)] = match.group(1)
    return consts

def parseTransConsts(data, fcn, transMap, const):
    # function tileTypeHasBarFloorTransparency(checkTileType) {
    p = r'^function\s*%s\(checkTileType\)\s*{([^}]*)}' % fcn
    match = re.search(p, data, re.MULTILINE|re.DOTALL)
    consts = match.group(1)
    p = r'checkTileType\s*==\s(TILE_[A-Z0-9_]*)\s*'
    for match in re.finditer(p, consts, re.MULTILINE):
        if match:
            transMap[match.group(1)] = const

# parse transparency info from world data
def parseTransparencyMap(data):
    transMap = {}
    parseTransConsts(data, 'tileTypeHasBarFloorTransparency', transMap, 'TILE_BAR_FLOOR1')
    parseTransConsts(data, 'tileTypeHasGrassTransparency', transMap, 'TILE_GRASS')
    parseTransConsts(data, 'tileTypeHasTransparency', transMap, 'TILE_ROAD')
    return transMap

# parse tile to image map from image data
def parseTileImageMap(data):
    p = r'^\s*{\s*tileType\s*:\s*(TILE_[A-Z0-9_]*)\s*,\s*theFile:\s*"([^"]*)"'
    imageMap = {}
    for match in re.finditer(p, data, re.MULTILINE):
        if match:
            # constName => file
            imageMap[match.group(1)] = match.group(2)
    return imageMap

def parseJsonTileset(data, imageMap):
    renamed = {
        'bush2.png': 'TILE_BUSH',
    }
    parsed = json.loads(data)

    tileset = {}
    for tile in parsed['tiles']:
        # try to match tile based on source image
        jfile = os.path.basename(tile['image'])
        match = False
        if jfile in renamed:
            match = True
            # constName => (newID, newFile)
            tileset[renamed[jfile]] = (tile['id']+1, jfile)
        else:
            for k, v in imageMap.items():
                mfile = os.path.basename(v)
                if mfile == jfile:
                    tileset[k] = (tile['id']+1, jfile)
                    match = True
        if not match:
            print("cannot find matching tile for: %s" % tile)
    return tileset

def newLayer(name, id, grid):
    return {
        'data': grid,
        'height': zoneHeight,
        'id': id,
        'name': name,
        'opacity': 1,
        'type': 'tilelayer',
        'visible':True,
        'width':zoneWidth,
        'x':0,
        'y':0
    }

def newGrid(tileID):
    grid = []
    for i in range(0,zoneWidth*zoneHeight):
        grid.append(tileID)
    return grid

def newZone(layers):
    return { "compressionlevel":-1,
        "height":zoneHeight,
        "infinite":False,
        "layers":layers,
        "nextlayerid":len(layers)+1,
        "nextobjectid":1,
        "orientation":"orthogonal",
        "renderorder":"right-down",
        "tiledversion":"1.3.3",
        "tileheight":tileHeight,
        "tilesets":[ {
            "firstgid":1,
            "source":"tiles.json"
        }],
        "tilewidth":tileWidth,
        "type":"map",
        "version":1.2,
        "width":zoneWidth
    }

def lookupConst(consts, id):
    # lookup constant in tileset
    (newTileID, newFile) = tileset.get(id, (0,''))
    return newTileID

def translateGrid(oldGrid, consts, tileset, transMap):
    bgGrid = []
    fgGrid = []
    dfltTileID = lookupConst(consts,dfltTile)
    for tile in oldGrid:
        bgTileID = dfltTileID
        fgTileID = 0
        # lookup const
        const = consts.get(tile, "")
        if const == "":
            print("failed to lookup constant for tile id: %s" % tile)
        else:
            # is tile a bg tile
            if const in bgTiles:
                fgTileID = 0
                bgTileID = lookupConst(consts, const)
            else:
                # lookup constant in tileset
                fgTileID = lookupConst(consts, const)
                if fgTileID == 0:
                    print("failed to lookup new tile for constant: %s" % const)
                # does tile have transparency?
                if const in transMap:
                    bgTileID = lookupConst(consts, transMap[const])
        fgGrid.append(fgTileID)
        bgGrid.append(bgTileID)
    return fgGrid, bgGrid

def translateZone(fgGrid, bgGrid):
    layerNames = ["Background", "Background Overlay", "Midground", "Foreground"]
    layerID = 1
    layers = []
    for name in layerNames:
        # fill bg w/ default tile
        if name == "Background":
            layer = newLayer(name, layerID, bgGrid)
        # midground becomes default layer from translated map
        elif name == "Midground":
            layer = newLayer(name, layerID, fgGrid)
        # other layers just filled in w/ dflt
        else:
            layer = newLayer(name, layerID, newGrid(0))
        layers.append(layer)
        layerID += 1
    return newZone(layers)

if __name__ == '__main__':

    # load data
    worldJsData = ""
    with open(worldJs, 'r') as fd:
        worldJsData = fd.read()

    imageJsData = ""
    with open(imageJs, 'r') as fd:
        imageJsData = fd.read()

    tilesetData = ""
    with open(tilesetPath, 'r') as fd:
        tilesetData = fd.read()


    consts = parseTileConsts(worldJsData)
    #print("consts: %s" % consts)

    transMap = parseTransparencyMap(worldJsData)

    imageMap = parseTileImageMap(imageJsData)
    #print("imageMap: %s" % imageMap)

    tileset = parseJsonTileset(tilesetData, imageMap)
    #print("tileset: %s" % tileset)

    #zones = ["fallDale"]
    for zone in zones:
        grid = parseZoneMap(worldJsData, zone)
        #print("grid: %s" % grid)

        # translate the grid from old indicies to new
        fgGrid, bgGrid = translateGrid(grid, consts, tileset, transMap)

        # create the final zone structure
        finalZone = translateZone(fgGrid, bgGrid)

        # and save the new map
        zonePath = os.path.join(mapPath, zone + ".json")
        with open(zonePath, "w") as fd:
            json.dump(finalZone, fd)
