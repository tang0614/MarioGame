import Trait from './trait.js'
export default class Jump extends Trait{
    constructor(){
        super('jump');
        this.duration =0.05 ;
        this.jump_velocity = 90;
        this.jumpTime = 0;
        this.acc_y=500;
    }
    start(){
        this.jumpTime=this.duration;
    }
    cancel(){
        this.jumpTime=0;
    }
    //update jump velocity after time dt
    update(entity,dt){
         //falling also need acc
         entity.velocity.y +=this.acc_y * dt; //gravity, so if not move, y velocity is positive

        if(this.jumpTime>0){
            //entity.velocity.y -= entity.acc;
            entity.velocity.y -= this.jump_velocity; //jump upward
            this.jumpTime -= entity.mass * dt;
        }

     
    }


}