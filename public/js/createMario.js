import {loadMarioSprite} from './sprites.js';
import Go from './traits/go.js'
import Jump from './traits/jump.js'
import Velocity from './traits/velocity.js'
import Entity from './entity.js'

export function createMario(){
  
    return loadMarioSprite()
    .catch(err=>{console.log(err.message)})
    .then(mario=>{
        const mario_entity = new Entity('mario',10);
        
        mario_entity.size.set(14,16);
        mario_entity.addTrait(new Jump());
        mario_entity.addTrait(new Velocity());
        
        //add a draw method to mario entity
        mario_entity.draw = function drawMario(context){
            mario.draw('mario',context,this.pos.x,this.pos.y);
           
        }
        
        return mario_entity
    })
}