import Timer from './time.js';
import {loadLevel}from './loader/loadLevel.js';
import {setupKeyBoard} from './input.js';
import Camera from './camera.js';
import {drawCameraLayer} from './layer.js';
import {setMouseControl} from './control.js';
//loadBackGroundSprite(),loadBackGroundLevel('1')
//These three should run in parallel
//returned sprites,levelData are not promise object. They are resolved object.
const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');


Promise.all([loadLevel('1')])
.then(([level]) =>{
    //checking properties
    console.log('level loaded: ', level);
    const iterator = level.entities.values();
    const mario_entity=iterator.next().value;
    const goomba_entity=iterator.next().value;
    console.log('mario_entity loaded: ', mario_entity);
    console.log('goomba_entity loaded: ', goomba_entity);

    //camera
    const camera = new Camera();
    window.camera = camera;
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
        if(mario_entity.pos.x>100){
            camera.pos.x = mario_entity.pos.x-100;
        }else{
            camera.pos.x = 0;
        }
        
        level.compo.draw(context,camera); //drawing background, entities and collision layer
        level.update(dt); // update 
    
    }
    timer.start();
});
