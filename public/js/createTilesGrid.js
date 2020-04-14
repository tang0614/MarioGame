export function createTilesGrid(level,tiles,patterns,offsetX=0,offsetY=0){
    
    tiles.forEach(tile=>{
        tile.ranges.forEach(([x1,xlen,y1,ylen])=>{
            const x2 = x1 + xlen;
            const y2 = y1 + ylen;

            for(let x=x1; x<x2; x++){
                for(let y=y1; y<y2;y++){
                    const derivedX = x + offsetX;
                    const derivedY = y + offsetY;

                    if(tile.pattern){ 
                        const background_tile = patterns[tile.pattern].tiles;
                        
                        createTilesGrid(level,background_tile,patterns,x,y);
                    }else{
                        level.tiles_matrix.set(derivedX,derivedY,{
                            name: tile.name,
                            type: tile.type
                        });

                    }
                  
                   
                }
            }
        })
        
    })
}