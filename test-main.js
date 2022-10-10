import DFSMaze3dGenerator from "./generators/DFSMaze3dGenerator.js";
import {MazeDomain, MazeState} from "./searchable.js";
import AStar from "./searchAlgorithms/aStar.js";
import SimpleMaze3dGenerator from "./generators/simpleMaze3dGenerator.js";
import AldousBroderMaze3dGenerator from "./generators/aldousBroderMaze3dGenerator.js";
const mazeGen = new SimpleMaze3dGenerator()
// const mazeGen = new DFSMaze3dGenerator()
// const mazeGen = new AldousBroderMaze3dGenerator();
const maze = mazeGen.generate(4, 4);
// console.log(mazeGen.measureAlgorithmTime(40,40))
// console.log(mazeGenDFS.measureAlgorithmTime(40,40))
// maze.toString()
// console.log(BFSSearch(maze,  maze.entranceCell.coordinates, maze.exitCell.coordinates))
// console.log(DFSSearch(maze, maze.entranceCell.coordinates, maze.exitCell.coordinates))
// console.log(AStarSearch(maze, maze.entranceCell.coordinates, maze.exitCell.coordinates, heuristic))
const mazeState = new MazeState(maze)
const searchable = new MazeDomain(mazeState);

function testSearchAlgorithm(searchAlgo, searchable) {
    const solution = searchAlgo.search(searchable);
    const numOfNodes = searchAlgo.getNumberOfNodesEvaluated();
    console.log(numOfNodes)
}
const qwe = new AStar();
testSearchAlgorithm(qwe, searchable)