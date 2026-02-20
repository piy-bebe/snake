import type { Fruits, Point } from '../core/interfaces/types';
export default class Snake {
    private _snake;
    constructor();
    get tail(): Point[];
    get head(): Point | undefined;
    grow(): void;
    tryEat(foodPosition: Fruits[]): boolean;
    checkTail(x: number, y: number): [boolean, number];
}
//# sourceMappingURL=Snake.d.ts.map