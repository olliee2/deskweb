import redirect from './redirect.js';

const params = new URLSearchParams(document.location.search);
console.log(params);
const destination = params.get('destination');
if (!destination) throw new Error('Missing destination in loading.ts');
const duration = Number(params.get('duration'));
if (!duration) throw new Error('Missing duration in loading.ts');

setTimeout(() => {
  redirect(destination);
}, duration);
