import Vector from './math.js'

export default class Entity{
    constructor(name,sprite,acc){
        this.name=name;
        this.pos=new Vector(0,0);
        this.velocity=new Vector(0,0);
        this.acc=acc;
        this.sprite = sprite;
    }

    update(){
        this.pos.x +=this.velocity.x;
        this.pos.y +=this.velocity.y;
        this.velocity.y +=this.acc;
    }

    draw(context){
        this.sprite.draw(this.name,context,this.pos.x,this.pos.y)
    }


}