import SearchAlgorithm from "./searchAlgoAbstract.js";

class DFS extends SearchAlgorithm {
    #numberOfNodesEvaluated
    #countOfNodes
    constructor() {
        super();
        this.#numberOfNodesEvaluated = false;
    }

    /**
     * Method finds the path to get to the goal state from the start state.
     * @param searchable unified search problem.
     * @returns Set
     */
    search(searchable) {
        const initNode = [searchable.initNode, []];
        const stack = [];
        const visited = new Set();
        stack.push(initNode);
        while (stack.length > 0) {
            const currNode = stack.pop();
            if (!visited.has(currNode[0].toString())) {
                visited.add(currNode[0].toString());
                let neighbors = searchable.getNeighbors(currNode[0]);
                for (const neighborCoordinates of neighbors) {
                    const neighborNode = searchable.getNode(neighborCoordinates);
                    stack.push([neighborNode, [...currNode[1], currNode]]);
                }
            }
            if (visited.has(searchable.goalState)) {
                this.#numberOfNodesEvaluated = visited.size;
                const pathCells = currNode[1];
                const path = [];
                for (let i = 0; i < pathCells.length; i++) {
                    path.push(pathCells[i][0].coordinates)
                }
                path.push(searchable.goalState)
                this.#countOfNodes = path.length;
                return path;
            }
        }
        return false;
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