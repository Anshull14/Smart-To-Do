// 1. Grab the elements
const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

// 2. The data: all tasks live in this array
let tasks = [];

// 3. Add a new task
function addTask() {
  const text = taskInput.value.trim();
  if (text === "") return;

  const task = {
    id: Date.now(),
    text: text,
    completed: false,
  };

  tasks.push(task);
  taskInput.value = "";
  renderTasks();
}

// 4. Draw the tasks on the page
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach(function (task) {
    const li = document.createElement("li");
    li.textContent = task.text;
    taskList.appendChild(li);
  });
}

// 5. Events
addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") addTask();
});

