import Trait from './trait.js';

export default class BulletBehavior extends Trait{
    constructor(){
        super('bulletBehavior');
    }

    collides_entity(me,other){
        if(other.marioCollide){
            //if mario jump on me, me bounce up and being killed
            if(other.velocity.y>me.velocity.y){
                other.marioCollide.bounceUp();
                me.killable.killed();
                me.velocity.y +=100;
                me.audio.playAudio('stomp');
                other.playerController.score +=300;
          
            }else{
                if(!other.playerController.super){
                    other.killable.killed();
             

                }
            }
            
        } 

        
       
    }
}