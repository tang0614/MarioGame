import TileResolver from './tileResolver.js'


export default class TileCollider{
    constructor(tileMatrix){
    
        this.tile_matrix = new TileResolver(tileMatrix);
    }
    test(entity){
        this.checkY(entity);
        const matchedTile = this.tile_matrix.getTileByPosition(entity.pos.x,entity.pos.y)
        // if(matchedTile){
        //     console.log('Matched tile',matchedTile,matchedTile.tile.name);
        // }
        
    }

    checkY(entity){
        const matchedTile = this.tile_matrix.getTileByPosition(entity.pos.x,entity.pos.y)
        //if match
        if(!matchedTile){
            return;
        }
        //name is ground
        if(matchedTile.tile.name!=='ground'){
            return;
        }

        //falling to matched tile, speed up
        if(entity.velocity.y>0){
            
            if(entity.pos.y>matchedTile.y_cell){
                entity.pos.y=matchedTile.y_cell;
                entity.velocity.y=0;

            }
        } else if(entity.velocity.y<0){

            if(entity.pos.y<matchedTile.y_floor){
                entity.pos.y=matchedTile.y_floor;
                entity.velocity.y=0;

            }

        }
        
       
    }

}