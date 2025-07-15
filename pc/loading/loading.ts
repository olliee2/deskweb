import { redirect } from '../common/utils.js';

const params = new URLSearchParams(document.location.search);
const destination = params.get('destination');
if (!destination) throw new Error('Missing destination');
const duration = Number(params.get('duration'));
if (!duration) throw new Error('Missing duration');
const dotsSpan = document.getElementById('dots');
if (!(dotsSpan instanceof HTMLElement)) throw new Error('Missing dotsSpan');

setTimeout(() => {
  redirect(destination);
}, duration);

let dots = 0;
setInterval(() => {
  dots++;
  if (dots > 3) dots = 0;
  dotsSpan.textContent = '.'.repeat(dots);
}, 400);
