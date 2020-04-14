export function createTilesGrid(level,backgrounds,patterns,offsetX=0,offsetY=0){
    
    backgrounds.forEach(background=>{
        background.ranges.forEach(([x1,xlen,y1,ylen])=>{
            const x2 = x1 + xlen;
            const y2 = y1 + ylen;

            for(let x=x1; x<x2; x++){
                for(let y=y1; y<y2;y++){
                    const derivedX = x + offsetX;
                    const derivedY = y + offsetY;

                    if(background.pattern){ 
                        const background_pattern = patterns[background.pattern].backgrounds;
                        
                        createTilesGrid(level,background_pattern,patterns,x,y);
                    }else{
                        level.tiles_matrix.set(derivedX,derivedY,{
                            name: background.tile,
                            type: background.type
                        });

                    }
                  
                   
                }
            }
        })
        
    })
}