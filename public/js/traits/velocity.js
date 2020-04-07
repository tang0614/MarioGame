import Trait from './trait.js'
export default class Velocity extends Trait{
    constructor(){
        super('velocity');
    }
    update(entity,dt){
        entity.pos.x +=(entity.velocity.x * dt);
        entity.pos.y +=(entity.velocity.y * dt);
        entity.velocity.y +=entity.acc;

    }
}
