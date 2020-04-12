import Go from './traits/go.js'
import Jump from './traits/jump.js'
import Position from './traits/position.js'
import Entity from './entity.js'
import {loadSpriteSheet} from './loader.js'
import {createAnime} from './anime.js'


export function createMario(){
  
    return loadSpriteSheet('mario')
    .then(mario=>{
      
        const mario_entity = new Entity('mario',2);
        mario_entity.size.set(16,16);
        mario_entity.pos.set(64,64);

        mario_entity.addTrait(new Go());
        mario_entity.addTrait(new Jump());
        mario_entity.addTrait(new Position());

        const anime_run  = createAnime(['run-1','run-2','run-3'],10);
        const anime_retreat  = createAnime(['retreat-1','retreat-2','retreat-3'],10);

        function routeFrame(mario){
          
            if(!mario.jump.ready){
                return 'jump';
            }

            if(mario.go.dir >0){
                if(mario.velocity.x<0 ){
                    return 'break';
                }
                return anime_run(mario.go.distance);
            }else if(mario.go.dir==0){
                return 'mario'
            }else{
                if(mario.velocity.x>0){
                    return 'break';
                }
                return anime_retreat(Math.abs(mario.go.distance));
            }
    
        }
        
        //add a draw method to mario entity
        mario_entity.draw = function drawMario(context,camera){
            //draw method from sprite sheet (This pointing to the mario)
            
            mario.draw(routeFrame(this),context,this.pos.x-camera.pos.x,this.pos.y-camera.pos.y);
        }
        
        return mario_entity
    })
}