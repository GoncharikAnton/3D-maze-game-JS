/**
 * Class created just for convenience. It provides static methods to return random numbers.
 */
class Randomizer {
    /**
     * Returns random number in diapason from Min to Max.
     * @param min
     * @param max
     * @returns {number}
     */
    static randomNumMinMax(min, max) {
        return Math.floor(Math.random() * (max + 1 - min) + min);
    }

    /**
     * Returns a random coordinate of the cell(node) in diapason of the count of levels, rows ,cols.
     * @param levels
     * @param rows
     * @param cols
     * @returns array
     */
    static randomCoordinates(levels, rows, cols) {
        const initData = [levels, rows, cols];
        const coordinates = [];
        for (let i = 0; i < initData.length; i++) {
            const randomNum = Math.floor(Math.random() * initData[i])
            coordinates.push(randomNum);
        }
        return coordinates;
    }
}

export default Randomizer;