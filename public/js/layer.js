import TileResolver from './tileResolver.js';


export function getBackgroundLayer(level,backgroundGrid,background_sprites){

    const resolver = new TileResolver(backgroundGrid); //new resolver not inside level
    const buffer = document.createElement('canvas');
    buffer.width = 456 + 16;
    buffer.height = 240;
    const buffer_context = buffer.getContext('2d');
    //draw background_sprites on the buffer_context using grid unit x,y 
    // whole image is stored in buffer
    function drawBufferBasedOnCamera(startIndex,endIndex){

        buffer_context.clearRect(0,0,buffer.width,buffer.height);

        for(let x =startIndex; x<=endIndex; x++){
            const col = backgroundGrid.grid[x];
  
            if(col){
                col.forEach((value,y)=>{
                    if(value.name ==='chance'){
                        //be careful, here you need to substruct startIndex, because you draw all background from position x-startIndex
                        //such that you can make image starting from x+startindex to show on (0,0) on buffer.
                        background_sprites.drawAnime(value.name,buffer_context,x-startIndex,y,level.duration);
                    }else{
                        background_sprites.drawTile(value.name,buffer_context,x-startIndex,y);
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
        //draw buffer inside context
       
        //%16 to avoid running out of context, the starting drawing positionx always between 0 and 16
        //choose 16 is because each tile size is 16, making graph consistent
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
    //overwite toTileIndex function and save it into getByIndexOriginal
    //every time call the toTileIndex function it first print out indexX,indexY
    //then it calls the origianl tileResolver.toTileIndex to get the tile
    
    tileResolver.getTileByIndex = function getByIndexFake(x_index, y_index) {
        resolvedTiles.push({x_index, y_index});
        return getByIndexOriginal.call(tileResolver, x_index, y_index);
    }

    //draw blue lines in which the sprite fails
    return function drawCollision(context,camera) {
        
        resolvedTiles.forEach(({x_index, y_index}) => {
            context.strokeStyle = 'blue';
           
            context.beginPath();
            context.rect(
                x_index * tileSize - camera.pos.x,
                y_index * tileSize - camera.pos.y,
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



// let camera draw on context, 
export function drawCameraLayer(cameraToDraw){
   
   
    return function drawCameraRect(context,camera) {

        context.strokeStyle = 'purple';
        context.beginPath();
        context.rect(cameraToDraw.pos.x-camera.pos.x,
            cameraToDraw.pos.y- camera.pos.y,
            camera.size.x,
            camera.size.y);
        
        context.stroke();
        
    }
    
}