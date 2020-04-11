export function createAnime(frames,frameLen){
    //distance in the animaiton, not in the context
    return function resolveFrame(distance){
       
        const index = Math.floor(distance/frameLen) % frames.length;
        console.log('index is');
        console.log(index);
        const animation_name = frames[index];
        return animation_name;
    };
}