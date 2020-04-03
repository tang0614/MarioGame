import Vector from './math.js'
import {loadMarioSprite,loadBackGroundSprite,loadBackGroundLevel} from './sprites.js';


export default class Entity{
    constructor(name,sprite,acc){
        this.name=name;
        this.pos=new Vector(0,0);
        this.velocity=new Vector(0,0);
        this.acc=acc;
        this.sprite = sprite;
    }

    update(dt){
        this.pos.x +=(this.velocity.x * dt);
        this.pos.y +=(this.velocity.y * dt);
        this.velocity.y +=this.acc;
    }

    draw(context){
        this.sprite.draw(this.name,context,this.pos.x,this.pos.y)
    }


}

export function createMario(){
  
    return loadMarioSprite()
    .catch(err=>{console.log(err.message)})
    .then(mario=>{
        const mario_entity = new Entity('mario',mario,30);
        mario_entity.pos.set(64,180);
        mario_entity.velocity.set(200,-600);
        return mario_entity
    })
}
