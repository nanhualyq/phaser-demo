import { Scene } from "phaser";

export default class Board extends Phaser.GameObjects.Rectangle {
    width = 20;
    height = 100;
    constructor(scene: Scene, position: 'left' | 'right') {
        super(scene, 0, 0, 0, 0, 0xffffff)
        if (position === 'right') {
            this.setPosition(scene.game.canvas.width - this.width, 0)
        }
        this.setOrigin(0)
        this.setY(scene.game.canvas.height / 2 - this.height)
        scene.add.existing(this)
    }
    moveByFrame(direction: 'up' | 'down') {
        const speed = 3
        this.y += direction === 'down' ? speed : -speed
    }
};
