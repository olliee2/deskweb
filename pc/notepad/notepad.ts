const pad = document.getElementById('pad');
if (!(pad instanceof HTMLTextAreaElement))
  throw new Error('Missing or invalid pad');
const save = document.getElementById('save');
if (!(save instanceof HTMLButtonElement))
  throw new Error('Missing or invalid save');
const load = document.getElementById('load');
if (!(load instanceof HTMLButtonElement))
  throw new Error('Missing or invalid load');

save.addEventListener('click', () => {
  localStorage.setItem('notepad-text', pad.value);
});
load.addEventListener('click', () => {
  pad.value = localStorage.getItem('notepad-text') ?? '';
});

const spellcheck = document.getElementById('spellcheck');
if (!(spellcheck instanceof HTMLInputElement))
  throw new Error('Missing or invalid spellcheck');

spellcheck.addEventListener('change', () => {
  pad.spellcheck = spellcheck.checked;
});
pad.spellcheck = spellcheck.checked;
