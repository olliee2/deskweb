import Game from './Game.js';

const moleContainer = document.getElementById('mole-container');
if (!moleContainer) throw new Error('Missing mole-container');
const timeDisplay = document.getElementById('time');
if (!(timeDisplay instanceof HTMLTimeElement)) throw new Error('Missing time');
const scoreDisplay = document.getElementById('score');
if (!scoreDisplay) throw new Error('Missing score');

const game = new Game(moleContainer, timeDisplay, scoreDisplay);
game.start();
