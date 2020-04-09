
//lay one
export function getBackgroundLayer(level,background_sprites){
    const buffer = document.createElement('canvas');
    buffer.width = 2048;
    buffer.height = 240;

    const buffer_context = buffer.getContext('2d');
    //draw background_sprites on the buffer_context using grid unit x,y 
    // image is stored in buffer
    level.tiles_matrix.loop((value,x,y)=>{
        background_sprites.drawTile(value.name,buffer_context,x,y);
    });
  

    return function drawOnContext_background(context,camera){
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



