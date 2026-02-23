export default class Score {
  private score: number;
  private scoreElement: HTMLSpanElement;

  constructor(initialScore: number = 0) {
    this.score = initialScore;

    const element = document.querySelector<HTMLSpanElement>('#score');

    if (!element) {
      this.scoreElement = this.createScoreElement();
    } else {
      this.scoreElement = element;
    }

    this.updateDisplay();
  }

  public createScoreElement(): HTMLSpanElement {
    const element = document.createElement('span');

    element.id = 'score';
    document.body.appendChild(element);
    return element;
  }

  increment(points: number = 1): void {
    this.score += points;
    this.updateDisplay();
  }

  private updateDisplay(): void {
    this.scoreElement.textContent = this.score.toString();
  }
}
