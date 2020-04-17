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
            console.log('updating dt');

            entity.update(dt,this);
            this.tile_collider.test(entity); // test X Y collision, bottom collision
            this.entity_collider.checkEntityCollision(entity); //this is pointing to level
            //test entity collision
            
            this.duration +=dt;

        })
        
   
    }
}


