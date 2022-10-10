function AStarSearch(graph, start, goal, heuristic) { // graph -> maze, start - `index of the cell(str)`, goal - `index of the cell(str)`, heuristic -> function
    const frontier = new PriorityQueue((cell1, cell2) => cell1[1] < cell2[1]);
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
        const neighbors = graph.getNeighborsOfTheNode(currentLocation);
        for (const next of neighbors) {
            const newCost = costSoFar.get(currentLocation) + 1;
            if (!costSoFar.has(next) || newCost < costSoFar.get(next)) {
                costSoFar.set(next, newCost);
                priority = newCost + heuristic(next, goal);
                frontier.push([next, priority]);
                cameFrom.set(next, currentLocation)
            }
        }
    }
    return [cameFrom, costSoFar]
}
function heuristic(a, b) {
    const [z1, y1, x1] = a.split(',');
    const [z2, y2, x2] = b.split(',');
    return Math.abs(z1 - z2) + Math.abs(y1 - y2) + Math.abs(x1 - x2)
}