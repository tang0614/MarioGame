export function setMouseControl(){
    ['mousedown','mousemove'].forEach(eventName=>{
        canvas.addEventListener(eventName, event=>{
            if(event.buttons ===1){
                mario_entity.velocity.set(0, 0);
                mario_entity.pos.set(event.offsetX + camera.pos.x,
                    event.offsetY + camera.pos.y);
            }
        })
    })
}