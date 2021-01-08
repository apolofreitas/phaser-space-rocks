import { nanoid } from "nanoid";
import { GameScene } from "~/scenes/GameScene";
import {
  asteroidHugeSprite,
  asteroidMediumSprite,
  asteroidSmallSprite,
} from "~/assets";
import { randomChooseBetween } from "~/utils/randomChooseBetween";

const sprites = [asteroidSmallSprite, asteroidMediumSprite, asteroidHugeSprite];

export class AsteroidObject extends Phaser.Physics.Arcade.Sprite {
  constructor(
    private game: GameScene,
    public asteroidType: number = randomChooseBetween(0, 1, 2),
    x?: number,
    y?: number,
    velocity: number = 50,
    rotation: number = Math.random() * 2 * Math.PI
  ) {
    super(game, x, y, sprites[asteroidType]);
    this.game.physics.add.existing(this);
    this.game.add.existing(this);

    this.setName(nanoid());
    this.setAngularVelocity(rotation * 5);
    this.setRotation(rotation);
    this.setVelocity(
      Math.cos(rotation) * velocity,
      Math.sin(rotation) * velocity
    );
  }

  preUpdate() {
    this.game.physics.world.wrap(this, this.width / 2);
  }

  onHit() {
    if (this.asteroidType > 0) {
      this.game.asteroidsGroup.add(
        new AsteroidObject(this.game, this.asteroidType - 1, this.x, this.y)
      );
      this.game.asteroidsGroup.add(
        new AsteroidObject(this.game, this.asteroidType - 1, this.x, this.y)
      );
    }
    this.game.asteroidsGroup.remove(this);
    this.destroy();
  }
}
