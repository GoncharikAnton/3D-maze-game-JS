import Maze3dGenerator from "../maze3DGenerator.js";
import Randomizer from "../randomaizer.js";

class AldousBroderMaze3dGenerator extends Maze3dGenerator {
    #maze

    /**
     * Method calls super method from parent class that changes properties of walls(directions) of 2 cells.
     * (Removes walls between 2 cells).
     * @param {Cell} currCell
     * @param {Cell} neighbor
     */
    #removeWalls(currCell, neighbor) {
        super.removeWalls(currCell, neighbor)
    }

    /**
     * Method calls super method from parent class that returns all neighbor nodes of the passed node.
     * @param cell
     * @returns {*[]}
     */
    #getAllNeighbors(cell) {
        return super.getAllNeighbors(this.#maze, cell)
    }

    /**
     * Generates a random maze instance with an Aldous-Broder algorithm.
     * @param {Number} rows
     * @param {Number} cols
     * @returns {Maze3D} New maze instance.
     */
    generate(rows, cols) {
        this.#maze = super.generate(rows, cols);
        let currCell = this.#maze.entranceCell;
        const visited = new Set();
        currCell.visited = true;
        for (let i = 0; i < this.#maze.levels; i++) {
            for (let j = 0; j < rows; j++) {
                for (let k = 0; k < cols; k++) {
                    if (!this.#maze.maze[i][j][k].visited) {
                        visited.add(`${i},${j},${k}`);
                    }
                }
            }
        }
        while (visited.size > 0) {
            const neighborsCoordinatesList = this.#getAllNeighbors(currCell)
            const randInt = Randomizer.randomNumMinMax(0, neighborsCoordinatesList.length - 1);
            const strOfCoordinates = neighborsCoordinatesList[randInt];
            const randomNeighbor = this.#maze.getNodeByCoordinates(strOfCoordinates);
            if (!randomNeighbor.visited) {
                randomNeighbor.visited = true;
                this.#removeWalls(currCell, randomNeighbor);
                visited.delete(strOfCoordinates);
            }
            currCell = randomNeighbor;
        }
        return this.#maze;
    }
}

export default AldousBroderMaze3dGenerator;