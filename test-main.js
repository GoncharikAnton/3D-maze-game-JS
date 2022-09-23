//----------------------------------------PRIORITY QUEUE------------------------------------------------------------
class PriorityQueue {
    #heap
    #comparator
    #top

    constructor(comparator = (a, b) => a > b) {
        this.#heap = [];
        this.#comparator = comparator;
        this.#top = 0;
    }

    size() {
        return this.#heap.length;
    }

    isEmpty() {
        return this.size() === 0;
    }

    peek() {
        return this.#heap[this.#top];
    }

    push(...values) {
        values.forEach(value => {
            this.#heap.push(value);
            this.#heapifyUp(this.size() - 1);
        });
        return this.size();
    }

    pop() {
        const poppedValue = this.peek();
        const bottom = this.size() - 1;
        if (bottom > this.#top) {
            this.#swap(this.#top, bottom);
        }
        this.#heap.pop();
        this.#heapifyDown();
        return poppedValue;
    }

    remove(value) {
        const index = this.#heap.indexOf(value);
        if (index !== -1) {
            this.#removeAt(index);
        }
    }

    #parent(childIndex) {
        return Math.floor((childIndex - 1) / 2);
    }

    #left(parentIndex) {
        return (parentIndex * 2) + 1;
    }

    #right(parentIndex) {
        return (parentIndex * 2) + 2;
    }

    #greater(i, j) {
        return this.#comparator(this.#heap[i], this.#heap[j]);
    }

    #swap(i, j) {
        [this.#heap[i], this.#heap[j]] = [this.#heap[j], this.#heap[i]];
    }

    #heapifyUp(index) {
        while (index > this.#top && this.#greater(index, this.#parent(index))) {
            this.#swap(index, this.#parent(index));
            index = this.#parent(index);
        }
    }

    #heapifyDown() {
        let index = this.#top;

        while (
            (this.#left(index) < this.size() && this.#greater(this.#left(index), index)) ||
            (this.#right(index) < this.size() && this.#greater(this.#right(index), index))
            ) {
            let maxChild = (this.#right(index) < this.size() && this.#greater(this.#right(index), this.#left(index))) ?
                this.#right(index) : this.#left(index);
            this.#swap(index, maxChild);
            index = maxChild;
        }
    }

    #removeAt(index) {
        // Remove the last element and place it at the removed index
        this.#heap[index] = this.#heap.pop();

        if (index > this.#top && this.#greater(index, this.#parent(index))) {
            this.#heapifyUp(index);
        } else {
            this.#heapifyDown(index);
        }
    }
}

//----------------------------------------SEARCH ALGORITHMS------------------------------------------------------------
//----------------------------------------BLUEPRINTS------------------------------------------------------------
// class Searchable{
//     get startState() {}
//     get goalState() {}
//     getStateTransitions(state) {}
// }
// class SearchAlgorithm{
//     search(searchable) {}
//     getNumberOfNodesEvaluated() {}
// }
// class State{
//     #key
//
//     constructor(key) {
//         if (this.constructor === State) {
//             throw new Error('State cannot be initialized');
//         }
//         this.#key = key;
//     }
//     get key() {
//         return this.#key;
//     }
//     equals(other) {
//         return other instanceof State && this.#key === other.#key;
//     }
// }
// class MazeState extends State{
//     #maze
//     constructor(maze) {
//         super(maze.toString());
//         this.#maze = maze;
//     }
//     get maze() {
//         return this.#maze;
//     }
// }
//----------------------------------------BLUEPRINTS------------------------------------------------------------

function BFSSearch(Graph, root) { // G - generated maze, root - startCell
    const Q = [];
    // goal comes with a state
    const goal = `${Graph.exitCell.levelNum},${Graph.exitCell.rowNum},${Graph.exitCell.colNum}`;
    Q.push(root);
    while (Q.length > 0) {
        const currCell = Q.pop();
        const coordinates = `${currCell.levelNum},${currCell.rowNum},${currCell.colNum}`;
        if (coordinates === goal) {
            return currCell;
        }
        let neighbors = currCell.getValidNeighbors(Graph.rows, Graph.cols);
        for (const neighbor of neighbors) {
            const coord = neighbor.split(',');
            const neigh = Graph.maze[coord[0]][coord[1]][coord[2]]
            if (neigh.visitedBySearcher === false) {
                neigh.visitedBySearcher = true;
                Q.push(neigh)
            }
        }
    }
    return false;
}

function DFSSearch(graph, start, goal) { // G - generated maze, start - str, end - str;
    const node = graph.getNodeByCoordinates(start);
    const stack = [];
    stack.push(node);
    while (stack.length > 0) {
        const currNode = stack.pop();
        if (!currNode.visitedBySearcher) {
            currNode.visitedBySearcher = true;
            let neighbors = graph.getNeighborsOfTheNode(currNode.coordinates);
            for (const neighborCoordinates of neighbors) {
                const neighborNode = graph.getNodeByCoordinates(neighborCoordinates);
                stack.push(neighborNode);
            }
        }
    }
    if (graph.getNodeByCoordinates(goal).visitedBySearcher) {
        return true;
    }
    return false;
}

function heuristic(a, b) {
    const [z1, y1, x1] = a.split(',');
    const [z2, y2, x2] = b.split(',');
    return Math.abs(z1 - z2) + Math.abs(y1 - y2) + Math.abs(x1 - x2)
}

function AStarSearch(graph, start, goal, heuristic) { // graph -> maze, start - `index of the cell(str)`, goal - `index of the cell(str)`, heuristic -> function
    const frontier = new PriorityQueue((cell1, cell2) => cell1[1] < cell2[1]);
    frontier.push([start, 0]);
    const cameFrom = new Map();
    const costSoFar = new Map();
    cameFrom.set(start, null);
    costSoFar.set(start, 0);

    while (!frontier.isEmpty()) {
        let [currentLocation, priority] = frontier.pop();
        if (currentLocation === goal) {
            break;
        }
        const neighbors = graph.getNeighborsOfTheNode(currentLocation);
        for (const next of neighbors) {
            const newCost = costSoFar.get(currentLocation) + 1;
            if (!costSoFar.has(next) || newCost < costSoFar.get(next)) {
                costSoFar.set(next, newCost);
                priority = newCost + heuristic(next, goal);
                frontier.push([next, priority]);
                cameFrom.set(next, currentLocation)
            }
        }
    }
    return [cameFrom, costSoFar]
}

//----------------------------------------GENERATORS------------------------------------------------------------
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
        this.visitedBySearcher = false;
    }

    get coordinates() {
        return `${this.levelNum},${this.rowNum},${this.colNum}`
    }

    getValidNeighbors(rows, cols) {
        const directions = [
            [0, 0, 1], // right
            [0, 0, -1], // left
            [0, -1, 0], // top
            [0, 1, 0], // bottom
            [1, 0, 0], // up
            [-1, 0, 0], // down
        ]
        const neighbors = new Set();
        if (!this.rightPass) {
            directions[0] = [0, 0, 0];
        }
        if (!this.leftPass) {
            directions[1] = [0, 0, 0];
        }
        if (!this.topPass) {
            directions[2] = [0, 0, 0];
        }
        if (!this.bottomPass) {
            directions[3] = [0, 0, 0];
        }
        if (!this.upPass) {
            directions[4] = [0, 0, 0];
        }
        if (!this.downPass) {
            directions[5] = [0, 0, 0];
        }
        let [l, r, c] = [+this.levelNum, +this.rowNum, +this.colNum];
        for (let i = 0; i < directions.length; i++) {
            const [dirL, dirR, dirC] = directions[i];
            if ((l + dirL < 3 && l + dirL >= 0) && (r + dirR < rows && r + dirR >= 0) && (c + dirC < cols && c + dirC >= 0)) {
                neighbors.add(`${l + dirL},${r + dirR},${c + dirC}`)
            }
        }
        return neighbors;
    }

}

class Randomizer {
    static randomNumMinMax(min, max) {
        return Math.floor(Math.random() * (max + 1 - min) + min)
    }

    static randomCoordinates(levels, rows, cols) {
        const initData = [levels, rows, cols];
        const coordinates = [];
        for (let i = 0; i < initData.length; i++) {
            const randomNum = Math.floor(Math.random() * initData[i])
            coordinates.push(randomNum);
        }
        return coordinates;
    }
}

class Maze3D {
    #maze
    #entranceCell
    #exitCell
    #levels
    #rows
    #cols

    constructor(maze, entranceCell, exitCell) {
        this.#maze = maze;
        this.#entranceCell = entranceCell;
        this.#exitCell = exitCell;
        this.#levels = 3;
        this.#rows = this.#maze[0].length;
        this.#cols = this.#maze[0][0].length;
    }

    get rows() {
        return this.#rows;
    }

    get cols() {
        return this.#cols;
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

    get levels() {
        return this.#levels;
    }

    getNodeByCoordinates(str) {
        let coordinates = str.split(',')
        return this.#maze[+coordinates[0]][+coordinates[1]][+coordinates[2]];
    }

    getNeighborsOfTheNode(coordinates) {
        const [i, j, k] = coordinates.split(',')
        return this.#maze[i][j][k].getValidNeighbors(this.rows, this.cols);
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
                        k === 0 ? entranceCell.rightPass = true : entranceCell.leftPass = true;
                    }
                    if (i === randomLevelExt && j === randomRowExt && k === randomColExt) {
                        exitCell = cell;
                        exitCell.isExit = true;
                        exitCell.upPass = false;
                        exitCell.downPass = false;
                        k === 0 ? exitCell.rightPass = true : exitCell.leftPass = true;

                    }
                }
            }
        }
        return new Maze3D(maze, entranceCell, exitCell);
    }

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
        let [entrL, entrR, entrC] = [maze.entranceCell.levelNum, maze.entranceCell.rowNum, maze.entranceCell.colNum]
        let [extL, extR, extC] = [maze.exitCell.levelNum, maze.exitCell.rowNum, maze.exitCell.colNum]
        let currCell = maze.entranceCell;
        visited.set(`${entrL},${entrR},${entrC}`, currCell);
        while (!visited.has(`${extL},${extR},${extC}`)) {
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
                    visited.set(`${entrL},${entrR},${entrC}`, [l, r, c]);
                    entrL = entrL + l;
                    entrR = entrR + r;
                    entrC = entrC + c;
                }
            }

        }
        // console.log(visited)
        // console.log(instance.entranceCell)
        // console.log(instance.exitCell)
        for (const [cellNum, pathDirection] of visited.entries()) {
            let cellNumList = cellNum.split(',')
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
        }
    }

    /**
     * Method removes walls between two cells in the maze.
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

class SimpleMaze3dGenerator extends Maze3dGenerator {
    #maze

    constructor() {
        super();
    }

    #carveThePath() {
        super.carveThePath(this.#maze);
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
            this.#carveThePath();
        }
        return this.#maze;
    }

    measureAlgorithmTime(rows, cols) {
        return super.measureAlgorithmTime(this, rows, cols)
    }
}

class DFSMaze3dGenerator extends Maze3dGenerator {
    #maze

    constructor() {
        super();
    }

    /**
     * Method gets unvisited neighbors of the cell.
     * @param {Cell} cell
     * @param {Number} rows
     * @param {Number} cols
     */
    #getUnvisitedNeighbors(cell, rows, cols) {
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
            if ((l + dirL < 3 && l + dirL >= 0) && (r + dirR < rows && r + dirR >= 0) && (c + dirC < cols && c + dirC >= 0)) {
                const neighborCell = this.#maze.maze[l + dirL][r + dirR][c + dirC];
                if (neighborCell.visited === false) {
                    neighbors.push(`${l + dirL},${r + dirR},${c + dirC}`)
                }
            }
        }
        return neighbors;
    }

    #removeWalls(currCell, neighbor) {
        super.removeWalls(currCell, neighbor);
    }

    generate(rows, cols) {
        this.#maze = super.generate(rows, cols);
        const stack = [];
        const visited = new Map();
        let initCell = this.#maze.entranceCell;
        visited.set(`${initCell.levelNum},${initCell.rowNum},${initCell.colNum}`, initCell);
        stack.push(initCell);
        let currCell = initCell;
        while (stack.length > 0) {
            const neighbors = this.#getUnvisitedNeighbors(currCell, rows, cols);
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
        // this.#carveThePath();
        return this.#maze;
    }

    measureAlgorithmTime(rows, cols) {
        return super.measureAlgorithmTime(this, rows, cols)
    }
}

class AldousBroderMaze3dGenerator extends Maze3dGenerator {
    #maze

    constructor() {
        super();
    }

    #removeWalls(currCell, neighbor) {
        super.removeWalls(currCell, neighbor)
    }

    #getAllNeighbors(cell, rows, cols) {
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
            if ((l + dirL < 3 && l + dirL >= 0) && (r + dirR < rows && r + dirR >= 0) && (c + dirC < cols && c + dirC >= 0)) {
                neighbors.push(`${l + dirL},${r + dirR},${c + dirC}`);
            }
        }
        return neighbors;
    }

    generate(rows, cols) {
        this.#maze = super.generate(rows, cols);
        let currCell = this.#maze.entranceCell;
        const visited = new Set();
        currCell.visited = true;
        for (let i = 0; i < this.#maze.levels; i++) {
            for (let j = 0; j < rows; j++) {
                for (let k = 0; k < cols; k++) {
                    if (!this.#maze.maze[i][j][k].visited) {
                        visited.add(`${i},${j},${k}`)
                    }
                }
            }
        }
        while (visited.size > 0) {
            const neighborsCoordinatesList = this.#getAllNeighbors(currCell, rows, cols)
            const randInt = Randomizer.randomNumMinMax(0, neighborsCoordinatesList.length - 1);
            const strOfCoordinates = neighborsCoordinatesList[randInt]
            const randomNeighbor = this.#maze.getNodeByCoordinates(strOfCoordinates);
            if (!randomNeighbor.visited) {
                randomNeighbor.visited = true;
                this.#removeWalls(currCell, randomNeighbor);
                visited.delete(strOfCoordinates);
            }
            currCell = randomNeighbor;
        }
        return this.#maze
    }


}

// const mazeGen = new SimpleMaze3dGenerator()
const mazeGen = new DFSMaze3dGenerator()
// const mazeGen = new AldousBroderMaze3dGenerator();
const maze = mazeGen.generate(3, 4);
// console.log(mazeGen.measureAlgorithmTime(40,40))
// console.log(mazeGenDFS.measureAlgorithmTime(40,40))
maze.toString()
// console.log(BFSSearch(maze, maze.entranceCell))
// console.log(DFSSearch(maze, maze.entranceCell.coordinates, maze.exitCell.coordinates))
// console.log(AStarSearch(maze, maze.entranceCell.coordinates, maze.exitCell.coordinates, heuristic))
