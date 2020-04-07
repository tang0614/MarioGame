import {createMario} from './entity.js';
import Timer from './time.js';
import Keyboard from './keyboard.js'; 
import {loadLevel}from './loader.js';
import {createCollisionLayer} from './layer.js'

//create variables
const canvas =document.getElementById('screen');
const context = canvas.getContext('2d');

//loadBackGroundSprite(),loadBackGroundLevel('1')
//These three should run in parallel
//returned sprites,levelData are not promise object. They are resolved object.

Promise.all([createMario(),loadLevel('1')])
.then(([mario_entity,level]) =>{
    console.log('mario loaded: ',mario_entity);
    console.log('level loaded: ', level);
    
    mario_entity.pos.set(64,64);
    level.compo.layers.push(createCollisionLayer(level));

    //mario_entity.velocity.set(20,-200);
    
    level.entities.add(mario_entity);

    const SPACE =40;
    const input =new Keyboard();
    
    input.addMapping(SPACE, keyState=>{
        if(keyState){
            mario_entity.traits[0].start();
        }else{
            mario_entity.traits[0].cancel();
        }
    });
    input.listenTo(window);

    

    ['mousedown','mousemove'].forEach(eventName=>{
        canvas.addEventListener(eventName, event=>{
            if(event.buttons ===1){
                mario_entity.velocity.set(0,0);
                mario_entity.pos.set(event.offsetX,event.offsetY);
            }
        })
    })

    const timer = new Timer(1/50);
    timer.update = function update(dt){
        level.compo.draw(context);
        level.update(dt);
    
    }
    timer.start();
});
