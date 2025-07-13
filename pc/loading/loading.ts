import redirect from '../../src/redirect';

const params = new URLSearchParams(document.location.search);
console.log(params);
const destination = params.get('destination');
if (!destination) throw new Error('Missing destination in loading.ts');
const duration = Number(params.get('duration'));
if (!duration) throw new Error('Missing duration in loading.ts');
const dotsSpan = document.getElementById('dots');
if (!dotsSpan) throw new Error('Missing dotsSpan in loading.ts');

setTimeout(() => {
  redirect(destination);
}, duration);

let dots = 0;
setInterval(() => {
  dots++;
  if (dots > 3) dots = 0;
  dotsSpan.textContent = '.'.repeat(dots);
}, 400);
