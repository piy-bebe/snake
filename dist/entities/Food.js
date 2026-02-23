export default class Food {
    fruits;
    gridSize;
    quantity;
    snake;
    constructor(size, quantity = 1, snake) {
        this.gridSize = size;
        this.quantity = quantity;
        this.snake = snake;
        this.fruits = [];
        this.respawn(this.quantity);
    }
    get positions() {
        return this.fruits;
    }
    checkCollision(x, y) {
        return (this.snake.tail.some((i) => i.x == x && i.y == y) ||
            this.fruits.some((f) => f.position.x == x && f.position.y == y));
    }
    generatePosition() {
        let posX = Math.floor(Math.random() * this.gridSize);
        let posY = Math.floor(Math.random() * this.gridSize);
        let pos = this.checkCollision(posX, posY);
        while (pos) {
            console.log(`Коллизия была, геним новые поинты \x1b[92m[fruit: x: ${posX} | y: ${posY}]`);
            posX = Math.floor(Math.random() * this.gridSize);
            posY = Math.floor(Math.random() * this.gridSize);
            pos = this.checkCollision(posX, posY);
        }
        return [posX, posY];
    }
    respawn(count = 1) {
        for (let i = 0; i < count; i++) {
            const [genX, genY] = this.generatePosition();
            const newFruit = { position: { x: genX, y: genY } };
            this.fruits = [...this.fruits, newFruit];
        }
    }
    onEat(eatFruit) {
        const filteredFruits = this.fruits.filter((fruit) => fruit.position.x !== eatFruit.x || fruit.position.y !== eatFruit.y);
        this.fruits = [...filteredFruits];
        this.respawn();
    }
    checkFruits(x, y) {
        return this.fruits.some((fruit) => fruit.position.x == x && fruit.position.y == y);
    }
}
//# sourceMappingURL=Food.js.map