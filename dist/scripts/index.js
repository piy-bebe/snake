class SnakeGame {
    field;
    gridSize = 17;
    area;
    moveInterval = null;
    currentDirection = '';
    fruits = [{ position: { x: 3, y: 2 } }, { position: { x: 15, y: 8 } }];
    snake = {
        tail: [
            {
                x: 1,
                y: 3,
            },
            {
                x: 2,
                y: 3,
            },
            {
                x: 3,
                y: 3,
            },
            {
                x: 4,
                y: 3,
            },
        ],
    };
    constructor() {
        this.area = document.querySelector('html');
        this.field = document.querySelector('#gameField');
        this.setGridSize(this.gridSize);
        this.initControls();
    }
    initControls() {
        if (!this.area)
            return;
        this.area.addEventListener('keydown', (e) => {
            console.log('asd');
            this.handleKeyPress(e);
        });
    }
    handleKeyPress(e) {
        if (this.moveInterval) {
            clearInterval(this.moveInterval);
        }
        const head = this.snake.tail[0];
        let newHead = { x: head.x + 1, y: head.y };
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
        newHead = {
            x: head.x + delta.x,
            y: head.y + delta.y,
        };
        this.snake.tail.unshift(newHead);
        this.snake.tail.pop();
        this.render();
        // switch (e.key) {
        //   case 'w':
        //     this.startMoving(() => {
        //       this.snake.position.y -= 1;
        //     });
        //     break;
        //   case 's':
        //     this.startMoving(() => {
        //       this.snake.position.y += 1;
        //     });
        //     break;
        //   case 'a':
        //     this.startMoving(() => {
        //       this.snake.position.x -= 1;
        //     });
        //     break;
        //   case 'd':
        //     this.startMoving(() => {
        //       this.snake.position.x += 1;
        //     });
        //     break;
        // }
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
    render() {
        if (this.field) {
            this.field.innerHTML = '';
            this.createGrid();
        }
        else {
            console.error('Game field not found!');
        }
    }
    checkFruits(x, y) {
        return this.fruits.some((fruit) => fruit.position.x == x && fruit.position.y == y);
    }
    checkTail(x, y) {
        // return this.snake.tail.some((i) => i.x == x && i.y == y);
        for (let i = 0; i < this.snake.tail.length; i++) {
            if (this.snake.tail[i]?.x == x && this.snake.tail[i]?.y == y) {
                return [true, i];
            }
        }
        return [false, -1];
    }
    createGrid() {
        for (let y = 0; y < this.gridSize; y++) {
            for (let x = 0; x < this.gridSize; x++) {
                const cell = document.createElement('div');
                const snakeDraw = this.checkTail(x, y);
                if (snakeDraw[0]) {
                    if (snakeDraw[1] == 0) {
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