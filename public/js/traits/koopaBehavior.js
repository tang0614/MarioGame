import Trait from './trait.js';

export default class KoopaBehavior extends Trait{
    constructor(){
        super('koopaBehavior');
        this.startKill = 0;
        this.hitsound = false;
        
       
    }

    collides_entity(me,other){
        if(other.marioCollide){

            if(me.killable.sleepTime){
                
                if(other.velocity.y>me.velocity.y){

                    me.canDetectTiles = false; 
                    me.canBePush = false; 
                    
                    if(this.startKill==0){
                        me.audio.playAudio('stomp');
                        other.playerController.score +=200;
                        this.startKill += 1;

                    }
                    
                }else if (other.velocity.y==me.velocity.y){
                    me.canDetectTiles = true;
                    me.canBePush = true;
                }
 
            }else{
                me.canDetectTiles =true;

                if(me.killable.state == 'walk'){

                    if(other.velocity.y>me.velocity.y ){
                        other.marioCollide.bounceUp();
                        me.killable.letSleep();
                        me.walk.dir =0;
                        me.audio.playAudio('stomp');
                        other.playerController.score +=100;

                    }else if (other.velocity.y==me.velocity.y){
                        if(!other.playerController.super){

                            other.killable.killed();
                        }
                    
                        
                        
                    }         

                }else{
                    if(other.velocity.y>me.velocity.y){
                       
                         //transform shape
                         me.killable.transform();
                         me.animalFly.jump_velocity =0;
                        
                         me.animalFly.acc_y =0;
                         other.marioCollide.bounceUp();
                         me.audio.playAudio('stomp');
                         other.playerController.score +=100;
 
                    
                    } else if (other.velocity.y<me.velocity.y){
                        if(!other.playerController.super){
                    
                            other.killable.killed();
                        }
                   
                    
       
                    }

                }




                //if not sleep
                
                
            }
            

            
        }
    }
    
}
