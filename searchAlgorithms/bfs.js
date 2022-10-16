import SearchAlgorithm from "./searchAlgoAbstract.js";
import Directions from "../directions.js";

class BFS extends SearchAlgorithm {
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
        const goal = searchable.goalState; // str
        const queue = [];
        const visited = new Set();
        const initNode = [searchable.initNode, []] // node object // initial-state
        queue.push(initNode);

        while (queue.length > 0) {

            const currNode = queue.pop();

            const coordinates = currNode[0].coordinates;
            if (coordinates === goal) {
                this.#numberOfNodesEvaluated = visited.size;

                const pathCells = currNode[1];
                const path = [];
                for (let i = 0; i < pathCells.length; i++) {
                    path.push(pathCells[i][0].coordinates)
                }
                path.push(goal)
                this.#countOfNodes = path.length;
                return path;
            }
            let neighbors = searchable.getNeighbors(currNode[0]); // neighbors of the node represented by strings
            for (const neighbor of neighbors) {
                const neigh = searchable.getNode(neighbor)
                if (!visited.has(neigh.coordinates)) {
                    visited.add(neigh.coordinates);
                    queue.unshift([neigh, [...currNode[1], currNode]]);
                }
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

export default BFS;
