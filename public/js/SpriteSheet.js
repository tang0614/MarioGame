export default class SpriteSheet {

    constructor(image,width,height){
        this.image =image;
        this.width =width;
        this.height=height;

        this.tiles = new Map();// Map is a collection of elements where each element is stored as a Key, value pair. 
    }

    //method to subset tile and save it
    define(name,x_subset,y_subset){
        const buffer = document.createElement('canvas');
        buffer.width = this.width;
        buffer.height = this.height;

        //buffer image is not showing in html because we didnot put this DOM element in our html
        buffer.getContext('2d').drawImage(
            this.image, x_subset * this.width, y_subset * this.height, this.width, this.height,
            0,0,
            this.width,this.height);

    
        //add name, butter as key, value pair into Map using map.set method
        this.tiles.set(name,buffer);
    }

    //draw the subset on which position
    draw(name, context,x_position,y_position){
        //map get method to get value from name(key)
        const buffer = this.tiles.get(name);
        //location of the subseted image
        context.drawImage(buffer,x_position,y_position);

    }

    drawTile(name,context,x_position,y_position){
        this.draw(name, context, x_position * this.width, y_position * this.height);
    }
}



