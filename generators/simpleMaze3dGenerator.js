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
                    cell.topPass = Boolean(Randomizer.randomNumMinMax(0, 1));
                    cell.bottomPass = Boolean(Randomizer.randomNumMinMax(0, 1));
                    if (j === 0) {
                        cell.topPass = false;
                    } else if (j === rows - 1) {
                        cell.bottomPass = false;
                    }
                    cell.leftPass = Boolean(Randomizer.randomNumMinMax(0, 1));
                    cell.rightPass = Boolean(Randomizer.randomNumMinMax(0, 1));
                    if (k === 0) {
                        cell.leftPass = false;
                    } else if (k === rows - 1) {
                        cell.rightPass = false;
                    }
                    if (!cell.isExit && !cell.isEntrance) {
                        if (i === 0) {
                            cell.upPass = Boolean(Randomizer.randomNumMinMax(0, 1));
                        } else if (i === 1) {
                            cell.upPass = Boolean(Randomizer.randomNumMinMax(0, 1));
                            cell.downPass = Boolean(Randomizer.randomNumMinMax(0, 1));
                        } else {
                            cell.downPass = Boolean(Randomizer.randomNumMinMax(0, 1));
                        }
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

    measureAlgorithmTime(rows, cols) {
        return super.measureAlgorithmTime(this, rows, cols)
    }
}

export default SimpleMaze3dGenerator;