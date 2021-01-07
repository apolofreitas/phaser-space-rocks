import { ShipObject } from "~/objects/ShipObject";
import { BackgroundObject } from "~/objects/BackgroundObject";
import { SpriteWrapOnWorldBounds } from "~/plugins/SpriteWrapOnWorldBounds";

export class GameScene extends Phaser.Scene {
  ship: ShipObject;
  bg: Phaser.GameObjects.TileSprite;
  spriteWrapOnWorldBounds: SpriteWrapOnWorldBounds;
  constructor() {
    super({ key: "GameScene" });
  }

  preload() {
    this.plugins.installScenePlugin(
      "SpriteWrapOnWorldBounds",
      SpriteWrapOnWorldBounds,
      "spriteWrapOnWorldBounds",
      this
    );
  }

  create() {
    this.physics.world.setBounds(
      0,
      0,
      this.cameras.main.width,
      this.cameras.main.height
    );
    this.bg = new BackgroundObject(this);
    this.ship = new ShipObject(
      this,
      this.physics.world.bounds.width / 2,
      this.physics.world.bounds.height / 2
    );
    this.spriteWrapOnWorldBounds.add(this.ship);
  }
}
