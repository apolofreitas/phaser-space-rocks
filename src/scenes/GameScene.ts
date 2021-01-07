import { backgroundSprite } from "~/assets";
import { ShipObject } from "~/objects/ShipObject";

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
  }

  create() {
    this.physics.world.setBounds(
      0,
      0,
      this.cameras.main.width,
      this.cameras.main.height
    );
    const bg = this.add.tileSprite(
      this.physics.world.bounds.width / 2,
      this.physics.world.bounds.height / 2,
      this.physics.world.bounds.width,
      this.physics.world.bounds.height,
      backgroundSprite
    );
    const ship = new ShipObject(
      this,
      this.physics.world.bounds.width / 2,
      this.physics.world.bounds.height / 2
    );
  }

  update() {}
}
