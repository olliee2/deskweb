import Game from './Game.js';

const moleContainer = document.getElementById('mole-container');
if (!moleContainer) throw new Error('Missing mole-container');
const timeDisplay = document.getElementById('time');
if (!(timeDisplay instanceof HTMLTimeElement)) throw new Error('Missing time');
const scoreDisplay = document.getElementById('score');
if (!scoreDisplay) throw new Error('Missing score');
const hiscoreDisplay = document.getElementById('hiscore');
if (!hiscoreDisplay) throw new Error('Missing hiscore');
const retryButton = document.getElementById('retry');
if (!retryButton) throw new Error('Missing retry');

const game = new Game(moleContainer, timeDisplay, scoreDisplay, hiscoreDisplay);
game.start();

retryButton.addEventListener('click', () => {
  game.start();
});
