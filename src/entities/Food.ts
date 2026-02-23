import type { Fruits, Point } from '../core/interfaces/types';

export default class Food {
  private fruits: Fruits[];
  private gridSize: number;
  private quantity: number;
  private snake;

  constructor(size: number, quantity: number = 1, snake: any) {
    this.gridSize = size;
    this.quantity = quantity;
    this.snake = snake;
    this.fruits = [];
    this.respawn(this.quantity);
  }

  get positions() {
    return this.fruits;
  }

  private checkCollision(x: number, y: number): boolean {
    return (
      this.snake.tail.some((i: Point) => i.x == x && i.y == y) ||
      this.fruits.some((f) => f.position.x == x && f.position.y == y)
    );
  }

  private generatePosition(): [number, number] {
    let posX: number = Math.floor(Math.random() * this.gridSize);
    let posY: number = Math.floor(Math.random() * this.gridSize);

    let pos = this.checkCollision(posX, posY);

    while (pos) {
      console.log(`Коллизия была, геним новые поинты \x1b[92m[fruit: x: ${posX} | y: ${posY}]`);
      posX = Math.floor(Math.random() * this.gridSize);
      posY = Math.floor(Math.random() * this.gridSize);
      pos = this.checkCollision(posX, posY);
    }

    return [posX, posY];
  }

  private respawn(count: number = 1): void {
    for (let i = 0; i < count; i++) {
      const [genX, genY]: number[] = this.generatePosition();

      const newFruit = { position: { x: genX, y: genY } };

      this.fruits = [...this.fruits, newFruit];
    }
  }

  onEat(eatFruit: { x: number; y: number }): void {
    const filteredFruits = this.fruits.filter(
      (fruit) => fruit.position.x !== eatFruit.x || fruit.position.y !== eatFruit.y,
    );

    this.fruits = [...filteredFruits];

    this.respawn();
  }

  checkFruits(x: number, y: number): boolean {
    return this.fruits.some((fruit) => fruit.position.x == x && fruit.position.y == y);
  }
}
