import Trait from './trait.js';

export default class KoopaBehavior extends Trait{
    constructor(){
        super('koopaBehavior');
    }

    overlaps_entity(me,other){
        if(other.marioCollide){

            if(me.killable.sleep){
                if(other.velocity.y>me.velocity.y){
                    me.canDetectTiles = false;
                }else if (other.velocity.y==me.velocity.y){
                    me.canDetectTiles = true;
                    me.canBePush = true;
                }
 
            }else{
                me.canDetectTiles =true;
                if(other.velocity.y>me.velocity.y){
                    other.marioCollide.bounceUp();
                    me.killable.letSleep();
                    me.walk.dir =0;
                
                }else if(other.velocity.y==me.velocity.y){
                    other.killable.killed();
                    other.go.dir =0;
                
                }
            }
            

            
        }
    }
}
