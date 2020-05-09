import Entity from '../entity.js';
import {loadSpriteSheet} from '../loader.js';
import AnimalGo from '../traits/animalGo.js';
import Jump from '../traits/jump.js';
import Position from '../traits/position.js'
import GoombaBehavior from '../traits/goombaBehavior.js'
import Killable from '../traits/killable.js';
import {loadAudioBoard} from '../loader/audio.js';




export function loadJugem(audioContext){

    return Promise.all([loadSpriteSheet('goomba'),loadAudioBoard('sound',audioContext)])
    
    .then(result=>{return createJugemEntity(result[0],result[1])}); 
 
}

function createJugemEntity(jugem,audioBoard){
    const anime_run = jugem.animation.get('walk');
  
    function routeFrame(jugem_entity){
        if(jugem_entity.killable.dead){
            return 'flat';
        }
        return anime_run(jugem_entity.walk.duration);
    }

    //create this function only once when loading the game, and then reuse it
    function drawJugem(context,camera){
        //draw method from sprite sheet (This pointing to the goomba entity)
        jugem.draw(routeFrame(this),context,this.pos.x-camera.pos.x,this.pos.y-camera.pos.y);
    }

    //return a function create mario
    return function createGoombaFunction(){
        const jugem_entity = new Entity('goomba');
        jugem_entity.size.set(16,16);
        jugem_entity.velocity.set(0,0);
        jugem_entity.audio=audioBoard;

        jugem_entity.addTrait(new AnimalGo());
        jugem_entity.addTrait(new Jump());
        jugem_entity.addTrait(new Position());
        jugem_entity.addTrait(new GoombaBehavior());
        jugem_entity.addTrait(new Killable());

        //add a draw method to mario entity
        jugem_entity.draw = drawJugem;
        return jugem_entity;
    }
}