export default class Matrix{

    constructor(){
        this.grid = [];
    }

    set(x,y,value){
        if(!this.grid[x]){
            this.grid[x]=[];
        }

        this.grid[x][y]=value;
    }
    get(x,y){
        const col = this.grid[x]
        if(col){
            return col[y];
        }else{
            return undefined;
        }
    }

    loop(callback){
        this.grid.forEach((column,x)=>{
            column.forEach((value,y)=>{
                callback(value,x,y);
            });
        }); 
    }
}





