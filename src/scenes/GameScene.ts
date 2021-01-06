import { ShipObject } from "~/objects/ShipObject";

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
  }

  create() {
    this.add.grid(100, 100, 128, 96, 32, 32, 0x057605);
    const ship = new ShipObject(this, 0, 0);
    this.cameras.main.startFollow(ship, false, 0.1, 0.1);
    this.cameras.main.setZoom(3);
  }

  update() {}
}
