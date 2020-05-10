import TileResolver from './tileResolver.js';
import BoundingBox from './boundingBox.js';

export default class TileCollider{
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
            if(match.tile.type!=='ground'){
                return;
            }
              
            if(entity.velocity.x>0){
                
                if(entity.bounds.right>match.x_left){
                   
                    entity.bounds.left=match.x_left-entity.size.x;
                    entity.velocity.x=0;
                    entity.obstruct('right');
                }
                
            } else if(entity.velocity.x<0){
                if(entity.bounds.left<match.x_right){
                    entity.bounds.left=match.x_right;
                    entity.velocity.x=0;
                    entity.obstruct('left');

                }
                
            } 
        })
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
    
        
            //name is ground
            if(match.tile.type!=='ground'){
                return;
            }
            

            //falling to matched tile, speed up 
            if(entity.velocity.y>0){
                if(entity.bounds.bottom>match.y_cell){

                    entity.bounds.top=match.y_cell-entity.size.y;
                    entity.velocity.y=0;

                    if(entity.name=='jugem'){
                        entity.jump.jugem_obstruct(entity);
                    }else{
                        entity.obstruct('bottom');
                    }

                    


                }
            } 
            else if(entity.velocity.y<0){
                //tell entity is hitting ceiling
               
                if(entity.bounds.top<match.y_floor){
                    entity.bounds.top=match.y_floor;
                    entity.velocity.y=0;
                
                 
                }
 
            } 


        })
      

        
        
       
    }

}