export default class EntityCollider{
    constructor(entities){
        this.entities = entities;

    }
    checkEntityCollision(me){
     
        this.entities.forEach(entity=>{
           if(entity===me){
               return;
           }
            //property check because only mario entity has marioCollide
            if(me.bounds.overlaps(entity.bounds)){
                if(entity.marioCollide){
                    me.collides(entity);
                   

                }   
            }
            
        });
    }

    
}