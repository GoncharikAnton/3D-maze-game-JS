import MazeController from "./mazeController.js";
import MazeDBController from "./mazeDBController.js";
import {clearErrorMessages, formValidation, showErrorLoad, showErrorName,} from "./formValidation.js";

const form = document.querySelector('#createForm');
const nameInp = document.querySelector('#user-name-inp');
const rowInp = document.querySelector('#rows-inp');
const colInp = document.querySelector('#cols-inp');
const solveGameBtn = document.querySelector('#solve-game-btn');
const resetBtn = document.querySelector('#reset-game-btn');
const showNextMove = document.querySelector('#show-next-move-btn');
const saveTheGame = document.querySelector('#save-the-game');
const loadPreviewsGame = document.querySelector('#load-the-game');
const nameOfPreviewsGameInp = document.querySelector('#last-game-name-inp');
const selectedSearchAlgo = document.querySelector('#search-algo');

let controller, intervalId; // empty variables for future data passing.

form.addEventListener('submit', e => {
    createGame(e);
});
loadPreviewsGame.addEventListener('click', () => {
    loadPrevGame();
});

document.addEventListener('keydown', e => {
    if(controller){
        controller.makeMove(e.key);
    }
});
resetBtn.addEventListener('click', () => {
    if (intervalId) {
        clearInterval(intervalId);
    }
    controller.resetPosition();

});
solveGameBtn.addEventListener('click', () => {
    if (intervalId) {
        clearInterval(intervalId);
    }
    controller.resetPosition();
    intervalId = controller.solveTheGame(selectedSearchAlgo.value);

});

showNextMove.addEventListener('click', () => {
    controller.nextBestMove();
});
saveTheGame.addEventListener('click', () => {
        clearErrorMessages();
        MazeDBController.saveGame(nameInp.value, controller.maze, controller.player);
});

/**
 * Display hided buttons for game control.
 */
function showControlBtns() {
    const controlBtns = document.querySelector('#control-buttons');
    controlBtns.style.display = 'block';
}

/**
 * Checks user input and if it's valid, function creates the instance of controller with loaded data of the asked game.
 */
function loadPrevGame () {
    if (!nameOfPreviewsGameInp.checkValidity()) {
        showErrorName(nameOfPreviewsGameInp, 'loadError');
    } else if (!localStorage.getItem(nameOfPreviewsGameInp.value + 'm')) {
        showErrorLoad(nameOfPreviewsGameInp, 'loadError');
    } else {
        const data = MazeDBController.loadGame(nameOfPreviewsGameInp.value)
        const maze = JSON.parse(data[0]);
        const player = JSON.parse(data[1]);
        controller = new MazeController(maze, player);
        controller.createMaze(0, 0, true);
        clearErrorMessages();
        showControlBtns();
    }
}

/**
 * Function validates user form input and creates a controller instance.
 * @param e
 */
function createGame(e){
    const validated = formValidation(form, nameInp, rowInp, colInp);
    if (!validated) {
        e.preventDefault();
    } else {
        controller = new MazeController();
        controller.createMaze(Number(rowInp.value), Number(colInp.value));
        clearErrorMessages();
        showControlBtns();
    }
}