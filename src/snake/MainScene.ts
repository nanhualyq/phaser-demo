import { Scene } from "phaser";
import Food from "./Food";
import Snake from "./Snake";

const CELL_SIZE = 40;

export default class MainScene extends Scene {
  keys: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
  snake: Snake | undefined;
  food: Food | undefined;
  nextDirection = "";

  preload() {
    this.load.image('avatar', 'https://avatars.githubusercontent.com/u/6212850?v=4')
  }
  
  create() {
    // this.scale.startFullscreen()
    this.nextDirection = "";
    this.food = new Food(this, CELL_SIZE, 'avatar');

    this.snake = new Snake(this, CELL_SIZE);

    this.food.resetPosition(this.snake);

    this.keys = this.input.keyboard?.createCursorKeys();

    this.input.on("pointerup", (p: Phaser.Input.Pointer) => {
      const diffX = p.x - p.downX;
      const diffY = p.y - p.downY;
      const gap = 100;
      if (diffY < -gap) {
        this.nextDirection = "UP";
      } else if (diffX > gap) {
        this.nextDirection = "RIGHT";
      } else if (diffY > gap) {
        this.nextDirection = "DOWN";
      } else if (diffX < -gap) {
        this.nextDirection = "LEFT";
      }
    });
  }

  update(): void {
    if (this.keys?.up.isDown) {
      this.nextDirection = "UP";
    } else if (this.keys?.right.isDown) {
      this.nextDirection = "RIGHT";
    } else if (this.keys?.down.isDown) {
      this.nextDirection = "DOWN";
    } else if (this.keys?.left.isDown) {
      this.nextDirection = "LEFT";
    }
    this.snake?.isGameOver();
    this.snake?.isEatFood(this.food);
    // this.snake?.updateDirection(this.nextDirection);
    this.snake?.updateByFrame(this.nextDirection);
  }
}
