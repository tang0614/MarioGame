import SpriteSheet from './SpriteSheet.js';
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

export function loadJSON(url){
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


