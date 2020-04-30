import Trait from './trait.js';

export default class GoombaBehavior extends Trait{
    constructor(){
        super('goombaBehavior');
    }

    collides_entity(me,other){
        if(other.marioCollide){
            //if mario jump on me, me bounce up and being killed
            if(other.velocity.y>me.velocity.y){
                other.marioCollide.bounceUp();
                me.killable.killed();
                me.walk.dir =0;
                me.audio.playAudio('stomp');
                other.playerController.score +=200;
          
            }else if(other.velocity.y==me.velocity.y){
                other.killable.killed();
                //other.audio.playAudio('over');
                other.go.dir =0;
            
            }
            
        }   
    }
}