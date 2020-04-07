import {loadBackGroundSprite} from './sprites.js';
import Level from './level.js';
import {getBackgroundLayer,getSpriteLayer} from './layer.js'

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
        loadBackGroundSprite()
    ])
    .then(([levelFile,BackGroundSprite])=>{
        const level = new Level();
        //set grid size in grid
        
        createTilesGrid(level,levelFile.backgrounds);

        const background_draw_function = getBackgroundLayer(level,BackGroundSprite);
        level.compo.layers.push(background_draw_function);


        const mario_draw_function = getSpriteLayer(level.entities);
        level.compo.layers.push(mario_draw_function);

        // const mario_border_function = createCollisionLayer(level);
        // level.comp.layers.push(mario_border_function);
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