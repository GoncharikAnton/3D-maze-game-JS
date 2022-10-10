function BFSSearch(graph, start, goal) { // G - generated maze, start str, goal str
    const queue = [];
    const visited = new Set();
    const startNode = graph.getNodeByCoordinates(start); // node object // initial-state
    queue.push(startNode);
    while (queue.length > 0) {
        const currCell = queue.pop();
        const coordinates = currCell.coordinates; // string representation of node
        if (coordinates === goal) {
            return currCell;  // node
        }
        let neighbors = currCell.getValidNeighbors(graph.rows, graph.cols); // neighbors of the node
        for (const neighborCoordinates of neighbors) {
            const neigh = graph.getNodeByCoordinates(neighborCoordinates); // object that gotten from board by coordinates
            // if (neigh.visitedBySearcher === false) { // flag which indicates that node was visited
            //     neigh.visitedBySearcher = true;
            //     queue.unshift(neigh)
            // }
            if(!visited.has(neigh.coordinates)){
                visited.add(neigh.coordinates);
                queue.unshift(neigh);
            }
        }
    }
    return false;
}