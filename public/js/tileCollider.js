import TileResolver from './tileResolver.js'


export default class TileCollider{
    constructor(tileMatrix){
        this.tile_resolver = new TileResolver(tileMatrix);
    }

    test(entity){
        this.checkY(entity);
        this.checkX(entity); 
        
        //const matchedTile = this.tile_resolver.getTileByPosition(entity.pos.x,entity.pos.y);
    
    }

    checkX(entity){
        let x;
        if(entity.velocity.x>0){
            x=entity.pos.x+ entity.size.x;

        }else if(entity.velocity.x<0){
            x=entity.pos.x;
            
        }else{
            return;
        }

       
        const matchedTilesIndex = this.tile_resolver.getTileByRange(
            x, x,
            entity.pos.y, entity.pos.y+ entity.size.y);
    
        
        matchedTilesIndex.forEach(match=>{
            
            //name is ground
            if(match.tile.type!=='ground'){
                return;
            }
              
            if(entity.velocity.x>0){
                
                if(entity.pos.x >match.x_left-entity.size.x){
                    entity.pos.x=match.x_left-entity.size.x;
                       
                   
                }
            } else if(entity.velocity.x<0){
                if(entity.pos.x<match.x_right){
                    entity.pos.x=match.x_right;
            
                    entity.velocity.x=0;

                }
            } 
        })
    }

    checkY(entity){
        let y;
        if(entity.velocity.y>0){

            y=entity.pos.y+ entity.size.y;
        }else if(entity.velocity.y<0){
            y=entity.pos.y;

        }
     
        const matchedTiles = this.tile_resolver.getTileByRange(
            entity.pos.x, entity.pos.x + entity.size.x,
            y,y);
        
        
        matchedTiles.forEach(match=>{
    
        
            //name is ground
            if(match.tile.type!=='ground'){
                return;
            }
            

            //falling to matched tile, speed up 
            if(entity.velocity.y>0){
                if(entity.pos.y>match.y_cell-entity.size.y){

                    entity.pos.y=match.y_cell-entity.size.y;
                    entity.velocity.y=0;
                    //tell entity is hitting ground
                    entity.obstruct('bottom');


                }
            } 
            else if(entity.velocity.y<0){
                //tell entity is hitting ceiling
               
                if(entity.pos.y<match.y_floor){
                    entity.pos.y=match.y_floor;
                    entity.velocity.y=0;
                
                 
                }
 
            } 


        })
      

        
        
       
    }

}