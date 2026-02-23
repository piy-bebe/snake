import type { Fruits } from '../core/interfaces/types';
export default class Food {
    private fruits;
    private gridSize;
    private quantity;
    private snake;
    constructor(size: number, quantity: number | undefined, snake: any);
    get positions(): Fruits[];
    private checkCollision;
    private generatePosition;
    private respawn;
    onEat(eatFruit: {
        x: number;
        y: number;
    }): void;
    checkFruits(x: number, y: number): boolean;
}
//# sourceMappingURL=Food.d.ts.map