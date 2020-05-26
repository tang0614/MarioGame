export default class SceneRunner{
    constructor(){
        this.sceneIndex = -1;
        this.scenes =[];
    }

    addScene(scene){
       
        this.scenes.push(scene);
    }

    runNext(){
 
        this.sceneIndex+=1;
    }

    update(context,camera,dt,audioContext){

       
        const currentScene = this.scenes[this.sceneIndex];

        if(currentScene){
            
            currentScene.compo.draw(context,camera); //drawing background, entities and collision layer
            currentScene.updateEntity(dt,audioContext); // update 
        }

    }
}