document.addEventListener('DOMContentLoaded', function () {
    loadTasks();
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    if (taskInput.value.trim() !== '') {
        const taskText = taskInput.value;
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${taskText}</span>
            <button onclick="removeTask(this)">Remove</button>
        `;
        taskList.appendChild(li);
        saveTask(taskText);
        taskInput.value = '';
    }
}

function removeTask(button) {
    const taskList = document.getElementById('taskList');
    const li = button.parentElement;
    taskList.removeChild(li);
    removeTaskFromStorage(li.firstChild.innerText);
}

function saveTask(task) {
    let tasks = getTasksFromStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskFromStorage(task) {
    let tasks = getTasksFromStorage();
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = getTasksFromStorage();
    const taskList = document.getElementById('taskList');

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task}</span>
            <button onclick="removeTask(this)">Remove</button>
        `;
        taskList.appendChild(li);
    });
}

function getTasksFromStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    return tasks;
}
