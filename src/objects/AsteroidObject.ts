import { nanoid } from "nanoid";
import { GameScene } from "~/scenes/GameScene";
import {
  asteroidHugeSprite,
  asteroidMediumSprite,
  asteroidSmallSprite,
} from "~/assets";

const sprites = [asteroidSmallSprite, asteroidMediumSprite, asteroidHugeSprite];

export class AsteroidObject extends Phaser.Physics.Arcade.Sprite {
  constructor(
    private game: GameScene,
    x: number,
    y: number,
    public asteroidType: number = Math.floor(Math.random() * sprites.length),
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
        new AsteroidObject(this.game, this.x, this.y, this.asteroidType - 1)
      );
      this.game.asteroidsGroup.add(
        new AsteroidObject(this.game, this.x, this.y, this.asteroidType - 1)
      );
    }
    this.game.asteroidsGroup.remove(this);
    this.destroy();
  }
}
