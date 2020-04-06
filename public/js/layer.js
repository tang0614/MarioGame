
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



