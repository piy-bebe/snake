import type { Fruits, Point, Tail } from '../core/interfaces/types';

export default class Snake {
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

  get head() {
    return this._snake.tail[0];
  }

  grow() {
    if (this.tail[0]) {
      this._snake.tail = [...this.tail, { x: this.tail[0].x, y: this.tail[0].y }];
    }
  }

  tryEat(foodPosition: Fruits[]): boolean {
    const head: Point | undefined = this.head;
    return foodPosition.some((fruit: Fruits) => fruit.position.x == head?.x && fruit.position.y == head?.y);
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
