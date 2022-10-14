import MazeController from "./mazeController.js";

const nameInp = document.querySelector('#user-name-inp');
const rowInp = document.querySelector('#rows-inp');
const colInp = document.querySelector('#cols-inp');
const startGameBtn = document.querySelector('#start-new-game-btn');
const selectedSearchAlgo = document.querySelector('#search-algo');
const solveGameBtn = document.querySelector('#solve-game-btn');
const mazeContainer = document.querySelector('#maze-container');
const mazeLevelHeader = document.querySelector('#level-header');
const resetBtn =  document.querySelector('#reset-game-btn');
const form = document.querySelector('form');
const showNextMove = document.querySelector('#show-next-move-btn')
const controller = new MazeController();

form.addEventListener('submit', e => {
    controller.createMaze(Number(rowInp.value), Number(colInp.value))
});

document.addEventListener('keydown', e => {
    controller.makeMove(e.key);
});
resetBtn.addEventListener('click', e => {
    controller.resetPosition();
})
solveGameBtn.addEventListener('click', e => {
    controller.solveTheGame();
});

showNextMove.addEventListener('click', () => {
    controller.nextBestMove()
})