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
            this.handleKeyPress(e);
        });
    }
    handleKeyPress(e) {
        if (this.moveInterval) {
            clearInterval(this.moveInterval);
        }
        const head = this.snake.tail[0];
        let newHead = { x: head.x + 1, y: head.y };
        if (e.key == 'd') {
            newHead = { x: head.x + 1, y: head.y };
        }
        else if (e.key == 'a') {
            newHead = { x: head.x - 1, y: head.y };
        }
        else if (e.key == 'w') {
            newHead = { x: head.x, y: head.y - 1 };
        }
        else if (e.key == 's') {
            newHead = { x: head.x, y: head.y + 1 };
        }
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
        return this.snake.tail.some((i) => i.x == x && i.y == y);
    }
    createGrid() {
        for (let y = 0; y < this.gridSize; y++) {
            for (let x = 0; x < this.gridSize; x++) {
                const cell = document.createElement('div');
                if (this.checkTail(x, y)) {
                    cell.classList.add('snake');
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