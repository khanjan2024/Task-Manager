// DOM Elements
const addTaskBtn = document.querySelector('.add-task-btn');
const taskModal = document.getElementById('taskModal');
const closeModal = document.getElementById('closeModal');
const taskForm = document.getElementById('taskForm');
const taskList = document.querySelector('.task-list');
const taskTitle = document.getElementById('taskTitle');
const taskDesc = document.getElementById('taskDesc');
const taskDate = document.getElementById('taskDate');
const submitTaskBtn = document.getElementById('submitTaskBtn');

let editTaskElement = null; // Track if we are editing a task

// Open modal when Add Task button is clicked
addTaskBtn.addEventListener('click', () => {
    taskModal.style.display = 'flex';
    resetForm();
    editTaskElement = null;
});

// Close modal when close button is clicked
closeModal.addEventListener('click', () => {
    taskModal.style.display = 'none';
});

// Function to reset the form
function resetForm() {
    taskTitle.value = '';
    taskDesc.value = '';
    taskDate.value = '';
}

// Function to add a task
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = taskTitle.value;
    const description = taskDesc.value;
    const dueDate = taskDate.value;

    if (editTaskElement) {
        updateTask(editTaskElement, title, description, dueDate);
    } else {
        createTask(title, description, dueDate);
    }

    taskModal.style.display = 'none';
    resetForm();
});

// Create a new task with animation
function createTask(title, description, dueDate) {
    const taskItem = document.createElement('div');
    taskItem.classList.add('task');
    taskItem.style.animation = "taskAppear 0.5s forwards";

    const taskContent = document.createElement('div');
    taskContent.classList.add('task-content');
    taskContent.innerHTML = `<strong>${title}</strong><p>${description}</p><small>Due: ${dueDate}</small>`;

    const taskActions = document.createElement('div');
    taskActions.classList.add('task-actions');

    const editBtn = document.createElement('button');
    editBtn.classList.add('edit-btn');
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => editTask(taskItem, title, description, dueDate));

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => taskItem.remove());

    taskActions.appendChild(editBtn);
    taskActions.appendChild(deleteBtn);

    taskItem.appendChild(taskContent);
    taskItem.appendChild(taskActions);
    taskList.appendChild(taskItem);
}

// Edit an existing task
function editTask(taskItem, oldTitle, oldDesc, oldDate) {
    taskModal.style.display = 'flex';
    taskTitle.value = oldTitle;
    taskDesc.value = oldDesc;
    taskDate.value = oldDate;
    editTaskElement = taskItem;
}

// Update a task
function updateTask(taskItem, title, description, dueDate) {
    taskItem.querySelector('.task-content').innerHTML = `<strong>${title}</strong><p>${description}</p><small>Due: ${dueDate}</small>`;
    editTaskElement = null;
}
