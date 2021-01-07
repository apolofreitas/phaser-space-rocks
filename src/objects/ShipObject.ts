import { shipSprite } from "~/assets";
import { phaserRotationToMathNotation } from "~/utils/phaserRotationToMathNotation";
import { BulletObject } from "./BulletObject";

enum Tilting {
  false,
  left,
  right,
}
enum Moving {
  false,
  forward,
}
enum Shooting {
  ready,
  shooting,
  preparing,
}

export class ShipObject extends Phaser.Physics.Arcade.Sprite {
  public commands = {
    moving: Moving.false,
    tilting: Tilting.false,
    shooting: Shooting.ready,
  };
  constructor(public scene: Phaser.Scene, x?: number, y?: number) {
    super(scene, x, y, shipSprite);
    this.scene.physics.add.existing(this);
    this.scene.add.existing(this);
    this.scene.events.on("update", this.update, this);
  }

  addedToScene() {
    this.setAngle(-90);
    this.setMaxVelocity(200);
  }

  update(time: number, delta: number) {
    this.updateCommands();
    this.updateObject();
  }

  updateCommands() {
    const { W, A, D, SPACE } = this.scene.input.keyboard.addKeys(
      "W,A,D,SPACE"
    ) as {
      [key: string]: Phaser.Input.Keyboard.Key;
    };

    if (A.isDown && !D.isDown) this.commands.tilting = Tilting.left;
    if (!A.isDown && D.isDown) this.commands.tilting = Tilting.right;
    if (!A.isDown && !D.isDown) this.commands.tilting = Tilting.false;

    if (W.isDown) this.commands.moving = Moving.forward;
    if (!W.isDown) this.commands.moving = Moving.false;

    if (SPACE.isDown && this.commands.shooting === Shooting.ready)
      this.commands.shooting = Shooting.shooting;
  }

  updateObject() {
    if (this.commands.moving === Moving.forward) {
      const rotation = phaserRotationToMathNotation(this.rotation);
      this.setAcceleration(Math.cos(rotation) * 100, -Math.sin(rotation) * 100);
    }
    if (this.commands.moving === Moving.false) {
      this.setAcceleration(0, 0);
    }
    if (this.commands.tilting === Tilting.left) {
      this.setAngularVelocity(-200);
    }
    if (this.commands.tilting === Tilting.right) {
      this.setAngularVelocity(200);
    }
    if (this.commands.tilting === Tilting.false) {
      this.setAngularVelocity(0);
    }
    if (this.commands.shooting === Shooting.shooting) {
      const rotation = phaserRotationToMathNotation(this.rotation);

      const bulletX = this.x + (Math.cos(rotation) * this.width) / 2;
      const bulletY = this.y + (-Math.sin(rotation) * this.height) / 2;

      const bullet = new BulletObject(this.scene, bulletX, bulletY);

      bullet.shoot(this.rotation, 600);

      this.commands.shooting = Shooting.preparing;
      setTimeout(() => (this.commands.shooting = Shooting.ready), 150);
    }
  }
}
