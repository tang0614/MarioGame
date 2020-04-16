import {loadMario} from '../entities/loadMario.js';
import {loadGoomba} from '../entities/loadGoomba.js';
import {loadKoopa} from '../entities/loadKoopa.js';


export function loadEntities(){
    const entitiyFactories = {};
    // function add(name){
    //     return factory => entitiyFactories['name'] = factory
    // }

    return Promise.all([
        loadMario().then(marioEntity=>{entitiyFactories['mario'] =marioEntity}),
        loadGoomba().then(goombaEntity=>{entitiyFactories['goomba'] =goombaEntity}),
        loadKoopa().then(koopaEntity=>{entitiyFactories['koopa'] =koopaEntity}),
    ])
    .then(()=> {return entitiyFactories});
}