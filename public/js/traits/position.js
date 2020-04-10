import Trait from './trait.js'
export default class Position extends Trait{
    constructor(){
        super('position');
    }
    // update the position of entity after time dt
    update(entity,dt){
        entity.pos.x +=(entity.velocity.x * dt);
        entity.pos.y +=(entity.velocity.y * dt);
        //falling also need acc
        entity.velocity.y +=entity.acc; //gravity, so if not move, y velocity is positive
        console.log('y speed is',entity.velocity.y);
        console.log('x speed is',entity.velocity.x);
    }
} 
