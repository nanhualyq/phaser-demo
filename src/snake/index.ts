import { Game } from "phaser";
import MainScene from "./MainScene";
import OverScene from "./OverScene";

new Game({
  // width: 640,
  // height: 480,
  physics: {
    // default: "matter",
    // default: "arcade",
    // arcade: {
    //   gravity: { y: 100, x: 0 },
    //   debug: true,
    // },
  },
  scene: [MainScene, OverScene],
  scale: {
    mode: Phaser.Scale.ScaleModes.RESIZE,
    // autoCenter: Phaser.Scale.CENTER_BOTH,
    // width: 640,
    // height: 480
  }
});