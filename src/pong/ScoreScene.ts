export default class ScoreScene extends Phaser.Scene {
    score: { [key: string]: string } | undefined
    constructor() {
        super({
            key: 'score'
        })
    }
    init(data: { [key: string]: string }) {
        this.score = data
    }
    create() {
        let text = 'Start Game'
        if (Object.keys(this.score || {}).length) {
            text = `(${this.score?.leftScore}) ${text} (${this.score?.rightScore})`
        }
        this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, text, {
            fontSize: '4rem',
            color: '#ffffff'
        })
            .setOrigin(.5)

        this.input.on('pointerup', () => this.startGame())
        this.input.keyboard?.on('keydown', () => this.startGame())
    }
    startGame() {
        this.scene
            .stop()
            .start('default')
    }
};
