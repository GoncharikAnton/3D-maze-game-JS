/**
 * Class represents manager of database (in this case localStorage).
 * It provides methods to save and load the game.
 */
class MazeDBController {
    /**
     * Static method that checks the localStorage for existed game and if it exists, user has to make a decision if he wants
     * to overwrite last save. If there is no last save, method save the current game.
     * @param title string, id of the game.
     * @param maze Maze3D instance
     * @param player Player instance
     */
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

    /**
     * Returns from the localStorage the instances of the maze and player which represented as strings.
     * @param key
     * @returns [string, string]
     */
    static loadGame(key) {
        const mazeInstance = localStorage.getItem(key + 'm');
        const playerInstance = localStorage.getItem(key + 'p');
        return [mazeInstance, playerInstance];
    }
}

export default MazeDBController;



