class Dog extends Phaser.GameObjects.Sprite {
    
    constructor (scene, x, y, nextScene, endAfter2Clicks)
    {
        super(scene, x, y);
        this.setTexture('animal');
        this.setScale(0.5);
        this.setPosition(x, y);
        this.setInteractive().on('pointerdown', this.processClick.bind(this));
        this.on('pointerover', this.increaseSize.bind(this));
        this.on('pointerout', this.decreaseSize.bind(this));
        Dog.animals.push(this);
        var screenWidth = scene.cameras.main.worldView.x + scene.cameras.main.width;
        var screenHeight = scene.cameras.main.worldView.y + scene.cameras.main.height;
        Dog.text =  scene.add.text(screenWidth/2, screenHeight/2, '', {
            fill: '#ff0000',
            align: 'center',
            font: '600 50px Papyrus',
            wordWrap: { width: screenWidth - 20 }
        }).setOrigin(0.5);
        Dog.text2 =  scene.add.text(screenWidth/2, screenHeight/2, '', {
            fill: '#000000',
            align: 'center',
            font: '600 100px Papyrus',
            wordWrap: { width: screenWidth - 20 }
        }).setOrigin(0.5);
        Dog.scene = scene;
        Dog.nextScene = nextScene;
        Dog.endAfter2Clicks = endAfter2Clicks;
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
    static selected = [];
    static animals = [];
    static text = null;
    static text2 = null;
    static nextScene = '';
    static endAfter2Clicks = false;
    static text3 = null;
    static scene = null;
    
    areSoulmates(a1, a2) {
        if (a1.x === a2.x) {
            for (var i = 0; i < Dog.animals.length; i++) {
                var a3 = Dog.animals[i];
                if (a3 !== a1 && a3 !== a2) {
                    if (a3.x === a1.x && ((a1.y < a3.y < a2.y) || (a2.y < a3.y < a1.y))) {
                        
                        return false;
                    }
                }
            }
            return true;
        } else if (a1.y === a2.y) {
            for (var i = 0; i < Dog.animals.length; i++) {
                var a3 = Dog.animals[i];
                if (a3 !== a1 && a3 !== a2) {
                    if (a3.y === a1.y && ((a1.x < a3.x && a3.x < a2.x) || (a2.x < a3.x && a3.x < a1.x))) {
                        return false;
                    }
                }
            }
            return true;
        } else {
            return false;
        }
    }

    isGameLost(animals) {
        for (var k = 0; k < animals.length; k++) {
            for (var l = 0; l < animals.length; l++) {
                if (k!==l && this.areSoulmates(animals[k], animals[l])) {
                    return false;
                }
            } 
        }
        return true;
    }

    restartGame() {
        Dog.scene.scene.start(Dog.scene);
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

    processClick (pointer) {
        for (var i = 0; i <= Dog.selected.length; i++) {
            if (Dog.selected[i] == this) {
                return;
            }
        }
        this.sound.play();
        this.setTint(0xff9999);
        var scene = this.scene;
        if (Dog.endAfter2Clicks && Dog.selected.length === 1) {
            
            Dog.text.text = "These can't\nbe soulmates :'(";
            Dog.text.depth = 2;
            Dog.animals = [];
            Dog.selected = [];
            setTimeout(function(){
                scene.scene.start(Dog.nextScene);
            }, 1000);
            return;
        }
        if (Dog.selected.length>=1 && Dog.selected.length % 2 === 1) {
            var currentSprite = this;
            if (this.areSoulmates(this, Dog.selected[Dog.selected.length - 1])) {
                var line = scene.add.line(Math.abs(this.x-Dog.selected[Dog.selected.length - 1].x)/2,Math.abs(this.y-Dog.selected[Dog.selected.length - 1].y)/2,this.x,this.y,Dog.selected[Dog.selected.length - 1].x,Dog.selected[Dog.selected.length - 1].y,0xff0000);
                this.disableInteractive();
                Dog.selected[Dog.selected.length - 1].disableInteractive();
                Dog.animals.splice(Dog.animals.indexOf(this), 1);
                Dog.animals.splice(Dog.animals.indexOf(Dog.selected[Dog.selected.length - 1]), 1);
                setTimeout(function() {
                    currentSprite.destroy();
                    Dog.selected[0].destroy();
                    Dog.selected.splice(0,2);
                    line.destroy();
                }, 500);
                if (Dog.animals.length === 0) {
                    Dog.text2.depth = 2;
                    Dog.animals = [];
                    if (Dog.nextScene) {
                        Dog.text2.text = "Good job!";
                        setTimeout(function() {
                            Dog.selected = [];
                            scene.scene.start(Dog.nextScene);
                        }, 1000);
                    } else {
                        setTimeout(function() {
                            Dog.text2.text = "Thank you\nfor playing!";
                        }, 1000);
                    }
                }
                else {
                    if (this.isGameLost(Dog.animals)) {
                        Dog.text2.depth = 2;
                        setTimeout(function() {
                            Dog.text2.text = "You lost!\n";
                            var button = scene.add.text(scene.cameras.main.centerX, scene.cameras.main.centerY + 100, 'Restart', { fill: '#ff0000', font: '600 50px Papyrus' })
                            .setOrigin(0.5)
                            .setPadding(10)
                            .setStyle({ backgroundColor: '#111' })
                            .setInteractive({ useHandCursor: true })
                            .on('pointerdown', currentSprite.restartGame);
                        }, 500);
                        for (var k = 0; k < Dog.animals.length; k++) {
                            Dog.animals[k].disableInteractive();
                        }
                        Dog.animals = [];
                        return;
                    }
                }
            } else {
                Dog.text.text = "These can't\nbe soulmates :'(";
                Dog.text.depth = 2;
                setTimeout(function(){
                    Dog.text.text = "";
                }, 1000);
                setTimeout(function() {
                    currentSprite.clearTint();
                    Dog.selected[0].clearTint();
                    Dog.selected.splice(0,2);
                }, 500);
            }
        } 
        Dog.selected.push(this);
    }
}
export default Dog;


