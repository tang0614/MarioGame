import Trait from './trait.js';

export default class GoombaGo extends Trait{
    constructor(){
        super('walk');
        this.dir =1;
        this.acc_x=30;
        this.distance = 0;
        this.duration =0;
    }
    
    update(entity,dt){
      
        //cannot move in x direction if jumping

        if(this.dir==1){
            if(entity.velocity.x>100){
                entity.velocity.x += 0;
            }else{
                entity.velocity.x += this.acc_x * this.dir * dt;
            }
            this.distance += entity.velocity.x * dt;

        }else if (this.dir==-1){

            if(entity.velocity.x<-100){
                entity.velocity.x += 0;
            }else{
                entity.velocity.x += this.acc_x * this.dir * dt;
            }

            this.distance += entity.velocity.x * dt;

        }
        this.duration += dt;
        
   
    }

    obstruct(entity,side){
        if(side=='left'){
            //after checking the collision, setting to true and then draw it 
            this.dir=1;
       
        }
        if(side=='right'){
            //after checking the collision, setting to true and then draw it 
            this.dir=-1;
       
        }
        
    }

}