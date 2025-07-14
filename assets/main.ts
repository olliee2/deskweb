const pc = document.getElementById('pc')!;
if (!pc) throw new Error('Missing pc');

function resizePC() {
  const w = Math.ceil(window.innerWidth * 0.441);
  const h = Math.ceil(window.innerHeight * 0.739);
  pc.style.width = w + 'px';
  pc.style.height = h + 'px';
}

resizePC();
