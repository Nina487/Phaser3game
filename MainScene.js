import Maploader from "./Maploader.js";
export default class MainScene extends Phaser.Scene {
    constructor() {
        super("MainScene");
    }
    map = [
        [0,1,0,1,0],
        [0,0,1,0,1],
        [0,0,0,1,0],
        [0,1,0,0,0],
        [1,0,1,0,0]
    ];

    create() {
        new Maploader(this, this.map, 'Level2');
    }
}