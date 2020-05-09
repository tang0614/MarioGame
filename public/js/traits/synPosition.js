import Trait from './trait.js'
export default class SynPosition extends Trait{
    constructor(){
        super('synposition');
    }
  
    // update the position of entity after time dt
    update(entity,level,dt){
        this.updatePosition(entity,level,dt);
       
       
    }

} 