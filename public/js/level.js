import Compositor from './compository.js'
import Matrix from './matrix.js'
import TileCollider from './tileCollider.js'

export default class Level {
    constructor(){
        this.compo = new Compositor();
        this.entities = new Set();
        this.tiles_matrix = new Matrix();
        this.tile_collider = new TileCollider(this.tiles_matrix);
    }
    update(dt){
        this.entities.forEach(entity=>{
            //first update entity position, then jump and go speed
            entity.update(dt);
            
            this.tile_collider.test(entity); // test X Y collision
        })
    }
}


