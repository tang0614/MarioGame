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
        //console.log('Checking X direction ....');
        if(entity.velocity.x==0){
            return;
        }
      
        const matchedTiles = this.tile_resolver.getTileByRange(
            entity.pos.x, entity.pos.x+ entity.size.x,
            entity.pos.y, entity.pos.y+ entity.size.x);

        matchedTiles.forEach(match=>{
     
            //name is ground
            if(match.tile.type!=='ground'){
                return;
            }
              
            if(entity.velocity.x>0){
                
                if(entity.pos.x >match.x_left-entity.size.x){
                    console.log('Colliding Right Tile ....');
                    entity.pos.x=match.x_left-entity.size.x;
                    entity.velocity.x=0;
                   
                }
            } else if(entity.velocity.x<0){
                if(entity.pos.x<match.x_right){
                    console.log('Colliding Left Tile ....');
                    entity.pos.x=match.x_right;
                    entity.velocity.x=0;
                   

                }
            } 
        })
    }
    checkY(entity){
        //console.log('Checking Y direction ....');

        if(entity.velocity.y==0){
            return;
        }
        const matchedTiles = this.tile_resolver.getTileByRange(
            entity.pos.x, entity.pos.x + entity.size.x,
            entity.pos.y,entity.pos.y+ entity.size.y);
        
        matchedTiles.forEach(match=>{
            //name is ground
            if(match.tile.type!=='ground'){
                return;
            }

            //falling to matched tile, speed up
            if(entity.velocity.y>0){
                console.log('Entity is falling ....');
                if(entity.pos.y>match.y_cell-entity.size.y){
      
                    console.log('Colliding bottom ....');
                    entity.pos.y=match.y_cell-entity.size.y;
                    entity.velocity.y=0;
                    //tell entity is hitting ground
                    entity.obstruct('bottom');


                }
            } 
            else if(entity.velocity.y<0){
                console.log('Entity is Jumping ....');
                if(entity.pos.y<match.y_floor){
             
                    console.log('Colliding top ....');
                    entity.pos.y=match.y_floor;
                    entity.velocity.y=0;
                 
                }
 
            } 


        })
      

        
        
       
    }

}