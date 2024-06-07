import Food from "./Food";

let count = 0;
export default class Snake extends Phaser.GameObjects.Group {
  scene: Phaser.Scene;
  CELL_SIZE: number;
  direction: "UP" | "DOWN" | "LEFT" | "RIGHT" = "RIGHT";
  constructor(scene: Phaser.Scene, CELL_SIZE: number) {
    super(scene);
    this.direction = "RIGHT";
    this.scene = scene;
    this.CELL_SIZE = CELL_SIZE;
    this.append();
  }
  append(x = 0, y = 0) {
    const tail = this.scene.add
      .rectangle(x, y, this.CELL_SIZE, this.CELL_SIZE, 0xffffff)
      .setOrigin(0)
      .setStrokeStyle(1);
    this.add(tail);
  }
  getNodes() {
    return this?.getChildren() as Phaser.GameObjects.Rectangle[];
  }
  appendTail(direction: string) {
    const [prev, last] = this?.getNodes()?.slice(-2);
    let x = 0;
    let y = 0;
    if (last) {
      const p1 = prev.getTopLeft();
      const p2 = last.getTopLeft();
      x = p2.x - p1.x + p2.x;
      y = p2.y - p1.y + p2.y;
    } else if (prev) {
      const p = prev.getTopLeft();
      x = p.x;
      y = p.y;
      switch (direction) {
        case "UP":
          y += this.CELL_SIZE;
          break;
        case "DOWN":
          y -= this.CELL_SIZE;
          break;
        case "LEFT":
          x += this.CELL_SIZE;
          break;
        case "RIGHT":
          x -= this.CELL_SIZE;
          break;

        default:
          break;
      }
    }
    this.append(x, y);
  }
  moveByDirection() {
    const children = this.getNodes();
    for (let i = children.length - 1; i > 0; i--) {
      children[i].x = children[i - 1].x;
      children[i].y = children[i - 1].y;
    }
    const head = children[0];
    switch (this.direction) {
      case "UP":
        head.y -= this.CELL_SIZE;
        break;
      case "DOWN":
        head.y += this.CELL_SIZE;
        break;
      case "LEFT":
        head.x -= this.CELL_SIZE;
        break;
      case "RIGHT":
        head.x += this.CELL_SIZE;
        break;

      default:
        break;
    }
  }
  isGameOver() {
    const [head, ...tails] = this.getNodes();
    const { x, y } = head?.getTopLeft() || {
      x: 0,
      y: 0,
    };
    const { width, height } = this.scene.scale;
    const isOverflow = x < 0 || y < 0 || x > width || y > height;
    const isCircle = tails.some((item) => item.x === x && item.y === y);
    if (isOverflow || isCircle) {
      this.scene.scene.stop("default").start("over", {
        length: this.getNodes().length,
      });
    }
  }
  isEatFood(food: Food | undefined) {
    const a = food?.getTopLeft();
    const b = this.getNodes()?.[0]?.getTopLeft();
    if (a?.x === b?.x && a?.y === b?.y) {
      this.appendTail(this.direction);
      food?.resetPosition(this);
    }
  }
  updateDirection(nextDirection: string) {
    const isDirectionX = ["LEFT", "RIGHT"].includes(this.direction);
    if (nextDirection === "UP" && isDirectionX) {
      this.direction = "UP";
    } else if (nextDirection === "RIGHT" && !isDirectionX) {
      this.direction = "RIGHT";
    } else if (nextDirection === "DOWN" && isDirectionX) {
      this.direction = "DOWN";
    } else if (nextDirection === "LEFT" && !isDirectionX) {
      this.direction = "LEFT";
    }
  }
  updateByFrame(nextDirection: string) {
    count++;
    if (count === 50 - this.getNodes().length - 1) {
      count = 0;
      this.updateDirection(nextDirection);
      this.moveByDirection();
    }
  }
}
