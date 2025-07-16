const equationDiv = document.getElementById('equation');
if (!(equationDiv instanceof HTMLElement)) throw new Error('Missing equation');
const answerDiv = document.getElementById('answer');
if (!(answerDiv instanceof HTMLElement)) throw new Error('Missing answer');

const symbols: string[] = [];
let equation = '';

const characterButtons = document.getElementsByClassName('character');
for (const button of characterButtons) {
  if (!(button instanceof HTMLElement))
    throw new Error('Invalid element with class character');
  if (!button?.dataset?.symbol) {
    console.log(button);
    throw new Error('Element missing data-symbol');
  }

  const symbol = button.dataset.symbol;
  symbols.push(symbol);

  button.addEventListener('click', () => {
    equation += symbol;
    equationDiv.textContent = equation;
  });
}
