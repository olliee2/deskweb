import { redirect } from '../common/utils.js';

const shortcutButtons = document.getElementById('container')?.children;
if (!shortcutButtons) throw new Error('Missing shortcuts');

for (const button of Array.from(shortcutButtons)) {
  if (!(button instanceof HTMLButtonElement))
    throw new Error('Invalid element in container');

  button.addEventListener('click', () => {
    if (button.dataset.app) {
      redirect(button.dataset.app);
    } else {
      console.error('Missing app data attribute on button', button);
    }
  });
}
