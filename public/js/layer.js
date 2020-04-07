
export function getBackgroundLayer(level,background_sprites){
    const buffer = document.createElement('canvas');
    buffer.width = 640;
    buffer.height = 640;

    const context = buffer.getContext('2d');
    //draw mario in the grid
    level.tiles_matrix.loop((value,x,y)=>{
        background_sprites.drawTile(value.name,context,x,y);
    });
  

    return function drawOnContext_background(context){
        context.drawImage(buffer,0,0);
    }
}

export function getSpriteLayer(entities){
    //not draw things on buffer, on context
    return function drawOnContext_sprite(context){
        entities.forEach((entity)=>{
          
            entity.draw(context);
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


    return function drawCollision(context) {
        
        resolvedTiles.forEach(({x_index, y_index}) => {
            context.strokeStyle = 'blue';
           
            context.beginPath();
            context.rect(
                x_index * tileSize,
                y_index * tileSize,
                tileSize, 
                tileSize);
            context.stroke();
        });

        level.entities.forEach(entity=>{
            context.strokeStyle = 'red';
            context.beginPath();
            context.rect(entity.pos.x,entity.pos.y,
                entity.size.x,entity.size.y);
            context.stroke();

        })

        resolvedTiles.length = 0;
    };


}



