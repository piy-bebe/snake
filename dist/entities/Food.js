export default class Food {
    fruits = [];
    gridSize;
    quantity;
    constructor(size, quantity = 1) {
        this.gridSize = size;
        this.quantity = quantity;
        this.respawn(this.quantity);
    }
    get positions() {
        return this.fruits;
    }
    generatePosition() {
        return Math.floor(Math.random() * this.gridSize);
    }
    respawn(count = 1) {
        for (let i = 0; i < count; i++) {
            const newFruit = { position: { x: this.generatePosition(), y: this.generatePosition() } };
            this.fruits = [...this.fruits, newFruit];
        }
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