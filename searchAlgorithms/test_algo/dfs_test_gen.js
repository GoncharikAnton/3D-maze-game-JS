function DFSSearch(graph, start, goal) { // graph - generated maze, start - str, end - str;
    const node = graph.getNodeByCoordinates(start);
    const stack = [];
    stack.push(node);
    while (stack.length > 0) {
        const currNode = stack.pop();
        if (!currNode.visitedBySearcher) {
            currNode.visitedBySearcher = true;
            let neighbors = graph.getNeighborsOfTheNode(currNode.coordinates);
            for (const neighborCoordinates of neighbors) {
                const neighborNode = graph.getNodeByCoordinates(neighborCoordinates);
                stack.push(neighborNode);
            }
        }
    }
    if (graph.getNodeByCoordinates(goal).visitedBySearcher) {
        return true;
    }
    return false;
}