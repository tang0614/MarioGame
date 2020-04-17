import Trait from './trait.js';

export default class Killable extends Trait{
    constructor(){
        super('killable');
        this.dead = false;
        this.time = 1;
        this.deadTime=0;
    }

    killed(){
        this.dead = true;
    }

    update(entity,dt,level){
        if(this.dead){
            this.deadTime += dt;
            if(this.deadTime>this.time){
                level.entities.delete(entity);


            }
        }
    }


}