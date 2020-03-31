const canvas =document.getElementById('screen');
const context = canvas.getContext('2d');


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

        this.tiles = new Map();//to save the map
    }

    //method to subset tile and save it
    define(name,x_subset,y_subset){
        const buffer = document.createElement('canvas');
        buffer.width = this.width;
        buffer.height = this.height
        
        buffer.getContext('2d').drawImage(this.image, x_subset*this.width, y_subset*this.height, this.width, this.height,
            0,0,
            this.width,this.height);
        
        //add the buffer into Map
        this.tiles.set(name,buffer);
    }

    //draw the subset on which position
    draw(name, pen,x_position,y_position){
        //get method
        const buffer = this.tiles.get(name);
        pen.drawImage(buffer,x_position,y_position);

    }
}

loadImage('./image/tiless.png')
.then(img => console.log(`w: ${img.width} | h: ${img.height}`))
.catch(err => console.error(err));

// (image=>{
//     const sprites = new SpriteSheet(image,16,16);
//     sprites.define('ground',0,0);
//     sprites.draw('ground',context,100,100);
   
// });