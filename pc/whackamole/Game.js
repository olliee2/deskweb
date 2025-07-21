export default class Game {
    constructor(moleContainer, timeDisplay, scoreDisplay, hiscoreDisplay) {
        this.moleContainer = moleContainer;
        this.timeDisplay = timeDisplay;
        this.scoreDisplay = scoreDisplay;
        this.hiscoreDisplay = hiscoreDisplay;
        this.duration = 2000;
        this.startTime = 0;
        this.endTime = 0;
        this.nextSpawn = 0;
        this.spawnIntervalMin = 400;
        this.spawnIntervalMax = 1200;
        this.score = 0;
        this.hiscore = 0;
        this.active = false;
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
        [...document.getElementsByClassName('message')].forEach((elem) => elem.remove());
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
        else {
            this.moleContainer.replaceChildren();
            localStorage.setItem('whackamole-hiscore', this.hiscore.toString());
            const message = document.createElement('span');
            message.className = 'message';
            message.textContent = `Game complete! ${this.score} moles squashed!`;
            document.body.append(message);
        }
    }
    tick(now) {
        if (now >= this.nextSpawn) {
            this.nextSpawn +=
                this.randomRange(this.spawnIntervalMin, this.spawnIntervalMax) *
                    Math.pow(0.95, this.score);
            this.spawnMole();
        }
    }
    render(now) {
        const seconds = Math.floor((now - this.startTime) / 1000).toString();
        this.timeDisplay.textContent = seconds;
        this.timeDisplay.dateTime = `${seconds}s`;
        this.scoreDisplay.textContent = this.score.toString();
        this.hiscoreDisplay.textContent = this.hiscore.toString();
    }
    spawnMole() {
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
    randomRange(min, max) {
        return min + Math.random() * (max - min);
    }
}
