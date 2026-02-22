import type { Fruits } from '../core/interfaces/types';
export default class Food {
    private fruits;
    private gridSize;
    private quantity;
    constructor(size: number, quantity?: number);
    get positions(): Fruits[];
    private generatePosition;
    private respawn;
    onEat(eatFruit: {
        x: number;
        y: number;
    }): void;
    checkFruits(x: number, y: number): boolean;
}
//# sourceMappingURL=Food.d.ts.map