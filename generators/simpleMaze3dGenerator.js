import Maze3dGenerator from "../maze3DGenerator.js";
import Randomizer from "../randomaizer.js";

class SimpleMaze3dGenerator extends Maze3dGenerator {
    #maze

    /**
     * Generates a random maze instance without any algorithm. All fields(properties) of the cells(nodes) builds
     * randomly with a simple random number generator.
     * @param {Number} rows
     * @param {Number} cols
     * @returns {Maze3D} New maze instance.
     */
    generate(rows, cols) {
        this.#maze = super.generate(rows, cols);
        for (let i = 0; i < this.#maze.maze.length; i++) {
            for (let j = 0; j < rows; j++) {
                for (let k = 0; k < cols; k++) {
                    const cell = this.#maze.maze[i][j][k];
                    const allNeighbors = this.#getAllNeighbors(this.#maze, cell);
                    const randomNeighborNum = Randomizer.randomNumMinMax(0, allNeighbors.length-1);
                    const neighborCell = this.#maze.getNodeByCoordinates(allNeighbors[+randomNeighborNum]);
                    this.#removeWalls(cell, neighborCell);
                    if(i === 0){
                        cell.downPass = false;
                    }
                }
            }
            this.#carveThePath();
        }
        return this.#maze;
    }

    /**
     * Calls a method from parent class, that randomly builds a path from node1 to node2 and changes a wall(direction)
     * properties of the all selected nodes on the path (i.e. removes walls between cells on the path).
     */
    #carveThePath() {
        super.carveThePath(this.#maze);
    }

    #getAllNeighbors(instance, cell) {
        return super.getAllNeighbors(instance, cell);
    }

    #removeWalls(currCell, neighbor) {
        super.removeWalls(currCell, neighbor);
    }

    measureAlgorithmTime(rows, cols) {
        return super.measureAlgorithmTime(this, rows, cols)
    }
}

export default SimpleMaze3dGenerator;