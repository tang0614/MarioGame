import {loadImage,loadLevel} from './loader.js';
import SpriteSheet from './SpriteSheet.js';

export function loadMarioSprite() {

    return loadImage('./image/characters.gif')//loading image
            .catch(err => console.error(err.message))
            .then(image =>{
                const sprites = new SpriteSheet(image,16,16); //subsetted image size in browser
                sprites.define('mario',276,44,16,16); // subsetting the image
                return sprites
            });
}



export function loadBackGroundLevel(name) {
    return loadLevel(name)
    .catch(err=>console.log(err.message))
    .then(levelData =>{
        return levelData
    })
}