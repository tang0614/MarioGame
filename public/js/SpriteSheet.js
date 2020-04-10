export default class SpriteSheet {

    constructor(image,width,height){
        this.image =image;
        this.width =width;
        this.height=height;

        this.tiles = new Map();// Map is a collection of elements where each element is stored as a Key, value pair. 
    }

    //method to subset tile and save it
    define(name,x_subset,y_subset,width,height){
        const buffer = document.createElement('canvas');
        buffer.width = width;
        buffer.height = height;

        //mirring the sprite
        // const context = buffer.getContext('2d');
        // context.scale(-1,1);
        // context.translate(-width,0);

        //buffer image is not showing in html because we didnot put this DOM element in our html
        buffer.getContext('2d').drawImage(
            this.image, x_subset, y_subset, width, height,
            0,0,
            width,height);

    
        //add name, butter as key, value pair into Map using map.set method
        this.tiles.set(name,buffer);
    }
    
    defineTile(name,x_subset,y_subset){
        this.define(name ,x_subset * this.width, y_subset * this.height,this.width,this.height);
    }

    //draw the subset on which position
    draw(name, context,x_position,y_position){
        //map get method to get buffer from name(key)
        const buffer = this.tiles.get(name);
        //location of the subseted image
        context.drawImage(buffer,x_position,y_position);

    }

    drawTile(name,context,x_position,y_position){
        this.draw(name, context, x_position * this.width, y_position * this.height);
    }
}



