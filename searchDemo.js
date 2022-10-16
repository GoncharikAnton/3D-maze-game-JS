import BFS from "./searchAlgorithms/bfs.js";
import DFS from "./searchAlgorithms/dfs.js";
import AStar from "./searchAlgorithms/aStar.js";
import DFSMaze3dGenerator from "./generators/DFSMaze3dGenerator.js";
import Player from "./player.js";
import {MazeState} from "./searchable/mazeState.js";
import {MazeDomain} from "./searchable/mazeDomain.js";

class SearchDemo {

    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
    }

    run(){
        console.log(`3 levels, ${this.rows} rows, ${this.cols} cols`)
        const mazeGen = new DFSMaze3dGenerator();
        const maze = mazeGen.generate(this.rows, this.cols); // rowInp, colInp int
        const mazeState = new MazeState(maze);
        const searchable = new MazeDomain(mazeState);

        const bfs = new BFS();
        const bfsIter = this.testSearchAlgorithm(bfs, searchable)
        console.log('BFS-search nodes evaluated: ', bfsIter[1]);

        const dfs = new DFS()
        const dfsIter = this.testSearchAlgorithm(dfs, searchable)
        console.log('DFS-search nodes evaluated: ', dfsIter[1]);

        const astar = new AStar();
        const astarIter = this.testSearchAlgorithm(astar, searchable)
        console.log('AStar-search nodes evaluated: ', astarIter[1]);
    }

    testSearchAlgorithm(searchAlgo, searchable) {
        const solution = searchAlgo.search(searchable);
        const numOfNodes = searchAlgo.getNumberOfNodesEvaluated();

        return [solution, numOfNodes];
    }
}
export default SearchDemo;