import { Game } from "phaser";
import MainScene from "./MainScene";

new Game({
    width: 1024,
    height: 480,
    scale: {
        mode: Phaser.Scale.CENTER_HORIZONTALLY
    },
    scene: [MainScene]
})