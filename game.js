import Tutorial from "./Tutorial.js";
import Tutorial2 from "./Tutorial2.js";
import MainScene from "./MainScene.js";
import Level2 from "./Level2.js";
import Tutorial3 from "./Tutorial3.js";
import Level3 from "./Level3.js";
var config = {
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    type: Phaser.AUTO,
    backgroundColor: '#4cd038',
    scene: [
        Tutorial,
        Tutorial2,
        MainScene,
        Level2,
        Tutorial3,
        Level3
    ]
}
var game = new Phaser.Game(config)




