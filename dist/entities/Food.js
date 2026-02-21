export default class Food {
    quantity;
    fruits = [{ position: { x: 3, y: 1 } }, { position: { x: 15, y: 8 } }];
    gridSize;
    constructor(size, quantity = 1) {
        this.quantity = quantity;
        this.gridSize = size;
    }
    get positions() {
        return this.fruits;
    }
    generatePosition() {
        return Math.floor(Math.random() * this.gridSize);
    }
    respawn() {
        const newFruit = { position: { x: this.generatePosition(), y: this.generatePosition() } };
        this.fruits = [...this.fruits, newFruit];
    }
    onEat(eatFruit) {
        const filteredFruits = this.fruits.filter((fruit) => fruit.position.x !== eatFruit.x && fruit.position.y !== eatFruit.y);
        this.fruits = [...filteredFruits];
        this.respawn();
    }
    checkFruits(x, y) {
        return this.fruits.some((fruit) => fruit.position.x == x && fruit.position.y == y);
    }
}
//# sourceMappingURL=Food.js.map