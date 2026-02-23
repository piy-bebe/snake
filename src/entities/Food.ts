import type { Fruits } from '../core/interfaces/types';

export default class Food {
  private fruits: Fruits[] = [];
  private gridSize: number;
  private quantity: number;

  constructor(size: number, quantity: number = 1) {
    this.gridSize = size;
    this.quantity = quantity;
    this.respawn(this.quantity);
  }

  get positions() {
    return this.fruits;
  }

  private generatePosition(): number {
    return Math.floor(Math.random() * this.gridSize);
  }

  private respawn(count: number = 1): void {
    for (let i = 0; i < count; i++) {
      const newFruit = { position: { x: this.generatePosition(), y: this.generatePosition() } };
      this.fruits = [...this.fruits, newFruit];
    }
  }

  onEat(eatFruit: { x: number; y: number }): void {
    const filteredFruits = this.fruits.filter(
      (fruit) => fruit.position.x !== eatFruit.x || fruit.position.y !== eatFruit.y,
    );

    this.fruits = [...filteredFruits];

    // this.respawn();
  }

  checkFruits(x: number, y: number): boolean {
    return this.fruits.some((fruit) => fruit.position.x == x && fruit.position.y == y);
  }
}
