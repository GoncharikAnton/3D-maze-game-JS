
/**
 *
 * Class represents maze board instance.
 */
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

    /**
     * Returns cell (node) of the maze instance.
     * @param str
     * @returns {*}
     */
    getNodeByCoordinates(str) {
        let coordinates = str.split(',');
        return this.maze[+coordinates[0]][+coordinates[1]][+coordinates[2]];
    }

    /**
     * Returns VALID neighbors of the node by node's coordinates.
     * @param coordinates String
     * @returns {Set<*>}
     */
    getNeighborsOfTheNode(coordinates) {
        const [i, j, k] = coordinates.split(',');
        return this.maze[i][j][k].getValidNeighbors(this.rows, this.cols);
    }

    /**
     * Method converts class instance to JSON object for stringifying.
     * @returns {{exitCell, entranceCell, maze, rows, cols, levels}}
     */
    toJSON() {
        return {
            maze: this.#maze,
            entranceCell: this.#entranceCell,
            exitCell: this.#exitCell,
            levels: this.#levels,
            rows: this.#rows,
            cols: this.#cols,
        }
    }

    /**
     * Method represents console view of the maze.
     */
    toString() {
        for (let i = 0; i < this.maze.length; i++) {
            console.log(`\nLevel ${i}\n`);
            for (let j = 0; j < this.maze[i].length; j++) {
                let strTop = '';
                let strMid = '';
                let strBottom = '';
                const nextRow = this.maze[i][j + 1];
                for (let k = 0; k < this.maze[i][0].length; k++) {
                    const cell = this.maze[i][j][k];
                    const nextCell = this.maze[i][j][k + 1];
                    const prevCell = this.maze[i][j][k - 1];
                    cell.topPass ? strTop += '  ' : strTop += '+-';
                    nextCell && !prevCell ? strMid += '|' : strMid += '';
                    if (cell.isExit || cell.isEntrance) {
                        cell.isEntrance ? strMid += 'S' : strMid += 'E';
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

export default Maze3D;