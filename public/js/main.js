import {createMario} from './createMario.js';
import Timer from './time.js';

import {loadLevel}from './loader.js';
import {setupKeyBoard} from './input.js';
//create variables
const canvas =document.getElementById('screen');
const context = canvas.getContext('2d');

//loadBackGroundSprite(),loadBackGroundLevel('1')
//These three should run in parallel
//returned sprites,levelData are not promise object. They are resolved object.

Promise.all([createMario(),loadLevel('1')])
.then(([mario_entity,level]) =>{
    //checking properties
    console.log('mario loaded: ',mario_entity);
    console.log('level loaded: ', level);

    mario_entity.pos.set(64,64);
    // mario_entity.velocity.set(20,0);

    level.entities.add(mario_entity);

    //setting up keyboard
    const input=setupKeyBoard(mario_entity);
    input.listenTo(window);

    ['mousedown','mousemove'].forEach(eventName=>{
        canvas.addEventListener(eventName, event=>{
            if(event.buttons ===1){
                mario_entity.velocity.set(0,0);
                mario_entity.pos.set(event.offsetX,event.offsetY);
            }
        })
    })

    //Update the mario
    const timer = new Timer(1/50);
    //write new method for timer object
    timer.update = function update(dt){
        level.compo.draw(context); //drawing background, entities and collision layer
        level.update(dt); // update 
    
    }
    timer.start();
});
