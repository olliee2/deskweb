const timeEl = document.getElementById('time');
if (!(timeEl instanceof HTMLTimeElement))
  throw new Error('Missing or invalid time');
const timeElement = timeEl;

function renderTime() {
  const currentDate = new Date();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  timeElement.textContent = time;
  timeElement.dateTime = time;
}

const appIframe = document.getElementById('app');
if (!(appIframe instanceof HTMLIFrameElement))
  throw new Error('Missing or invalid app');
const homeButton = document.getElementById('home');
if (!(homeButton instanceof HTMLButtonElement))
  throw new Error('Missing or invalid home');

homeButton.addEventListener('click', () => {
  appIframe.src = '../shortcuts/index.html';
});

const back = document.getElementById('back');
if (!(back instanceof HTMLButtonElement))
  throw new Error('Missing or invalid back');

back.addEventListener('click', () => {
  history.back();
});

const forward = document.getElementById('forward');
if (!(forward instanceof HTMLButtonElement))
  throw new Error('Missing or invalid forward');

forward.addEventListener('click', () => {
  history.forward();
});

function render() {
  renderTime();
  requestAnimationFrame(render);
}

render();
