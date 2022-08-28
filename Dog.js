class Dog extends Phaser.GameObjects.Sprite {
    
    constructor (scene, x, y, gameLogic)
    {
        super(scene, x, y);
        scene.add.existing(this);
        this.setTexture('animal');
        this.setScale(0.5);
        this.setPosition(x, y);
        this.setInteractive().on('pointerdown', this.processClick.bind(this));
        this.on('pointerover', this.increaseSize.bind(this));
        this.on('pointerout', this.decreaseSize.bind(this));
        this.gameLogic = gameLogic;
        var number = this.getRandomInt(3);
        if (number === 0) {
            this.sound = scene.sound.add('bark1');
        } else if (number === 1) {
            this.sound = scene.sound.add('bark2');
            this.setTexture('animal2');
        } else {
            this.sound = scene.sound.add('bark3');
            this.setTexture('animal3');
        }
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    increaseSize() {
        this.setScale(0.7);
    }

    decreaseSize() {
        this.setScale(0.5);
    }

    processClick(pointer) {
        if (this.isTinted) {
            return;
        }
        this.sound.play();
        this.setTint(0xff9999);
        this.gameLogic.processClick(this);
    }
}
export default Dog;


