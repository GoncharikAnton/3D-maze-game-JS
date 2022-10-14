import Node from "./node.js";
import {dijkstra} from "./dijkstra.js";

class Graph {
  /** @type {Map<object, Node>} */
  #nodes

  constructor() {
    this.#nodes = new Map();
  }

  get nodes() {
    return this.#nodes.values();
  }

  addNode(value) {
    if (this.#nodes.has(value)) {
      throw new Error('A node with this value already exists');
    }

    const newNode = new Node(value);
    this.#nodes.set(value, newNode);
    return newNode;
  }

  addEdge(source, target, weight) {
    const sourceNode = this.#nodes.get(source);
    const targetNode = this.#nodes.get(target);
    if (sourceNode && targetNode) {
      sourceNode.addAdjacent(targetNode, weight);
      targetNode.addAdjacent(sourceNode, weight);
    }
  }

  removeNode(value) {
    const currNode = this.#nodes.get(value);
    if (currNode) {
      // Remove all the edges to this node
      for (const node of this.#nodes.values()) {
        node.removeAdjacent(currNode);
      }

      this.#nodes.delete(value);
    }
  }

  removeEdge(source, target) {
    const sourceNode = this.#nodes.get(source);
    const targetNode = this.#nodes.get(target);

    if (sourceNode && targetNode) {
      sourceNode.removeAdjacent(targetNode);
      targetNode.removeAdjacent(sourceNode);
    }
  }

  getNeighbors(value) {
    const node = this.#nodes.get(value);
    if (node) {
      return node.neighbors;
    }
  }

  getEdgeWeight(source, target) {
    const sourceNode = this.#nodes.get(source);
    const targetNode = this.#nodes.get(target);

    if (sourceNode && targetNode) {
      return sourceNode.getEdgeWeight(targetNode);
    }
    return Infinity;
  }

  findShortestRoute(source, target) {
    const sourceNode = this.#nodes.get(source);
    const targetNode = this.#nodes.get(target);
    if (sourceNode && targetNode) {
      dijkstra(this, sourceNode);

      const shortestPath = [];
      let currNode = targetNode;

      while (currNode) {
        shortestPath.unshift(currNode.value);
        currNode = currNode.prev;
      }

      return shortestPath;
    }
  }
}

export default Graph;