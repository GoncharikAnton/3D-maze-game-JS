export class State {
    #key

    constructor(key) {
        if (this.constructor === State) {
            throw new Error('State cannot be initialized');
        }
        this.#key = key;
    }

    get start() {
        throw new Error(`You have to implement the method start!`);
    }

    get goal() {
        throw new Error('You have to implement the method goal!');
    }

    get initNode() {
        throw new Error('You have to implement the method initNode!');
    }

    getNode(coordinates) {
        throw new Error('You have to implement the method getNode!');
    }

    validNeighbors(node) {
        throw new Error('You have to implement the method validNeighbors!');
    }

    get key() {
        return this.#key;
    }

    equals(other) {
        return other instanceof State && this.#key === other.#key;
    }
}