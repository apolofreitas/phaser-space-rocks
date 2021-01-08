import "phaser";

import { BootScene } from "~/scenes/BootScene";
import { GameScene } from "~/scenes/GameScene";

new Phaser.Game({
  type: Phaser.AUTO,
  width: 600,
  height: 600,
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
