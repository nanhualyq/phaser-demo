import { Scene } from "phaser";
import Board from "./Board";

export default class Ball extends Phaser.GameObjects.Rectangle {
    speed = 4
    xSpeed = 0;
    ySpeed = 0;
    constructor(scene: Scene) {
        const { width, height } = scene.game.canvas
        super(scene, width / 2, height / 2, 20, 20, 0xffffff)
        scene.add.existing(this)
        this.reset()
    }
    reset() {
        const random = new Phaser.Math.RandomDataGenerator()
        this.xSpeed = random.pick([this.speed, -this.speed])
        this.ySpeed = random.realInRange(-this.speed, this.speed)
    }
    moveByFrame(leftBoard: Board, rightBoard: Board) {
        if (this.checkTouchBoard(leftBoard) || this.checkTouchBoard(rightBoard)) {
            this.xSpeed = -this.xSpeed
        }
        if (this.checkTouchTopBottom()) {
            console.log('kiss');

            this.ySpeed = -this.ySpeed
        }
        this.x += this.xSpeed
        this.y += this.ySpeed
    }
    checkTouchBoard(board: Board) {
        return Phaser.Geom.Intersects.RectangleToRectangle(board.getBounds(), this.getBounds())
    }
    checkTouchTopBottom() {
        const { width, height } = this.scene.game.canvas
        const topLine = new Phaser.Geom.Line(0, 0, width, 0)
        const bottomLine = new Phaser.Geom.Line(0, height, width, height)
        return Phaser.Geom.Intersects.LineToRectangle(topLine, this.getBounds()) || Phaser.Geom.Intersects.LineToRectangle(bottomLine, this.getBounds())
    }
};
