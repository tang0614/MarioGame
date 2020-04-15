import Go from './traits/go.js'
import Jump from './traits/jump.js'
import Position from './traits/position.js'
import Entity from './entity.js'
import {loadSpriteSheet} from './loader.js'
import {createAnime} from './anime.js'


export function loadMario(){
  
    return loadSpriteSheet('mario')
    .then(createMarioEntity);

}

function createMarioEntity(mario){

    const anime_run  = createAnime(['run-1','run-2','run-3'],10);
    const anime_retreat  = createAnime(['retreat-1','retreat-2','retreat-3'],10);
    //create this function only once when loading the game, and then reuse it
    function routeFrame(mario_entity){
        // draw jumping when not able to jump(while jumping )
            if(!mario_entity.jump.ready){
                return 'jump';
            }

            if(mario_entity.go.dir >0){
                if(mario_entity.velocity.x<0 ){
                    return 'break';
                }
                return anime_run(mario_entity.go.distance);
            }else if(mario_entity.go.dir==0){
                return 'mario'
            }else{
                if(mario_entity.velocity.x>0){
                    return 'break';
                }
                return anime_retreat(Math.abs(mario_entity.go.distance));
            }
    
        }

    //create this function only once when loading the game, and then reuse it
    function drawMario(context,camera){
        //draw method from sprite sheet (This pointing to the mario entity not mario sprites)
        mario.draw(routeFrame(this),context,this.pos.x-camera.pos.x,this.pos.y-camera.pos.y);
    }

    //return a function create mario
    return function createMarioFunction(){
        const mario_entity = new Entity('mario',2);
        mario_entity.size.set(16,16);
        mario_entity.pos.set(64,64);
        mario_entity.velocity.set(0,0);
        

        mario_entity.addTrait(new Go());
        mario_entity.addTrait(new Jump());
        mario_entity.addTrait(new Position());
       
        //add a draw method to mario entity
        mario_entity.draw = drawMario;
        return mario_entity;
    }
}