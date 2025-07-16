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
    answerDiv.textContent = '';
  });
}

const equalsButton = document.getElementById('equals');
if (!(equalsButton instanceof HTMLElement)) throw new Error('Missing equals');
const backspaceButton = document.getElementById('backspace');
if (!(backspaceButton instanceof HTMLElement))
  throw new Error('Missing backspace');
const clearButton = document.getElementById('clear');
if (!(clearButton instanceof HTMLElement)) throw new Error('Missing clear');

equalsButton.addEventListener('click', () => {
  answerDiv.textContent = calculateEquation(equation).toString();
});

backspaceButton.addEventListener('click', () => {
  equation = equation.slice(0, -1);
  equationDiv.textContent = equation;
  answerDiv.textContent = '';
});

clearButton.addEventListener('click', () => {
  equation = '';
  equationDiv.textContent = '';
  answerDiv.textContent = '';
});

document.addEventListener('keydown', (ev) => {
  const key = ev.key;
  console.log(key);
  if (symbols.includes(key)) {
    ev.preventDefault();
    equation += key;
    equationDiv.textContent = equation;
  } else if (key === '*') {
    equation += '×';
    equationDiv.textContent = equation;
  } else if (key === '/') {
    equation += '÷';
    equationDiv.textContent = equation;
  } else if (key === 'Enter' || key === '=') {
    answerDiv.textContent = calculateEquation(equation).toString();
  }
});

function calculateEquation(equation: string) {
  console.log(equation);
  const exampleEquation = '(111.3+71)÷3';
  tokenize(exampleEquation);
  return 4;
}

function tokenize(expression: string) {
  const tokens = expression.match(/(\d+\.?\d*)|\+|-|×|÷|\(|\)/g) ?? [];
  console.log(tokens);
  return tokens;
}
