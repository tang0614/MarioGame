import {loadBackGroundSprite} from './sprites.js';
import Level from './level.js';
import {getBackgroundLayer,getSpriteLayer} from './layer.js'
import {createCollisionLayer} from './layer.js'
import {createMario} from './createMario.js';

export function loadImage(url){
    //return a correct object
    return new Promise((resolve,reject) =>{
        // this line of code run first
        console.log('creating image...');
        const image = new Image();

        // this line of code run second
        console.log('loading image...');
        image.src=url;

        //return resolve after loading event happens
        image.addEventListener('load',()=>{
            console.log('resolving images...');
            resolve(image);
        });

        image.addEventListener('error', () => {
            console.log('rejecting images...');
            reject(new Error(`Failed to load image's URL: ${url}`));
        
  
       });
        
    });
}

export function loadLevel(name){
    return Promise.all([
        fetch(`./levels/${name}.json`).then(r=>r.json()),
        loadBackGroundSprite(),
        createMario(),
    ])
    .then(([levelFile,BackGroundSprite,mario_entity])=>{

        const level = new Level();
        //lowested layer- set up matrix with range and name
        //give each element inside the matrix a name/value
        createTilesGrid(level,levelFile.backgrounds);

        //layer one - drawing background on context according to element's name and posiiton in matrix
        const background_draw_function = getBackgroundLayer(level,BackGroundSprite);
        level.compo.layers.push(background_draw_function);
        
        //layer two - drawing entities on context
        mario_entity.pos.set(64,64);
        level.entities.add(mario_entity);
        const mario_draw_function = getSpriteLayer(level.entities);
        level.compo.layers.push(mario_draw_function);

        //layer three -top layer- need entities and backgroud-sprite to draw collision
        const draw_collision_function =createCollisionLayer(level);
        level.compo.layers.push(draw_collision_function);

        return level;

    });
}


function createTilesGrid(level,backgrounds){
    backgrounds.forEach(background=>{
        background.ranges.forEach(([x1,x2,y1,y2])=>{
            for(let x=x1; x<x2; x++){
                for(let y=y1; y<y2;y++){

                    level.tiles_matrix.set(x,y,{
                        name: background.tile,
                    });
                }
            }
        })
        
    })
}