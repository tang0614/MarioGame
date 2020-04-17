import Trait from './trait.js';

export default class Killable extends Trait{
    constructor(){
        super('killable');
        this.dead = false;
        this.removeTime = 1;
        this.reviveTime = 2;
        this.deadTime=0;
        
    }

    killed(){
        this.dead = true;
    }

    revive(){
        this.dead = false;
        this.deadTime=0;
        
    }

    update(entity,dt,level){
        if(this.dead){
            this.deadTime += dt;
            if(this.deadTime>this.removeTime){
                level.entities.delete(entity);
                
            }
        }
     
    }


}