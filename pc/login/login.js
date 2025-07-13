var _a;
import { redirect } from '../common/utils.js';
(_a = document.getElementById('login-button')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
    redirect('loading', 'destination=desktop&duration=1200');
});
