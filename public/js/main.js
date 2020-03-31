

function loadImage(url){
    return new Promise((resolve,reject) =>{
        // this line of code run first
        console.log('creating image...');
        const image = new Image();

        // this line of code run second
        console.log('loading image...');
        image.src=url;

        //return resolve after loading event happens
        image.addEventListener('load',()=>{
            console.log('resolving images...');
            resolve(image);
        });

        image.addEventListener('error', () => {
            reject(new Error(`Failed to load image's URL: ${url}`));
        
  
       });
        
    });
}

class SpriteSheet {

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
            this.image, 
            x_subset * this.width, 
            y_subset * this.height, 
            this.width, 
            this.height,
            0,
            0,
            this.width,
            this.height);

    
        //add name, butter as key, value pair into Map using map.set method
        this.tiles.set(name,buffer);
    }

    //draw the subset on which position
    draw(name, context,x_position,y_position){
        //map get method to get value from name(key)
        const buffer = this.tiles.get(name);
        context.drawImage(buffer,x_position,y_position);

    }
}

//create variables
const canvas =document.getElementById('screen');
const context = canvas.getContext('2d');
context.fillRect(0,0,50,50);


loadImage('./image/tiles.png')//loading image
.then(image => {
    console.log(`w: ${image.width} | h: ${image.height}`)
    return(image); //must remeber to return
})
.catch(err => console.error(err))
.then(image =>{
    const sprites = new SpriteSheet(image,16,16); //image size in browser
    sprites.define('ground',0,0); // subsetting the image
    sprites.draw('ground',context,45,62); //location of the image in browser
});


