import { Scene } from "phaser";

export default class MainScene extends Scene {
    create() {
        this.add.rectangle(100, 100, 100, 100, 0xffffff)
    }
}
