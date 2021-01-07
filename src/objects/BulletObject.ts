import { bulletSprite } from "~/assets";
import { phaserRotationToMathNotation } from "~/utils/phaserRotationToMathNotation";

export class BulletObject extends Phaser.Physics.Arcade.Sprite {
  constructor(public scene: Phaser.Scene, x?: number, y?: number) {
    super(scene, x, y, bulletSprite);
    this.scene.physics.add.existing(this);
    this.scene.add.existing(this);
  }

  shoot(phaserRotation: number, velocity: number) {
    const rotation = phaserRotationToMathNotation(phaserRotation);
    this.setAngle(phaserRotation * (180 / Math.PI));
    this.setVelocity(
      Math.cos(rotation) * velocity,
      -Math.sin(rotation) * velocity
    );
  }
}
