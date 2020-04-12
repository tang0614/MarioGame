import Compositor from './compository.js'
import Matrix from './matrix.js'
import TileCollider from './tileCollider.js'

export default class Level {
    constructor(){
        this.compo = new Compositor();
        this.entities = new Set();
        this.tiles_matrix = new Matrix();
        this.tile_collider = new TileCollider(this.tiles_matrix);
        this.duration = 0;
    }
    update(dt){
        this.entities.forEach(entity=>{
            //first update entity jump, go speed and then update position
            console.log('updating');
            entity.update(dt);

            // console.log(entity.velocity.x);
            // console.log(entity.velocity.y);

            // console.log(entity.pos.x);
            // console.log(entity.pos.y);

            console.log(entity);

            this.tile_collider.test(entity); // test X Y collision, bottom collision
            this.duration +=dt;

        })
        
   
    }
}


