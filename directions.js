/**
 * Represents possible directions in the maze.
 */
class Directions{
    #directions
    #rightDirection
    #leftDirection
    #topDirection
    #bottomDirection
    #upDirection
    #downDirection
    constructor() {
        this.#directions = [
            [0, 0, 1], // right
            [0, 0, -1], // left
            [0, -1, 0], // top
            [0, 1, 0], // bottom
            [1, 0, 0], // up
            [-1, 0, 0], // down
        ];
        this.#rightDirection = [0, 0, 1];
        this.#leftDirection = [0, 0, -1];
        this.#topDirection = [0, -1, 0];
        this.#bottomDirection =  [0, 1, 0];
        this.#upDirection = [1, 0, 0];
        this.#downDirection = [-1, 0, 0];
    }


    get  directions() {
        return this.#directions;
    }

    get rightDirection() {
        return this.#rightDirection;
    }

    get leftDirection() {
        return this.#leftDirection;
    }

    get topDirection() {
        return this.#topDirection;
    }

    get bottomDirection() {
        return this.#bottomDirection;
    }

    get upDirection() {
        return this.#upDirection;
    }

    get downDirection() {
        return this.#downDirection;
    }
}

export default Directions;