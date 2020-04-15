import Entity from './entity.js';
import {loadSpriteSheet} from './loader.js';
import {createAnime} from './anime.js';
import GoombaGo from './traits/goombaGo.js';
import Jump from './traits/jump.js';
import Position from './traits/position.js'

export function loadKoopa(){
  
    return loadSpriteSheet('koopa')
    .then(createKoopaEntity);

}

function createKoopaEntity(koopa){
   
    function routeFrame(goomba_entity){
       if (goomba_entity.velocity.x>0){
            return 'walk-1';
        } else{
            return 'walk-2';
        }
    }

    //create this function only once when loading the game, and then reuse it
    function drawKoopa(context,camera){
        //draw method from sprite sheet (This pointing to the koopa entity)
        koopa.draw(routeFrame(this),context,this.pos.x-camera.pos.x,this.pos.y-camera.pos.y);
    }

    //return a function create mario
    return function createKoopaFunction(){
        const koopa_entity = new Entity('koopa',2);
        koopa_entity.size.set(16,24);
        koopa_entity.pos.set(200,64);
        koopa_entity.velocity.set(0,0);

        koopa_entity.addTrait(new GoombaGo());
        koopa_entity.addTrait(new Jump());
        koopa_entity.addTrait(new Position());

        koopa_entity.walk.dir =-1;
        koopa_entity.walk.acc_x=10;
    
        
        //add a draw method to mario entity
        koopa_entity.draw = drawKoopa;
        return koopa_entity;
    }
}