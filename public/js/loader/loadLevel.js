import Level from '../level.js';
import {getBackgroundLayer,getSpriteLayer} from '../layer.js'
import {createCollisionLayer} from '../layer.js'
import {createMario} from '../createMario.js';
import {expandTiles} from '../createTilesGrid.js'
import {loadJSON,loadSpriteSheet} from '../loader.js'
import Matrix from '../matrix.js';

export function loadLevel(name){
    return loadJSON(`./levels/${name}.json`)
    .then(levelFile=>{
          return Promise.all([
            levelFile,
            loadSpriteSheet(levelFile.spriteSheet),
            createMario(),
        ]);
    })
    .then(([levelFile,BackGroundSprite,mario_entity])=>{
        const level = new Level();
        //lowested layer- set up matrix with range and name
        //give each element inside the matrix a name/value
        const collistionGrid = createCollisionGrid(levelFile.tiles,levelFile.patterns);
        level.setCollisionGrid(collistionGrid); //become a tile resolver inside level

        
       
        //layer one - drawing background on context according to element's name and posiiton in matrix
        const backgroundGrid = createBackgroundGrid(levelFile.tiles,levelFile.patterns);
        const background_draw_function = getBackgroundLayer(level,backgroundGrid,BackGroundSprite);
        level.compo.layers.push(background_draw_function);
        
        //layer two - drawing entities on context
        level.entities.add(mario_entity);
        const mario_draw_function = getSpriteLayer(level.entities);
        level.compo.layers.push(mario_draw_function);

        //layer three -top layer- need entities and backgroud-sprite to draw collision
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