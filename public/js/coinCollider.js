import TileResolver from './tileResolver.js';


export default class CoinCollider{
    constructor(tileMatrix){
        this.tile_resolver = new TileResolver(tileMatrix);
    }


    test(entity){
        this.checkY(entity);
        this.checkX(entity); 
        
        //const matchedTile = this.tile_resolver.getTileByPosition(entity.bounds.left,entity.bounds.top);
    
    }

    checkX(entity){
        let x;
        if(entity.velocity.x>0){
            x=entity.bounds.right;

        }else if(entity.velocity.x<0){
            x=entity.bounds.left;
            
        }else{
            return;
        }
           

        const matchedTilesIndex = this.tile_resolver.getTileByRange(
            x, x,
            entity.bounds.top, entity.bounds.bottom);
        

        matchedTilesIndex.forEach(match=>{

            
            //name is ground
            
            if(match.tile.name==='coin'){
            

                if(entity.marioCollide){
                    const grid = this.tile_resolver.matrix;
                    grid.delete(match.indexX,match.indexY);
                
                    //cannot pass in entity as paramether
                    entity.playerController.addCoins(1);
                    entity.audio.playAudio('coin');
                

                }

            }
            else{
                return;
                

            }    
        });
    
    }

    checkY(entity){
        let y;
        if(entity.velocity.y>0){

            y=entity.bounds.bottom;
        }else if(entity.velocity.y<0){
            y=entity.bounds.top;

        }

    

        const matchedTiles = this.tile_resolver.getTileByRange(
            entity.bounds.left, entity.bounds.right,
            y,y);


        
        matchedTiles.forEach(match=>{
      
            if(match.tile.name==='coin'){
            
                if(entity.marioCollide){
            
                    const grid = this.tile_resolver.matrix;
                    grid.delete(match.indexX,match.indexY);
                
                    entity.playerController.addCoins(1);
                    entity.audio.playAudio('coin');

                }
            
            }
            else{
                return;

            }

        });
    
        
        
        
       
    }

}