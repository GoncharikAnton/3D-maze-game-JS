import Randomizer from "./randomaizer.js";
import Cell from "./cell.js";
import Maze3D from "./maze3d.js";

/**
 * Class represents maze-generator, that generate a blueprint of the impassable maze boardю.
 */
class Maze3dGenerator {

    constructor() {
        if (this.constructor === Maze3dGenerator) {
            throw new Error('This is an abstract class.');
        }
    }

    measureAlgorithmTime(obj, rows, cols) {
        const startTime = Date.now();
        obj.generate(rows, cols);
        const endTime = Date.now();
        return `Time of execution of generator - ${endTime - startTime}ms`
    }

    /**
     * Method generates blueprint(instance) of maze, where all nodes have walls(each node has all pass properties as false).
     * Also, method randomly generates 2 points (start , end) which can't be on the same level of the maze.
     * @param {Number}rows
     * @param {Number}cols
     * @returns {Maze3D}
     */
    generate(rows, cols) {
        let maze = [];
        maze.length = 3;
        let randomLevelEntr = Randomizer.randomNumMinMax(0, 2);
        let randomLevelExt = Randomizer.randomNumMinMax(0, 2);
        while (randomLevelExt === randomLevelEntr) {
            randomLevelEntr = Randomizer.randomNumMinMax(0, 2);
        }
        let randomRowEntr = Randomizer.randomNumMinMax(0, rows - 1);
        let randomRowExt = Randomizer.randomNumMinMax(0, rows - 1);
        let randomColEntr;
        let randomColExt;
        if (randomRowEntr === 0 || randomRowEntr === rows - 1) {
            randomColEntr = Randomizer.randomNumMinMax(0, cols - 1);
        } else {
            Randomizer.randomNumMinMax(0, 1) === 0 ? randomColEntr = 0 : randomColEntr = cols - 1;
        }
        if (randomRowExt === 0 || randomRowExt === rows - 1) {
            randomColExt = Randomizer.randomNumMinMax(0, cols - 1);
        } else {
            Randomizer.randomNumMinMax(0, 1) === 0 ? randomColExt = 0 : randomColExt = cols - 1;
        }

        let entranceCell;
        let exitCell;
        for (let i = 0; i < 3; i++) {
            maze[i] = [];
        }
        for (let i = 0; i < maze.length; i++) {
            maze[i].length = rows;
            for (let j = 0; j < rows; j++) {
                maze[i][j] = [];
                maze[i][j].length = cols;
                for (let k = 0; k < cols; k++) {
                    maze[i][j][k] = new Cell(i, j, k);
                    const cell = maze[i][j][k];
                    if (i === randomLevelEntr && j === randomRowEntr && k === randomColEntr) {
                        entranceCell = cell;
                        entranceCell.isEntrance = true;
                        entranceCell.player = true;
                    }
                    if (i === randomLevelExt && j === randomRowExt && k === randomColExt) {
                        exitCell = cell;
                        exitCell.isExit = true;
                    }
                }
            }
        }
        return new Maze3D(maze, entranceCell, exitCell);
    }

    /**
     * Method returns ALL possible neighbors of the passed cell(node).
     * @param {Maze3D} instance
     * @param {Cell} cell
     * @returns {Array} neighbors
     */
    getAllNeighbors(instance, cell) {
        const rows = instance.rows;
        const cols = instance.cols;
        const directions = [
            [0, 0, 1], // right
            [0, 0, -1], // left
            [0, -1, 0], // top
            [0, 1, 0], // bottom
            [1, 0, 0], // up
            [-1, 0, 0], // down
        ]
        const neighbors = [];
        let [l, r, c] = [+cell.levelNum, +cell.rowNum, +cell.colNum];
        for (let i = 0; i < directions.length; i++) {
            const [dirL, dirR, dirC] = directions[i];
            if ((l + dirL < 3 && l + dirL >= 0) && (r + dirR < rows && r + dirR >= 0) &&
                (c + dirC < cols && c + dirC >= 0)) {
                neighbors.push(`${l + dirL},${r + dirR},${c + dirC}`);
            }
        }
        return neighbors;
    }

    /**
     * Method randomly builds a path from node1 to node2 (which provided by a maze instance) and changes a wall(direction)
     * properties of the all selected nodes on the path (i.e. removes walls between cells on the path).
     */
    carveThePath(instance) {
        const visited = new Map();
        const directions = [
            [0, 0, 1], // right
            [0, 0, -1], // left
            [0, -1, 0], // top
            [0, 1, 0], // bottom
            [1, 0, 0], // up
            [-1, 0, 0], // down
        ];
        const maze = instance;
        const rows = instance.rows;
        const cols = instance.cols;
        let [entrL, entrR, entrC] = [maze.entranceCell.levelNum, maze.entranceCell.rowNum, maze.entranceCell.colNum];
        let [extL, extR, extC] = [maze.exitCell.levelNum, maze.exitCell.rowNum, maze.exitCell.colNum];
        let currCell = maze.entranceCell;
        visited.set(`${entrL},${entrR},${entrC}`, currCell);
        while (!visited.has(`${extL},${extR},${extC}`)) {
            const randomChoice = Randomizer.randomNumMinMax(0, 5);
            const [l, r, c] = directions[randomChoice];
            if (l === 0 && r === 0 && c === 0) {
                continue;
            } else {
                if ((entrL + l >= 0 && entrL + l <= 2) && (entrR + r >= 0 && entrR + r <= rows - 1) &&
                    (entrC + c >= 0 && entrC + c <= cols - 1)) {
                    if (entrL + l === extL) {
                        directions[4] = [0, 0, 0];
                        directions[5] = [0, 0, 0];
                    }
                    if (entrR + r === extR) {
                        directions[2] = [0, 0, 0];
                        directions[3] = [0, 0, 0];
                    }
                    visited.set(`${entrL},${entrR},${entrC}`, [l, r, c]);
                    entrL = entrL + l;
                    entrR = entrR + r;
                    entrC = entrC + c;
                }
            }

        }

        for (const [cellNum, pathDirection] of visited.entries()) {
            let cellNumList = cellNum.split(',');
            let [l, r, c] = cellNumList;
            const cell = instance.maze[+l][+r][+c];
            if (pathDirection[0]) {
                pathDirection === 1 ? cell.upPass = true : cell.downPass = true;
            }
            if (pathDirection[1]) {
                if (pathDirection[1] === -1) {
                    cell.topPass = true;
                    const nextCell = instance.maze[+l][+r - 1][+c];
                    if (nextCell) {
                        nextCell.bottomPass = true;
                    }
                } else {
                    cell.bottomPass = true;
                    const nextCell = instance.maze[+l][+r + 1][+c];
                    if (nextCell) {
                        nextCell.topPass = true;
                    }

                }
            }
            if (pathDirection[2]) {
                if (pathDirection[2] === 1) {
                    cell.rightPass = true;
                    const nextCell = instance.maze[+l][+r][+c + 1];
                    if (nextCell) {
                        nextCell.leftPass = true;
                    }

                } else {
                    cell.leftPass = true;
                    const nextCell = instance.maze[+l][+r][+c - 1];
                    if (nextCell) {
                        nextCell.rightPass = true;
                    }
                }
            }
            if (+cell.levelNum === 0) {
                cell.downPass = false;
            }
        }
    }

    /**
     * Method changes properties of walls(directions) between two neighbor cells in the maze from false to true.
     * @param {Cell} currCell
     * @param {Cell} neighbor
     */
    removeWalls(currCell, neighbor) {
        //compare cells on z axis
        let i = currCell.levelNum - neighbor.levelNum;
        if (i === 1) {
            currCell.downPass = true;
            neighbor.upPass = true;
        } else if (i === -1) {
            currCell.upPass = true;
            neighbor.downPass = true;
        }

        //compare cells on y axis
        let j = currCell.rowNum - neighbor.rowNum;
        if (j === 1) {
            currCell.topPass = true;
            neighbor.bottomPass = true;
        } else if (j === -1) {
            currCell.bottomPass = true;
            neighbor.topPass = true;
        }

        //compare cells on x axis
        let k = currCell.colNum - neighbor.colNum;
        if (k === 1) {
            currCell.leftPass = true;
            neighbor.rightPass = true;
        } else if (k === -1) {
            currCell.rightPass = true;
            neighbor.leftPass = true;
        }
    }
}

export default Maze3dGenerator;