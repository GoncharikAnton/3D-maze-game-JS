export class Searchable{
    constructor() {
        if(this.constructor === Searchable){
            throw new Error('This is an abstract class');
        }
    }
    get startState() {
        throw new Error('You have to implement startState!');
    }
    get goalState() {
        throw new Error('You have to implement goalState!');
    }
    getNeighbors(state) {
        throw new Error('You have to implement the method getNeighbors!');
    }
}




