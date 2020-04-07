import Trait from './trait.js'
export default class Jump extends Trait{
    constructor(){
        super('jump');
        this.duration =0.5;
        this.jump_velocity = 60;
        this.jumpTime = 0;
    }
    start(){
        this.jumpTime=this.duration;
        console.log(this.jumpTime);
    }
    cancel(){
        this.jumpTime=0;
        console.log(this.jumpTime);
    }
    update(entity,dt){

        if(this.jumpTime>0){
            entity.velocity.y -= this.jump_velocity; //jump upward
            this.jumpTime -= 5*dt;
        }

    }


}