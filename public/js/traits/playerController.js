import Trait from './trait.js';

const COIN_MAX = 100;
export default class PlayerController extends Trait{
    constructor(){
        super('playerController');
        this.player =null;
        this.playerTime = 300;
        this.score =0;
        this.coin = 0;
        this.lives = 1;
       
    }
    setPlayer(entity){
        this.player =entity;
    }

    addCoins(count){
        this.coin +=count;
       

        if(this.coin >= COIN_MAX){
          

            const lifeCount = Math.floor(this.coin/COIN_MAX);
            this.addLives(lifeCount);
        }
    }
    addLives(num){
        this.lives += num;

    }

    

    update(entity,dt,level){

        if(!level.entities.has(this.player)){
            this.player.killable.revive();
            this.player.pos.set(64,64);
            level.entities.add(this.player);
            this.playerTime =300;
            this.score =0;
            this.coin = 0;
            this.lives -=1;

            

        }else{
        
            this.playerTime -= dt;
  
        
    }


}}