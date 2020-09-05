import Trait from "./trait.js";

export default class MushroomBehavior extends Trait {
  constructor() {
    super("mushroomBehavior");
  }

  collides_entity(me, other) {
    if (other.marioCollide) {
      console.log("mario collides mushroom");
      me.killable.killed();

      other.playerController.grow();
      other.offset.set(0, 16);
      other.jump.start();
      other.playerController.score += 1000;
      other.audio.playAudio("coin");
    }
  }
}
