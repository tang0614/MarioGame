export default class TileResolver{
    constructor(matrix,tillSize=16){
        this.tileSize = tillSize;
        this.matrix = matrix;

    }
    toTileIndex(pos){
        return Math.floor(pos/this.tileSize);
    }

    getTileByIndex(indexX,indexY){
        console.log(indexX,indexY);
        const tile= this.matrix.get(indexX,indexY);
 
        if(tile){
            const y_cell= indexY * this.tileSize;
            const y_floor= y_cell + this.tileSize;
            return{
                tile,
                y_cell,
                y_floor,
                
            };
        }
        
    }

    getTileByPosition(posX,posY){
        return this.getTileByIndex(this.toTileIndex(posX),this.toTileIndex(posY));
    }
}