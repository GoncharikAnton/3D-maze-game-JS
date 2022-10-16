import {Searchable} from "./searchable.js";

export class MazeDomain extends Searchable{
    #state

    /**
     * Class represents unified search problem of maze instance.
     * @param state Maze3D instance.
     */
    constructor(state) {
        super(state);
        this.#state = state;
    }

    /**
     * Returns coordinates of the start node position of the state that represented as a string.
     * @returns string
     */
    get startState() {
        return this.#state.start;
    }
    /**
     * Returns coordinates of the goal node position of the state that represented as a string.
     * @returns string
     */
    get goalState() {
        return this.#state.goal;
    }
    /**
     * Returns the init node of the state.
     * @returns Cell
     */
    get initNode(){
        return this.#state.initNode;
    }
    /**
     * Method returns node gotten by its coordinates.
     * @returns Cell
     */
    getNode(nodeStr){
        return this.#state.getNode(nodeStr);
    }
    /**
     * Method returns VALID neighbors of the required node.
     * It works with Cell object and string coordinates of the required node(Cell.coordinates)
     * @returns Set
     */
    getNeighbors(node){ // valid actions
        if(node instanceof String){
            return this.#state.validNeighbors(this.getNode(node));
        }else{
            return this.#state.validNeighbors(node);
        }
    }
}