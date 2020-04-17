import Compositor from './compository.js';
import EntityCollider from './entityCollider.js';
import TileCollider from './tileCollider.js';

export default class Level {
    constructor(){
        this.compo = new Compositor();
        this.entities = new Set();
        //this.tiles_matrix = new Matrix();
        this.tile_collider =null;
        this.entity_collider = new EntityCollider(this.entities);
        this.duration = 0;

    }
    setCollisionGrid(matrix){
        this.tile_collider = new TileCollider(matrix);
    }
    update(dt){
        this.entities.forEach(entity=>{
            //first update entity jump, go speed and then update position
            console.log('updating dt.....');
            entity.update(dt,this);
            // test X Y collision, bottom coll 
            if(entity.canOverlap){
                this.tile_collider.test(entity);  
            }
            
            //update collide_entity in each trait
            //overlap, can collide or cannot
            if(entity.canOverlap){
                this.entity_collider.checkEntityOverlap(entity); 
                this.entity_collider.checkEntityCollision(entity); 
            }
           
            //"this "is pointing to level
            
            this.duration +=dt;

        })
        
   
    }
}


