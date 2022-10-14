import PriorityQueue from "../../priorityQueue.js";

/**
 *
 * @param {Graph} graph
 * @param {Node} source
 */

export function dijkstra(graph, source) {
  const queue = new PriorityQueue((node1, node2) => node1.distance < node2.distance);
  for (const node of graph.nodes) {
    if (node === source) {
      node.distance = 0;
    } else {
      node.distance = Infinity;
    }
    node.prev = null;
    queue.push(node);
  }

  while (!queue.isEmpty()) {
    const currNode = queue.pop();

    for (const neighbor of currNode.neighborNodes) {
      const altDistance = currNode.distance + currNode.getEdgeWeight(neighbor);
      if (altDistance < neighbor.distance) {
        neighbor.distance = altDistance;
        neighbor.prev = currNode;
        queue.remove(neighbor);
        queue.push(neighbor);
      }
    }
  }
}