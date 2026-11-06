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
let editingId = null; // null = adding a new task, otherwise the id being edited
const submitBtn = document.getElementById("submit-btn");

// 3. Add a task when the form is submitted
function addTask(e) {
  e.preventDefault();

  const title = titleInput.value.trim();
  const description = descInput.value.trim();
  const priority = priorityInput.value;
  const dueDate = dueDateInput.value;

  if (editingId !== null) {
    // EDIT MODE: update the existing task
    const task = tasks.find(function (t) {
      return t.id === editingId;
    });
    task.title = title;
    task.description = description;
    task.priority = priority;
    task.dueDate = dueDate;

    editingId = null;
    submitBtn.textContent = "Add Task";
  } else {
    // ADD MODE: create a new task
    tasks.push({
      id: Date.now(),
      title: title,
      description: description,
      priority: priority,
      dueDate: dueDate,
      completed: false,
    });
  }

  function toggleComplete(id) {
  const task = tasks.find(function (t) {
    return t.id === id;
  });
  task.completed = !task.completed;
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(function (t) {
    return t.id !== id;
  });
  if (editingId === id) {
    editingId = null;
    submitBtn.textContent = "Add Task";
    taskForm.reset();
  }
  renderTasks();
}

function startEdit(id) {
  const task = tasks.find(function (t) {
    return t.id === id;
  });
  titleInput.value = task.title;
  descInput.value = task.description;
  priorityInput.value = task.priority;
  dueDateInput.value = task.dueDate;

  editingId = id;
  submitBtn.textContent = "Save Changes";
  titleInput.focus();
}

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

        if (task.completed) li.classList.add("completed");

    const actions = document.createElement("div");
    actions.classList.add("task-actions");

    const doneBtn = document.createElement("button");
    doneBtn.textContent = task.completed ? "Undo" : "Done";
    doneBtn.addEventListener("click", function () {
      toggleComplete(task.id);
    });

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", function () {
      startEdit(task.id);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function () {
      deleteTask(task.id);
    });

    actions.appendChild(doneBtn);
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);
    li.appendChild(actions);
    
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

