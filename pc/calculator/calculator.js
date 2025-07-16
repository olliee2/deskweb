"use strict";
var _a;
const equationDiv = document.getElementById('equation');
if (!(equationDiv instanceof HTMLElement))
    throw new Error('Missing equation');
const answerDiv = document.getElementById('answer');
if (!(answerDiv instanceof HTMLElement))
    throw new Error('Missing answer');
const symbols = [];
let equation = '';
const characterButtons = document.getElementsByClassName('character');
for (const button of characterButtons) {
    if (!(button instanceof HTMLElement))
        throw new Error('Invalid element with class character');
    if (!((_a = button === null || button === void 0 ? void 0 : button.dataset) === null || _a === void 0 ? void 0 : _a.symbol)) {
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
if (!(equalsButton instanceof HTMLElement))
    throw new Error('Missing equals');
const backspaceButton = document.getElementById('backspace');
if (!(backspaceButton instanceof HTMLElement))
    throw new Error('Missing backspace');
const clearButton = document.getElementById('clear');
if (!(clearButton instanceof HTMLElement))
    throw new Error('Missing clear');
equalsButton.addEventListener('click', () => {
    answerDiv.textContent = calculateEquation(equation);
});
backspaceButton.addEventListener('click', () => {
    equation = equation.slice(0, -1);
    equationDiv.textContent = equation;
    answerDiv.textContent = '';
});
document.addEventListener('keydown', (ev) => {
    const key = ev.key;
    console.log(key);
    if (symbols.includes(key)) {
        ev.preventDefault();
        equation += key;
        equationDiv.textContent = equation;
    }
    else if (key === '/') {
        equation += '÷';
        equationDiv.textContent = equation;
    }
    else if (key === 'Enter' || key === '=') {
        answerDiv.textContent = calculateEquation(equation);
    }
});
function calculateEquation(equation) {
    console.log(equation);
    const exampleEquation = '(1+1)/3';
    if (!equationValid(exampleEquation)) {
    }
    return 4;
}
