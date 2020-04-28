export function drawFont(font,level){
    const line1 = font.size;
    const line2 = font.size * 2;
    const coins = 0;
    const score = 0;
  
    
    function getPlayerInfo(){
        let entity_arr = level.entities.values();
        let entity = entity_arr.next().value;

        while(true){
            if(entity.name =='mario'){
                break;
            }
            entity = entity_arr.next().value;
        }
        
        let time = entity.playerController.playerTime;
        let score = entity.playerController.score;
        return [time,score];

    }

    

   

 
    return function drawFont(context,camera){  
        let time = getPlayerInfo()[0];
        let score = getPlayerInfo()[1];
       

        font.print('MARIO',context, 16, line1);  
        font.print('World',context, 160, line1);
        font.print('@'+coins.toString().padStart(2,0),context, 240, line1);  
        font.print('TIME',context, 320, line1);  
        font.print(score.toString().padStart(6,0),context, 16, line2); 
        font.print('Level 1',context, 160, line2);  
        font.print(time.toFixed().toString(),context, 320, line2);  
    }
}