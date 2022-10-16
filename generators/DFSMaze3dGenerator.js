import Maze3dGenerator from "../maze3DGenerator.js";
import Randomizer from "../randomaizer.js";

/**
 * Class represents a generator that works with depth-first search algorithm.
 * Returns an instance of the generated maze.
 */
class DFSMaze3dGenerator extends Maze3dGenerator {
    #maze

    /**
     * Method gets unvisited neighbors of the cell.
     * @param {Cell} cell
     */
    #getUnvisitedNeighbors(cell) {
        const allNeighbors = super.getAllNeighbors(this.#maze, cell);
        const unvisitedNeighbors = [];
        for (let i = 0; i < allNeighbors.length; i++) {
            const neighborCell = this.#maze.getNodeByCoordinates(allNeighbors[i]);
            if (neighborCell.visited === false) {
                unvisitedNeighbors.push(allNeighbors[i]);
            }
        }
        return unvisitedNeighbors;
    }

    #removeWalls(currCell, neighbor) {
        super.removeWalls(currCell, neighbor);
    }

    /**
     * Generate a random maze instance with a DFS algorithm.
     * @param {Number} rows
     * @param {Number} cols
     * @returns {Maze3D} New maze instance.
     */
    generate(rows, cols) {
        this.#maze = super.generate(rows, cols);
        const stack = [];
        const visited = new Map();
        let initCell = this.#maze.entranceCell;
        visited.set(`${initCell.levelNum},${initCell.rowNum},${initCell.colNum}`, initCell);
        stack.push(initCell);
        let currCell = initCell;
        while (stack.length > 0) {
            const neighbors = this.#getUnvisitedNeighbors(currCell);
            let randomNeighbor = neighbors[Randomizer.randomNumMinMax(0, neighbors.length - 1)]; // str of neighbor position [level][row][col]
            if (randomNeighbor) {
                randomNeighbor = randomNeighbor.split(',');
            }
            if (neighbors.length > 0 && !visited.has(randomNeighbor)) {
                const neighborCell = this.#maze.maze[+randomNeighbor[0]][+randomNeighbor[1]][+randomNeighbor[2]];
                neighborCell.visited = true;
                //remove the wall between cells//
                this.#removeWalls(currCell, neighborCell);
                visited.set(randomNeighbor, neighborCell);
                stack.push(neighborCell);
                currCell = neighborCell;
            } else {
                currCell = stack.pop();
            }
        }
        return this.#maze;
    }

    measureAlgorithmTime(rows, cols) {
        return super.measureAlgorithmTime(this, rows, cols);
    }
}
export default DFSMaze3dGenerator;