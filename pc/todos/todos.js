"use strict";
var _a;
const todoInput = document.getElementById('todo');
if (!(todoInput instanceof HTMLInputElement))
    throw new Error('Missing todo');
const submitButton = document.getElementById('submit');
if (!submitButton)
    throw new Error('Missing submit');
const todosList = document.getElementById('todos');
if (!todosList)
    throw new Error('Missing todos');
todoInput.value = '';
// eslint-disable-next-line prefer-const
let todos = new Set(JSON.parse((_a = localStorage.getItem('todos-todos')) !== null && _a !== void 0 ? _a : '[]'));
submitButton.addEventListener('click', () => {
    const todoMessage = todoInput.value;
    if (!todoMessage || todos.has(todoMessage))
        return;
    todoInput.value = '';
    todos.add(todoMessage);
    localStorage.setItem('todos-todos', JSON.stringify([...todos]));
    render();
});
function render() {
    todosList.replaceChildren();
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = 'todo';
        const checkbox = document.createElement('input');
        checkbox.id = `todo-checkbox-${index}`;
        checkbox.className = 'todo-checkbox';
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                li.classList.add('completed');
                todos.delete(todo);
            }
            else {
                li.classList.remove('completed');
                todos.add(todo);
            }
            localStorage.setItem('todos-todos', JSON.stringify([...todos]));
        });
        const label = document.createElement('label');
        label.htmlFor = `todo-checkbox-${index}`;
        label.className = 'todo-message';
        label.textContent = todo;
        li.append(checkbox, label);
        todosList.append(li);
    });
}
render();
