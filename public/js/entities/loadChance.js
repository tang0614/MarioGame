import Entity from "../entity.js";
import { loadSpriteSheet } from "../loader.js";
import AnimalGo from "../traits/animalGo.js";
import Position from "../traits/position.js";
import ChanceBehavior from "../traits/chanceBehavior.js";
import Killable from "../traits/killable.js";
import Jump from "../traits/jump.js";
import { loadAudioBoard } from "../loader/audio.js";
import Emit from "../traits/emit.js";

export function loadChance(audioContext, entitiyFactories) {
  return Promise.all([
    loadSpriteSheet("chance"),
    loadAudioBoard("sound", audioContext),
  ]).then((result) => {
    return createChanceEntity(result[0], result[1], entitiyFactories);
  });
}

function createChanceEntity(chance, audioBoard, entitiyFactories) {
  const anime_run = chance.animation.get("chance");
  //create this function only once when loading the game, and then reuse it
  function routeFrame(chance_entity) {
    if (chance_entity.killable.dead) {
      return "flat";
    }
    return anime_run(chance_entity.walk.duration);
  }

  function drawChance(context, camera) {
    //draw method from sprite sheet (This pointing to the chance entity)
    chance.draw(
      routeFrame(this),
      context,
      this.pos.x - camera.pos.x,
      this.pos.y - camera.pos.y
    );
  }

  function emitBullet(entity, level) {
    const mushroom = entitiyFactories.mushroom();

    mushroom.pos.x = entity.pos.x + 16;
    mushroom.pos.y = entity.pos.y - 16;

    level.entities.add(mushroom);
  }

  //return a function create mario
  return function createChanceFunction() {
    const chance_entity = new Entity("chance");
    chance_entity.size.set(16, 16);
    chance_entity.velocity.set(0, 0);
    chance_entity.audio = audioBoard;

    chance_entity.addTrait(new AnimalGo());
    chance_entity.addTrait(new Jump());
    chance_entity.addTrait(new Position());
    chance_entity.addTrait(new ChanceBehavior());
    chance_entity.addTrait(new Killable());

    const emit_object = new Emit();
    emit_object.bullet_list.push(emitBullet);
    chance_entity.addTrait(emit_object);

    //add a draw method to mario entity
    chance_entity.walk.acc_x = 0;
    chance_entity.jump.acc_y = 0;
    chance_entity.killable.removeTime = 360000;
    chance_entity.draw = drawChance;
    return chance_entity;
  };
}
