class Cell {
    constructor(levelNum = -1, rowNum = -1, colNum = -1) {
        this.levelNum = levelNum;
        this.rowNum = rowNum;
        this.colNum = colNum;
        this.leftPass = false;
        this.rightPass = false;
        this.topPass = false;
        this.bottomPass = false;
        this.upPass = false;
        this.downPass = false;
        this.isExit = false;
        this.isEntrance = false;
        this.visited = false;
    }
}

class Randomizer {
    static randomNumMinMax(min, max) {
        return Math.floor(Math.random() * (max + 1 - min) + min)
    }
}

class Maze3dGenerator {
    constructor() {
        if (this.constructor === Maze3dGenerator) {
            throw new Error('This is an abstract class.');
        }
    }

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
                        entranceCell.upPass = false;
                        entranceCell.downPass = false;
                    }
                    if (i === randomLevelExt && j === randomRowExt && k === randomColExt) {
                        exitCell = cell;
                        exitCell.isExit = true;
                        exitCell.upPass = false;
                        exitCell.downPass = false;
                    }
                }
            }
        }
        return new Maze3D(maze, entranceCell, exitCell);
    }

    measureAlgorithmTime() {
        throw new Error('You have to implement the method "measureAlgorithmTime"!');
    }
}

class SimpleMaze3dGenerator extends Maze3dGenerator {
    #maze

    constructor() {
        super();
    }

    #carveThePath() {
        const visited = new Map();
        const directions = [
            [0, 0, 1], // right
            [0, 0, -1], // left
            [0, -1, 0], // top
            [0, 1, 0], // bottom
            [1, 0, 0], // up
            [-1, 0, 0], // down
        ];
        const maze = this.#maze;
        const rows = maze.maze[0].length;
        const cols = maze.maze[0][0].length;
        let [entrL, entrR, entrC] = [maze.entranceCell.levelNum, maze.entranceCell.rowNum, maze.entranceCell.colNum]
        let [extL, extR, extC] = [maze.exitCell.levelNum, maze.exitCell.rowNum, maze.exitCell.colNum]
        let currCell = maze.entranceCell;
        visited.set(`${entrL}${entrR}${entrC}`, currCell);
        while (!visited.has(`${extL}${extR}${extC}`)) {
            const randomChoice = Randomizer.randomNumMinMax(0, 5);
            const [l, r, c] = directions[randomChoice];
            if (l === 0 && r === 0 && c === 0) {
                continue
            } else {
                if ((entrL + l >= 0 && entrL + l <= 2) && (entrR + r >= 0 && entrR + r <= rows - 1) && (entrC + c >= 0 && entrC + c <= cols - 1)) {
                    if (entrL + l === extL) {
                        directions[4] = [0, 0, 0];
                        directions[5] = [0, 0, 0];
                    }
                    if (entrR + r === extR) {
                        directions[2] = [0, 0, 0];
                        directions[3] = [0, 0, 0];
                    }
                    visited.set(`${entrL}${entrR}${entrC}`, [l, r, c]);
                    entrL = entrL + l;
                    entrR = entrR + r;
                    entrC = entrC + c;
                }
            }

        }
        return visited;
    }


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
            const path = this.#carveThePath()
            for (const [cellNum, pathDirection] of path.entries()) {
                let [l, r, c] = cellNum;
                const cell = this.#maze.maze[+l][+r][+c];
                if (pathDirection[0]) {
                    pathDirection === 1 ? cell.upPass = true : cell.downPass = true;
                }
                if (pathDirection[1]) {
                    if (pathDirection[1] === -1) {
                        cell.topPass = true;
                        const nextCell = this.#maze.maze[+l][+r - 1][+c];
                        if (nextCell) {
                            nextCell.bottomPass = true;
                        }
                    } else {
                        cell.bottomPass = true;
                        const nextCell = this.#maze.maze[+l][+r + 1][+c];
                        if (nextCell) {
                            nextCell.topPass = true;
                        }

                    }
                }
                if (pathDirection[2]) {
                    if (pathDirection[2] === 1) {
                        cell.rightPass = true;
                        const nextCell = this.#maze.maze[+l][+r][+c + 1];
                        if (nextCell) {
                            nextCell.leftPass = true;
                        }

                    } else {
                        cell.leftPass = true;
                        const nextCell = this.#maze.maze[+l][+r][+c - 1];
                        if (nextCell) {
                            nextCell.rightPass = true;
                        }
                    }
                }
            }
        }
        return this.#maze;
    }

    measureAlgorithmTime() {
        super.measureAlgorithmTime();
    }
}

class Maze3D {
    #maze
    #entranceCell
    #exitCell

    constructor(maze, entranceCell, exitCell) {
        this.#maze = maze;
        this.#entranceCell = entranceCell;
        this.#exitCell = exitCell;
    }

    get maze() {
        return this.#maze;
    }


    get entranceCell() {
        return this.#entranceCell;
    }

    get exitCell() {
        return this.#exitCell;
    }

    toString() {
        for (let i = 0; i < this.#maze.length; i++) {
            console.log(`\nLevel ${i}\n`);
            for (let j = 0; j < this.#maze[i].length; j++) {
                let strTop = '';
                let strMid = '';
                let strBottom = '';
                const nextRow = this.#maze[i][j + 1];
                for (let k = 0; k < this.#maze[i][0].length; k++) {
                    const cell = this.#maze[i][j][k];
                    const nextCell = this.#maze[i][j][k + 1];
                    const prevCell = this.#maze[i][j][k - 1];
                    cell.topPass ? strTop += '  ' : strTop += '+-';
                    nextCell && !prevCell ? strMid += '|' : strMid += '';
                    if (cell.isExit || cell.isEntrance) {
                        cell.isEntrance ? strMid += 'S' : strMid += 'E';
                        cell.upPass = false;
                        cell.downPass = false;
                    } else if (cell.upPass && cell.downPass) {
                        strMid += '↕';
                    } else if (cell.upPass) {
                        cell.upPass === true ? strMid += '↑' : strMid += '';
                    } else if (cell.downPass) {
                        cell.downPass === true ? strMid += '↓' : strMid += '';
                    } else {
                        strMid += ' ';
                    }
                    if (nextCell && !prevCell) {
                        cell.rightPass ? strMid += ' ' : strMid += '|';
                    }
                    if (prevCell) {
                        cell.rightPass ? strMid += ' ' : strMid += '|';
                    }
                    if (!nextRow) {
                        if (k === 0) {
                            strBottom += '|-';
                        } else {
                            strBottom += '+-';
                        }
                    }
                }
                strTop = strTop.split('');
                strTop.splice(0, 1, '|');
                strTop = strTop.join('');
                console.log(strTop + '|');
                console.log(strMid);
                strBottom && console.log(strBottom + '|');
                strBottom = '';
                strMid = '';
                strTop = '';
            }
        }
    }
}

class DFSMaze3dGenerator extends Maze3dGenerator {
    #maze

    constructor() {
        super();
    }

    /**
     *
     * @param {Cell} cell
     * @param {Number} rows
     * @param {Number} cols
     */
    #getUnvisitedNeighbors(cell, rows, cols){
        const directions = [
            [0, 0, 1], // right
            [0, 0, -1], // left
            [0, -1, 0], // top
            [0, 1, 0], // bottom
            [1, 0, 0], // up
            [-1, 0, 0], // down
        ]
        const neighbors = [];
        let [l,r,c] = [+cell.levelNum, +cell.rowNum, +cell.colNum];
        for (let i = 0; i < directions.length; i++) {
            const [dirL, dirR, dirC] = directions[i];
            if((l+dirL < 3 && l+dirL >= 0) && (r+dirR < rows && r+dirR >= 0) && (c+dirC < cols && c+dirC >= 0)){
                const neighborCell = this.#maze.maze[l+dirL][r+dirR][c+dirC];
                if(neighborCell.visited === false){
                    neighbors.push(`${l+dirL}${r+dirR}${c+dirC}`)
                }
            }
        }
        return neighbors;
    }

    /**
     *
     * @param {Cell} currCell
     * @param {Cell} neighbor
     */
    #removeWalls(currCell, neighbor) {
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
    generate(rows, cols) {
        this.#maze = super.generate(rows, cols);
        const stack = [];
        const visited = new Map();
        let initCell = this.#maze.entranceCell;
        visited.set(`${initCell.levelNum}${initCell.rowNum}${initCell.colNum}`, initCell);
        stack.push(initCell);
        let currCell = initCell;
        while (stack.length > 0) {
            const neighbors = this.#getUnvisitedNeighbors(currCell, rows, cols);
            const randomNeighbor = neighbors[Randomizer.randomNumMinMax(0, neighbors.length - 1)]; // str of neighbor position [level][row][col]
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
}

// const mazeGen = new SimpleMaze3dGenerator()
const mazeGen = new DFSMaze3dGenerator()
const maze = mazeGen.generate(4, 4);
maze.toString()
