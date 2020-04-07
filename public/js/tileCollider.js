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

        const matchedTiles = this.tile_resolver.getTileByRange(
            entity.pos.x, entity.pos.x + entity.size.x,
            entity.pos.y, entity.pos.y+ entity.size.x);
        
        matchedTiles.forEach(match=>{
        
            //name is ground
            if(match.tile.name!=='ground'){
                return;
            }
            //falling to matched tile, speed up
            if(entity.velocity.x>0){
                
                if(entity.pos.x>match.x_left-entity.size.x){
                    entity.pos.x=match.x_left-entity.size.x;
                    entity.velocity.x=0;

                }
            } else if(entity.velocity.x<0){

                if(entity.pos.y<match.y_right){
                    entity.pos.y=match.y_right;
                    entity.velocity.x=0;

                }
            }
        })
    }
    checkY(entity){
    

        const matchedTiles = this.tile_resolver.getTileByRange(
            entity.pos.x, entity.pos.x + entity.size.x,
            entity.pos.y, entity.pos.y+ entity.size.x);
        
        matchedTiles.forEach(match=>{
        
          
            //name is ground
            if(match.tile.name!=='ground'){
                return;
            }

            //falling to matched tile, speed up
            if(entity.velocity.y>0){
                
                if(entity.pos.y>match.y_cell-entity.size.y){
                    entity.pos.y=match.y_cell-entity.size.y;
                    entity.velocity.y=0;

                }
            } else if(entity.velocity.y<0){

                if(entity.pos.y<match.y_floor){
                    entity.pos.y=match.y_floor;
                    entity.velocity.y=0;

                }

            }


        })
      

        
        
       
    }

}