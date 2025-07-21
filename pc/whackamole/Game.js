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
        const rect = moleContainer.getBoundingClientRect();
        this.left = rect.left;
        this.right = rect.right;
        this.top = rect.top;
        this.bottom = rect.bottom;
    }
    start() {
        this.score = 0;
        this.startTime = performance.now();
        this.endTime = this.startTime + this.duration;
        this.nextSpawn =
            this.startTime +
                this.randomRange(this.spawnIntervalMin, this.spawnIntervalMax);
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
            this.nextSpawn += this.randomRange(this.spawnIntervalMin, this.spawnIntervalMax);
            this.spawnMole();
        }
    }
    render(now) {
        const seconds = Math.floor((now - this.startTime) / 1000).toString();
        this.timeDisplay.textContent = seconds;
        this.timeDisplay.dateTime = seconds + 's';
        this.scoreDisplay.textContent = this.score.toString();
    }
    spawnMole() {
        const wrapper = document.createElement('div');
        wrapper.className = 'mole-wrapper';
        const mole = document.createElement('img');
        mole.src = '../assets/mole.svg';
        mole.className = 'mole';
        mole.draggable = false;
        wrapper.append(mole);
        const left = this.randomRange(this.left, this.right - 100);
        const top = this.randomRange(this.top, this.bottom - 100);
        wrapper.style.left = `${left}px`;
        wrapper.style.top = `${top}px`;
        wrapper.addEventListener('click', () => {
            this.score++;
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
    randomRange(min, max) {
        return min + Math.random() * (max - min);
    }
}
