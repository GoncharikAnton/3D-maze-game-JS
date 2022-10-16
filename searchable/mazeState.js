import {State} from "./state.js";

export class MazeState extends State{
    #maze
    constructor(maze) {
        super(maze);
        this.#maze = maze;
    }
    get maze() {
        return this.#maze;
    }
    get start(){
        return this.#maze.entranceCell.coordinates;
    }
    get goal(){
        return this.#maze.exitCell.coordinates;
    }
    get initNode(){
        return this.#maze.getNodeByCoordinates(this.start)
    }
    getNode(coordinates){
        return this.#maze.getNodeByCoordinates(coordinates)
    }
    validNeighbors(node){
        return this.#maze.getNeighborsOfTheNode(node.toString())
    }

}