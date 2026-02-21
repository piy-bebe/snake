import type { Point, Tail } from '../core/interfaces/types';

export default class SnakeControl {
  private area: HTMLElement | null;
  private snake;
  private render;
  private food;

  constructor(snake: any, render: any, food: any) {
    this.snake = snake;
    this.render = render;
    this.food = food;
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

    if (this.snake.tryEat(this.food.positions)) {
      this.snake.grow();
      this.food.onEat(newHead);
    }

    this.render();
  }
}
