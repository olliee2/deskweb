const todoInput = document.getElementById('todo');
if (!(todoInput instanceof HTMLInputElement)) throw new Error('Missing todo');
const submitButton = document.getElementById('submit');
if (!submitButton) throw new Error('Missing submit');
const todos = document.getElementById('todos');
if (!todos) throw new Error('Missing todos');

todoInput.value = '';

submitButton.addEventListener('click', () => {
  const todoMessage = todoInput.value;
  if (!todoMessage) return;

  todoInput.value = '';

  const li = document.createElement('li');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';

  li.append(checkbox);
});
