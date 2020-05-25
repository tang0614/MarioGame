import Timer from './time.js';
import {createLoadLevel}from './loader/loadLevel.js';
import {setupKeyBoard} from './input.js';
import Camera from './camera.js';
import {setMouseControl} from './control.js';
import {loadEntities} from './loader/loadEntities.js';
import {drawFont} from './layers/fontLayer.js';
import {loadFont} from './loader.js';


//loadBackGroundSprite(),loadBackGroundLevel('1')
//These three should run in parallel
//returned sprites,levelData are not promise object. They are resolved object.
 
async function main(canvas){
    const context = canvas.getContext('2d');
    const audioContext = new AudioContext();

    //camera is use to determine the range of layers to draw on context
    const camera = new Camera();
    const entitiyFactories = await loadEntities(audioContext); //return back a promise
    const levelfunction = await createLoadLevel(entitiyFactories);  //return back a promise
    const level = await levelfunction('1');//return back a promise
    const font = await loadFont();
    level.compo.layers.push(drawFont(font,level));
   
    
    //entity position unit is not index, but number of pixel from (0,0);
    //one tile has 16 pixles, and 64/16 = 4 tile away from 0 
    //seeing three tile because first tile start at -16 pixel

    const mario_entity_reference = entitiyFactories['mario'];
    const mario_entity = mario_entity_reference();
    mario_entity.pos.set(0,0);
    level.entities.add(mario_entity);
    console.log(level);

    //clicking and move mario
    //setting up keyboard,enter enable jump 
    //right mario_entity dir=1,left mario_entity dir=-1
    setMouseControl(canvas,mario_entity,camera);
    const input=setupKeyBoard(mario_entity);
    input.listenTo(window);


    const timer = new Timer();
    //write a static method for timer object
    timer.update = function update(dt){
       
        //camera position changes when we scroll the canvas 
        if(mario_entity.pos.x<0){
            mario_entity.pos.x=0;
           
        }

       
        //camera is use to determine the range of layers to draw on context
        //it always start to draw from 50 pixel left to the mario
        camera.pos.x = Math.max(0,mario_entity.pos.x-64);
        camera.pos.x = Math.min(2900,mario_entity.pos.x);

        console.log(mario_entity.pos.x);
        console.log(camera.pos.x);

        level.compo.draw(context,camera); //drawing background, entities and collision layer
        level.updateEntity(dt,audioContext); // update 

        if(level.stop){
            alert("Game Over!!");
            throw "exit";
        } 
       
    }
    timer.start();
}

const canvas = document.getElementById('screen');

const start = ()=>{
    window.removeEventListener('click',start);
    main(canvas)
   
}
   
window.addEventListener('click',start);


//const eventEmitter = new EventEmitter();


