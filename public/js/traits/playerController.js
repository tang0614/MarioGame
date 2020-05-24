import Trait from './trait.js';


const COIN_MAX = 100;
export default class PlayerController extends Trait{
    constructor(){
        super('playerController');
        this.player =null;
        this.playerTime = 400;
        this.superTime = null;
        this.score =0;
        this.coin = 0;
        this.lives = 3;
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

    deleteLives(num){
        this.lives -= num;

    }

    grow(){
        this.superTime = 10000;
        this.super = true;
      
    }

    disgrow(){
        this.superTime = 1;
      
    }
  
    

    update(entity,dt,level){


        if(!level.entities.has(this.player)){
            if(this.lives>0){
                this.player.killable.revive();
                //restarting the window
                this.player.pos.set(64,64);
                this.player.velocity.set(0,0);
                this.player.go.distance = 0;
                this.playerTime = 400;
                this.lives -=1
                level.entities.add(this.player);

            }

            if(this.lives==0){
                level.stop= true;

            }     

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
    }


}}