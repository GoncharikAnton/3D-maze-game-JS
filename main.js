import MazeController from "./mazeController.js";
import DBController from "./DBController.js";

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
const showNextMove = document.querySelector('#show-next-move-btn');
const saveTheGame = document.querySelector('#save-the-game');
const loadPreviewsGame = document.querySelector('#load-the-game');

let controller;

form.addEventListener('submit', () => {
    controller = new MazeController();
    controller.createMaze(Number(rowInp.value), Number(colInp.value));
});

document.addEventListener('keydown', e => {
    controller.makeMove(e.key);
});
resetBtn.addEventListener('click', () => {
    controller.resetPosition();
})
solveGameBtn.addEventListener('click', () => {
    controller.solveTheGame();
});

showNextMove.addEventListener('click', () => {
    controller.nextBestMove()
});

saveTheGame.addEventListener('click', () => {
    DBController.saveGame(nameInp.value, controller.maze, controller.player)
})
loadPreviewsGame.addEventListener('click', () => {
    const data = DBController.loadGame(nameInp.value)
    const maze = JSON.parse(data[0]);
    const player = JSON.parse(data[1]);
    controller = new MazeController(maze, player);
    controller.createMaze(0, 0, true);
});