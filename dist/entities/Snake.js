export default class Snake {
    _snake;
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
    checkTail(x, y) {
        for (let i = 0; i < this._snake.tail.length; i++) {
            if (this._snake.tail[i]?.x == x && this._snake.tail[i]?.y == y) {
                return [true, i];
            }
        }
        return [false, -1];
    }
}
//# sourceMappingURL=Snake.js.map