import type { Point, Fruits, Tail } from './types';

class SnakeControl {
  private area: HTMLElement | null;
  private snake: Tail;
  private render;

  constructor(snake: Tail, render: any) {
    this.snake = snake;
    this.render = render;
    this.area = document.querySelector('html');
    this.initControls();
  }

  initControls(): void {
    if (!this.area) return;

    this.area.addEventListener('keydown', (e) => {
      this.handleKeyPress(e);
    });
  }

  private handleKeyPress(e: KeyboardEvent): void {
    // if (this.moveInterval) {
    //   clearInterval(this.moveInterval);
    // }

    type Direction = { x: number; y: number };
    type ValidKey = 'd' | 'ArrowRight' | 'a' | 'ArrowLeft' | 'w' | 'ArrowUp' | 's' | 'ArrowDown';

    const keyMap: Record<ValidKey, Direction> = {
      d: { x: 1, y: 0 },
      ArrowRight: { x: 1, y: 0 },
      a: { x: -1, y: 0 },
      ArrowLeft: { x: -1, y: 0 },
      w: { x: 0, y: -1 },
      ArrowUp: { x: 0, y: -1 },
      s: { x: 0, y: 1 },
      ArrowDown: { x: 0, y: 1 },
    };

    const isValidKey = (key: string): key is ValidKey => {
      return key in keyMap;
    };

    if (!isValidKey(e.key)) return;

    const delta = keyMap[e.key];

    const currentHead: Point = this.snake.tail[0]!;

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
  private _snake: Tail;

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

  checkTail(x: number, y: number): [boolean, number] {
    for (let i = 0; i < this._snake.tail.length; i++) {
      if (this._snake.tail[i]?.x == x && this._snake.tail[i]?.y == y) {
        return [true, i];
      }
    }

    return [false, -1];
  }
}

class SnakeGame {
  private field: HTMLElement | null;
  private gridSize: number = 17;
  private moveInterval: number | null = null;
  private currentDirection: string = '';
  private fruits: Fruits[] = [{ position: { x: 3, y: 2 } }, { position: { x: 15, y: 8 } }];
  private snake;
  private snakeControl;

  private render = () => {
    if (this.field) {
      this.field.innerHTML = '';
      this.createGrid();
    } else {
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

  private startMoving(moveCallback: () => void): void {
    moveCallback();
    this.render();

    this.moveInterval = setInterval(() => {
      moveCallback();
      this.render();
    }, 500);
  }

  setGridSize(size: number) {
    this.gridSize = size;

    this.field?.style.setProperty('--grid-size', this.gridSize.toString());
    this.createGrid();
  }

  checkFruits(x: number, y: number): boolean {
    return this.fruits.some((fruit) => fruit.position.x == x && fruit.position.y == y);
  }

  private createGrid(): void {
    for (let y = 0; y < this.gridSize; y++) {
      for (let x = 0; x < this.gridSize; x++) {
        const cell: HTMLDivElement = document.createElement('div');
        const tail = this.snake.checkTail(x, y);

        if (tail[0]) {
          if (tail[1] == 0) {
            cell.classList.add('snake-head');
          } else {
            cell.classList.add('snake');
          }
        } else if (this.checkFruits(x, y)) {
          cell.classList.add('fruit');
        } else {
          cell.classList.add('cell');
        }
        cell.id = `cell-${y + x}`;
        this.field?.appendChild(cell);
      }
    }
  }
}

new SnakeGame();
