import TileResolver from './tileResolver.js';


export default class TileCollider{
    constructor(){
        this.tile_resolver = [];
    }

    addGrid(tileMatrix){
        this.tile_resolver.push(new TileResolver(tileMatrix));

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
           
            
        
        for (let resolver of this.tile_resolver){

            const matchedTilesIndex = resolver.getTileByRange(
                x, x,
                entity.bounds.top, entity.bounds.bottom);

            matchedTilesIndex.forEach(match=>{

                
                //name is ground
                if(match.tile.type==='ground'){
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
                }


                else if(match.tile.name==='coin'){
                    if(entity.marioCollide){
                        const grid = resolver.matrix;
                        grid.delete(match.indexX,match.indexY);
                    
                        //cannot pass in entity as paramether
                        entity.playerController.addCoins(1);
                        entity.audio.playAudio('coin'); 
    
                    }
    
                }
                  
            });

        }  
        
    }

    checkY(entity){
        let y;
        if(entity.velocity.y>0){

            y=entity.bounds.bottom;
        }else if(entity.velocity.y<0){
            y=entity.bounds.top;

        }

        for (let resolver of this.tile_resolver){
            const matchedTiles = resolver.getTileByRange(
                entity.bounds.left, entity.bounds.right,
                y,y);
            
            matchedTiles.forEach(match=>{
        
                //name is ground
                if(match.tile.type==='ground'){
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
                }

                else if(match.tile.name==='coin'){   
                    if(entity.marioCollide){
                        const grid = resolver.matrix;
                        grid.delete(match.indexX,match.indexY);
                    
                        entity.playerController.addCoins(1);
                        entity.audio.playAudio('coin');
                    }
                
                }

            });
      


        }


        
       
    }

}