import DFSMaze3dGenerator from "./generators/DFSMaze3dGenerator.js";
import {MazeDomain, MazeState} from "./searchable.js";
import AStar from "./searchAlgorithms/aStar.js";
import SimpleMaze3dGenerator from "./generators/simpleMaze3dGenerator.js";
import AldousBroderMaze3dGenerator from "./generators/aldousBroderMaze3dGenerator.js";
import Player from "./player.js"
import MazeView from "./mazeView.js";
import BFS from "./searchAlgorithms/bfs.js";
import DFS from "./searchAlgorithms/dfs.js";
import Directions from "./directions.js";

class MazeController{
    #maze
    #player
    #view
    #mazeState
    #searchable
    #algo
    #directions
    constructor() {
        this.#directions = new Directions();
    }

    get view() {
        return this.#view;
    }

    get directions(){
        return this.#directions;
    }

    get mazeState() {
        return this.#mazeState;
    }

    get searchable() {
        return this.#searchable;
    }

    get algo() {
        return this.#algo;
    }

    get maze () {
        return this.#maze;
    }

    get player() {
        return this.#player;
    }



    createMaze(rowInp, colInp){
        // Temporary solution
        const db = false;
        if (!db) {
            const rowInpValue = Number(rowInp);
            const colInpValue = Number(colInp);
            // const mazeGen = new AldousBroderMaze3dGenerator();
            // const mazeGen = new SimpleMaze3dGenerator();
            const mazeGen = new DFSMaze3dGenerator();
            this.#maze = mazeGen.generate(rowInpValue, colInpValue); // rowInp, colInp int
            this.#player = new Player(this.maze.entranceCell.levelNum, this.maze.entranceCell.rowNum, this.maze.entranceCell.colNum);
            this.#view = new MazeView(this.maze, this.#player)
            this.#mazeState = new MazeState(this.maze);
            this.#searchable = new MazeDomain(this.mazeState);
            this.view.mazeView(rowInpValue, colInpValue);
        } else {

        }
    }

    makeMove(keyDirection){
        const directions = this.directions.directions;
        const key = ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown'];
        if(key.indexOf(keyDirection) !== -1){
            let currPlayerPosition = this.player.coordinates;
            const keyIdx = key.indexOf(keyDirection);
            const chosenDirection = directions[keyIdx];
            const validMoves = this.maze.getNeighborsOfTheNode(currPlayerPosition) // valid moves
            const wantedMove = [];
            currPlayerPosition = currPlayerPosition.split(',')
            for (let i = 0; i < 3; i++) {
                wantedMove.push(chosenDirection[i] + Number(currPlayerPosition[i]))
            }
            if (validMoves.has(wantedMove.toString())) {
                // change player location -> reRender player Position
                const currLocation = this.player.coordinates;
                const nextLocation = wantedMove.toString()
                this.changePlayerLocation(currLocation, nextLocation);
            }
        }

    }

    changePlayerLocation(prevLocation, nextLocation) {
        const [i, j, k] = nextLocation.split(',')
        const prevI = Number(prevLocation.split(',')[0])
        this.player.currLevel = +i;
        this.player.currRow = +j;
        this.player.currCol = +k;
        const prevCell = this.maze.getNodeByCoordinates(prevLocation);
        prevCell.player = false;
        const nextCell = this.maze.getNodeByCoordinates(nextLocation);
        nextCell.player = true;
        if (+i !== prevI) {
            this.view.mazeView();
        } else {
            this.view.reRenderPlayerLocation(prevLocation, nextLocation);
        }
    }

    solveTheGame(){
        // this.#algo = new AStar(); // to make it dynamic
        this.#algo = new DFS(); // to make it dynamic
        const search = this.testSearchAlgorithm(this.algo, this.searchable);
        const solution = Array.from(search[0]);
        const numOfNodes = search[1];
        let moveCount = 0;
        let prevLocation = this.player.coordinates;
        const interval = setInterval(() => {
            let nextLocation;
            nextLocation = solution[moveCount];
            this.changePlayerLocation(prevLocation, nextLocation);
            prevLocation = nextLocation;
            moveCount++;
            if (moveCount === numOfNodes) {
                clearInterval(interval);
            }
        }, 700);
    }
    nextBestMove(){
        const algo = new AStar(this.player.coordinates); // to make it dynamic
        const search = this.testSearchAlgorithm(algo, this.searchable);
        if(search){
            const solution = Array.from(search[0]);
            this.view.renderNextMove(solution[1])
        }
        }

    resetPosition(){
        const entranceCoordinates = this.maze.entranceCell.coordinates;
        this.maze.getNodeByCoordinates(this.player.coordinates).player = false;
        this.maze.entranceCell.player = true;
        const [i, j, k] = entranceCoordinates.split(',');
        this.player.currLevel = +i;
        this.player.currRow = +j;
        this.player.currCol = +k;
        this.view.mazeView();
    }

    testSearchAlgorithm(searchAlgo, searchable) {
        const solution = searchAlgo.search(searchable);
        const numOfNodes = searchAlgo.getNumberOfNodesEvaluated();
        return [solution, numOfNodes];
    }



}

export default MazeController;