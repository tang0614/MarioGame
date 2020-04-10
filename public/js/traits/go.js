import Trait from './trait.js'

export default class Go extends Trait{
    constructor(){
        super('go');
        this.dir =0;
        this.speed =80;
    }
    
    update(entity,dt){
        entity.velocity.x = this.speed * this.dir;
    }


}