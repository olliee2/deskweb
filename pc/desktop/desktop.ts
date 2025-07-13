import { redirect } from '../common/utils.js';

const shortcutButtons = document.getElementById('shortcuts')?.children;
if (!shortcutButtons) throw new Error('Missing shortcuts');

for (const button of Array.from(shortcutButtons) as HTMLElement[]) {
  button.addEventListener('click', () => {
    if (button.dataset.app) {
      redirect(button.dataset.app);
    } else {
      console.error('Missing app data attribute on button');
    }
  });
}

const timeElement = document.getElementById('time')! as HTMLTimeElement;
if (!timeElement) throw new Error('Missing time');

function render() {
  const currentDate = new Date();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  timeElement.textContent = time;
  timeElement.dateTime = time;
  requestAnimationFrame(render);
}

render();
