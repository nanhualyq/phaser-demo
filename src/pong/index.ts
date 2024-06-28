import { Game } from "phaser";
import MainScene from "./MainScene";
import ScoreScene from "./ScoreScene";

new Game({
    // type: Phaser.WEBGL,
    width: 1024,
    height: 480,
    scale: {
        mode: Phaser.Scale.RESIZE,
        // mode: Phaser.Scale.FIT,
        // autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [ScoreScene, MainScene]
})