export function setMouseControl(canvas,mario_entity,camera){
    let lastEvent;
    ['mousedown','mousemove'].forEach(eventName=>{
        canvas.addEventListener(eventName, event=>{
            if(event.buttons ===1){
                mario_entity.velocity.set(0, 0);
                mario_entity.pos.set(event.offsetX + camera.pos.x,
                    event.offsetY + camera.pos.y);
            }else if(event.buttons ===2
                && lastEvent 
                && lastEvent.type === 'mousemove'){
                    camera.pos.x -= event.offsetX -lastEvent.offsetX;
                }
                lastEvent = event;
        });
    });
    canvas.addEventListener('contextmenu', event=>{
        event.preventDefault();
    });
}