import Compositor from './compository.js'
import {getBackgroundLayer,getSpriteLayer} from './layer.js'
import {createMario} from './entity.js';
import {loadBackGroundSprite,loadBackGroundLevel} from './sprites.js';
import Timer from './time.js';

//create variables
const canvas =document.getElementById('screen');
const context = canvas.getContext('2d');


//These three should run in parallel
//returned sprites,levelData are not promise object. They are resolved object.
Promise.all([createMario(),loadBackGroundSprite(),loadBackGroundLevel('1')])
.then(([mario_entity,background_sprites,levelData]) =>{
    console.log('mario loaded: ',mario_entity);
    console.log('background sprites loaded: ',background_sprites);
    console.log('level loaded: ', levelData);
    mario_entity.pos.set(64,180);
    mario_entity.velocity.set(200,-600);

    const composite=new Compositor();

    const background_draw_function = getBackgroundLayer(levelData.backgrounds,background_sprites);
    composite.layers.push(background_draw_function);

    const mario_draw_function = getSpriteLayer(mario_entity);
    composite.layers.push(mario_draw_function);

    const timer = new Timer(1/60);
    timer.update = function update(dt){
        composite.draw(context);
        mario_entity.update(dt);
    
    }
    //timer.start();
});
