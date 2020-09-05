import Trait from "./trait.js";

export default class ChanceBehavior extends Trait {
  constructor() {
    super("chanceBehavior");
  }

  collides_entity(me, other) {
    if (other.marioCollide) {
      //if mario jump up to me, me being killed

      me.audio.playAudio("stomp");
      me.killable.killed();
      me.canBePush = true;
      other.playerController.score += 200;
    }
  }
}
