class MazeDBController {
    static saveGame(title, maze, player) {
        if (localStorage.getItem(title + 'm')) {
            const ans = confirm('There is saved game with this name, do you want to overwrite it?');
            if (ans) {
                maze = JSON.stringify(maze);
                player = JSON.stringify(player);
                localStorage.setItem(title + 'm', maze);
                localStorage.setItem(title + 'p', player);
            }
        }
    };

    static loadGame(key) {
        const mazeInstance = localStorage.getItem(key + 'm');
        const playerInstance = localStorage.getItem(key + 'p');
        return [mazeInstance, playerInstance];
    }
}

export default MazeDBController;



