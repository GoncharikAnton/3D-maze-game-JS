let maze = [
    [
        [[false, false, false, true, true, false], [false, false, false, true, false, false], [false, true, false, false, false, false], [true, true, false, false, true, false], [true, false, false, false, false, false]],
        [[false, false, true, false, false, false], [false, false, true, false, false, false], [false, true, false, false, false, false], [true,true,false,false,true,false], [true,false,false,false,false,false]],
        [[false,true,false,true,true,false], [true,true,false,false,true,false], [true,true,false,false,true,false], [true,true,false,false,true,false], [true,false,false,true,true,false]],
        [[false,false,true,true,false,false], [false,true,false,true,true,false], [true,false,false,true,true,false], [false,false,false,true,false,false], [false,false,true,false,false,false]],
        [[false,false,false,false,false,false], [false,false,true,false,false,false], [false,true,true,false,true,false], [true,true,true,false,true,false], [true,false,false,false,true,false]],
    ],
    [
        [[false, false, false, true, true, false], [false, false, false, true, false, false], [false, true, false, false, false, false], [true, true, false, false, true, false], [true, false, false, false, false, false]],
        [[false, false, true, false, false, false], [false, false, true, false, false, false], [false, true, false, false, false, false], [true,true,false,false,true,false], [true,false,false,false,false,false]],
        [[false,true,false,true,true,false], [true,true,false,false,true,false], [true,true,false,false,true,false], [true,true,false,false,true,false], [true,false,false,true,true,false]],
        [[false,false,true,true,false,false], [false,true,false,true,true,false], [true,false,false,true,true,false], [false,false,false,true,false,false], [false,false,true,false,false,false]],
        [[false,false,false,false,false,false], [false,false,true,false,false,false], [false,true,true,false,true,false], [true,true,true,false,true,false], [true,false,false,false,true,false]],
    ],
    [
        [[false, false, false, true, true, false], [false, false, false, true, false, false], [false, true, false, false, false, false], [true, true, false, false, true, false], [true, false, false, false, false, false]],
        [[false, false, true, false, false, false], [false, false, true, false, false, false], [false, true, false, false, false, false], [true,true,false,false,true,false], [true,false,false,false,false,false]],
        [[false,true,false,true,true,false], [true,true,false,false,true,false], [true,true,false,false,true,false], [true,true,false,false,true,false], [true,false,false,true,true,false]],
        [[false,false,true,true,false,false], [false,true,false,true,true,false], [true,false,false,true,true,false], [false,false,false,true,false,false], [false,false,true,false,false,false]],
        [[false,false,false,false,false,false], [false,false,true,false,false,false], [false,true,true,false,true,false], [true,true,true,false,true,false], [true,false,false,false,true,false]],
    ],
];

function displayMaze(maze) {
    for (let q = 0; q < maze.length; q++) {
        console.log(`\nLevel ${q}\n`)
        for (let i = 0; i < maze[q].length; i++) {
            let strTop = '';
            let strMid = '';
            let strBottom = '';
            const nextRow = maze[q][i+1]
            for (let j = 0; j < maze[q][0].length; j++) {
                const cell = maze[q][i][j];
                const nextCell = maze[q][i][j+1]
                cell[2] ? strTop += '    ' : strTop += '+--+';
                cell[0] ? strMid += ' ' : strMid += '|';
                if(cell[4] && cell[5]){
                    strMid += '↕';
                }else{
                    cell[4] ? strMid += '↑' : strMid += ' ';
                    cell[5] ? strMid += '↓' : strMid += ' ';
                }
                if(nextCell){
                    cell[1] === nextCell[0] ? strMid += ' ' : strMid += '|';
                }else{
                    cell[1] ? strMid += ' ' : strMid += '|';
                }
                if(!nextRow){
                    cell[3] ? strBottom += '    ' : strBottom += '+--+';
                }

            }
            console.log(strTop );
            console.log(strMid);
            strBottom && console.log(strBottom);
            strBottom = ''
            strMid = ''
            strTop = ''
        }
    }

}
displayMaze(maze)









