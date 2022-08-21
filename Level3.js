import Maploader from "./Maploader.js";
export default class Level3 extends Phaser.Scene {
    constructor() {
        super("Level3");
    }
    map = [
        [0,1,1,0,1],
        [0,0,0,1,0],
        [1,0,1,0,0],
        [1,0,0,1,0]
    ];

    create() {
        new Maploader(this, this.map);
    }
}