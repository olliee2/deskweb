export default class Game {
  private duration = 2000;
  private startTime = 0;
  private endTime = 0;
  private nextSpawn = 0;
  private spawnIntervalMin = 400;
  private spawnIntervalMax = 1200;
  private score = 0;
  private hiscore = 0;
  private active = false;

  constructor(
    private moleContainer: HTMLElement,
    private timeDisplay: HTMLTimeElement,
    private scoreDisplay: HTMLElement,
    private hiscoreDisplay: HTMLElement,
  ) {
    this.hiscore = Number(localStorage.getItem('whackamole-hiscore'));
  }

  start() {
    this.score = 0;
    this.startTime = performance.now();
    this.endTime = this.startTime + this.duration;
    this.nextSpawn =
      this.startTime +
      this.randomRange(this.spawnIntervalMin, this.spawnIntervalMax);
    this.moleContainer.replaceChildren();
    [...document.getElementsByClassName('message')].forEach((elem) =>
      elem.remove(),
    );
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
    } else {
      this.moleContainer.replaceChildren();
      localStorage.setItem('whackamole-hiscore', this.hiscore.toString());
      const message = document.createElement('span');
      message.className = 'message';
      message.textContent = `Game complete! ${this.score} moles squashed!`;
      document.body.append(message);
    }
  }

  private tick(now: number) {
    if (now >= this.nextSpawn) {
      this.nextSpawn +=
        this.randomRange(this.spawnIntervalMin, this.spawnIntervalMax) *
        Math.pow(0.95, this.score);
      this.spawnMole();
    }
  }

  private render(now: number) {
    const seconds = Math.floor((now - this.startTime) / 1000).toString();
    this.timeDisplay.textContent = seconds;
    this.timeDisplay.dateTime = `${seconds}s`;
    this.scoreDisplay.textContent = this.score.toString();
    this.hiscoreDisplay.textContent = this.hiscore.toString();
  }

  private spawnMole() {
    const wrapper = document.createElement('div');
    wrapper.className = 'mole-wrapper';

    const mole = document.createElement('img');
    mole.src = '../assets/mole.svg';
    mole.className = 'mole';
    mole.draggable = false;

    wrapper.append(mole);

    const moleSize = 100;
    const maxLeft = this.moleContainer.clientWidth - moleSize;
    const maxTop = this.moleContainer.clientHeight - moleSize;
    const left = this.randomRange(0, maxLeft);
    const top = this.randomRange(0, maxTop);

    wrapper.style.left = `${left}px`;
    wrapper.style.top = `${top}px`;

    wrapper.addEventListener('click', () => {
      this.score++;
      if (this.score > this.hiscore) {
        this.hiscore = this.score;
      }

      const sfx = new Audio('../assets/explosion.mp3');
      sfx.play().catch((e) => {
        console.error(e);
      });

      const explosionWrapper = document.createElement('div');
      explosionWrapper.className = 'mole-wrapper';
      const explosion = document.createElement('img');
      explosion.src = '../assets/explosion.svg';
      explosion.className = 'mole';
      explosion.draggable = false;
      explosionWrapper.append(explosion);
      explosionWrapper.style.left = wrapper.style.left;
      explosionWrapper.style.top = wrapper.style.top;
      setTimeout(() => explosionWrapper.remove(), 500);
      this.moleContainer.append(explosionWrapper);

      wrapper.remove();
    });

    setTimeout(() => wrapper.remove(), 1000);

    this.moleContainer.append(wrapper);
  }

  private randomRange(min: number, max: number) {
    return min + Math.random() * (max - min);
  }
}
