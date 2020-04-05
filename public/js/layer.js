export function getBackgroundLayer(backgrounds,background_sprites){
    const buffer = document.createElement('canvas');
    buffer.width = 640;
    buffer.height = 640;

    //draw things on buffer
    backgrounds.forEach((background)=>{
        drawBackGround(background,buffer.getContext('2d'),background_sprites);
       
    }); 

    return function drawOnContext(context){
        context.drawImage(buffer,0,0);
    }
}

export function getSpriteLayer(entity){
    return function drawOnContext(context){
        //entity.sprite.draw(entity.name,context,entity.pos.x,entity.pos.y);
        entity.draw(context);

    }
}


function drawBackGround(backgrounds, context, background_sprites){
    backgrounds.ranges.forEach(([x1,x2,y1,y2])=>{
        for(let x=x1; x<x2; x++){
            for(let y=y1; y<y2;y++){
                background_sprites.drawTile(backgrounds.tile,context,x,y); //location of the subsetted image in browser
            }
        }
    })
}
