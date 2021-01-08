import { backgroundSprite } from "~/assets";
import { ShipObject } from "~/objects/ShipObject";
import { AsteroidObject } from "~/objects/AsteroidObject";
import { BulletObject } from "~/objects/BulletObject";

export class GameScene extends Phaser.Scene {
  // spriteWrapOnWorldBounds: SpriteWrapOnWorldBounds;
  bg: Phaser.GameObjects.TileSprite;
  ship: ShipObject;
  asteroidsGroup: Phaser.GameObjects.Group;
  bulletsGroup: Phaser.GameObjects.Group;
  constructor() {
    super({ key: "GameScene" });
  }

  preload() {
    this.physics.world.setBounds(
      0,
      0,
      this.cameras.main.width,
      this.cameras.main.height
    );
  }

  create() {
    this.bg = this.add.tileSprite(
      this.physics.world.bounds.width / 2,
      this.physics.world.bounds.height / 2,
      this.physics.world.bounds.width,
      this.physics.world.bounds.height,
      backgroundSprite
    );
    this.asteroidsGroup = this.add.group({
      classType: AsteroidObject,
    });
    this.bulletsGroup = this.add.group({
      classType: BulletObject,
    });

    this.ship = new ShipObject(
      this,
      this.physics.world.bounds.width / 2,
      this.physics.world.bounds.height / 2
    );

    this.asteroidsGroup.add(new AsteroidObject(this));
  }

  update() {
    const asteroids = this.asteroidsGroup.children.getArray();
    const bullets = this.bulletsGroup.children.getArray();

    asteroids.forEach((asteroid: AsteroidObject) => {
      this.physics.overlap(asteroid, this.ship, () => {
        this.ship.onHit();
      });
      bullets.forEach((bullet: BulletObject) => {
        this.physics.overlap(asteroid, bullet, () => {
          asteroid.onHit();
          bullet.onHit();
        });
      });
    });

    if (!this.ship || asteroids.length === 0) this.scene.restart();
  }
}
