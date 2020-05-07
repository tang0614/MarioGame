import Trait from './trait.js';

export default class FlowerBehavior extends Trait{
    constructor(){
        super('flowerBehavior');
    }

    collides_entity(me,other){

        if(other.marioCollide){
            //if mario jump on me, me bounce up and being killed
            if(other.velocity.y>me.velocity.y){
                other.marioCollide.bounceUp();
                other.killable.killed();
                me.audio.playAudio('stomp');
                
          
            }else if(other.velocity.y==me.velocity.y){
                other.killable.killed();
                //other.audio.playAudio('over');
                other.go.dir =0;
            
            }
            
        }   
    }
}