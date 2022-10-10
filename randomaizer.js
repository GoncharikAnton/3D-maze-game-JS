/**
 * Class created just for convenience. It provides static methods to return random numbers.
 */
class Randomizer {
    static randomNumMinMax(min, max) {
        return Math.floor(Math.random() * (max + 1 - min) + min);
    }

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