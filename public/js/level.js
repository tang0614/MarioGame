import Compositor from './compository.js';

import TileCollider from './tileCollider.js';

export default class Level {
    constructor(){
        this.compo = new Compositor();
        this.entities = new Set();
        //this.tiles_matrix = new Matrix();
        this.tile_collider =null;
        this.duration = 0;
    }
    setCollisionGrid(matrix){
        this.tile_collider = new TileCollider(matrix);
    }
    update(dt){
        this.entities.forEach(entity=>{
            //first update entity jump, go speed and then update position
            console.log('updating');
            entity.update(dt);
            console.log('entity.pos.x');
            console.log(entity.pos.x);

            // console.log(entity.pos.x);
            // console.log(entity.pos.y);

            this.tile_collider.test(entity); // test X Y collision, bottom collision
            this.duration +=dt;

        })
        
   
    }
}


