export class State{
    #key

    constructor(key) {
        if (this.constructor === State) {
            throw new Error('State cannot be initialized');
        }
        this.#key = key;
    }
    get start(){
        throw new Error(`You have to implement the method start!`);
    }
    get goal(){
        throw new Error('You have to implement the method goal!');
    }
    get initNode(){
        throw new Error('You have to implement the method initNode!');
    }
    getNode(coordinates){
        throw new Error('You have to implement the method getNode!');
    }
    validNeighbors(node){
        throw new Error('You have to implement the method validNeighbors!');
    }
    get key() {
        return this.#key;
    }
    equals(other) {
        return other instanceof State && this.#key === other.#key;
    }
}
export class Searchable{
    constructor() {
        if(this.constructor === Searchable){
            throw new Error('This is an abstract class');
        }
    }
    get startState() {
        throw new Error('You have to implement startState!');
    }
    get goalState() {
        throw new Error('You have to implement goalState!');
    }
    getNeighbors(state) {
        throw new Error('You have to implement the method getNeighbors!');
    }
}

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

