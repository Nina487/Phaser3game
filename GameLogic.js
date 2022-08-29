class GameLogic {
    
    constructor (scene, nextScene, endAfter2Clicks)
    {
        this.animals = [];
        var screenWidth = scene.cameras.main.worldView.x + scene.cameras.main.width;
        var screenHeight = scene.cameras.main.worldView.y + scene.cameras.main.height;
        this.text =  scene.add.text(screenWidth/2, screenHeight/2, '', {
            fill: '#ff0000',
            align: 'center',
            font: '600 50px Papyrus',
            wordWrap: { width: screenWidth - 20 }, 
        }).setOrigin(0.5);
        this.text2 =  scene.add.text(screenWidth/2, screenHeight/2, '', {
            fill: '#000000',
            align: 'center',
            font: '600 100px Papyrus',
            wordWrap: { width: screenWidth - 20 }
        }).setOrigin(0.5);
        this.scene = scene;
        this.nextScene = nextScene;
        this.endAfter2Clicks = endAfter2Clicks;
        this.selected = null;
    }

    addAnimal(dog) {
        this.animals.push(dog);
    }

    restartGame() {
        this.scene.scene.start(this.scene);
    }

    areSoulmates(a1, a2) {
        if (a1.x !== a2.x && a1.y !== a2.y)
            return false
        for (var i = 0; i < this.animals.length; i++) {
            var a3 = this.animals[i];
            if (a1.x === a2.x && a1.x === a3.x && ((a1.y < a3.y && a3.y < a2.y) || (a2.y < a3.y && a3.y < a1.y))) {
                return false;
            }
            if (a1.y === a2.y && a1.y === a3.y &&  ((a1.x < a3.x && a3.x < a2.x) || (a2.x < a3.x && a3.x < a1.x))) {
                return false;
            }
        }
        return true;
    }

    isGameLost(animals) {
        for (var k = 0; k < animals.length; k++) {
            for (var l = k + 1; l < animals.length; l++) {
                if (this.areSoulmates(animals[k], animals[l])) {
                    return false;
                }
            } 
        }
        return true;
    }

    endSecondTutorial() {
        this.text.text = "These can't\nbe soulmates :'(";
        this.text.depth = 2;
        setTimeout(() => {
            this.scene.scene.start(this.nextScene);
        }, 1000);
    }

    makeAPair(a1, a2) {
        var line = this.scene.add.line(Math.abs(a1.x-a2.x)/2,Math.abs(a1.y-a2.y)/2,a1.x,a1.y,a2.x,a2.y,0xff0000);
        a1.disableInteractive();
        a2.disableInteractive();
        this.animals.splice(this.animals.indexOf(a1), 1);
        this.animals.splice(this.animals.indexOf(a2), 1);
        setTimeout(() => {
            a1.destroy();
            a2.destroy();
            this.selected = null;
            line.destroy();
        }, 500);
    }

    endLevelWin() {
        this.text2.depth = 2;
        if (!this.nextScene) {
            setTimeout(() => {
                this.text2.text = "Thank you\nfor playing!";
            }, 1000);
            return;
        }
        this.text2.text = "Good job!";
       setTimeout(() => {
           this.scene.scene.start(this.nextScene);
       }, 1000);
    }

    endLevelLoss() {
        this.text2.depth = 2;
        setTimeout(() => {
            this.text2.text = "You lost!\n";
            var button = this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY + 100, 'Restart', { fill: '#ff0000', font: '600 50px Papyrus' })
            .setOrigin(0.5)
            .setPadding(10)
            .setStyle({ backgroundColor: '#111' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', this.restartGame);
        }, 500);
        for (var k = 0; k < this.animals.length; k++) {
            this.animals[k].disableInteractive();
        }
    }

    showCantBeSoulmates() {
        this.text.text = "These can't\nbe soulmates :'(";
        this.text.depth = 2;
        setTimeout(() => {
            this.text.text = "";
        }, 1000);
    }

    processClick(dog) {
        if (this.endAfter2Clicks && this.selected) {
            this.endSecondTutorial();
            return;
        }
        if (this.selected) {
            if (this.areSoulmates(dog, this.selected)) {
                this.makeAPair(dog, this.selected);
                if (this.animals.length === 0) {
                   this.endLevelWin();
                   return;
                }
                else {
                    if (this.isGameLost(this.animals)) {
                       this.endLevelLoss();
                       return;
                    }
                }
            } else {
                this.showCantBeSoulmates();
                setTimeout(() => {
                    dog.clearTint();
                    this.selected.clearTint();
                    this.selected = null;
                }, 500);
            }
        } 
        this.selected = dog;
    }
   
}
export default GameLogic;