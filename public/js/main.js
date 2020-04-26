import Timer from './time.js';
import {createLoadLevel}from './loader/loadLevel.js';
import {setupKeyBoard} from './input.js';
import Camera from './camera.js';
import {drawCameraLayer} from './layer.js';
import {setMouseControl} from './control.js';
import {loadEntities} from './loader/loadEntities.js';
//loadBackGroundSprite(),loadBackGroundLevel('1')
//These three should run in parallel
//returned sprites,levelData are not promise object. They are resolved object.

async function main(canvas){
    const context = canvas.getContext('2d');

    const entitiyFactories = await loadEntities(); //return back a promise
    const levelfunction = await createLoadLevel(entitiyFactories);  //return back a promise
    const level = await levelfunction('1');//return back a promise

    const mario_entity = entitiyFactories.mario();
    mario_entity.pos.set(64,64);
    level.entities.add(mario_entity);

    //camera
    const camera = new Camera();
    const drawCamera_function = drawCameraLayer(camera);
    level.compo.layers.push(drawCamera_function);

    //scrolling 
    setMouseControl(canvas,mario_entity,camera);

    //setting up keyboard and setMouseControl
    const input=setupKeyBoard(mario_entity);
    input.listenTo(window);

    //Update the mario
    const timer = new Timer(1/50);
    //write new method for timer object
    timer.update = function update(dt){
        //camera position changes when we scroll the canvas 
        if(mario_entity.pos.x<0){
            mario_entity.pos.x=0;

        }
        camera.pos.x = Math.max(0,mario_entity.pos.x-50);
       
        level.compo.draw(context,camera); //drawing background, entities and collision layer
        level.update(dt); // update 
    
    }
    timer.start();

}

const canvas = document.getElementById('screen');

//don't need await because we don't need the returned value, only need to fire it
main(canvas);
    
   
   

