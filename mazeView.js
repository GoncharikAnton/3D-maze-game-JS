class MazeView{
    #maze;
    #player
    constructor(maze, player) {
        this.#maze = maze;
        this.#player = player;
    }

    mazeView(rowInp = this.#maze.rows, colInp = this.#maze.cols){
        const mazeContainer = document.querySelector('#maze-container');
        const mazeLevelHeader = document.querySelector('#level-header');
        mazeContainer.innerHTML = '';
        mazeLevelHeader.textContent = ''
        mazeContainer.style.width = (colInp * 25 + 4)  + 'px';
        mazeContainer.style.height = (rowInp * 25 + 4)  + 'px';


        const currLevel = this.#player.currLevel;
        mazeLevelHeader.textContent = `Level ${currLevel}`
        for (let j = 0; j < this.#maze.rows; j++) {
            for (let k = 0; k < this.#maze.cols; k++) {
                const cell = this.#maze.maze[currLevel][j][k]
                const div = document.createElement('div');
                div.dataset.id = cell.coordinates;
                let t, b, r, l;
                cell.topPass === false ? t = 1 : t = 0;
                cell.rightPass === false ? r = 1 : r = 0;
                cell.bottomPass === false ? b = 1 : b = 0;
                cell.leftPass === false ? l = 1 : l = 0;
                cell.leftPass === false ? l = 1 : l = 0;

                if(cell.upPass && cell.downPass){
                    div.innerText = '↕'
                }else if(cell.upPass){
                    div.innerText = '↑'

                }else if(cell.downPass){
                    div.innerText = '↓'
                }
                if(cell.player === true){
                    div.innerHTML += `<image src="avatar.png" id="player">`
                    div.dataset.player = 'true';
                }
                cell.isEntrance ? div.style.backgroundColor = 'red' : div.style.backgroundColor;
                cell.isExit ? div.style.backgroundColor = 'green' : div.style.backgroundColor;
                div.style.borderTop = `${t}px solid black`;
                div.style.borderRight = `${r}px solid black`;
                div.style.borderBottom = `${b}px solid black`;
                div.style.borderLeft = `${l}px solid black`;
                div.classList.add('cell')
                mazeContainer.appendChild(div);
            }
        }
    }

    reRenderPlayerLocation(prevLocation, nextLocation){
        const prevDiv = document.querySelector(`[data-id="${prevLocation}"]`);
        const nextDiv = document.querySelector(`[data-id="${nextLocation}"]`);
        if (prevDiv.textContent){
            prevDiv.innerHTML = prevDiv.textContent.slice(0, 1);
        }else{
            prevDiv.textContent = '';
        }
        nextDiv.innerHTML += `<image src="avatar.png" id="player">`;
    }

    renderNextMove(location){
        let loc = location.split(',');
        let div;

        if(+loc[0] !==  this.#player.currLevel){
            div = document.querySelector(`[data-id="${this.#player.coordinates}"]`);
        }else{
            div = document.querySelector(`[data-id="${location}"]`)
        }
        const prevBGColor = div.style.backgroundColor
        div.style.backgroundColor = 'purple';
        setTimeout(() => {
            div.style.backgroundColor = prevBGColor;
        }, 1500)


    }

}

export default MazeView;
