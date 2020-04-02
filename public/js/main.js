import SpriteSheet from './SpriteSheet.js';
import Compositor from './compository.js'
import {loadImage,loadLevel,loadBackGroundLevel} from './loader.js';
import {loadMarioSprite,loadBackGroundSprite} from './sprites.js';
import {getBackgroundLayer} from './layer.js'
//create variables
const canvas =document.getElementById('screen');
const context = canvas.getContext('2d');







function getSpriteLayer(sprite,pos){
    
    return function drawOnContext(context){
        sprite.draw('mario',context,pos.x,pos.y);
    }
}
//These three should run in parallel
//returned sprites,levelData are not promise object
Promise.all([loadMarioSprite(),loadBackGroundSprite(),loadBackGroundLevel('1')])
.then(([mario,sprites,levelData]) =>{
    console.log('mario loaded: ',mario);
    console.log('sprites loaded: ',sprites);
    console.log('level loaded: ', levelData);
    
    
    const composite=new Compositor();

    const layer_function = getBackgroundLayer(levelData.backgrounds,sprites);
    composite.layers.push(layer_function);

    const pos ={
        x:64,
        y:64
    };
    const mario_layer_function = getSpriteLayer(mario,pos);
    composite.layers.push(mario_layer_function);

    function update(){
        //draw all buffers on the context
        //replace the buffer in each update, not change redraw the context
        composite.draw(context);
        pos.x +=2;
        pos.y +=2;
        requestAnimationFrame(update);
    }

    //update();

})