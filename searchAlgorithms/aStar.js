import SearchAlgorithm from "./searchAlgoAbstract.js";
import PriorityQueue from "../priorityQueue.js";

class AStar extends SearchAlgorithm{
    #numberOfNodesEvaluated
    constructor() {
        super();
        this.#numberOfNodesEvaluated = false;
    }
    heuristic(a, b) {
        const [z1, y1, x1] = a.split(',');
        const [z2, y2, x2] = b.split(',');
        return Math.abs(z1 - z2) + Math.abs(y1 - y2) + Math.abs(x1 - x2)
    }
    search(searchable) {
        const start = searchable.startState;
        const goal = searchable.goalState;
        const frontier = new PriorityQueue((node1, node2) => node1[1] < node2[1]);
        frontier.push([start, 0]);
        const cameFrom = new Map();
        const costSoFar = new Map();
        cameFrom.set(start, null);
        costSoFar.set(start, 0);

        while (!frontier.isEmpty()) {
            let [currentLocation, priority] = frontier.pop();
            if (currentLocation === goal) {
                break;
            }
            const neighbors = searchable.getNeighbors(currentLocation);
            for (const next of neighbors) {
                const newCost = costSoFar.get(currentLocation) + 1;
                if (!costSoFar.has(next) || newCost < costSoFar.get(next)) {
                    costSoFar.set(next, newCost);
                    priority = newCost + this.heuristic(next, goal);
                    frontier.push([next, priority]);
                    cameFrom.set(next, currentLocation)
                }
            }
        }
        return this.#numberOfNodesEvaluated = [cameFrom, costSoFar]
    }

    getNumberOfNodesEvaluated() {
        return this.#numberOfNodesEvaluated;
    }
}


export default AStar;