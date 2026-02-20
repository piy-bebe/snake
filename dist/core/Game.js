import Snake from '../entities/Snake';
import SnakeControl from '../controllers/SnakeControl';
export default class SnakeGame {
    field;
    gridSize = 17;
    moveInterval = null;
    fruits = [{ position: { x: 3, y: 2 } }, { position: { x: 15, y: 8 } }];
    snake;
    snakeControl;
    render = () => {
        if (this.field) {
            this.field.innerHTML = '';
            this.createGrid();
        }
        else {
            console.error('Game field not found!');
        }
    };
    constructor() {
        this.field = document.querySelector('#gameField');
        this.snake = new Snake();
        this.snakeControl = new SnakeControl(this.snake, this.render);
        this.setGridSize(this.gridSize);
        // this.initControls();
    }
    destroy() {
        if (this.moveInterval) {
            clearInterval(this.moveInterval);
            this.moveInterval = null;
        }
    }
    startMoving(moveCallback) {
        moveCallback();
        this.render();
        this.moveInterval = setInterval(() => {
            moveCallback();
            this.render();
        }, 500);
    }
    setGridSize(size) {
        this.gridSize = size;
        this.field?.style.setProperty('--grid-size', this.gridSize.toString());
        this.createGrid();
    }
    checkFruits(x, y) {
        return this.fruits.some((fruit) => fruit.position.x == x && fruit.position.y == y);
    }
    createGrid() {
        for (let y = 0; y < this.gridSize; y++) {
            for (let x = 0; x < this.gridSize; x++) {
                const cell = document.createElement('div');
                const tail = this.snake.checkTail(x, y);
                if (tail[0]) {
                    if (tail[1] == 0) {
                        cell.classList.add('snake-head');
                    }
                    else {
                        cell.classList.add('snake');
                    }
                }
                else if (this.checkFruits(x, y)) {
                    cell.classList.add('fruit');
                }
                else {
                    cell.classList.add('cell');
                }
                cell.id = `cell-${y + x}`;
                this.field?.appendChild(cell);
            }
        }
    }
}
//# sourceMappingURL=Game.js.map