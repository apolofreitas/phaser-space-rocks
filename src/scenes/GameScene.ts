import { backgroundSprite } from '~/src/assets'
import { ShipObject } from '~/src/objects/ShipObject'
import { AsteroidObject } from '~/src/objects/AsteroidObject'
import { BulletObject } from '~/src/objects/BulletObject'

export class GameScene extends Phaser.Scene {
  bg: Phaser.GameObjects.TileSprite
  ship: ShipObject
  asteroidsGroup: Phaser.GameObjects.Group
  bulletsGroup: Phaser.GameObjects.Group
  asteroidSpawnInterval?: NodeJS.Timer
  constructor() {
    super({ key: 'GameScene' })
  }

  preload() {
    this.physics.world.setBounds(
      0,
      0,
      this.cameras.main.width,
      this.cameras.main.height
    )
  }

  create() {
    if (!!this.asteroidSpawnInterval) clearInterval(this.asteroidSpawnInterval)

    this.bg = this.add.tileSprite(
      this.physics.world.bounds.width / 2,
      this.physics.world.bounds.height / 2,
      this.physics.world.bounds.width,
      this.physics.world.bounds.height,
      backgroundSprite
    )

    this.asteroidsGroup = this.add.group({ classType: AsteroidObject })
    this.bulletsGroup = this.add.group({ classType: BulletObject })

    this.ship = new ShipObject(
      this,
      this.physics.world.bounds.width / 2,
      this.physics.world.bounds.height / 2
    )

    this.asteroidSpawnInterval = setInterval(() => {
      const random = Math.floor(Math.random() * 2) + 1
      const asteroidX =
        random === 1
          ? this.physics.world.bounds.width
          : Math.random() * this.physics.world.bounds.width
      const asteroidY =
        random === 2
          ? this.physics.world.bounds.height
          : Math.random() * this.physics.world.bounds.height

      const asteroid = new AsteroidObject(this, asteroidX, asteroidY)

      if (random === 1) asteroid.x += asteroid.width / 2
      if (random === 2) asteroid.y += asteroid.height / 2

      this.asteroidsGroup.add(asteroid)
    }, 2000)
  }

  update() {
    const asteroids = this.asteroidsGroup.children.getArray()
    const bullets = this.bulletsGroup.children.getArray()

    asteroids.forEach((asteroid: AsteroidObject) => {
      this.physics.overlap(asteroid, this.ship, () => {
        this.ship.onHit()
      })
      bullets.forEach((bullet: BulletObject) => {
        this.physics.overlap(asteroid, bullet, () => {
          asteroid.onHit()
          bullet.onHit()
        })
      })
    })

    if (!this.ship) this.scene.restart()
  }
}
