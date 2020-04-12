import Trait from './trait.js'

export default class Go extends Trait{
    constructor(){
        super('go');
        this.dir =0;
        this.acc_x=200;
        this.distance = 0;
    }
    
    update(entity,dt){
        console.log('entity.velocity.x is ');

        console.log(entity.velocity.x);
        if(this.dir==1){

            if(entity.velocity.x>200){
                entity.velocity.x += 0;
            }else{
                entity.velocity.x += this.acc_x * this.dir * dt;
            }
            this.distance += entity.velocity.x * dt;

        }else if (this.dir==-1){

            if(entity.velocity.x<-200){
                entity.velocity.x += 0;
            }else{
                entity.velocity.x += this.acc_x * this.dir * dt;
            }

            this.distance += entity.velocity.x * dt;

        }else{
            this.distance = 0;
            entity.velocity.x=0;
        }
        
    }


}