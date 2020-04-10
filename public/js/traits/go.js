import Trait from './trait.js'

export default class Go extends Trait{
    constructor(){
        super('go');
        this.dir =0;
        this.speed =80;
        this.distance = 0;

    }
    
    update(entity,dt){
        entity.velocity.x = this.speed * this.dir;
        if(this.dir){
            this.distance += Math.abs(entity.velocity.x) * dt;
        }else if (this.dir==-1){
            this.distance -= Math.abs(entity.velocity.x) * dt;;
        }else{
            this.distance = 0;
        }
        
    }


}