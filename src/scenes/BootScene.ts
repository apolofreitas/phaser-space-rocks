import {
  cloudImg,
  cloudTransparentImg,
  desertBackgroundImg,
  enemyBigImg,
  enemyMediumImg,
  enemySmallImg,
  explosionImg,
  laserBoltsImg,
  powerUpImg,
  shipImg,
} from "~/assets";

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: "BootScene" });
  }

  preload() {
    const bg = this.add.rectangle(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      400,
      30,
      0x666666
    );
    const bar = this.add.rectangle(
      bg.x - bg.width / 2,
      bg.y,
      0,
      bg.height,
      0xffffff
    );

    this.load.image(cloudImg, cloudImg);
    this.load.image(cloudTransparentImg, cloudTransparentImg);
    this.load.image(desertBackgroundImg, desertBackgroundImg);
    this.load.spritesheet(enemyBigImg, enemyBigImg, {
      frameWidth: 16,
      frameHeight: 24,
    });
    this.load.spritesheet(enemyMediumImg, enemyMediumImg, {
      frameWidth: 16,
      frameHeight: 24,
    });
    this.load.spritesheet(enemySmallImg, enemySmallImg, {
      frameWidth: 16,
      frameHeight: 24,
    });
    this.load.spritesheet(explosionImg, explosionImg, {
      frameWidth: 16,
      frameHeight: 24,
    });
    this.load.spritesheet(laserBoltsImg, laserBoltsImg, {
      frameWidth: 16,
      frameHeight: 24,
    });
    this.load.spritesheet(powerUpImg, powerUpImg, {
      frameWidth: 16,
      frameHeight: 24,
    });
    this.load.spritesheet(shipImg, shipImg, {
      frameWidth: 16,
      frameHeight: 24,
    });

    this.load.on("progress", (progress) => (bar.width = bg.width * progress));
  }

  update() {
    this.scene.start("GameScene");
  }
}
