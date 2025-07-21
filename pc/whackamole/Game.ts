export default class Game {
  private duration = 30000;
  private startTime = 0;
  private endTime = 0;
  private nextSpawn = 0;
  private spawnIntervalMin = 700;
  private spawnIntervalMax = 1700;
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
    this.endTime = this.startTime + this.duration;
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
    if (now >= this.endTime) {
      this.active = false;
    }
    if (this.active) {
      requestAnimationFrame(() => this.tickLoop());
    }
  }

  private tick(now: number) {
    if (now >= this.nextSpawn) {
      this.nextSpawn += this.randomInterval();
      this.spawnMole();
    }
  }

  private render(now: number) {
    this.timeDisplay.textContent = (now - this.startTime).toString();
    this.scoreDisplay.textContent = this.score.toString();
  }

  private spawnMole() {
    const wrapper = document.createElement('div');
    wrapper.className = 'mole-wrapper';

    const mole = document.createElement('img');
    mole.src = '../assets/mole.svg';
    mole.className = 'mole';

    wrapper.append(mole);

    wrapper.addEventListener('click', () => {
      console.log('clicked');
      this.score++;
    });

    this.moleContainer.append(wrapper);
  }

  private randomInterval() {
    return (
      this.spawnIntervalMin +
      Math.random() * (this.spawnIntervalMax - this.spawnIntervalMin)
    );
  }
}
