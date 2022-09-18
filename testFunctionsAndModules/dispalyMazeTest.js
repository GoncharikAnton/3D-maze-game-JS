let maze = [
    [
        [[false, false, false, true, true, false], [false, false, false, true, false, false], [false, true, false, false, false, false], [true, true, false, false, true, false], [true, false, false, false, false, false]],
        [[false, false, true, false, false, false], [false, false, true, false, false, false], [false, true, false, false, false, false], [true, true, false, false, true, false], [true, false, false, false, false, false]],
        [[false, true, false, true, true, false], [true, true, false, false, true, false], [true, true, false, false, true, false], [true, true, false, false, true, false], [true, false, false, true, true, false]],
        [[false, false, true, true, false, false], [false, true, false, true, true, false], [true, false, false, true, true, false], [false, false, false, true, false, false], [false, false, true, false, false, false]],
        [[false, false, false, false, false, false], [false, false, true, false, false, false], [false, true, true, false, true, false], [true, true, true, false, true, false], [true, false, false, false, true, false]],
    ],
    [
        [[false, false, false, true, true, false], [false, false, false, true, false, false], [false, true, false, false, false, false], [true, true, false, false, true, false], [true, false, false, false, false, false]],
        [[false, false, true, false, false, false], [false, false, true, false, false, false], [false, true, false, false, false, false], [true, true, false, false, true, false], [true, false, false, false, false, false]],
        [[false, true, false, true, true, false], [true, true, false, false, true, false], [true, true, false, false, true, false], [true, true, false, false, true, false], [true, false, false, true, true, false]],
        [[false, false, true, true, false, false], [false, true, false, true, true, false], [true, false, false, true, true, false], [false, false, false, true, false, false], [false, false, true, false, 'S', false]],
        [[false, false, false, false, false, false], [false, false, true, false, false, false], [false, true, true, false, true, false], [true, true, true, false, true, false], [true, false, false, false, true, false]],
    ],
    [
        [[false, false, false, true, true, false], [false, false, false, true, false, false], [false, true, false, false, false, false], [true, true, false, false, true, false], [true, false, false, false, false, false]],
        [[false, false, true, false, false, false], [false, false, true, false, false, false], [false, true, false, false, false, false], [true, true, false, false, true, false], [true, false, false, false, false, false]],
        [[false, true, false, true, true, false], [true, true, false, false, true, false], [true, true, false, false, true, false], [true, true, false, false, true, false], [true, false, false, true, true, false]],
        [[false, false, true, true, false, false], [false, true, false, true, true, false], [true, false, false, true, true, false], [false, false, false, true, false, false], [false, false, true, false, false, false]],
        [[false, false, false, false, false, false], [false, false, true, false, false, false], [false, true, true, false, 'G', false], [true, true, true, false, true, false], [true, false, false, false, true, false]],
    ],
];

function displayMaze(maze) {
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
                const prevCell = this.#maze[q][i][j - 1];
                cell[2] ? strTop += '  ' : strTop += '+-';
                nextCell && !prevCell ? strMid += '|' : strMid += '';
                if (cell[4] && cell[5]) {
                    strMid += '↕';
                } else if (cell[4]) {
                    cell[4] === true ? strMid += '↑' : strMid += cell[4]
                } else if (cell[5]) {
                    cell[5] === true ? strMid += '↓' : strMid += cell[5]
                } else {
                    strMid += ' '
                }
                if (nextCell && !prevCell) {
                    cell[1] ? strMid += ' ' : strMid += '|';
                }
                if (prevCell) {
                    cell[1] ? strMid += ' ' : strMid += '|';
                }
                if (!nextRow) {
                    if (j === 0) {
                        strBottom += '|-';
                    } else {
                        strBottom += '+-';
                    }
                }

            }
            strTop = strTop.split('')
            strTop.splice(0, 1, '|')
            strTop = strTop.join('')
            console.log(strTop + '|');
            console.log(strMid);
            strBottom && console.log(strBottom + '|');
            strBottom = ''
            strMid = ''
            strTop = ''
        }
    }

}

displayMaze(maze)









