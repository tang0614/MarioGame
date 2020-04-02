import SpriteSheet from './SpriteSheet.js';
import Compositor from './compository.js'
import {getBackgroundLayer} from './layer.js'
import {createMario} from './createIdle.js';
import {loadBackGroundSprite,loadBackGroundLevel} from './sprites.js';

//create variables
const canvas =document.getElementById('screen');
const context = canvas.getContext('2d');


function getSpriteLayer(entity){
    return function drawOnContext(context){
        entity.draw(context);
    }
}


//These three should run in parallel
//returned sprites,levelData are not promise object. They are resolved object.
Promise.all([createMario(),loadBackGroundSprite(),loadBackGroundLevel('1')])
.then(([mario_entity,sprites,levelData]) =>{
    console.log('mario loaded: ',mario_entity);
    console.log('sprites loaded: ',sprites);
    console.log('level loaded: ', levelData);
   
    const composite=new Compositor();

    const layer_function = getBackgroundLayer(levelData.backgrounds,sprites);
    composite.layers.push(layer_function);

    
    const mario_layer_function = getSpriteLayer(mario_entity);
    composite.layers.push(mario_layer_function);

    function update(){
        //draw all buffers on the context
        //replace the buffer in each update, not change redraw the context
        composite.draw(context);
        mario_entity.update();
        requestAnimationFrame(update);
    }

    update();

})