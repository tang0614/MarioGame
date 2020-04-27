import Vector from './math.js'
import BoundingBox from './boundingBox.js';


export default class Entity{
    constructor(name,mass){
        this.name =name;
        this.pos=new Vector(0,0);
        this.velocity=new Vector(0,0);
        this.size = new Vector(0,0);
        this.mass = mass;

        this.offset =new Vector(0,0);  // offset positive x is moving to left, offset positive y is
        this.bounds = new BoundingBox(this.pos, this.size, this.offset);

        this.traits=[];
        this.canBePush = false;
        this.canOverlap = true;
    }
    addTrait(trait){
        this.traits.push(trait);
        this[trait.NAME] = trait;
        //important!!! this pointing to the entity object
    
    }
    obstruct(side){
        this.traits.forEach(trait => {
            //traits are position, jump and go
            trait.obstruct(this,side);
        });

    }
    update(dt,level){
        this.traits.forEach(trait => {
            //traits are position, jump and go
            trait.update(this,dt,level);
            
        });
    }

    overlaps(candidate){
        this.traits.forEach(trait => {
            //traits are position, jump and go
            trait.overlaps_entity(this,candidate);
        });
    }

    collides(candidate){
        this.traits.forEach(trait => {
            //traits are position, jump and go
            trait.collides_entity(this,candidate);
        });
    }
    


}


