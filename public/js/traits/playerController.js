import Trait from './trait.js';

const COIN_MAX = 100;
export default class PlayerController extends Trait{
    constructor(){
        super('playerController');
        this.player =null;
        this.playerTime = 300;
        this.superTime = null;
        this.score =0;
        this.coin = 0;
        this.lives = 1;
        this.super = false;
       
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

    grow(){
        this.superTime = 10000;
        this.super = true;

      
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
            if(this.super){
                if(this.superTime>0){
                    this.player.offset.set(0,16);
                    this.superTime -= 20;
                }else{
                    this.player.offset.set(0,0);
                    this.super = false; 
                }
            }

            console.log(this.superTime);
  
        
    }


}}