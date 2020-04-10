export function createAnime(frames,frameLen){
    //distance in the animaiton, not in the context
    return function resolveFrame(distance){
        const index = Math.floor(distance/frameLen) % frames.length;
        const name = frames[index];
        return name
    };
}