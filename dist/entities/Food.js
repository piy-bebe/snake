export default class Food {
    quantity;
    fruits = [{ position: { x: 3, y: 1 } }, { position: { x: 15, y: 8 } }];
    constructor(quantity = 1) {
        this.quantity = quantity;
    }
    checkFruits(x, y) {
        return this.fruits.some((fruit) => fruit.position.x == x && fruit.position.y == y);
    }
}
//# sourceMappingURL=Food.js.map