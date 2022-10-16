import SearchAlgorithm from "./searchAlgoAbstract.js";

class DFS extends SearchAlgorithm{
    #numberOfNodesEvaluated
    constructor() {
        super();
        this.#numberOfNodesEvaluated = false;
    }
    /**
     * Method finds the path to get to the goal state from the start state.
     * @param searchable unified search problem.
     * @returns Set
     */
    search(searchable){
        const initNode = searchable.initNode;
        const stack = [];
        const visited = new Set();
        stack.push(initNode);
        while (stack.length > 0) {
            const currNode = stack.pop();
            if (!visited.has(currNode.toString())) {
                visited.add(currNode.toString());
                let neighbors = searchable.getNeighbors(currNode);
                for (const neighborCoordinates of neighbors) {
                    const neighborNode = searchable.getNode(neighborCoordinates);
                    stack.push(neighborNode);
                }
            }
            if (visited.has(searchable.goalState)) {
                this.#numberOfNodesEvaluated = visited.size;
                return visited;
            }
        }
        return false
    }
    /**
     * Returns number of nodes required to make to get to the goal state.
     * @returns Number
     */
    getNumberOfNodesEvaluated() {
        return this.#numberOfNodesEvaluated;
    }
}

export default DFS;