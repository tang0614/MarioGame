import SpriteSheet from './SpriteSheet.js';
import {loadImage,loadLevel} from './loader.js';


//create variables
const canvas =document.getElementById('screen');
const context = canvas.getContext('2d');

loadImage('./image/tiles.png')//loading image
.then(image => {
    console.log(`w: ${image.width} | h: ${image.height}`)
    return(image); //must remeber to return
})
.catch(err => console.error(err))
.then(image =>{
    const sprites = new SpriteSheet(image,16,16); //subsetted image size in browser
    sprites.define('ground',0,0); // subsetting the image
    sprites.define('sky',3,23); // subsetting the image
    
    loadLevel('1')
    .then(f => {
        console.log(f);
        f.backgrounds.forEach((background)=>{
            drawBackGround(background,context,sprites);
        })
    
    });
    
    
    
});



function drawBackGround(backgrounds, context, sprites){
    backgrounds.ranges.forEach(([x1,x2,y1,y2])=>{
        for(let x=x1; x<x2; x++){
            for(let y=y1; y<y2;y++){
                sprites.drawTile(backgrounds.tile,context,x,y); //location of the subsetted image in browser
            }
        }
        

    })

}