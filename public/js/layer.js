import TileResolver from './tileResolver.js';


export function getBackgroundLayer(level,backgroundGrid,background_sprites){

    const resolver = new TileResolver(backgroundGrid); //new resolver not inside level
    
    const buffer = document.createElement('canvas');
    buffer.width = 456 + 16;
    buffer.height = 240;
    const buffer_context = buffer.getContext('2d');
    // whole image is stored in buffer_context api

    function drawBufferBasedOnCamera(startIndex,endIndex){
        //clear buffer whenever update
        buffer_context.clearRect(0,0,buffer.width,buffer.height);
        //iterating backgroundGrid according to column index and draw according tiles based on name
        for(let colIndex =startIndex; colIndex<=endIndex; colIndex++){
            const col = backgroundGrid.grid[colIndex];
  
            if(col){
                col.forEach((value,rowIndex)=>{
                    if(value.name ==='chance'){
                        background_sprites.drawAnime(value.name,buffer_context,colIndex-startIndex,rowIndex,level.duration);
                    }else{
                         //be careful, here you need to substruct startIndex, because you draw all background from position ,colIndex-startIndex
                        //such that you can make image colIndex to show on (0,0) on buffer.
                        background_sprites.drawTile(value.name,buffer_context,colIndex-startIndex,rowIndex);
                    }
                   
                });
            }
        }
    }
 
    //substract image from the whole imaged stored in buffer according to camera position
    return function drawOnContext_background(context,camera){
        const drawWidth = resolver.toTileIndex(camera.size.x);
        const drawfrom = resolver.toTileIndex(camera.pos.x);
        const drawTo = drawfrom + drawWidth;
 
        drawBufferBasedOnCamera(drawfrom,drawTo);
        //draw buffer on context
        //%16 to avoid running out of context, the starting drawing positionx always between 0 and 16
        //choose 16 is because each tile size is 16, only redraw after moving 16 pixles, making graph consistent
        context.drawImage(buffer,
            -camera.pos.x%16,
            -camera.pos.y);
    }
}


export function getSpriteLayer(entities){
    //draw entities on context
    return function drawOnContext_sprite(context,camera){
        entities.forEach((entity)=>{ 
          
            entity.draw(context,camera); //method for entity created in creatMario
        });  
    }
}

export function createCollisionLayer(level){

    const resolvedTiles = [];
    const tileResolver = level.tile_collider.tile_resolver;
    
    const tileSize = tileResolver.tileSize;
    const getByIndexOriginal = tileResolver.getTileByIndex;

    // and let "this" pointing to tileResolver inside level
    // rewrite tileResolver.getTileByIndex by adding one command
    tileResolver.getTileByIndex = function getByIndexFake(col_index, row_index) {
        resolvedTiles.push({col_index, row_index});
        return getByIndexOriginal.call(this, col_index, row_index);
    }
    //**for the  tile resolver inside level instance, it has two properties, matrix and tile size, and the method*//
    //**this new method tileResolver.getTileByIndex, adds a array command*//
    //**it also overwrite original tileResolver.getTileByIndex by pointing to this resolver(collison grid)*/


    //draw blue lines in which the sprite fails
    return function drawCollision(context,camera) {
        
        resolvedTiles.forEach(({col_index, row_index}) => {
            context.strokeStyle = 'blue';
            
            context.beginPath();
            context.rect(
                col_index * tileSize - camera.pos.x,
                row_index * tileSize - camera.pos.y,
                tileSize, 
                tileSize);
            context.stroke();
        });

        //draw lines around entities
        level.entities.forEach(entity=>{
            context.strokeStyle = 'red';
            context.beginPath();
            context.rect(entity.bounds.left- camera.pos.x,
                entity.bounds.top - camera.pos.y,
                entity.size.x,
                entity.size.y);
            context.stroke();

        })
        //clean up blue lines in previous call
        resolvedTiles.length = 0;
    };


}


