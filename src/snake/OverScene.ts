export default class OverScene extends Phaser.Scene {
  score: number;
  constructor() {
    super({
      key: "over",
    });
    this.score = 0;
  }
  init(data: { length: number }) {
    this.score = data.length;
  }
  create() {
    const text = this.add.text(0, 0, `Game Over!\nYour score: ${this.score}`, {
      fontSize: "4rem",
    });
    text
      .setOrigin(0.5)
      .setPosition(this.cameras.main.centerX, this.cameras.main.centerY);
    this.input.on("pointerup", () => this.startGame());
    this.input.keyboard?.on("keydown", () => this.startGame());
  }
  startGame() {
    this.scene.stop("over").start("default");
  }
}
