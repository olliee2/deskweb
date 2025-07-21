export default class Game {
    constructor(moleContainer, timeDisplay, scoreDisplay) {
        this.moleContainer = moleContainer;
        this.timeDisplay = timeDisplay;
        this.scoreDisplay = scoreDisplay;
        this.duration = 30000;
        this.startTime = 0;
        this.endTime = 0;
        this.nextSpawn = 0;
        this.spawnIntervalMin = 700;
        this.spawnIntervalMax = 1700;
        this.score = 0;
        this.active = false;
    }
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
    tickLoop() {
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
    tick(now) {
        if (now >= this.nextSpawn) {
            this.nextSpawn += this.randomInterval();
            this.spawnMole();
        }
    }
    render(now) {
        this.timeDisplay.textContent = (now - this.startTime).toString();
        this.scoreDisplay.textContent = this.score.toString();
    }
    spawnMole() {
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
    randomInterval() {
        return (this.spawnIntervalMin +
            Math.random() * (this.spawnIntervalMax - this.spawnIntervalMin));
    }
}
