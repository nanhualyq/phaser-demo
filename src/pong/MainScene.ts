import { Scene } from "phaser";
import Board from "./Board";
import Ball from "./Ball";

export default class MainScene extends Scene {
    keys!: { [key: string]: { isDown: boolean; }; };
    leftBoard!: Board;
    rightBoard!: Board;
    ball!: Ball;
    create() {
        this.leftBoard = new Board(this, 'left')
        this.rightBoard = new Board(this, 'right')
        this.keys = this.input.keyboard?.addKeys('W,S,UP,DOWN') as typeof this.keys
        this.ball = new Ball(this)
    }

    update(time: number, delta: number): void {
        if (this.keys?.W.isDown) {
            this.leftBoard.moveByFrame('up')
        } else if (this.keys?.S.isDown) {
            this.leftBoard.moveByFrame('down')
        }
        if (this.keys?.UP.isDown) {
            this.rightBoard.moveByFrame('up')
        } else if (this.keys?.DOWN.isDown) {
            this.rightBoard.moveByFrame('down')
        }
        this.ball.moveByFrame(this.leftBoard, this.rightBoard)
    }
}
