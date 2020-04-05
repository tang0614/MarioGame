import Vector from './math.js'
import {loadMarioSprite} from './sprites.js';

class Trait{
    constructor(name){
        this.Name =name;
    }
}

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

export default class Entity{
    constructor(name,acc){
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
            trait.update(this,dt)
        });
    }

}

export function createMario(){
  
    return loadMarioSprite()
    .catch(err=>{console.log(err.message)})
    .then(mario=>{
        const mario_entity = new Entity('mario',30);
        mario_entity.addTrait(new Velocity());
        mario_entity.draw = function drawMario(context){
            mario.draw('mario',context,this.pos.x,this.pos.y);
        }
        
        return mario_entity
    })
}
