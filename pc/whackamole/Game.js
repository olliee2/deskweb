export default class Game {
    constructor(moleContainer, timeDisplay, scoreDisplay) {
        this.moleContainer = moleContainer;
        this.timeDisplay = timeDisplay;
        this.scoreDisplay = scoreDisplay;
        this.duration = 30;
        this.startTime = 0;
        this.nextSpawn = 0;
        this.spawnIntervalMin = 0.7;
        this.spawnIntervalMax = 1.7;
        this.score = 0;
        this.active = false;
    }
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
    tickLoop() {
        const now = performance.now();
        this.tick(now);
        this.render(now);
        if (this.active) {
            requestAnimationFrame(this.tickLoop);
        }
    }
    tick(now) {
        if (now >= this.nextSpawn) {
            this.spawnMole();
        }
    }
    render(now) {
        this.timeDisplay.textContent = (now - this.startTime).toString();
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
        return (this.spawnIntervalMin +
            Math.random() * (this.spawnIntervalMax - this.spawnIntervalMin));
    }
}
