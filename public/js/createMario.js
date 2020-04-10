import {loadMarioSprite} from './sprites.js';
import Go from './traits/go.js'
import Jump from './traits/jump.js'
import Position from './traits/position.js'
import Entity from './entity.js'

export function createMario(){
  
    return loadMarioSprite()
    .then(mario=>{
        const mario_entity = new Entity('mario',9,2);
        mario_entity.size.set(16,16);

        mario_entity.addTrait(new Go());
        mario_entity.addTrait(new Jump());
        mario_entity.addTrait(new Position());
        
        //add a draw method to mario entity
        mario_entity.draw = function drawMario(context,camera){
            //draw method from sprite sheet
            mario.draw('mario',context,this.pos.x-camera.pos.x,this.pos.y-camera.pos.y);
        }
        
        return mario_entity
    })
}