import { shipImg } from "~/assets";

export class ShipObject extends Phaser.Physics.Arcade.Sprite {
  private animation: number = 0;
  private animationTarget: number = 0;
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, shipImg);
    scene.physics.add.existing(this);
    scene.add.existing(this);

    this.anims.create({
      key: "2",
      frameRate: 10,
      frames: this.anims.generateFrameNumbers(shipImg, { frames: [4, 9] }),
      repeat: -1,
    });
    this.anims.create({
      key: "1",
      frameRate: 10,
      frames: this.anims.generateFrameNumbers(shipImg, { frames: [3, 8] }),
      repeat: -1,
    });
    this.anims.create({
      key: "0",
      frameRate: 10,
      frames: this.anims.generateFrameNumbers(shipImg, { frames: [2, 7] }),
      repeat: -1,
    });
    this.anims.create({
      key: "-1",
      frameRate: 10,
      frames: this.anims.generateFrameNumbers(shipImg, { frames: [1, 6] }),
      repeat: -1,
    });
    this.anims.create({
      key: "-2",
      frameRate: 10,
      frames: this.anims.generateFrameNumbers(shipImg, { frames: [0, 5] }),
      repeat: -1,
    });

    this.anims.play("0");

    scene.input.keyboard.on("keydown-W", (event) => {});
    scene.input.keyboard.on("keydown-A", (event) => {
      this.animationTarget = -2;
      this.setAngularVelocity(-200);
    });
    scene.input.keyboard.on("keydown-D", (event) => {
      this.animationTarget = 2;
      this.setAngularVelocity(200);
    });

    scene.events.on("update", (_, dt: number) => {
      const rotation =
        this.rotation <= 0
          ? -this.rotation
          : -(this.rotation - Math.PI) + Math.PI;

      this.setVelocity(
        Math.cos(rotation + Math.PI / 2) * 8 * dt,
        -Math.sin(rotation + Math.PI / 2) * 8 * dt
      );
    });
  }
}
