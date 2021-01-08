import { nanoid } from "nanoid";
import { GameScene } from "~/scenes/GameScene";
import { bulletSprite } from "~/assets";

export class BulletObject extends Phaser.Physics.Arcade.Sprite {
  constructor(
    private game: GameScene,
    x?: number,
    y?: number,
    rotation: number = 0,
    velocity: number = 100
  ) {
    super(game, x, y, bulletSprite);
    this.game.physics.add.existing(this);
    this.game.add.existing(this);

    this.setScale(1.25);
    this.setName(nanoid());
    this.setRotation(rotation);
    this.setVelocity(
      Math.cos(rotation) * velocity,
      Math.sin(rotation) * velocity
    );
  }

  preUpdate() {
    if (!this.game.physics.world.bounds.contains(this.x, this.y)) this.onHit();
  }

  onHit() {
    this.game.bulletsGroup.remove(this);
    this.destroy();
  }
}
