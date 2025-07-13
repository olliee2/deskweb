import redirect from '../utils.js';

document.getElementById('login-button')?.addEventListener('click', () => {
  redirect('loading', 'destination=desktop&duration=1200');
});
