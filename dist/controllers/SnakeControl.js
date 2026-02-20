export default class SnakeControl {
    area;
    snake;
    render;
    constructor(snake, render) {
        this.snake = snake;
        this.render = render;
        this.area = document.querySelector('html');
        this.initControls();
    }
    initControls() {
        if (!this.area)
            return;
        this.area.addEventListener('keydown', (e) => {
            this.handleKeyPress(e);
        });
    }
    handleKeyPress(e) {
        // if (this.moveInterval) {
        //   clearInterval(this.moveInterval);
        // }
        const keyMap = {
            d: { x: 1, y: 0 },
            ArrowRight: { x: 1, y: 0 },
            a: { x: -1, y: 0 },
            ArrowLeft: { x: -1, y: 0 },
            w: { x: 0, y: -1 },
            ArrowUp: { x: 0, y: -1 },
            s: { x: 0, y: 1 },
            ArrowDown: { x: 0, y: 1 },
        };
        const isValidKey = (key) => {
            return key in keyMap;
        };
        if (!isValidKey(e.key))
            return;
        const delta = keyMap[e.key];
        const currentHead = this.snake.tail[0];
        let newHead = {
            x: currentHead.x + delta.x,
            y: currentHead.y + delta.y,
        };
        if (newHead.x == this.snake.tail[1]?.x && newHead.y == this.snake.tail[1]?.y) {
            return;
        }
        this.snake.tail.unshift(newHead);
        this.snake.tail.pop();
        this.render();
    }
}
//# sourceMappingURL=SnakeControl.js.map