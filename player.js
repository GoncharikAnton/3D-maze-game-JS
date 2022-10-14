class Player{
    #currLevel
    #currRow
    #currCol

    constructor(currLevel, currRow, currCol) {
        this.#currLevel = currLevel;
        this.#currRow = currRow;
        this.#currCol = currCol;
    }
    get currLevel() {
        return this.#currLevel;
    }

    set currLevel(value) {
        this.#currLevel = value;
    }

    get currRow() {
        return this.#currRow;
    }

    set currRow(value) {
        this.#currRow = value;
    }

    get currCol() {
        return this.#currCol;
    }

    set currCol(value) {
        this.#currCol = value;
    }
    get coordinates(){
        return `${this.currLevel},${this.currRow},${this.currCol}`
    }

    toJSON(){
        return {
            currLevel: this.currLevel,
            currRow: this.currRow,
            currCol: this.currCol,
        }
    }

}

export default Player;