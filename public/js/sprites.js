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

export function loadBackGroundSprite() {

    return loadImage('./image/tiles.png')//loading image
            .catch(err => console.error(err.message))
            .then(image =>{
                const sprites = new SpriteSheet(image,16,16); //subsetted image size in browser
                sprites.defineTile('ground',0,0); // subsetting the image
                sprites.defineTile('sky',3,23); // subsetting the image
                return sprites
            });
}