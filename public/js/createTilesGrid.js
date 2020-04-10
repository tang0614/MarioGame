export function createTilesGrid(level,backgrounds){
    
    backgrounds.forEach(background=>{
        background.ranges.forEach(([x1,xlen,y1,ylen])=>{
            const x2 = x1 + xlen;
            const y2 = y1 + ylen;

            for(let x=x1; x<x2; x++){
                for(let y=y1; y<y2;y++){

                    level.tiles_matrix.set(x,y,{
                        name: background.tile,
                        type: background.type
                    });
                }
            }
        })
        
    })
}