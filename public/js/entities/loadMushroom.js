import AnimalGo from "../traits/animalGo.js";
import Position from "../traits/position.js";
import Entity from "../entity.js";
import Jump from "../traits/jump.js";
import { loadSpriteSheet } from "../loader.js";
import Killable from "../traits/killable.js";
import { loadAudioBoard } from "../loader/audio.js";
import MushroomBehavior from "../traits/mushroomBehavior.js";

export function loadMushroom(audioContext) {
  return Promise.all([
    loadSpriteSheet("mushroom"),
    loadAudioBoard("sound", audioContext),
  ]).then((result) => {
    return createMushroomEntity(result[0], result[1]);
  });
}

//mario is the parameter returned by loadSpriteSheet
function createMushroomEntity(mushroom, audioBoard) {
  //create this function only once when loading the game, and then reuse it
  function drawMushroom(context, camera) {
    //draw method from sprite sheet (This pointing to the mario entity not mario sprites)
    mushroom.draw(
      "mushroom",
      context,
      this.pos.x - camera.pos.x,
      this.pos.y - camera.pos.y
    );
  }

  //return a function create mario
  return function createMushroomFunction() {
    const mushroom_entity = new Entity("mushroom");
    mushroom_entity.size.set(16, 16);
    mushroom_entity.velocity.set(0, 0);

    mushroom_entity.audio = audioBoard;
    mushroom_entity.canDetectTiles = true;

    mushroom_entity.addTrait(new AnimalGo());
    mushroom_entity.addTrait(new Jump());
    mushroom_entity.addTrait(new Position());
    mushroom_entity.addTrait(new Killable());
    mushroom_entity.addTrait(new MushroomBehavior());
    mushroom_entity.walk.go_limit = 20;
    mushroom_entity.draw = drawMushroom;
    return mushroom_entity;
  };
}
