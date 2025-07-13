var _a;
import { redirect } from '../common/utils.js';
const shortcutButtons = (_a = document.getElementById('shortcuts')) === null || _a === void 0 ? void 0 : _a.children;
if (!shortcutButtons)
    throw new Error('Missing shortcuts in desktop.ts');
for (const button of Array.from(shortcutButtons)) {
    button.addEventListener('click', () => {
        if (button.dataset.app) {
            redirect(button.dataset.app);
        }
        else {
            console.error('Missing app data attribute on button in desktop.ts');
        }
    });
}
const time = document.getElementById('time');
if (!time)
    throw new Error('Missing time element in desktop.ts');
function render() {
    time === null || time === void 0 ? void 0 : time.textContent;
}
