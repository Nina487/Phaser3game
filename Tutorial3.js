import Dog from "./Dog.js";
import GameLogic from "./GameLogic.js";
export default class Tutorial3 extends Phaser.Scene {
    constructor() {
        super("Tutorial3");
    }

    create() {
        var line = "Some dogs can't be soulmates because there's another dog standing between them.\nRemove the dog first!"
        var screenWidth = this.cameras.main.worldView.x + this.cameras.main.width;
        var text =  this.add.text(screenWidth/2, 0, line, {
            fill: '#000000',
            align: 'center',
            font: '600 50px Papyrus',
            wordWrap: { width: screenWidth - 20  }
        }).setOrigin(0.5, -0.2);
        var gameLogic = new GameLogic(this, 'Level3');
        gameLogic.addAnimal(new Dog(this, 200, 600, gameLogic));
        gameLogic.addAnimal(new Dog(this, 800, 600, gameLogic));
        gameLogic.addAnimal(new Dog(this, 500, 600, gameLogic));
        gameLogic.addAnimal(new Dog(this, 500, 400, gameLogic));
    }
}