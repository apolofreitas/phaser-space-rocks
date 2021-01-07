import { shipSprite } from "~/assets";

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
  delay,
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
  }

  addedToScene() {
    this.setAngle(-90);
    this.setMaxVelocity(200);
  }

  preUpdate(time: number, delta: number) {
    this.wrapOnWorldBounds();
    this.updateCommands();
    this.updateObject();
  }

  wrapOnWorldBounds() {
    const { bounds } = this.scene.physics.world;

    if (this.x < bounds.x - this.width / 2) {
      this.x = bounds.x + bounds.width + this.width / 2;
    }
    if (this.x > bounds.x + bounds.width + this.width / 2) {
      this.x = bounds.x - this.width / 2;
    }
    if (this.y < bounds.y - this.height / 2) {
      this.y = bounds.y + bounds.height + this.height / 2;
    }
    if (this.y > bounds.y + bounds.height + this.height / 2) {
      this.y = bounds.y - this.height / 2;
    }
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
      const rotation = -this.rotation + (this.rotation < 0 ? 2 * Math.PI : 0);
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
      console.log("shot");
      this.commands.shooting = Shooting.delay;
      setTimeout(() => (this.commands.shooting = Shooting.ready), 250);
    }
  }
}
