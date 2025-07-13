import { redirect } from '../common/utils.js';

const loginButton = document.getElementById('login-button');
if (!loginButton) throw new Error('Missing login-button');
loginButton.addEventListener('click', () => {
  redirect('loading', 'destination=desktop&duration=1');
});
