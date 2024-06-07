import Snake from "./Snake";

export default class Food extends Phaser.GameObjects.Image {
  constructor(scene: Phaser.Scene, size: number, img: string) {
    super(scene, 0, 0, img);
    this.scene = scene;
    this.setOrigin(0);
    this.setSize(size, size);
    this.setDisplaySize(size, size);
    this.tint = 0xffffff;
    this.tintFill = true
    scene.add.existing(this);
    scene.add.tween({
      targets: this,
      props: {
        alpha: 0.1,
      },
      duration: 1000,
      repeat: -1,
    });
  }
  resetPosition(snake: Snake) {
    const { width, height } = this.scene.scale;
    const CELL_SIZE = this.width;
    const xySet = new Set<string>();
    for (let x = 0; x < width / CELL_SIZE; x++) {
      for (let y = 0; y < height / CELL_SIZE; y++) {
        xySet.add(`${x},${y}`);
      }
    }
    for (const item of snake.getNodes()) {
      xySet.delete(`${item.x / CELL_SIZE},${item.y / CELL_SIZE}`);
    }
    const p = Phaser.Utils.Array.GetRandom(Array.from(xySet));
    const [x, y] = p.split(",");
    this.setPosition(+x * CELL_SIZE, +y * CELL_SIZE);
    if (snake.getNodes().length > 1) {
      this.tintFill = Math.random() > 0.1
    }
  }
}
