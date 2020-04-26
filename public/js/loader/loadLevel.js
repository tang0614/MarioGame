import Level from '../level.js';
import {getBackgroundLayer,getSpriteLayer} from '../layer.js';
import {createCollisionLayer} from '../layer.js';
import {expandTiles} from '../createTilesGrid.js';
import {loadJSON,loadSpriteSheet} from '../loader.js';
import Matrix from '../matrix.js';

//closure is created, loadlevel is the child function

export function createLoadLevel(entityFactory){
    //callback function is used for async processing
    return function loadLevel(name){

        return loadJSON(`./levels/${name}.json`)
        .then(levelFile=>{
            return Promise.all([
                levelFile,
                loadSpriteSheet(levelFile.spriteSheet),  //passing in overworld json file
            ]);
        })
        .then(([levelFile,BackGroundSprite])=>{
            
            const level = new Level();
            pushBackgroundOnLevelCompo(levelFile,level,BackGroundSprite);
        
            pushEntitiesOnLevelCompo(levelFile,level,entityFactory);

            pushCollisionOnLevelCompo(levelFile,level);
        
            return level;

        });
    }
}


function createCollisionGrid(tiles,patterns){
     
    const collistionGrid = new Matrix();
    const expandedTiles=expandTiles(tiles,patterns);
    for(const {tile,X,Y} of expandedTiles){
        collistionGrid.set(X,Y,{
                        type: tile.type
        });

    }
    return collistionGrid;

}

function createBackgroundGridwithTileName(tiles,patterns){
     
    const backgroundGrid = new Matrix();

    const expandedTiles=expandTiles(tiles,patterns);

    //tile,X,Y are values inside object
    
    for(const {tile,X,Y} of expandedTiles){
        backgroundGrid.set(X,Y,{
                        "name": tile.name
        });

    }
    return backgroundGrid;
}

function pushBackgroundOnLevelCompo(levelFile,level,BackGroundSprite){
    levelFile.layers.forEach(layer=>{
        //layer one - drawing background on context according to element's name and posiiton in matrix
        const backgroundGrid = createBackgroundGridwithTileName(layer.tiles,levelFile.patterns);
        const background_draw_function = getBackgroundLayer(level,backgroundGrid,BackGroundSprite);
        //draw background tiles on buffer
        //draw buffer on context
        //the returned background_draw_function only called when execute level.compo.layers
        level.compo.layers.push(background_draw_function);

    })
}


function pushEntitiesOnLevelCompo(levelFile,level,entityFactory){
    //entityFactory has mario,koopa and goomba entities
    
    //levelFile.entities has koopa and goomba
    levelFile.entities.forEach(({name, pos:[x,y]})=>{

        const createEntityFunc= entityFactory[name]; 
        const newEntity_object = createEntityFunc()
     
        newEntity_object.pos.set(x,y);
        level.entities.add(newEntity_object);
    })

    
    const draw_entity_function = getSpriteLayer(level.entities);
    level.compo.layers.push(draw_entity_function);
}


function pushCollisionOnLevelCompo(levelFile,level){
    //merge all tiles from all layers into the same layer
    const mergedTiles = levelFile.layers.reduce((mergedTiles,layer)=>{
        return mergedTiles.concat(layer.tiles); //return values goes back to mergedTiles, mergedTiles starts with []
    },[]);
    
    //layer three -top layer- need entities and backgroud-sprite to draw collision
    const collistionGrid = createCollisionGrid(mergedTiles,levelFile.patterns);
    level.setCollisionGrid(collistionGrid); //become a tile resolver inside level

    const draw_collision_function =createCollisionLayer(level);
    level.compo.layers.push(draw_collision_function);
}

