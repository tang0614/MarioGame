import Killable from '../traits/killable.js';
import {loadAudioBoard} from '../loader/audio.js';
import AnimalGo from '../traits/animalGo.js';
import {loadSpriteSheet} from '../loader.js';
import Entity from '../entity.js';
import Position from '../traits/position.js';
import FlowerBehavior from '../traits/flowerBehavior.js'
import AnimalFly from '../traits/animalFly.js';

export function loadFlower(audioContext){

    return Promise.all([loadSpriteSheet('flower'),loadAudioBoard('sound',audioContext)])
    
    .then(result=>{return createFlowerEntity(result[0],result[1])}); 
 
}

function createFlowerEntity(flower,audioBoard){
    const anime_run = flower.animation.get('showup');
  
    function routeFrame(flower_entity){
     
        return anime_run(flower_entity.walk.duration);
    }


    function drawFlower(context,camera){
        
        flower.draw(routeFrame(this),context,this.pos.x-camera.pos.x,this.pos.y-camera.pos.y);
    }


    return function createFlowerFunction(){
        const flower_entity = new Entity('flower');
        flower_entity.size.set(16,16);
        flower_entity.velocity.set(0,0);
        flower_entity.audio=audioBoard;
        flower_entity.addTrait(new Position());
        flower_entity.addTrait(new AnimalGo());
        flower_entity.addTrait(new AnimalFly());
        flower_entity.addTrait(new FlowerBehavior());
        flower_entity.addTrait(new Killable());


        flower_entity.walk.acc_x=0;
        flower_entity.animalFly.acc_y = 1100;
      

        //add a draw method to mario entity
        flower_entity.draw = drawFlower;
        return flower_entity;
    }
}