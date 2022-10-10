class Searchable{
    get startState() {}
    get goalState() {}
    getStateTransitions(state) {}
}
class SearchAlgorithm{
    search(searchable) {}
    getNumberOfNodesEvaluated() {}
}
class State{
    #key

    constructor(key) {
        if (this.constructor === State) {
            throw new Error('State cannot be initialized');
        }
        this.#key = key;
    }
    get key() {
        return this.#key;
    }
    equals(other) {
        return other instanceof State && this.#key === other.#key;
    }
}
class MazeState extends State{
    #maze
    constructor(maze) {
        super(maze.toString());
        this.#maze = maze;
    }
    get maze() {
        return this.#maze;
    }
}
function testSearchAlgorithm(searchAlgo, searchable) {
    const solution = searchAlgo.search(searchable);
    const numOfNodes = searchAlgo.getNumberOfNodesEvaluated();
}
const mazeGen = new DFSMaze3dGenerator()
const maze = mazeGen.generate(3, 4);
const state = new MazeState(maze);