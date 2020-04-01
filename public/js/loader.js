export function loadImage(url){
    //return a correct object
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
            console.log('rejecting images...');
            reject(new Error(`Failed to load image's URL: ${url}`));
        
  
       });
        
    });
}


export function loadLevel(name){
    //return a correct object
    console.log('loading json')
    return fetch(`./levels/${name}.json`)
    .then(response=>{ 
        return new Promise((resolve,reject) =>{
            if(response.ok){ // if HTTP-status is 200-299
                console.log('resolving json')
                resolve(response.json());
            }else{
                console.log('rejecting json')
                reject(new Error('fail to read and parse the json file'));
            }

        });
    });

}