import type { Fruits } from '../core/interfaces/types';

export default class Food {
  private quantity: number;
  private fruits: Fruits[] = [{ position: { x: 3, y: 1 } }, { position: { x: 15, y: 8 } }];

  constructor(quantity: number = 1) {
    this.quantity = quantity;
  }

  get positions() {
    return this.fruits;
  }

  checkFruits(x: number, y: number): boolean {
    return this.fruits.some((fruit) => fruit.position.x == x && fruit.position.y == y);
  }
}
