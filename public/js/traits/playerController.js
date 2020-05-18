import Trait from './trait.js';

export default class PlayerController extends Trait{
    constructor(){
        super('playerController');
        this.player =null;
        this.playerTime = 300;
        this.score =0;
        this.coin = 0;
       
    }
    setPlayer(entity){
        this.player =entity;
    }

    addCoins(count){
        this.coin +=count;
    }

    

    update(entity,dt,level){

        if(!level.entities.has(this.player)){
            this.player.killable.revive();
            this.player.pos.set(64,64);
            level.entities.add(this.player);
            this.playerTime =300;
            this.score =0;

            

        }else{
        
            this.playerTime -= dt;
  
        
    }


}}