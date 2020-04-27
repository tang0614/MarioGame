export default class EntityCollider{
    constructor(entities){
        this.entities = entities;

    }
    checkEntityOverlapMario(me){
     
        this.entities.forEach(entity=>{
           if(entity===me){
               return;
           }
            //property check because only mario entity has marioCollide
            if(me.bounds.overlaps(entity.bounds)){
                if(entity.marioCollide){
                    me.overlaps(entity);
                }   
            }
            
        });
    }

    checkEntityCollideMario(me){
        if(me.canBePush){
            this.entities.forEach(entity=>{
                if(entity===me){
                    return;
                }
                 //property check because only mario entity has marioCollide
                 if(me.bounds.overlaps(entity.bounds)){
               
                     if(entity.marioCollide){
                  
                         if(entity.go.dir== 1){
                             me.walk.dir = 1;
                             me.velocity.x = 200;
                         }else if (entity.go.dir==-1){
                             me.walk.dir = -1;
                             me.velocity.x = -200;
                         }
                          
                     }   
                 }
                 //entity.canBePush =false;
                 
             });

        }
        me.canBePush =false;
    }

    
}