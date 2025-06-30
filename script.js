document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
  const input = document.getElementById("task-input");
  const task = input.value.trim();
  if (task === "") return;

  const li = document.createElement("li");
  li.textContent = task;
  li.onclick = () => li.classList.toggle("completed");

  const deleteBtn = document.createElement("span");
  deleteBtn.textContent = "❌";
  deleteBtn.className = "delete-btn";
  deleteBtn.onclick = function () {
    this.parentElement.remove();
    saveTasks();
  };

  li.appendChild(deleteBtn);
  document.getElementById("task-list").appendChild(li);

  input.value = "";
  saveTasks();
}

function saveTasks() {
  const list = document.getElementById("task-list");
  localStorage.setItem("tasks", list.innerHTML);
}

function loadTasks() {
  const data = localStorage.getItem("tasks");
  if (data) {
    document.getElementById("task-list").innerHTML = data;
    const items = document.querySelectorAll("#task-list li");
    items.forEach((item) => {
      item.onclick = () => item.classList.toggle("completed");
      const btn = item.querySelector(".delete-btn");
      if (btn) {
        btn.onclick = function () {
          this.parentElement.remove();
          saveTasks();
        };
      }
    });
  }
}
