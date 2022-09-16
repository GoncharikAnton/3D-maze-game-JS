import Maze3D from "./maze3D";

class Maze3dGenerator{
    constructor() {
        if(this.constructor === Maze3dGenerator){
            throw new Error('This is an abstract class.');
        }
    }

    generate(rows, cols){
        let maze = new Array(3).fill([]);
        for (let i = 0; i < maze.length; i++) {
            maze[i].length = rows;
            for (let j = 0; j < rows; j++) {
                maze[i][j].length = cols;
            }
        }
        return new Maze3D(maze);
    }

    measureAlgorithmTime(){
        throw new Error('You have to implement the method "measureAlgorithmTime"!');
    }
}

export default Maze3dGenerator;