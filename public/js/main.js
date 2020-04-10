import Timer from './time.js';
import {setMouseControl} from './control.js';
import {loadLevel}from './loader.js';
import {setupKeyBoard} from './input.js';
import Camera from './camera.js'


//loadBackGroundSprite(),loadBackGroundLevel('1')
//These three should run in parallel
//returned sprites,levelData are not promise object. They are resolved object.
const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 240;

Promise.all([loadLevel('1')])
.then(([level]) =>{
    //checking properties
    console.log('level loaded: ', level);
    const iterator = level.entities.values();
    const mario_entity=iterator.next().value;

    //camera
    const camera = new Camera();

    window.camera = camera;

    //setting up keyboard
    const input=setupKeyBoard(mario_entity);
    input.listenTo(window);
    
    setMouseControl(canvas,mario_entity,camera);

   
    //Update the mario
    const timer = new Timer(1/50);
    //write new method for timer object
    timer.update = function update(dt){
        level.compo.draw(context,camera); //drawing background, entities and collision layer
        level.update(dt); // update 
    
    }
    timer.start();
});
