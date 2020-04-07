const Pressed = 1;
const Released = 0;

export default class Keyboard{
    constructor(){
        //hold current state of the a given key
        this.keyStates = new Map();
        //hold the callback function of a key code
        this.keyMap = new Map();

    }
    addMapping(keyCode, callback){
        
        this.keyMap.set(keyCode,callback);
    }

    handleEvent(event){
        const keyCode = event.keyCode;
        console.log(keyCode);
        console.log(`event type is ${event.type}`);

        if(this.keyMap.has(keyCode)){
            event.preventDefault();
        }else{
            return;
        }
        

        //Get current state
        const keyState = event.type ==='keydown' ? Pressed:Released;
        //is current state same as before = hold
        if(this.keyStates.get(keyCode) ===keyState){
            console.log('pressing same button, returning back');
            return;
        }
        console.log('pressing differen button/released');
        //update state
        this.keyStates.set(keyCode,keyState);
        //call callback
        this.keyMap.get(keyCode)(keyState);
        
    }

        listenTo(window){
        
            ['keyup','keydown'].forEach(eventName=>{
                window.addEventListener(eventName,event=>{
                    this.handleEvent(event);
                });

            })
        
        } 
}