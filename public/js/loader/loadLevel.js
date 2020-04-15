import Level from '../level.js';
import {getBackgroundLayer,getSpriteLayer} from '../layer.js'
import {createCollisionLayer} from '../layer.js'
import {loadMario} from '../loadMario.js';
import {loadGoomba} from '../loadGoomba.js';
import {expandTiles} from '../createTilesGrid.js'
import {loadJSON,loadSpriteSheet} from '../loader.js'
import Matrix from '../matrix.js';

export function loadLevel(name){
    return loadJSON(`./levels/${name}.json`)
    .then(levelFile=>{
          return Promise.all([
            levelFile,
            loadSpriteSheet(levelFile.spriteSheet),
            loadMario(),
            loadGoomba(),
        ]);
    })
    .then(([levelFile,BackGroundSprite,createMario,createGoomba])=>{
        
        const level = new Level();
 
        //merge all tiles from all layers into the same layer
        const mergedTiles = levelFile.layers.reduce((mergedTiles,layer)=>{
            return mergedTiles.concat(layer.tiles); //return values goes back to mergedTiles, mergedTiles starts with []
        },[]);
    
        //layer one - drawing background on context according to element's name and posiiton in matrix
        levelFile.layers.forEach(layer=>{
            const backgroundGrid = createBackgroundGrid(layer.tiles,levelFile.patterns);
            const background_draw_function = getBackgroundLayer(level,backgroundGrid,BackGroundSprite);
            level.compo.layers.push(background_draw_function);

        })
        
        //layer two - drawing entities on context
        //createMario return back a function
        const mario_entity = createMario();
        
        level.entities.add(mario_entity);

        const goomba_entity = createGoomba(); 
        level.entities.add(goomba_entity);

        const draw_function = getSpriteLayer(level.entities);
        level.compo.layers.push(draw_function);


        //layer three -top layer- need entities and backgroud-sprite to draw collision
        const collistionGrid = createCollisionGrid(mergedTiles,levelFile.patterns);
        level.setCollisionGrid(collistionGrid); //become a tile resolver inside level

        const draw_collision_function =createCollisionLayer(level);
        level.compo.layers.push(draw_collision_function);
        
       
        return level;

    });
}


function createCollisionGrid(tiles,patterns){
     
    const collistionGrid = new Matrix();
    const expandedTiles=expandTiles(tiles,patterns);
    for(const {tile,derivedX,derivedY} of expandedTiles){
        collistionGrid.set(derivedX,derivedY,{
                        type: tile.type
        });

    }
    return collistionGrid;

}

function createBackgroundGrid(tiles,patterns){
     
    const backgroundGrid = new Matrix();

    const expandedTiles=expandTiles(tiles,patterns);

    for(const {tile,derivedX,derivedY} of expandedTiles){
        backgroundGrid.set(derivedX,derivedY,{
                        name: tile.name
        });

    }
    return backgroundGrid;

}