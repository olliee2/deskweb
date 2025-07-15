import { redirect } from '../common/utils.js';

const shortcutButtons = document.getElementById('container')?.children;
if (!shortcutButtons) {
  console.error('Missing shortcuts', shortcutButtons);
} else {
  for (const button of Array.from(shortcutButtons)) {
    if (!(button instanceof HTMLButtonElement)) {
      console.error('Invalid shortcut button', button);
      continue;
    }
    button.addEventListener('click', () => {
      if (button.dataset.app) {
        redirect(button.dataset.app);
      } else {
        console.error('Missing app data attribute on button', button);
      }
    });
  }
}
