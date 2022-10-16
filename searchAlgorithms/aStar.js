import SearchAlgorithm from "./searchAlgoAbstract.js";
import PriorityQueue from "../priorityQueue.js";
import Graph from "./forAStar/graph.js";

class AStar extends SearchAlgorithm {
    #numberOfNodesEvaluated
    #position

    constructor(position = false) {
        super();
        this.#numberOfNodesEvaluated = false;
        if (position) {
            this.#position = position
        }
    }

    /**
     * Heuristic function.
     * @param a String coordinates of the first node.
     * @param b String coordinates of the second node.
     * @returns {number}
     */
    heuristic(a, b) {
        const [z1, y1, x1] = a.split(',');
        const [z2, y2, x2] = b.split(',');
        return Math.abs(z1 - z2) + Math.abs(y1 - y2) + Math.abs(x1 - x2);
    }

    /**
     * Method finds the shortest path to get to the goal state from the start state.
     * @param searchable unified search problem.
     * @returns Array
     */
    search(searchable) {
        let start;
        if (this.#position) {
            start = this.#position
        } else {
            start = searchable.startState;
        }
        const goal = searchable.goalState;
        const frontier = new PriorityQueue((node1, node2) => node1[1] < node2[1]);
        frontier.push([start, 0]);
        const costSoFar = new Map();
        costSoFar.set(start, 0);
        const toD = []
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
                    toD.push([currentLocation, next, newCost])
                }
            }
        }

        const graph = new Graph();
        const allCells = new Set();
        const edgesWithWeight = toD;
        for (let i = 0; i < toD.length; i++) {
            allCells.add(toD[i][0]);
            allCells.add(toD[i][1]);
        }
        for (const cell of allCells) {
            graph.addNode(cell)
        }
        for (const edge of edgesWithWeight) {
            graph.addEdge(edge[0], edge[1], edge[2]);
        }

        const path = graph.findShortestRoute(start, goal)
        this.#numberOfNodesEvaluated = toD.length;
        return path;
    }

    /**
     * Returns number of nodes required to make to get to the goal state.
     * @returns Number
     */
    getNumberOfNodesEvaluated() {
        return this.#numberOfNodesEvaluated;
    }
}


export default AStar;