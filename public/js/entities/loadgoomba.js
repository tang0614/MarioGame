import Entity from '../entity.js';
import {loadSpriteSheet} from '../loader.js';
import GoombaGo from '../traits/goombaGo.js';
import Jump from '../traits/jump.js';
import Position from '../traits/position.js'
import Trait from '../traits/trait.js'
import Killable from '../traits/killable.js';

export function loadGoomba(){
  
    return loadSpriteSheet('goomba')
    .then(createGoombaEntity);

}

class GoombaBehavior extends Trait{
    constructor(){
        super('behavior');
    }

    collides_entity(us,them){
        if(them.marioCollide){
            if(them.velocity.y>us.velocity.y){
                them.marioCollide.bounceUp();
                us.killable.killed();
                us.walk.dir =0;
          
            }else if(them.velocity.y==us.velocity.y){
                them.killable.killed();
                them.velocity.x =0;
                them.velocity.y=0;
                them.go.acc_x=0;

            }
            
        }   
    }
}

function createGoombaEntity(goomba){
    const anime_run = goomba.animation.get('walk');
  
    
    function routeFrame(goomba_entity){
        if(goomba_entity.killable.dead){
            return 'flat';
        }
        return anime_run(goomba_entity.walk.duration);
    }

    //create this function only once when loading the game, and then reuse it
    function drawGoomba(context,camera){
        //draw method from sprite sheet (This pointing to the goomba entity)
        goomba.draw(routeFrame(this),context,this.pos.x-camera.pos.x,this.pos.y-camera.pos.y);
    }

    //return a function create mario
    return function createGoombaFunction(){
        const goomba_entity = new Entity('goomba',2);
        goomba_entity.size.set(16,16);
        goomba_entity.velocity.set(0,0);

        goomba_entity.addTrait(new GoombaGo());
        goomba_entity.addTrait(new Jump());
        goomba_entity.addTrait(new Position());
        goomba_entity.addTrait(new GoombaBehavior());
        goomba_entity.addTrait(new Killable());

        goomba_entity.dir =1;
        goomba_entity.acc_x=8;


        
        //add a draw method to mario entity
        goomba_entity.draw = drawGoomba;
        return goomba_entity;
    }
}