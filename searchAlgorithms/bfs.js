import SearchAlgorithm from "./searchAlgoAbstract.js";

class BFS extends SearchAlgorithm{
    #numberOfNodesEvaluated
    constructor() {
        super();
        this.#numberOfNodesEvaluated = false;
    }
    search(searchable){
        const goal = searchable.goalState; // str
        const queue = [];
        const visited = new Set();
        const initNode = searchable.initNode // node object // initial-state
        queue.push(initNode);
        while (queue.length > 0) {
            const currNode = queue.pop();
            const coordinates = currNode.toString(); // string representation of node
            if (coordinates === goal) {
                // return this.#numberOfNodesEvaluated = visited.size;  // node
                return this.#numberOfNodesEvaluated = visited;  // node
            }
            let neighbors = searchable.getNeighbors(currNode); // neighbors of the node represented by strings
            for (const neighborCoordinates of neighbors) {
                if(!visited.has(neighborCoordinates)){
                    visited.add(neighborCoordinates);
                    queue.unshift(neighborCoordinates);
                }
            }
        }
        return this.#numberOfNodesEvaluated = false;
    }

    getNumberOfNodesEvaluated() {
        return this.#numberOfNodesEvaluated
    }

}
export default BFS;