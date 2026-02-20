import Snake from '../entities/Snake.js';
import Food from '../entities/Food.js';
import SnakeControl from '../controllers/SnakeControl.js';

export default class SnakeGame {
  private field: HTMLElement | null;
  private gridSize: number = 17;
  private moveInterval: number | null = null;
  private snake;
  private food;
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
    this.food = new Food();

    this.snakeControl = new SnakeControl(this.snake, this.render, this.food);

    this.setGridSize(this.gridSize);
  }

  destroy() {
    if (this.moveInterval) {
      clearInterval(this.moveInterval);
      this.moveInterval = null;
    }
  }

  setGridSize(size: number) {
    this.gridSize = size;

    this.field?.style.setProperty('--grid-size', this.gridSize.toString());
    this.createGrid();
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
        } else if (this.food.checkFruits(x, y)) {
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
