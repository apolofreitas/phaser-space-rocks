import { nanoid } from "nanoid";
import { GameScene } from "~/scenes/GameScene";
import { shipSprite } from "~/assets";
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
  constructor(private game: GameScene, x?: number, y?: number) {
    super(game, x, y, shipSprite);
    this.game.physics.add.existing(this);
    this.game.add.existing(this);

    this.setName(nanoid());
    this.setAngle(-90);
    this.setMaxVelocity(200);
  }

  preUpdate(time: number, delta: number) {
    this.updateCommands();
    this.updateObject();
  }

  updateCommands() {
    const { W, A, D, SPACE } = this.game.input.keyboard.addKeys(
      "W,A,D,SPACE"
    ) as {
      [key: string]: Phaser.Input.Keyboard.Key;
    };

    if (A.isDown && !D.isDown) this.commands.tilting = Tilting.left;
    if (!A.isDown && D.isDown) this.commands.tilting = Tilting.right;
    if ((!A.isDown && !D.isDown) || (A.isDown && D.isDown))
      this.commands.tilting = Tilting.false;

    if (W.isDown) this.commands.moving = Moving.forward;
    if (!W.isDown) this.commands.moving = Moving.false;

    if (SPACE.isDown && this.commands.shooting === Shooting.ready)
      this.commands.shooting = Shooting.shooting;
  }

  updateObject() {
    this.game.physics.world.wrap(this, this.width / 2);

    if (this.commands.moving === Moving.forward) {
      this.setAcceleration(
        Math.cos(this.rotation) * 100,
        Math.sin(this.rotation) * 100
      );
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
      const bulletX = this.x + (Math.cos(this.rotation) * this.width) / 2;
      const bulletY = this.y + (Math.sin(this.rotation) * this.height) / 2;

      this.game.bulletsGroup.add(
        new BulletObject(this.game, bulletX, bulletY, this.rotation, 600)
      );

      this.commands.shooting = Shooting.preparing;
      setTimeout(() => (this.commands.shooting = Shooting.ready), 250);
    }
  }

  onHit() {
    delete this.game.ship;
    this.destroy();
  }
}
