import Compositor from './compository.js';
import EntityCollider from './entityCollider.js';
import TileCollider from './tileCollider.js';


export default class Level {
    constructor(){
        this.compo = new Compositor();
        this.entities = new Set();
        this.tileCollider = new TileCollider();
        //only put in level we can access all entities
        this.entity_collider = new EntityCollider(this.entities);
        this.duration = 0;
   

    }
    


    updateEntity(dt,audioContext){
        this.entities.forEach(entity=>{
            //first update entity jump, go speed and then update position
            console.log('updating after dt.....');
           
            entity.updateBytime(dt,this,audioContext); //this pointing to level 
            //check whether entities collide with tiles
            if(entity.canDetectTiles){
                this.tileCollider.test(entity); 
            }

            //check if overlap or collide with mario
            this.entity_collider.checkEntityCollideMario(entity); 

            //"this "is pointing to level
            this.duration +=dt;

        })
   
    }
}


