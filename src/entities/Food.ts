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

  onEat(eatFruit: { x: number; y: number }): void {
    const newFruits = this.fruits.filter(
      (fruit) => fruit.position.x !== eatFruit.x && fruit.position.y !== eatFruit.y,
    );

    this.fruits = [...newFruits];
  }

  checkFruits(x: number, y: number): boolean {
    return this.fruits.some((fruit) => fruit.position.x == x && fruit.position.y == y);
  }
}
