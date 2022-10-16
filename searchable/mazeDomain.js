import {Searchable} from "./searchable.js";

export class MazeDomain extends Searchable{
    #state
    constructor(state) {
        super(state);
        this.#state = state;
    }
    get startState() {
        return this.#state.start;
    }
    get goalState() {
        return this.#state.goal;
    }
    get initNode(){
        return this.#state.initNode;
    }
    getNode(nodeStr){
        return this.#state.getNode(nodeStr);
    }
    getNeighbors(node){ // valid actions
        if(node instanceof String){
            return this.#state.validNeighbors(this.getNode(node));
        }else{
            return this.#state.validNeighbors(node);
        }
    }
}