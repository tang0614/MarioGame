import Trait from './trait.js';


export default class PlayerController extends Trait{
    constructor(){
        super('playerController');
        this.player =null;
       
    }
    setPlayer(entity){
        this.player =entity;
    }

    update(entity,dt,level){
        
        if(!level.entities.has(this.player)){
            this.player.killable.revive();
            this.player.pos.set(64,64);
            level.entities.add(this.player);

        }
        
    }


}