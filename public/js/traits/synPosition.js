import Trait from './trait.js'
export default class SynPosition extends Trait{
    constructor(){
        super('synposition');
    }
  
    // update the position of entity after time dt
    update(entity,dt,level,audioContext){
        this.updateLakituPos(entity,level,dt);
       
       
    }

    updateLakituPos(lakitu_entity,level,dt){
     
        level.entities.forEach(entity=>{
            if(entity.marioCollide){
                if(entity.go.dir>=0){
                    lakitu_entity.pos.x = entity.pos.x + 100;

                }else{
                    lakitu_entity.pos.x = entity.pos.x - 20;
                }
                
              
            }

        })
        


    }

} 