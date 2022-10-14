
class DBController{
    static saveGame(title, maze, player){
        maze = JSON.stringify(maze);
        player = JSON.stringify(player);
        localStorage.setItem(title + 'm',maze);
        localStorage.setItem(title + 'p',player);
    };

    static loadGame(key){
        const mazeInstance = localStorage.getItem(key + 'm');
        const playerInstance = localStorage.getItem(key + 'p');
        return [mazeInstance, playerInstance];
    }
}

export default DBController;



