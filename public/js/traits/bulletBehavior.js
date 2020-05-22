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
                me.velocity.y +=200;
                me.audio.playAudio('stomp');
                other.playerController.score +=300;
          
            }else{
                if(!other.playerController.super){
                    other.marioCollide.bounceUp();
                    other.playerController.deleteLives(1);

                    if(other.playerController.lives==0){
                        other.killable.killed();
                        other.go.dir =0;
                    }

                }
            }
            
        } 

        
       
    }
}