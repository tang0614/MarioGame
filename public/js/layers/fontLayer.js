export function drawFont(font,level){
    const line1 = font.size;
    const line2 = font.size * 2;
   

  
    
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
        let coin = entity.playerController.coin;
        return [time,score,coin];

    }

    

   

 
    return function drawFont(context,camera){  
        let time = getPlayerInfo()[0];
        let score = getPlayerInfo()[1];
        let coin = getPlayerInfo()[2];
       

        font.print('MARIO',context, 16, line1);  
        font.print('World',context, 112, line1);
        font.print('@ X '+coin.toString().padStart(2,0),context,208, line1);  
        font.print('TIME',context, 304, line1);  
        font.print(score.toString().padStart(6,0),context, 16, line2); 
        font.print('Level 1',context, 112, line2);  
        font.print(time.toFixed().toString(),context, 304, line2);  
    }
}