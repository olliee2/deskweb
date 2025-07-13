import { redirect } from '../common/utils.js';

const shortcutButtons = document.getElementById('shortcuts')?.children;
if (!shortcutButtons) throw new Error('Missing shortcuts in desktop.ts');

for (const button of Array.from(shortcutButtons) as HTMLElement[]) {
  button.addEventListener('click', () => {
    if (button.dataset.app) {
      redirect(button.dataset.app);
    } else {
      console.error('Missing app data attribute on button in desktop.ts');
    }
  });
}

const time = document.getElementById('time');
if (!time) throw new Error('Missing time element in desktop.ts');

function render() {
  time?.textContent;
}
