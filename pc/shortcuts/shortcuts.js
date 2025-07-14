var _a;
import { redirect } from '../common/utils.js';
const shortcutButtons = (_a = document.getElementById('container')) === null || _a === void 0 ? void 0 : _a.children;
if (!shortcutButtons)
    throw new Error('Missing shortcuts');
for (const button of Array.from(shortcutButtons)) {
    button.addEventListener('click', () => {
        if (button.dataset.app) {
            redirect(button.dataset.app);
        }
        else {
            console.error('Missing app data attribute on button');
        }
    });
}
