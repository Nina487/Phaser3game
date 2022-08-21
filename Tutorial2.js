import Dog from "./Dog.js";
export default class Tutorial2 extends Phaser.Scene {
    constructor() {
        super("Tutorial2");
    }

    create() {
        var line = "Some dogs can't be soulmates because the line connecting them is not horizontal or vertical.\nTry clicking on these."
        var screenWidth = this.cameras.main.worldView.x + this.cameras.main.width;
        var text =  this.add.text(screenWidth/2, 0, line, {
            fill: '#000000',
            align: 'center',
            font: '600 50px Papyrus',
            wordWrap: { width: screenWidth - 20  }
        }).setOrigin(0.5, -0.2);
        this.add.existing(new Dog(this, 300, 400, 'MainScene', true));
        this.add.existing(new Dog(this, 700, 500, 'MainScene', true));
    }
}