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
            entity.update(dt);
            this.tile_collider.test(entity);
        })
    }
}


