const todoInput = document.getElementById('todo');
if (!(todoInput instanceof HTMLInputElement)) throw new Error('Missing todo');
const submitButton = document.getElementById('submit');
if (!submitButton) throw new Error('Missing submit');
const todosList = document.getElementById('todos')!;
if (!todosList) throw new Error('Missing todos');

todoInput.value = '';

let todos = JSON.parse(localStorage.getItem('todos-todos') ?? '[]') as string[];

submitButton.addEventListener('click', () => {
  const todoMessage = todoInput.value;
  if (!todoMessage || todos.includes(todoMessage)) return;

  todoInput.value = '';
  todos.push(todoMessage);
  render();
});

function render() {
  todosList.replaceChildren();
  for (const todo of todos) {
    const li = document.createElement('li');
    li.className = 'todo';
    const checkbox = document.createElement('input');
    checkbox.className = 'todo-checkbox';
    checkbox.type = 'checkbox';

    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        li.classList.add('completed');
      } else {
        li.classList.remove('completed');
      }
    });

    const label = document.createElement('label');
    label.className = 'todo-message';
    label.textContent = todo;

    li.append(checkbox, label);
    todosList.append(li);
  }
}

render();
