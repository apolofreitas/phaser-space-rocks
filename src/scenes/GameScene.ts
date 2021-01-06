import { backgroundSprite } from "~/assets";
import { ShipObject } from "~/objects/ShipObject";

export class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: "GameScene",
      plugins: {
        wrap: {
          min: {
            x: 0,
            y: 0,
          },
          max: {
            x: 500,
            y: 500,
          },
        },
      },
    });
  }

  create() {
    const bg = this.add.tileSprite(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      this.cameras.main.width,
      this.cameras.main.height,
      backgroundSprite
    );
    const ship = new ShipObject(
      this,
      this.cameras.main.width / 2,
      this.cameras.main.height / 2
    );
  }

  update() {}
}
