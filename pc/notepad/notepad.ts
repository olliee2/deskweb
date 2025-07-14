const pad = document.getElementById('pad') as HTMLTextAreaElement;
if (!pad) throw new Error('Missing pad');
const save = document.getElementById('save');
if (!save) throw new Error('Missing save');
const load = document.getElementById('load');
if (!load) throw new Error('Missing load');

save.addEventListener('click', () => {
  localStorage.setItem('notepad-text', pad.value);
});

load.addEventListener('click', () => {
  pad.value = localStorage.getItem('notepad-text') ?? '';
});
