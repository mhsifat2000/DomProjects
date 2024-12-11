window.onload = () => {
  main();
  disableSelection();
};

function main() {
  const list = document.getElementById('To-Do-List');
  const input = document.getElementById('Input');
  const addBtn = document.getElementById('btn-1');

  showToDo(list);

  addBtn.addEventListener('click', () => {
    const newToDo = input.value.trim();
    if (newToDo !== '') {
      const item = createToDoItem(newToDo, false);
      list.appendChild(item);
      input.value = '';
      saveData(list);
    } else {
      window.alert('Enter a valid To-Do');
    }
  });
}

function disableSelection() {
  document.body.onselectstart = () => false;
  document.body.oncopy = () => false;
  document.body.oncut = () => false;
}

function saveData(list) {
  const items = [];
  list.querySelectorAll('.checkbox-wrapper-11').forEach((item) => {
    const checkbox = item.querySelector('input[type="checkbox"]');
    const label = item.querySelector('label');
    items.push({
      text: label.textContent,
      checked: checkbox.checked,
    });
  });
  localStorage.setItem('ToDoData', JSON.stringify(items));
}

function showToDo(list) {
  const data = JSON.parse(localStorage.getItem('ToDoData')) || [];
  list.innerHTML = ''; // Clear the list before adding items
  data.forEach(({ text, checked }) => {
    const item = createToDoItem(text, checked);
    list.appendChild(item);
  });
}

function createToDoItem(text, checked) {
  const item = document.createElement('div');
  item.classList.add('checkbox-wrapper-11');

  const itemLabel = document.createElement('label');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = checked; // Set the checkbox state
  const textNode = document.createTextNode(text);

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('deleteBtn');
  deleteBtn.textContent = '  ';

  itemLabel.appendChild(textNode);
  item.appendChild(checkbox);
  item.appendChild(itemLabel);
  item.appendChild(deleteBtn);

  // Add event listener to the Delete Button
  deleteBtn.addEventListener('click', () => {
    item.remove(); // Remove the item directly
    saveData(document.getElementById('To-Do-List')); // Update localStorage with the updated list
  });

  // Add event listener to the checkbox
  checkbox.addEventListener('change', () => {
    saveData(document.getElementById('To-Do-List')); // Save the updated state when the checkbox is toggled
  });

  return item;
}