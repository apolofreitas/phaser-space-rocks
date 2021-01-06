import "phaser";

import { BootScene } from "~/scenes/BootScene";
import { GameScene } from "~/scenes/GameScene";

new Phaser.Game({
  type: Phaser.AUTO,
  width: 500,
  height: 500,
  // @ts-ignore
  pixelArt: true,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: "arcade",
  },
  scene: [BootScene, GameScene],
});
