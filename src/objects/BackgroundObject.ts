import { backgroundSprite } from "~/assets";

export class BackgroundObject extends Phaser.GameObjects.TileSprite {
  constructor(public scene: Phaser.Scene) {
    super(
      scene,
      scene.physics.world.bounds.width / 2,
      scene.physics.world.bounds.height / 2,
      scene.physics.world.bounds.width,
      scene.physics.world.bounds.height,
      backgroundSprite
    );
    this.scene.add.existing(this);
  }
}
