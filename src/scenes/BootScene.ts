import * as assets from '~/src/assets'

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' })
  }

  preload() {
    const bg = this.add.rectangle(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      400,
      30,
      0x666666
    )
    const bar = this.add.rectangle(
      bg.x - bg.width / 2,
      bg.y,
      0,
      bg.height,
      0xffffff
    )

    Object.values(assets).forEach((asset) => this.load.image(asset, asset))

    this.load.on('progress', (progress) => (bar.width = bg.width * progress))
  }

  update() {
    this.scene.start('GameScene')
  }
}
