import Trait from './trait.js';

export default class Killable extends Trait{
    constructor(){
        super('killable');
        this.dead = false;
        this.removeTime = 2;
    
        this.deadTime=0;

        this.sleep = false;
        this.sleepTime = 0;
        this.sleepLimit = 8;
        
    }

    killed(){
        this.dead = true;
    }

    revive(){
        this.dead = false;
        this.deadTime=0;
    }
    letSleep(){
        this.sleep =true;
    }

    awake(entity){
        entity.walk.dir =1;
        entity.velocity.x =0;
        entity.walk.acc_x=6; //kopppa walk acc
    }


    update(entity,dt,level){
        if(this.dead){
            this.deadTime += dt;
            if(this.deadTime>this.removeTime){
                level.entities.delete(entity);
                
            }
        }
 
        if(this.sleep){
            this.sleepTime += dt;
            if(this.sleepTime>this.sleepLimit){
                console.log('koopa is going to awake..')
                this.sleep =false; 
                this.sleepTime = 0;
                this.awake(entity);
            }
        }
     
    }


}