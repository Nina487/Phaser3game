import Maploader from "./Maploader.js";
export default class Level2 extends Phaser.Scene {
    constructor() {
        super("Level2");
    }
    map = [
        [1,0,1,0,0],
        [0,1,0,0,1],
        [0,1,0,1,0],
        [1,0,0,0,1],
        [0,0,1,1,0],
    ];

    create() {
        new Maploader(this, this.map, 'Tutorial3');
    }
}