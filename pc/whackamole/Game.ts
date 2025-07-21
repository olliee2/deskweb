export default class Game {
  private duration = 30;
  private startTime = 0;
  private nextSpawn = 0;
  private spawnIntervalMin = 0.7;
  private spawnIntervalMax = 1.7;
  private score = 0;
  private active = false;

  constructor(
    private moleContainer: HTMLElement,
    private timeDisplay: HTMLElement,
    private scoreDisplay: HTMLElement,
  ) {}

  start() {
    this.score = 0;
    this.startTime = performance.now();
    this.nextSpawn = this.startTime + this.randomInterval();
    this.active = true;

    this.tickLoop();
  }

  stop() {
    this.active = false;
  }

  private tickLoop() {
    const now = performance.now();
    this.tick(now);
    this.render(now);
    if (this.active) {
      requestAnimationFrame(this.tickLoop);
    }
  }

  private tick(now: number) {
    if (now >= this.nextSpawn) {
      this.spawnMole();
    }
  }

  private render(now: number) {
    this.timeDisplay.textContent = (now - this.startTime).toString();
  }

  private spawnMole() {
    const mole = document.createElement('img');
    mole.src = '../assets/mole.svg';
    mole.className = 'mole';
    mole.addEventListener('click', () => {
      this.score++;
    });
  }

  private randomInterval() {
    return (
      this.spawnIntervalMin +
      Math.random() * (this.spawnIntervalMax - this.spawnIntervalMin)
    );
  }
}
