import type { Snake, Fruits, Tail } from './types';

class SnakeGame {
  private field: HTMLElement | null;
  private gridSize: number = 17;
  private area: HTMLElement | null;
  private moveInterval: number | null = null;
  private currentDirection: string = '';
  private fruits: Fruits[] = [{ position: { x: 3, y: 2 } }, { position: { x: 15, y: 8 } }];
  private snake: Snake = {
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

  private initControls(): void {
    if (!this.area) return;

    this.area.addEventListener('keydown', (e) => {
      this.handleKeyPress(e);
    });
  }

  private handleKeyPress(e: KeyboardEvent): void {
    if (this.moveInterval) {
      clearInterval(this.moveInterval);
    }
    const head: Tail = this.snake.tail[0]!;
    let newHead = { x: head.x + 1, y: head.y };

    if (e.key == 'd') {
      newHead = { x: head.x + 1, y: head.y };
    } else if (e.key == 'a') {
      newHead = { x: head.x - 1, y: head.y };
    } else if (e.key == 'w') {
      newHead = { x: head.x, y: head.y - 1 };
    } else if (e.key == 's') {
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

  render() {
    if (this.field) {
      this.field.innerHTML = '';
      this.createGrid();
    } else {
      console.error('Game field not found!');
    }
  }

  checkFruits(x: number, y: number): boolean {
    return this.fruits.some((fruit) => fruit.position.x == x && fruit.position.y == y);
  }

  checkTail(x: number, y: number): [boolean, number] {
    // return this.snake.tail.some((i) => i.x == x && i.y == y);

    for (let i = 0; i < this.snake.tail.length; i++) {
      if (this.snake.tail[i]?.x == x && this.snake.tail[i]?.y == y) {
        return [true, i];
      }
    }

    return [false, -1];
  }

  private createGrid(): void {
    for (let y = 0; y < this.gridSize; y++) {
      for (let x = 0; x < this.gridSize; x++) {
        const cell: HTMLDivElement = document.createElement('div');
        const snakeDraw = this.checkTail(x, y);
        if (snakeDraw[0]) {
          if (snakeDraw[1] == 0) {
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
