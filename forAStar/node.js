class Node {
  /** @type {Map<object, Node>} */
  #adjacencyList
  #value

  constructor(value) {
    this.#value = value;
    this.#adjacencyList = new Map();
  }

  get value() {
    return this.#value;
  }

  addAdjacent(node, weight) {
    this.#adjacencyList.set(node.value, [node, weight]);
  }

  removeAdjacent(node) {
    if (this.#adjacencyList.has(node.value)) {
      this.#adjacencyList.delete(node.value);
    }
  }

  get neighbors() {
    return [...this.#adjacencyList.keys()];
  }

  get neighborNodes() {
    return [...this.#adjacencyList.values()].map(v => v[0]);
  }

  getEdgeWeight(neighbor) {
    if (this.#adjacencyList.has(neighbor.value)) {
      return this.#adjacencyList.get(neighbor.value)[1];
    }
    return Infinity;
  }
}
export default Node;