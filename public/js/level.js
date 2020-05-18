import Compositor from './compository.js';
import EntityCollider from './entityCollider.js';
import TileCollider from './tileCollider.js';
import CoinCollider from './coinCollider.js';

export default class Level {
    constructor(){
        this.compo = new Compositor();
        this.entities = new Set();
        this.tile_collider = null;
        this.coin_collider = null;
        //only put in level we can access all entities
        this.entity_collider = new EntityCollider(this.entities);
        this.duration = 0;

    }
    
    setCollisionGrid(matrix){
        //being set up in levelLoader, has three properties
        this.tile_collider = new TileCollider(matrix);
    }

    setCoinCollisionGrid(matrix){
        //being set up in levelLoader, has three properties
        this.coin_collider = new CoinCollider(matrix);
    }


    updateEntity(dt,audioContext){
        this.entities.forEach(entity=>{
            //first update entity jump, go speed and then update position
            console.log('updating after dt.....');
           
          
            entity.updateBytime(dt,this,audioContext); //this pointing to level 
            
            //check whether entities collide with tiles
            if(entity.canDetectTiles){
                //test=>checkX or Y=>getTilebyRange=>getTilebyIndex
                this.tile_collider.test(entity); 
                this.coin_collider.test(entity);  
            }
            
            //check if overlap or collide with mario
            this.entity_collider.checkEntityCollideMario(entity); 
            this.entity_collider.checkEntityPushedByMario(entity);
           
            
            
            //"this "is pointing to level
            this.duration +=dt;

        })
        
   
    }
}


