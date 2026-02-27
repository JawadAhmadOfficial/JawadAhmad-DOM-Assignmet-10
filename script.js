// ===== Elements =====
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const clearAllBtn = document.getElementById("clearAllBtn");

// ===== Load Tasks from localStorage =====
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks();

// ===== Function to Render Tasks =====
function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    // Task Text
    const span = document.createElement("span");
    span.textContent = task.text;
    if (task.completed) span.classList.add("completed");
    li.appendChild(span);

    // Buttons Container
    const btnContainer = document.createElement("div");

    // Edit Button
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "taskBtn editBtn";
    editBtn.addEventListener("click", () => editTask(index));
    btnContainer.appendChild(editBtn);

    // Delete Button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "taskBtn deleteBtn";
    deleteBtn.addEventListener("click", () => deleteTask(index));
    btnContainer.appendChild(deleteBtn);

    li.appendChild(btnContainer);

    // Toggle Complete on click of text
    span.addEventListener("click", () => toggleComplete(index));

    taskList.appendChild(li);
  });
}

// ===== Add New Task =====
addTaskBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text === "") {
    alert("Task cannot be empty");
    return;
  }
  tasks.push({ text, completed: false });
  saveAndRender();
  taskInput.value = "";
});

// ===== Toggle Complete =====
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveAndRender();
}

// ===== Edit Task =====
function editTask(index) {
  const newText = prompt("Update task:", tasks[index].text);
  if (newText !== null && newText.trim() !== "") {
    tasks[index].text = newText.trim();
    saveAndRender();
  }
}

// ===== Delete Task =====
function deleteTask(index) {
  tasks.splice(index, 1);
  saveAndRender();
}

// ===== Clear All Tasks =====
clearAllBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to delete all tasks?")) {
    tasks = [];
    saveAndRender();
  }
});

// ===== Save to LocalStorage and Render =====
function saveAndRender() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}
