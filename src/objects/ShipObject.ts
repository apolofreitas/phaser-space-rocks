import { shipSprite } from "~/assets";

enum Tilting {
  "false",
  "left",
  "right",
}
enum Moving {
  "false",
  "forward",
}

export class ShipObject extends Phaser.Physics.Arcade.Sprite {
  public commands = {
    moving: Moving.false,
    tilting: Tilting.false,
  };
  constructor(public scene: Phaser.Scene, x?: number, y?: number) {
    super(scene, x, y, shipSprite);
    this.scene.physics.add.existing(this);
    this.scene.add.existing(this);
  }

  addedToScene() {
    this.setAngle(-90);
    this.setMaxVelocity(200);
  }

  preUpdate(time: number, delta: number) {
    this.updateCommands();

    if (this.commands.moving === Moving.forward) {
      const rotation =
        this.rotation <= 0 ? -this.rotation : -this.rotation + 2 * Math.PI;
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

    const { main: camera } = this.scene.cameras;

    this.x = this.x < 0 - this.width / 2 ? camera.x + camera.width : this.x;
    this.x = this.x > camera.x + camera.width + this.width / 2 ? 0 : this.x;
    this.y = this.y < 0 - this.height / 2 ? camera.y + camera.height : this.y;
    this.y = this.y > camera.y + camera.height + this.height / 2 ? 0 : this.y;
  }

  updateCommands() {
    const { W, A, D } = this.scene.input.keyboard.addKeys("W,A,D") as {
      [key: string]: Phaser.Input.Keyboard.Key;
    };

    if (A.isDown && !D.isDown) this.commands.tilting = Tilting.left;
    if (!A.isDown && D.isDown) this.commands.tilting = Tilting.right;
    if (!A.isDown && !D.isDown) this.commands.tilting = Tilting.false;

    if (W.isDown) this.commands.moving = Moving.forward;
    if (!W.isDown) this.commands.moving = Moving.false;
  }
}
