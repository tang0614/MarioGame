import Vector from './math.js'

export default class Entity{
    constructor(name,acc){
        this.name =name;
        this.pos=new Vector(0,0);
        this.velocity=new Vector(0,0);
        this.size = new Vector(0,0);
        this.acc=acc;

        this.traits=[];
    }
    addTrait(trait){
        this.traits.push(trait);
        this[trait.NAME] = trait;
        //important!!! this pointing to the entity object
    
    }
    update(dt){
        this.traits.forEach(trait => {
            //traits are position, jump and go
            trait.update(this,dt)
        });
    }

}


