import "phaser";

import { BootScene } from "~/scenes/BootScene";
import { GameScene } from "~/scenes/GameScene";

new Phaser.Game({
  type: Phaser.AUTO,
  // @ts-ignore
  pixelArt: true,
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: "arcade",
  },
  scene: [BootScene, GameScene],
});
