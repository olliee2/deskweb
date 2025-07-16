const equationDiv = document.getElementById('equation');
if (!(equationDiv instanceof HTMLElement)) throw new Error('Missing equation');
const answerDiv = document.getElementById('answer');
if (!(answerDiv instanceof HTMLElement)) throw new Error('Missing answer');

const symbols: string[] = [];
let equation = '';
let answer = '';

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
    if (answer && ['+', '-', '×', '÷'].includes(symbol)) {
      equation = answer;
      answer = '';
    }
    equation += symbol;
    equationDiv.textContent = equation;
    answer = '';
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
  answer = calculateEquation(equation).toString();
  answerDiv.textContent = answer;
});

backspaceButton.addEventListener('click', () => {
  equation = equation.slice(0, -1);
  equationDiv.textContent = equation;
  answer = '';
  answerDiv.textContent = '';
});

clearButton.addEventListener('click', () => {
  equation = '';
  equationDiv.textContent = '';
  answer = '';
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
    answer = calculateEquation(equation).toString();
    answerDiv.textContent = answer;
  }
});

function solveTokens(tokens: string[]) {
  let pos = 0;

  function peek() {
    return tokens[pos];
  }

  function consume() {
    return tokens[pos++];
  }

  function parsePrimary(): number {
    const token = peek();
    if (token === '-') {
      consume();
      return -parsePrimary();
    }
    if (token === '+') {
      consume();
      return parsePrimary();
    }
    if (token === '(') {
      consume();
      const value = parseExpression();
      if (peek() === ')') consume();
      return value;
    }
    if (/^\d+(\.\d+)?$/.test(token)) {
      consume();
      return parseFloat(token);
    }
    throw new Error('Unexpected token: ' + token);
  }

  function parseFactor(): number {
    let value = parsePrimary();
    while (peek() === '×' || peek() === '÷') {
      const op = consume();
      const rhs = parsePrimary();
      if (op === '×') value *= rhs;
      else if (op === '÷') value /= rhs;
    }
    return value;
  }

  function parseExpression(): number {
    let value = parseFactor();
    while (peek() === '+' || peek() === '-') {
      const op = consume();
      const rhs = parseFactor();
      if (op === '+') value += rhs;
      else if (op === '-') value -= rhs;
    }
    return value;
  }

  const result = parseExpression();
  if (pos < tokens.length)
    throw new Error('Unexpected token at end: ' + tokens[pos]);
  return result;
}

function calculateEquation(equation: string) {
  const tokens = tokenize(equation);
  try {
    return solveTokens(tokens);
  } catch (e) {
    console.error(e);
    return 'Error';
  }
}

function tokenize(expression: string) {
  return expression.match(/(\d+\.?\d*)|\+|-|×|÷|\(|\)/g) ?? [];
}
