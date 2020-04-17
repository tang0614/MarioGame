import Entity from '../entity.js';
import {loadSpriteSheet} from '../loader.js';
import GoombaGo from '../traits/goombaGo.js';
import Jump from '../traits/jump.js';
import Position from '../traits/position.js'
import Trait from '../traits/trait.js'
import Killable from '../traits/killable.js';

export function loadKoopa(){
  
    return loadSpriteSheet('koopa')
    .then(createKoopaEntity);

}

class KoopaBehavior extends Trait{
    constructor(){
        super('behavior');
    }

    collides_entity(us,them){
        if(them.marioCollide){
            if(them.velocity.y>us.velocity.y){
                them.marioCollide.bounceUp();
                us.killable.letSleep();
                us.walk.dir =0;
              
          
            }else if(them.velocity.y==us.velocity.y){
                them.killable.killed();
                them.go.dir =0;
            
            }
            
        }   
    }
}


function createKoopaEntity(koopa){
   
    const anime_run = koopa.animation.get('walk');
    const anime_sleep = koopa.animation.get('sleep');
   
    function routeFrame(koopa_entity){
        if(koopa_entity.killable.sleep){
            return anime_sleep(koopa_entity.walk.duration);
        }
        //duration increase with time
        return anime_run(koopa_entity.walk.duration);
    }


    //create this function only once when loading the game, and then reuse it
    function drawKoopa(context,camera){
        //draw method from sprite sheet (This pointing to the koopa entity)
        koopa.draw(routeFrame(this),context,this.pos.x-camera.pos.x,this.pos.y-camera.pos.y);
    }

    //return a function create mario
    return function createKoopaFunction(){
        const koopa_entity = new Entity('koopa',2);
        koopa_entity.size.set(16,16);
        koopa_entity.velocity.set(0,0);
        koopa_entity.offset.set(0,8);

        koopa_entity.addTrait(new GoombaGo());
        koopa_entity.addTrait(new Jump());
        koopa_entity.addTrait(new Position());
        koopa_entity.addTrait(new KoopaBehavior());
        koopa_entity.addTrait(new Killable())

        koopa_entity.walk.dir =1;
        koopa_entity.walk.acc_x=6;

        
    
        
        //add a draw method to mario entity
        koopa_entity.draw = drawKoopa;
        return koopa_entity;
    }
}