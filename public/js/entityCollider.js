export default class EntityCollider{
    constructor(entities){
        this.entities = entities;

    }
    checkEntityOverlap(me){
     
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

    checkEntityCollision(me){
        if(me.canPush){
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
                 entity.canPush =false;
                 
             });

        }
        me.canPush =false;
    }

    
}