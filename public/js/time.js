export default class Timer{
    constructor(dt = 1/60){
        let last=0;
        let acc_time=0;
    

        this.updateProxy = (time) =>{

            acc_time += (time-last)/1000; //divided by one sec

            while(acc_time>dt){
                this.update(dt);
                acc_time-=dt;
            }
    
            last = time;
            this.enqueue();
        
        }

   
    }
    enqueue(){
        requestAnimationFrame(this.updateProxy);
    }

    start(){
        this.enqueue();
    }

}