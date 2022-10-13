import DFSMaze3dGenerator from "./generators/DFSMaze3dGenerator.js";
import {MazeDomain, MazeState} from "./searchable.js";
import AStar from "./searchAlgorithms/aStar.js";
import SimpleMaze3dGenerator from "./generators/simpleMaze3dGenerator.js";
import AldousBroderMaze3dGenerator from "./generators/aldousBroderMaze3dGenerator.js";
import Player from "./player.js"
import {mazeView, reRenderPlayerLocation} from "./maze-view.js";
import BFS from "./searchAlgorithms/bfs.js";

const nameInp = document.querySelector('#user-name-inp');
const rowInp = document.querySelector('#rows-inp');
const colInp = document.querySelector('#cols-inp');
const startGameBtn = document.querySelector('#start-new-game-btn');
const selectedSearchAlgo = document.querySelector('#search-algo');
const solveGameBtn = document.querySelector('#solve-game-btn');
const mazeContainer = document.querySelector('#maze-container');
const mazeLevelHeader = document.querySelector('#level-header');
const resetBtn =  document.querySelector('#reset-game-btn');
const form = document.querySelector('form');
// const mazeGen = new DFSMaze3dGenerator();
let mazeGen, maze, mazeState, searchable, algo, player, rowInpValue, colInpValue;

// Temporary solution
const db = false;

form.addEventListener('submit', e => {
    if (!db) {
        rowInpValue = Number(rowInp.value);
        colInpValue = Number(colInp.value);

        mazeGen = new AldousBroderMaze3dGenerator();
        maze = mazeGen.generate(rowInpValue, colInpValue); // rowInp, colInp int

        mazeState = new MazeState(maze)
        searchable = new MazeDomain(mazeState);
        algo = new AStar();
        player = new Player(maze.entranceCell.levelNum, maze.entranceCell.rowNum, maze.entranceCell.colNum);
        testSearchAlgorithm(algo, searchable);
        mazeView(mazeState.maze, player, rowInpValue, colInpValue) // rowInp, colInp int
    } else {

    }
});

document.addEventListener('keydown', e => {
    const directions = [
        [0, 0, 1], // right
        [0, 0, -1], // left
        [0, -1, 0], // top
        [0, 1, 0], // bottom
        [1, 0, 0], // up
        [-1, 0, 0], // down
    ];
    const key = ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown'];
    if (maze) {
        if(key.indexOf(e.key) !== -1){
            let currPlayerPosition = player.coordinates;
            const keyIdx = key.indexOf(e.key);
            const chosenDirection = directions[keyIdx];
            const validMoves = maze.getNeighborsOfTheNode(currPlayerPosition) // valid moves
            const wantedMove = [];
            currPlayerPosition = currPlayerPosition.split(',')
            for (let i = 0; i < 3; i++) {
                wantedMove.push(chosenDirection[i] + Number(currPlayerPosition[i]))
            }
            if (validMoves.has(wantedMove.toString())) {
                // change player location -> reRender player Position
                const currLocation = player.coordinates;
                const nextLocation = wantedMove.toString()
                changePlayerLocation(currLocation, nextLocation);
            }
        }
    }
});
resetBtn.addEventListener('click', e => {
    if(maze){
        const entranceCoordinates = maze.entranceCell.coordinates;
        maze.getNodeByCoordinates(player.coordinates).player = false;
        maze.entranceCell.player = true;
        const [i, j, k] = entranceCoordinates.split(',');
        player.currLevel = +i;
        player.currRow = +j;
        player.currCol = +k;
        mazeView(maze, player, rowInpValue, colInpValue);
    }

})


function changePlayerLocation(prevLocation, nextLocation) {
    const [i, j, k] = nextLocation.split(',')
    const prevI = Number(prevLocation.split(',')[0])
    player.currLevel = +i;
    player.currRow = +j;
    player.currCol = +k;
    const prevCell = maze.getNodeByCoordinates(prevLocation);
    prevCell.player = false;
    const nextCell = maze.getNodeByCoordinates(nextLocation);
    nextCell.player = true;
    if (+i !== prevI) {
        mazeContainer.innerHTML = '';
        mazeView(maze, player, +rowInp.value, +colInp.value)
    } else {
        reRenderPlayerLocation(prevLocation, nextLocation);
    }
}


function testSearchAlgorithm(searchAlgo, searchable) {
    const solution = searchAlgo.search(searchable);
    const numOfNodes = searchAlgo.getNumberOfNodesEvaluated();
    console.log(solution)
}