class Maze3D {
    #maze

    constructor(maze) {
        this.#maze = maze;
    }
    get maze(){
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

export default Maze3D;