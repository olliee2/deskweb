const timeElement = document.getElementById('time') as HTMLTimeElement;
if (!timeElement) throw new Error('Missing time');

function renderTime() {
  const currentDate = new Date();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  timeElement.textContent = time;
  timeElement.dateTime = time;
}

const appIframe = document.getElementById('app') as HTMLIFrameElement;
if (!appIframe) throw new Error('Missing app');

const homeButton = document.getElementById('home');
if (!homeButton) throw new Error('Missing home');

homeButton.addEventListener('click', () => {
  appIframe.src = '../shortcuts/index.html';
});

function render() {
  renderTime();
  requestAnimationFrame(render);
}

render();
