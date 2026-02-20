import type { Fruits } from '../core/interfaces/types';
export default class Food {
    private quantity;
    private fruits;
    constructor(quantity?: number);
    get positions(): Fruits[];
    checkFruits(x: number, y: number): boolean;
}
//# sourceMappingURL=Food.d.ts.map