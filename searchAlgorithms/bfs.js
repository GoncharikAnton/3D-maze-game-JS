import SearchAlgorithm from "./searchAlgoAbstract.js";
import Directions from "../directions.js";

class BFS extends SearchAlgorithm {
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
    search(searchable) {
        const goal = searchable.goalState; // str                                                       5
        const queue = [];
        const visited = new Set();
        const initNode = searchable.initNode // node object // initial-state
        queue.push(initNode.coordinates);
        while (queue.length > 0) {

            const currNode = queue.pop();

            const coordinates = currNode.toString(); // string representation of the node
            if (coordinates === goal) {
                this.#numberOfNodesEvaluated = visited.size;
                return visited;
            }
            let neighbors = searchable.getNeighbors(currNode); // neighbors of the node represented by strings
            for (const neighborCoordinates of neighbors) {
                if (!visited.has(neighborCoordinates)) {
                    visited.add(neighborCoordinates);
                    queue.unshift(neighborCoordinates);
                }
            }
        }
        return visited;
    }

    /**
     * Returns number of nodes required to make to get to the goal state.
     * @returns Number
     */
    getNumberOfNodesEvaluated() {
        return this.#numberOfNodesEvaluated
    }


    isLegalMove(prev, next){
        const directions = new Directions().directions;
        const prevCell = prev.split(',');

        for (let i = 0; i < directions.length; i++) {
            const z = directions[i][0];
            const y = directions[i][1];
            const x = directions[i][2];
            let dir = `${+prevCell[0] + +z},${+prevCell[1] + +y},${+prevCell[2] + +x}`;
            if(dir === next){
                return true;
            }
        }
        return false;
    }

}

export default BFS;
