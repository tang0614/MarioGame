import Compositor from './compository.js'
import Matrix from './matrix.js'

export default class Level {
    constructor(){
        this.compo = new Compositor();
        this.entities = new Set();
        this.tiles_matrix = new Matrix();
    }
    update(dt){
        this.entities.forEach(entity=>{
            entity.update(dt);
        })
    }
}

