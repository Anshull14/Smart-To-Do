// 1. Grab the elements
const taskForm = document.getElementById("task-form");
const titleInput = document.getElementById("task-title");
const descInput = document.getElementById("task-description");
const priorityInput = document.getElementById("task-priority");
const dueDateInput = document.getElementById("task-due-date");
const taskList = document.getElementById("task-list");
const emptyMessage = document.getElementById("empty-message");

const totalCount = document.getElementById("total-count");
const completedCount = document.getElementById("completed-count");
const pendingCount = document.getElementById("pending-count");

// 2. The data
let tasks = [];

// 3. Add a task when the form is submitted
function addTask(e) {
  e.preventDefault();

  const task = {
    id: Date.now(),
    title: titleInput.value.trim(),
    description: descInput.value.trim(),
    priority: priorityInput.value,
    dueDate: dueDateInput.value,
    completed: false,
  };

  tasks.push(task);
  taskForm.reset();
  renderTasks();
}

// 4. Draw everything on the page
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach(function (task) {
    const li = document.createElement("li");
    li.classList.add("task-item", "priority-" + task.priority);

    const title = document.createElement("h3");
    title.textContent = task.title;
    li.appendChild(title);

    if (task.description) {
      const desc = document.createElement("p");
      desc.textContent = task.description;
      li.appendChild(desc);
    }

    const meta = document.createElement("small");
    meta.textContent =
      "Priority: " + task.priority +
      (task.dueDate ? " | Due: " + task.dueDate : "");
    li.appendChild(meta);

    taskList.appendChild(li);
  });

  updateSummary();
}

// 5. Update counts and the empty message
function updateSummary() {
  const completed = tasks.filter(function (t) {
    return t.completed;
  }).length;

  totalCount.textContent = tasks.length;
  completedCount.textContent = completed;
  pendingCount.textContent = tasks.length - completed;

  emptyMessage.style.display = tasks.length === 0 ? "block" : "none";
}

// 6. Events
taskForm.addEventListener("submit", addTask);

// Show the correct state on first load
renderTasks();

