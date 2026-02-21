import type { Fruits } from '../core/interfaces/types';

export default class Food {
  private fruits: Fruits[] = [{ position: { x: 3, y: 1 } }, { position: { x: 15, y: 8 } }];
  private gridSize: number;

  constructor(size: number) {
    this.gridSize = size;
  }

  get positions() {
    return this.fruits;
  }

  private generatePosition(): number {
    return Math.floor(Math.random() * this.gridSize);
  }

  private respawn(): void {
    const newFruit = { position: { x: this.generatePosition(), y: this.generatePosition() } };
    this.fruits = [...this.fruits, newFruit];
  }

  onEat(eatFruit: { x: number; y: number }): void {
    const filteredFruits = this.fruits.filter(
      (fruit) => fruit.position.x !== eatFruit.x && fruit.position.y !== eatFruit.y,
    );

    this.fruits = [...filteredFruits];

    this.respawn();
  }

  checkFruits(x: number, y: number): boolean {
    return this.fruits.some((fruit) => fruit.position.x == x && fruit.position.y == y);
  }
}
