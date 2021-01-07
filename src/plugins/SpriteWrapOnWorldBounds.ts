export class SpriteWrapOnWorldBounds extends Phaser.Plugins.ScenePlugin {
  constructor(
    public scene: Phaser.Scene,
    public pluginManager: Phaser.Plugins.PluginManager,
    public sprites: Phaser.GameObjects.Sprite[] = []
  ) {
    super(scene, pluginManager);
    scene.events.on("update", this.update, this);
  }

  add(...sprite: Phaser.GameObjects.Sprite[]) {
    this.sprites.push(...sprite);
  }

  update() {
    this.sprites.forEach((sprite) => {
      const { bounds } = this.scene.physics.world;

      if (sprite.x < bounds.x - sprite.width / 2) {
        sprite.x = bounds.x + bounds.width + sprite.width / 2;
      }
      if (sprite.x > bounds.x + bounds.width + sprite.width / 2) {
        sprite.x = bounds.x - sprite.width / 2;
      }
      if (sprite.y < bounds.y - sprite.height / 2) {
        sprite.y = bounds.y + bounds.height + sprite.height / 2;
      }
      if (sprite.y > bounds.y + bounds.height + sprite.height / 2) {
        sprite.y = bounds.y - sprite.height / 2;
      }
    });
  }
}
