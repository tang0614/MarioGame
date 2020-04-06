import {createMario} from './entity.js';
import Timer from './time.js';
import Keyboard from './keyboard.js'; 
import {loadLevel}from './loader.js';


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
    //mario_entity.velocity.set(20,-200);
    
    level.entities.add(mario_entity);

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


    const timer = new Timer(1/50);
    timer.update = function update(dt){
        level.compo.draw(context);
        level.update(dt);
    
    }
    //timer.start();
});
