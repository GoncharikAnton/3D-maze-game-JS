/**
 * Class represents an instance of the cell(node).
 */
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
        this.player = false;
    }

    /**
     * Method returns coordinates of the position of the cell in the graph(maze).
     * @returns {string}
     */


    toString(){
        return `${this.levelNum},${this.rowNum},${this.colNum}`
    }

    get coordinates() {
        return `${this.levelNum},${this.rowNum},${this.colNum}`
    }

    /**
     * Method returns only neighbors, for which the cell(node) has access by its properties.
     * @param rows
     * @param cols
     * @returns {Set<any>}
     */
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
export default Cell;