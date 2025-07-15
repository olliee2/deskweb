const pc = document.getElementById('pc')!;
if (!(pc instanceof HTMLElement)) throw new Error('Missing or invalid pc');

function resizePC() {
  const w = Math.ceil(window.innerWidth * 0.441);
  const h = Math.ceil(window.innerHeight * 0.739);
  pc.style.width = w + 'px';
  pc.style.height = h + 'px';
}

window.addEventListener('resize', resizePC);
resizePC();
