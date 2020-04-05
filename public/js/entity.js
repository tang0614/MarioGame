import Vector from './math.js'
import {loadMarioSprite} from './sprites.js';
import Trait from './trait.js'

class Velocity extends Trait{
    constructor(){
        super('velocity');
    }
    update(entity,dt){
        entity.pos.x +=(entity.velocity.x * dt);
        entity.pos.y +=(entity.velocity.y * dt);
        entity.velocity.y +=entity.acc;

    }
}

class Jump extends Trait{
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


export default class Entity{
    constructor(name,acc){
        this.name =name;
        this.pos=new Vector(0,0);
        this.velocity=new Vector(0,0);
        this.acc=acc;

        this.traits=[];
    }
    addTrait(trait){
        this.traits.push(trait);
        this[trait.NAME] =trait;
    }
    update(dt){
        this.traits.forEach(trait => {
            console.log(`Trait name is ${trait.Name}`);
            trait.update(this,dt)
        });
    }

}

export function createMario(){
  
    return loadMarioSprite()
    .catch(err=>{console.log(err.message)})
    .then(mario=>{
        const mario_entity = new Entity('mario',10);
        mario_entity.addTrait(new Velocity());
        mario_entity.addTrait(new Jump());
        //add a draw method to mario entity
        mario_entity.draw = function drawMario(context){
            mario.draw('mario',context,this.pos.x,this.pos.y);
        }
        
        return mario_entity
    })
}
