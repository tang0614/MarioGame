//lay one
export function getBackgroundLayer(level,background_sprites){
    const tiles = level.tiles_matrix;
    const resolver = level.tile_collider.tile_resolver;

    const buffer = document.createElement('canvas');
    buffer.width = 500;
    buffer.height = 240;
    const buffer_context = buffer.getContext('2d');
    //draw background_sprites on the buffer_context using grid unit x,y 
    // image is stored in buffer
    function drawBufferInsideCamera(startIndex,endIndex){
        for(let x =startIndex; x<=endIndex; x++){
            const col = tiles.grid[x];
            if(col){
                col.forEach((value,y)=>{
                    background_sprites.drawTile(value.name,buffer_context,x,y);
                })
            }
        }
    }
 

    return function drawOnContext_background(context,camera){
        const drawWidth = resolver.toTileIndex(camera.size.x);
        const drawfrom = resolver.toTileIndex(camera.pos.x);
        const drawTo = drawfrom + drawWidth;
        drawBufferInsideCamera(drawfrom,drawTo);
        //draw buffer inside context
        context.drawImage(buffer,-camera.pos.x,-camera.pos.y);
    }
}

//layer two
export function getSpriteLayer(entities){
    //draw entities on context
    return function drawOnContext_sprite(context,camera){
        entities.forEach((entity)=>{ 
            entity.draw(context,camera); //method for entity created in creatMario
        });  
    }
}

//layer three
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
            context.rect(entity.pos.x- camera.pos.x,
                entity.pos.y - camera.pos.y,
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
            camera.size.x+camera.pos.x,
            camera.size.y+camera.pos.x);
        
        context.stroke();
        
    }
    
}