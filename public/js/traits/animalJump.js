import Trait from './trait.js'
export default class AnimalJump extends Trait{
    constructor(){
        super('animalJump');
        this.duration =0.05 ;
        this.jump_velocity = 22;
        this.jumpTime = 0;
        this.acc_y=600;
        //this.ready=false;
    }
    //can jump
  
    //update jump velocity after time dt
    update(entity,dt,level,audioContext){
        
        //gravity
        entity.velocity.y +=this.acc_y * dt; 
       
        if(this.jumpTime>0){
            //entity.velocity.y -= entity.acc;
            entity.velocity.y -= this.jump_velocity; //jump upward
            this.jumpTime -= entity.mass * dt;
        }
        //when update the new entity, set to false
        //this.ready=false;

     
    }
    obstruct(side){
        if(side=='bottom'){
            //after checking the collision, setting to true and then draw it 
            //this.ready=true;
            this.jumpTime=2;
       
        }
        
    }


}