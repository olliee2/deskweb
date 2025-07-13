var _a;
import { redirect } from '../common/utils.js';
const shortcutButtons = (_a = document.getElementById('shortcuts')) === null || _a === void 0 ? void 0 : _a.children;
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
const timeElement = document.getElementById('time');
if (!timeElement)
    throw new Error('Missing time');
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
