class SnakeControl {
    area;
    snake;
    render;
    constructor(snake, render) {
        this.snake = snake;
        this.render = render;
        this.area = document.querySelector('html');
        this.initControls();
    }
    initControls() {
        if (!this.area)
            return;
        this.area.addEventListener('keydown', (e) => {
            this.handleKeyPress(e);
        });
    }
    handleKeyPress(e) {
        // if (this.moveInterval) {
        //   clearInterval(this.moveInterval);
        // }
        const keyMap = {
            d: { x: 1, y: 0 },
            ArrowRight: { x: 1, y: 0 },
            a: { x: -1, y: 0 },
            ArrowLeft: { x: -1, y: 0 },
            w: { x: 0, y: -1 },
            ArrowUp: { x: 0, y: -1 },
            s: { x: 0, y: 1 },
            ArrowDown: { x: 0, y: 1 },
        };
        const isValidKey = (key) => {
            return key in keyMap;
        };
        if (!isValidKey(e.key))
            return;
        const delta = keyMap[e.key];
        const currentHead = this.snake.tail[0];
        let newHead = {
            x: currentHead.x + delta.x,
            y: currentHead.y + delta.y,
        };
        if (newHead.x == this.snake.tail[1]?.x && newHead.y == this.snake.tail[1]?.y) {
            return;
        }
        this.snake.tail.unshift(newHead);
        this.snake.tail.pop();
        this.render();
    }
}
class Snake {
    _snake;
    constructor() {
        this._snake = {
            tail: [
                { x: 1, y: 3 },
                { x: 2, y: 3 },
                { x: 3, y: 3 },
                { x: 4, y: 3 },
            ],
        };
    }
    get tail() {
        return this._snake.tail;
    }
    checkTail(x, y) {
        for (let i = 0; i < this._snake.tail.length; i++) {
            if (this._snake.tail[i]?.x == x && this._snake.tail[i]?.y == y) {
                return [true, i];
            }
        }
        return [false, -1];
    }
}
class SnakeGame {
    field;
    gridSize = 17;
    moveInterval = null;
    currentDirection = '';
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
new SnakeGame();
export {};
//# sourceMappingURL=index.js.map