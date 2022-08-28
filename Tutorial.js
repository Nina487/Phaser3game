import Dog from "./Dog.js";
import GameLogic from "./GameLogic.js";
export default class Tutorial extends Phaser.Scene {
    constructor() {
        super("Tutorial");
    }

    preload() {
        this.load.image('animal', 'assets/dog.png');
        this.load.image('animal2', 'assets/dog2.png');
        this.load.image('animal3', 'assets/dog3.png');
        this.load.audio('bark1', [ 'assets/bark1.ogg', 'assets/bark1.mp3' ]);
        this.load.audio('bark2', [ 'assets/bark2.ogg', 'assets/bark2.mp3' ]);
        this.load.audio('bark3', [ 'assets/bark3.ogg', 'assets/bark3.mp3' ]);
    }

    create() {
        var screenWidth = this.cameras.main.worldView.x + this.cameras.main.width;
        var line = "Help these dogs find their soulmate! \nClick on 2 dogs that can be connected\nby a horizontal or vertical line.";
        var text =  this.add.text(screenWidth/2, 0, line, {
            fill: '#000000',
            align: 'center',
            font: '600 50px Papyrus',
            wordWrap: { width: screenWidth - 20 }
        }).setOrigin(0.5, -0.2);
        var gameLogic = new GameLogic(this, 'Tutorial2');
        gameLogic.addAnimal(new Dog(this, 300, 450, gameLogic));
        gameLogic.addAnimal(new Dog(this, 700, 450, gameLogic));
    }
}