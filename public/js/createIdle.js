import Entity from './entity.js';
import {loadMarioSprite,loadBackGroundSprite,loadBackGroundLevel} from './sprites.js';


export function createMario(){
  
    return loadMarioSprite()
    .catch(err=>{console.log(err.message)})
    .then(mario=>{
        const mario_entity = new Entity('mario',mario,0.5);
        mario_entity.pos.set(64,100);
        mario_entity.velocity.set(2,-10);
        return mario_entity
    })
}




