import { loadMario } from "../entities/loadMario.js";
import { loadGoomba } from "../entities/loadGoomba.js";
import { loadKoopa } from "../entities/loadKoopa.js";
import { loadCannon } from "../entities/loadCannon.js";
import { loadBullet } from "../entities/loadBullet.js";
import { loadMushroom } from "../entities/loadMushroom.js";
import { loadJugem } from "../entities/loadJugem.js";
import { loadLakitu } from "../entities/loadLakitu.js";
import { loadChance } from "../entities/loadChance.js";

export function loadEntities(audioContext) {
  const entitiyFactories = {};
  //closure
  function add(name) {
    return (factory) => (entitiyFactories[name] = factory);
  }

  // return Promise.all([
  //     loadMario().then(marioEntity=>{entitiyFactories['mario'] =marioEntity}),
  //     loadGoomba().then(goombaEntity=>{entitiyFactories['goomba'] =goombaEntity}),
  //     loadKoopa().then(koopaEntity=>{entitiyFactories['koopa'] =koopaEntity}),
  // ])
  // return Promise.all([
  //     loadMario().then(marioEntity=>{add('mario')(marioEntity)}),
  //     loadGoomba().then(goombaEntity=>{add('goomba')(goombaEntity)}),
  //     loadKoopa().then(koopaEntity=>{add('koopa')(koopaEntity)}),
  // ])

  return Promise.all([
    loadMario(audioContext).then(add("mario")), // !default put returned value into parameter of callback function
    loadGoomba(audioContext).then(add("goomba")),
    loadKoopa(audioContext).then(add("koopa")),
    loadBullet(audioContext).then(add("bullet")),
    loadMushroom(audioContext).then(add("mushroom")),
    loadJugem(audioContext).then(add("jugem")),
    loadCannon(audioContext, entitiyFactories).then(add("cannon")),
    loadChance(audioContext, entitiyFactories).then(add("chance")),
    loadLakitu(audioContext, entitiyFactories).then(add("lakitu")),
  ]).then(() => entitiyFactories);
}
