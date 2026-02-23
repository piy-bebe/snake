export default class Score {
    score;
    scoreElement;
    constructor(initialScore = 0) {
        this.score = initialScore;
        const element = document.querySelector('#score');
        if (!element) {
            this.scoreElement = this.createScoreElement();
        }
        else {
            this.scoreElement = element;
        }
        this.updateDisplay();
    }
    createScoreElement() {
        const element = document.createElement('span');
        element.id = 'score';
        document.body.appendChild(element);
        return element;
    }
    increment(points = 1) {
        this.score += points;
        this.updateDisplay();
    }
    updateDisplay() {
        this.scoreElement.textContent = this.score.toString();
    }
}
//# sourceMappingURL=Score.js.map