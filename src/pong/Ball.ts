import { Scene } from "phaser";
import Board from "./Board";

const SIZE = 20

export default class Ball extends Phaser.GameObjects.Rectangle {
    speed = 4
    xSpeed = 0;
    ySpeed = 0;
    constructor(scene: Scene) {
        super(scene, 0, 0, SIZE, SIZE, 0xffffff)
        scene.add.existing(this)
        this.reset()
    }
    reset() {
        const { width, height } = this.scene.cameras.main
        this.x = width / 2
        this.y = height / 2
        const random = new Phaser.Math.RandomDataGenerator()
        this.xSpeed = random.pick([this.speed, -this.speed])
        this.ySpeed = random.realInRange(-this.speed, this.speed)
    }
    moveByFrame(leftBoard: Board, rightBoard: Board) {
        if (this.checkOverflow(leftBoard, rightBoard)) {
            return
        }
        const speedChange = this.checkTouchBoard(leftBoard, rightBoard)
        if (speedChange) {
            if (speedChange === 'y') {
                this.ySpeed = -this.ySpeed
            } else {
                this.xSpeed = -this.xSpeed
            }
        }
        if (this.checkTouchTopBottom()) {
            this.ySpeed = -this.ySpeed
        }
        this.x += this.xSpeed
        this.y += this.ySpeed
    }
    checkOverflow(leftBoard: Board, rightBoard: Board) {
        const { width } = this.scene.game.canvas
        const bounds = this.getBounds()
        if (bounds.right < 0) {
            this.reset()
            rightBoard.data.inc('score')
            return true
        } else if (bounds.left > width) {
            this.reset()
            leftBoard.data.inc('score')
            return true
        }
    }
    checkTouchBoard(leftBoard: Board, rightBoard: Board) {
        const leftBounds = leftBoard.getBounds()
        const rightBounds = rightBoard.getBounds()
        const ball = this.getBounds()
        if (this.checkTouchLine(leftBounds.right, leftBounds.top, leftBounds.right, leftBounds.bottom)) {
            const xOffset = leftBounds.right - ball.left
            if (leftBounds.bottom - this.y < xOffset || ball.bottom - leftBounds.top < xOffset) {
                return 'y'
            } else {
                return 'x'
            }
        } else if (this.checkTouchLine(rightBounds.left, rightBounds.top, rightBounds.left, rightBounds.bottom)) {
            const xOffset = ball.right - rightBounds.left
            if (rightBounds.bottom - this.y < xOffset || ball.bottom - rightBounds.top < xOffset) {
                return 'y'
            } else {
                return 'x'
            }
        }
    }
    checkTouchTopBottom() {
        const { width, height } = this.scene.game.canvas
        return this.checkTouchLine(0, 0, width, 0) || this.checkTouchLine(0, height, width, height)
    }
    checkTouchLine(x1?: number, y1?: number, x2?: number, y2?: number) {
        const line = new Phaser.Geom.Line(x1, y1, x2, y2)
        return Phaser.Geom.Intersects.LineToRectangle(line, this.getBounds())
    }
};
