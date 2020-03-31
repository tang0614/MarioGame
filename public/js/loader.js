export function loadImage(url){
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

export function loadLevel(name){
    return fetch(`./levels/${name}.json`)
    .then(j=>j.json());


}