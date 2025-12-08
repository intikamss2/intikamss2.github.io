const tasks = [];
let nextId = 1;

const form = document.getElementById("taskForm");
const nameInput = document.getElementById("taskName");
const prioritySelect = document.getElementById("taskPriority");
const importantCheckbox = document.getElementById("taskImportant");
const taskManagerDiv = document.getElementById("taskmanager");
const errorDiv = document.getElementById("error");

function logTasks() {
  console.log(JSON.stringify(tasks));
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = nameInput.value.trim();
  const priority = prioritySelect.value;
  const isImportant = importantCheckbox.checked;

  if (name === "") {
    errorDiv.textContent = "Task name cannot be empty.";
    return;
  }
  errorDiv.textContent = "";

  const today = new Date().toLocaleDateString();

  const newTask = {
    id: nextId++,
    name: name,
    priority: priority,
    isImportant: isImportant,
    isCompleted: false,
    date: today
  };

  tasks.push(newTask);

  const rowHtml = `
    <div class="task-row" data-id="${newTask.id}">
      <div class="task-name">${newTask.name}</div>
      <div class="task-priority">Priority: ${newTask.priority.toLowerCase()}</div>
      <div class="task-date">${newTask.date}</div>
      <div class="task-actions">
        <label>
          <input type="checkbox" class="done-checkbox">
          Done
        </label>
        <button class="delete-btn">Delete</button>
      </div>
    </div>
  `;

  taskManagerDiv.innerHTML += rowHtml;

  const lastRow = taskManagerDiv.lastElementChild;
  const prioDiv = lastRow.querySelector(".task-priority");

  if (newTask.isImportant) {
    lastRow.style.backgroundColor = "red";
    lastRow.style.color = "#000000";
  }

  if (newTask.priority === "High") {
    prioDiv.style.fontWeight = "bold";
  } else if (newTask.priority === "Low") {
    prioDiv.style.opacity = "0.7";
  }

  nameInput.value = "";
  prioritySelect.value = "High";
  importantCheckbox.checked = false;

  logTasks();
});

taskManagerDiv.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-btn")) {
    const row = e.target.closest(".task-row");
    const id = parseInt(row.getAttribute("data-id"), 10);

    const index = tasks.findIndex(t => t.id === id);
    if (index !== -1) {
      tasks.splice(index, 1);
    }

    row.remove();
    logTasks();
  }
});

taskManagerDiv.addEventListener("change", function (e) {
  if (e.target.classList.contains("done-checkbox")) {
    const row = e.target.closest(".task-row");
    const id = parseInt(row.getAttribute("data-id"), 10);
    const task = tasks.find(t => t.id === id);
    const nameDiv = row.querySelector(".task-name");

    if (task) {
      task.isCompleted = e.target.checked;

      if (task.isCompleted) {
        nameDiv.style.textDecoration = "line-through";
      } else {
        nameDiv.style.textDecoration = "none";
      }

      logTasks();
    }
  }
});
