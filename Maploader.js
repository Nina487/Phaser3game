import Dog from "./Dog.js";
class Maploader {
    
    constructor (scene, map, nextScene)
    {
        this.scene = scene;
        var rows = map.length;
        var columns = map[0].length;
        this.drawGrid(rows, columns);
        var cellWidth = this.scene.cameras.main.width/columns;
        var cellHeight = this.scene.cameras.main.height/rows;
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < columns; j++) {
                if (map[i][j] === 1) {
                    scene.add.existing(new Dog(scene, cellWidth*j + cellWidth/2, cellHeight*i + cellHeight/2, nextScene));
                }
            }
        }
    }
    drawLine(x1,x2,y1,y2) {
        this.scene.add.line(Math.abs(x1-x2)/2,Math.abs(y1-y2)/2,x1,y1,x2,y2,0x595959);
    }
    drawGrid(rows,columns) {
        var cellWidth = this.scene.cameras.main.width/columns;
        var cellHeight = this.scene.cameras.main.height/rows;

        for (var i = 0; i < this.scene.cameras.main.width; i+=cellWidth) {
            this.drawLine(i,i,0,this.scene.cameras.main.height);
        }

        for (var i = 0; i < this.scene.cameras.main.height; i+=cellHeight) {
            this.drawLine(0,this.scene.cameras.main.width,i,i);
        }
    }
}
export default Maploader;