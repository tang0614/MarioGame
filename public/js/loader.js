import Level from './level.js';
import {getBackgroundLayer,getSpriteLayer} from './layer.js'
import {createCollisionLayer,drawCameraLayer} from './layer.js'
import {createMario} from './createMario.js';
import SpriteSheet from './SpriteSheet.js';
import {createTilesGrid} from './createTilesGrid.js'
import {createAnime} from './anime.js';

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

function loadJSON(url){
    return fetch(url)
    .then(r=>r.json());

}


export function loadSpriteSheet(name) {
    return loadJSON(`./sprites/${name}.json`)
    .then(sheetSpec => Promise.all([
        sheetSpec,
        loadImage(sheetSpec.imageURL),
    ]))
    .then(([sheetSpec, image]) => {


        const sprites = new SpriteSheet(
            image,
            sheetSpec.tileW,
            sheetSpec.tileH);

        if(sheetSpec.tiles){
            sheetSpec.tiles.forEach(tileSpec => {
                sprites.defineTile(
                    tileSpec.name,
                    tileSpec.index[0],
                    tileSpec.index[1]);
            });    
        }
        if(sheetSpec.animations){
            
            sheetSpec.animations.forEach(animation=>{
                const animation_function = createAnime(animation.frames,animation.frameLen);
                sprites.defineAnim(animation.name, animation_function);
            });
        }

        if(sheetSpec.frames){
            sheetSpec.frames.forEach(frame=>{
                sprites.define(frame.name, 
                    frame.rect[0],
                    frame.rect[1],
                    frame.rect[2],
                    frame.rect[3]) // ...frame.rect
            });
        }
        
        
        return sprites;
    });
}


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
        //const draw_collision_function =createCollisionLayer(level);
        //level.compo.layers.push(draw_collision_function);
        
       
        return level;

    });
}


