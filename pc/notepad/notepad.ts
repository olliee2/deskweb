const pad = document.getElementById('pad') as HTMLTextAreaElement;
if (!pad) throw new Error('Missing pad');
const save = document.getElementById('save');
if (!save) throw new Error('Missing save');
const load = document.getElementById('load');
if (!load) throw new Error('Missing load');
const spellcheck = document.getElementById('spellcheck') as HTMLInputElement;
if (!spellcheck) throw new Error('Missing spellcheck');

save.addEventListener('click', () => {
  localStorage.setItem('notepad-text', pad.value);
});

load.addEventListener('click', () => {
  pad.value = localStorage.getItem('notepad-text') ?? '';
});

spellcheck.addEventListener('change', () => {
  pad.spellcheck = spellcheck.checked;
});
pad.spellcheck = spellcheck.checked;
