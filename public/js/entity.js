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
        this[trait.NAME] =trait;
    }
    update(dt){
        this.traits.forEach(trait => {
            console.log(`Trait name is ${trait.Name}`);
            trait.update(this,dt)
        });
    }

}


