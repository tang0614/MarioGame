import SpriteSheet from './SpriteSheet.js';
import {loadImage,loadLevel} from './loader.js';


//create variables
const canvas =document.getElementById('screen');
const context = canvas.getContext('2d');


function loadBackGroundSprite() {


    return loadImage('./image/tiles.png')//loading image
            .catch(err => console.error(err.message))
            .then(image =>{
                const sprites = new SpriteSheet(image,16,16); //subsetted image size in browser
                sprites.defineTile('ground',0,0); // subsetting the image
                sprites.defineTile('sky',3,23); // subsetting the image
                return sprites
            });
}

function loadBackGroundLevel(name) {
    return loadLevel(name)
    .catch(err=>console.log(err.message))
    .then(levelData =>{
        return levelData
    })
}

function loadMarioSprite() {

    return loadImage('./image/characters.gif')//loading image
            .catch(err => console.error(err.message))
            .then(image =>{
                const sprites = new SpriteSheet(image,16,16); //subsetted image size in browser
                sprites.define('mario',276,44,16,16); // subsetting the image
                return sprites
            });
}


function drawBackGround(backgrounds, context, sprites){
    backgrounds.ranges.forEach(([x1,x2,y1,y2])=>{
        for(let x=x1; x<x2; x++){
            for(let y=y1; y<y2;y++){
                sprites.drawTile(backgrounds.tile,context,x,y); //location of the subsetted image in browser
            }
        }
    })
}

//These three should run in parallel
//returned sprites,levelData are not promise object
Promise.all([loadMarioSprite(),loadBackGroundSprite(),loadBackGroundLevel('1')])
.then(([mario,sprites,levelData]) =>{
    console.log('mario loaded: ',mario);
    console.log('level loaded: ', levelData);
    console.log('sprites loaded: ',sprites);
    
    
    levelData.backgrounds.forEach((background)=>{
        drawBackGround(background,context,sprites);
       
    }); 

    mario.draw('mario',context,64,64);

})