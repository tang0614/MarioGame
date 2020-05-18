import Trait from './trait.js';

export default class JugemBehavior extends Trait{
    constructor(){
        super('jugemBehavior');
    }

    collides_entity(me,other){
        if(other.marioCollide){
            //if mario jump on me, me bounce up and being killed
          
            other.killable.killed();
            other.go.dir =0;
            
            
        }   
    }

    
}