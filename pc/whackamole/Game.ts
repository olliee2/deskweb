export default class Game {
  private duration = 30;
  private firstSpawn = 0;
  private nextSpawn = 0;
  private spawnIntervalMin = 0.7;
  private spawnIntervalMax = 1.7;
  private score = 0;
  private timePassed = 0;
  private active = false;

  constructor(
    private moleContainer: HTMLElement,
    private timeDisplay: HTMLElement,
    private scoreDisplay: HTMLElement,
  ) {}

  start() {
    this.timePassed = 0;
    this.score = 0;
    this.firstSpawn = performance.now();
    this.nextSpawn = this.firstSpawn + this.randomInterval();
    this.active = true;

    this.tick();
  }

  stop() {
    this.active = false;
  }

  tick() {
    const now = performance.now();
    if (now >= this.nextSpawn) {
      this.spawnMole();
    }

    if (this.active) {
      requestAnimationFrame(this.tick);
    }
  }

  spawnMole() {
    const mole = document.createElement('img');
    mole.src = '../assets/mole.svg';
    mole.className = 'mole';
    mole.addEventListener('click', () => {
      this.score++;
    });
  }

  randomInterval() {
    return (
      this.spawnIntervalMin +
      Math.random() * (this.spawnIntervalMax - this.spawnIntervalMin)
    );
  }
}
