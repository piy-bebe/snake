export default class Food {
    quantity;
    fruits = [{ position: { x: 3, y: 1 } }, { position: { x: 15, y: 8 } }];
    constructor(quantity = 1) {
        this.quantity = quantity;
    }
    get positions() {
        return this.fruits;
    }
    onEat(eatFruit) {
        const newFruits = this.fruits.filter((fruit) => fruit.position.x !== eatFruit.x && fruit.position.y !== eatFruit.y);
        this.fruits = [...newFruits];
    }
    checkFruits(x, y) {
        return this.fruits.some((fruit) => fruit.position.x == x && fruit.position.y == y);
    }
}
//# sourceMappingURL=Food.js.map