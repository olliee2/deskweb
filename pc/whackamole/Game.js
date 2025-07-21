export default class Game {
    constructor(moleContainer, timeDisplay, scoreDisplay) {
        this.moleContainer = moleContainer;
        this.timeDisplay = timeDisplay;
        this.scoreDisplay = scoreDisplay;
        this.duration = 30;
        this.firstSpawn = 0;
        this.nextSpawn = 0;
        this.spawnIntervalMin = 0.7;
        this.spawnIntervalMax = 1.7;
        this.score = 0;
        this.timePassed = 0;
        this.active = false;
    }
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
        return (this.spawnIntervalMin +
            Math.random() * (this.spawnIntervalMax - this.spawnIntervalMin));
    }
}
