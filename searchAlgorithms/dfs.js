import SearchAlgorithm from "./searchAlgoAbstract.js";

class DFS extends SearchAlgorithm{
    #numberOfNodesEvaluated
    constructor() {
        super();
        this.#numberOfNodesEvaluated = false;
    }

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
        }
        if (visited.has(searchable.goalState)) {
            return this.#numberOfNodesEvaluated = true;
        }
        return this.#numberOfNodesEvaluated = false;
    }

    getNumberOfNodesEvaluated() {
        return this.#numberOfNodesEvaluated;
    }
}

export default DFS;