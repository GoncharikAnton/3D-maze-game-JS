/**
 * Class represents an abstract search algorithm.
 */
class SearchAlgorithm{
    /**
     * Method finds the path (shortest?) to get to the goal state from the start state.
     * @param searchable unified search problem.
     */
    search(searchable) {}
    /**
     * Returns number of nodes required to make to get to the goal state.
     * @returns Number
     */
    getNumberOfNodesEvaluated() {}
}
export default SearchAlgorithm;