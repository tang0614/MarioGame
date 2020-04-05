import Compositor from './compository.js'
import {getBackgroundLayer,getSpriteLayer} from './layer.js'
import {createMario} from './entity.js';
import {loadBackGroundSprite,loadBackGroundLevel} from './sprites.js';
import Timer from './time.js';
import Keyboard from './keyboard.js'; 

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
    mario_entity.velocity.set(20,-200);

   
    const composite=new Compositor();

    const SPACE =38;
    const input =new Keyboard();
    input.addMapping(SPACE, keyState=>{
        if(keyState){
            console.log(mario_entity.traits[1].start());
        }else{
            console.log(mario_entity.traits[1].cancel());
        }
    });
    input.listenTo(window);

    const background_draw_function = getBackgroundLayer(levelData.backgrounds,background_sprites);
    composite.layers.push(background_draw_function);

    const mario_draw_function = getSpriteLayer(mario_entity);
    composite.layers.push(mario_draw_function);

    const timer = new Timer(1/50);
    timer.update = function update(dt){
        console.log('update/refresh time');
        composite.draw(context);
        mario_entity.update(dt);
    
    }
    timer.start();
});
