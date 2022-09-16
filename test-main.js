class Maze3dGenerator {
    constructor() {
        if (this.constructor === Maze3dGenerator) {
            throw new Error('This is an abstract class.');
        }
    }

    generate(rows, cols) {
        let maze = [];
        maze.length = 3;
        for (let i = 0; i < 3; i++) {
            maze[i] = [];
        }
        for (let i = 0; i < maze.length; i++) {
            maze[i].length = rows;
            for (let j = 0; j < rows; j++) {
                maze[i][j] = [];
                maze[i][j].length = cols;
                for (let k = 0; k < cols; k++) {
                    maze[i][j][k] = [];
                    maze[i][j][k].length = 6;
                    for (let l = 0; l < 6; l++) {
                        maze[i][j][k][l] = false;
                    }
                }
            }
        }
        return new Maze3D(maze);
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

    generate(rows, cols) {
        this.#maze = super.generate(rows, cols);
        for (let i = 0; i < this.#maze.maze.length; i++) {
            for (let j = 0; j < rows; j++) {
                for (let k = 0; k < cols; k++) {
                    for (let l = 0; l < 6; l++) {
                        this.#maze.maze[i][j][k][l] = Boolean(Math.round(Math.random()))
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

    constructor(maze) {
        this.#maze = maze;
    }

    get maze() {
        return this.#maze;
    }

    toString() {
        for (let q = 0; q < this.#maze.length; q++) {
            console.log(`\nLevel ${q}\n`);
            for (let i = 0; i < this.#maze[q].length; i++) {
                let strTop = '';
                let strMid = '';
                let strBottom = '';
                const nextRow = this.#maze[q][i + 1];
                for (let j = 0; j < this.#maze[q][0].length; j++) {
                    const cell = this.#maze[q][i][j];
                    const nextCell = this.#maze[q][i][j + 1];
                    cell[2] ? strTop += '    ' : strTop += '+--+';
                    cell[0] ? strMid += ' ' : strMid += '|';
                    if (cell[4] && cell[5]) {
                        strMid += '↕';
                    } else {
                        cell[4] ? strMid += '↑' : strMid += ' ';
                        cell[5] ? strMid += '↓' : strMid += ' ';
                    }
                    if (nextCell) {
                        cell[1] === nextCell[0] ? strMid += ' ' : strMid += '|';
                    } else {
                        cell[1] ? strMid += ' ' : strMid += '|';
                    }
                    if (!nextRow) {
                        cell[3] ? strBottom += '    ' : strBottom += '+--+';
                    }

                }
                console.log(strTop);
                console.log(strMid);
                strBottom && console.log(strBottom);
                strBottom = ''
                strMid = ''
                strTop = ''
            }
        }
    }
}

class DFSMaze3dGenerator extends Maze3dGenerator {
    #maze

    constructor() {
        super();
    }

    generate(rows, cols) {
        const directions = [
            [0, 1], // right
            [0, -1], // left
            [-1, 0], // up
            [1, 0] // down
        ]
        this.#maze = super.generate(rows, cols);
        const stack = [];
        const visited = new Map();
        let initCell = this.#maze.maze[0][0][0];
        visited.set('000', true);
        stack.push(initCell);
        let currCell = initCell;
        while (stack.length > 0) {
            for (let i = 0; i < this.#maze.maze.length; i++) {
                for (let j = 0; j < this.#maze.maze[i].length; j++) {
                    for (let k = 0; k < this.#maze.maze[i][j].length; k++) {
                        for (let l = 0; l < 4; l++) {
                            const [a, b] = directions[l]
                            if( j + a >= 0 && k + b >= 0 && j + a <= rows - 1 && k + b <= cols - 1){
                                if (!visited.has(`${i}${j + a}${k + b}`)) {
                                    let unvisitedNeighbor = this.#maze.maze[i][j + a][k + b]
                                    console.log(i, j+a, k+b)
                                    if (b === 1) {
                                        currCell[1] = true;
                                        unvisitedNeighbor[0] = true;
                                    }
                                    if (b === -1) {
                                        currCell[0] = true;
                                        unvisitedNeighbor[1] = true;
                                    }
                                    if (a === 1) {
                                        currCell[3] = true;
                                        unvisitedNeighbor[2] = true;
                                    }
                                    if (a === -1) {
                                        currCell[2] = true;
                                        unvisitedNeighbor[3] = true;
                                    }
                                    visited.set(`${i}${j + a}${k + b}`, true);
                                    stack.push(this.#maze.maze[i][j + a][k + b]);
                                    currCell = this.#maze.maze[i][j + a][k + b]
                                } else {
                                    currCell = stack.pop()
                                }
                            }
                        }
                    }
                }
            }

        }
        return this.#maze
    }

}

// const mazeGen = new SimpleMaze3dGenerator()
const mazeGen = new DFSMaze3dGenerator()
const maze = mazeGen.generate(6, 6);
console.log(maze.maze)
maze.toString()
