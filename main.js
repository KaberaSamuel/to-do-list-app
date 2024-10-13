const body = document.querySelector("body");
const main = document.querySelector("main");
const tasks = document.querySelector(".tasks");
const clearAllButton = document.querySelector(".clear-all");

const tasksTracker = {
  all: [],
  completed: [],
  active: [],
  activeNumber: 0,
  completedNumber: 0,
  update: function () {
    this.all = Array.from(document.querySelectorAll(".tasks .task"));
    this.completed = Array.from(document.querySelectorAll(".done"));
    this.active = this.all.filter(
      (element) => !element.classList.contains("done")
    );
    this.activeNumber = this.active.length;
    this.completedNumber = this.completed.length;
  },
};

function hideElements(array) {
  array.forEach((element) => {
    element.style.display = "none";
  });
}

function unHideElements(array) {
  array.forEach((element) => {
    element.style.display = "flex";
  });
}

function showRemainingTasks() {
  const leftItemsButton = document.querySelector(".active-tasks");
  leftItemsButton.textContent = `${tasksTracker.activeNumber} items left`;
}

function checkTask(event) {
  const iconContent = `<i class="fa-solid fa-check"></i>`;
  const parent = event.currentTarget;
  const radioParent = parent.querySelector(".check-radio");
  parent.classList.toggle("done");
  radioParent.innerHTML = parent.classList.contains("done") ? iconContent : "";

  // update UI
  tasksTracker.update();
  showRemainingTasks();
}

function deleteElement(input, string = "event") {
  // this function can be called from clearALL or from close icon so we have to choose depending on input
  const task = string === "event" ? input.target.parentNode.parentNode : input;

  task.style.cssText = "animation: delete-animation 0.3s ease-in both";

  task.addEventListener("animationend", () => {
    if (tasks.contains(task)) {
      tasks.removeChild(task);
    }

    // updating UI after deletion
    if (tasks.childElementCount === 0) {
      main.classList.add("cleared");
    }

    tasksTracker.update();
    showRemainingTasks();
  });
}

const toggleDisplayMode = (function () {
  const toggleModebtn = document.querySelector("#toggle-mode");
  const sunIconHtml = `<i class="fa-solid fa-sun"></i>`;
  const moonIconHtml = `<i class="fa-solid fa-moon"></i>`;

  toggleModebtn.addEventListener("click", () => {
    if (body.classList.contains("dark")) {
      toggleModebtn.innerHTML = moonIconHtml;
    } else {
      toggleModebtn.innerHTML = sunIconHtml;
    }

    body.classList.toggle("dark");
  });
})();

const newTasks = (function () {
  // actual creation of an element
  function createTask(content) {
    if (main.classList.contains("cleared")) {
      main.classList.remove("cleared");
    }

    const taskPara = document.createElement("div");
    taskPara.classList.add("task");

    const radioPara = document.createElement("p");
    radioPara.classList.add("check-radio");

    const contentPara = document.createElement("p");
    contentPara.classList.add("task-content");
    contentPara.textContent = content;

    const closePara = document.createElement("p");
    closePara.classList.add("close");
    closePara.innerHTML = `<i class="fa-solid fa-xmark">`;

    taskPara.appendChild(radioPara);
    taskPara.appendChild(contentPara);
    taskPara.appendChild(closePara);
    tasks.appendChild(taskPara);

    // adding event listeners on new created element
    taskPara.addEventListener("click", checkTask);
    closePara.addEventListener("click", deleteElement);

    // updating UI variables after creation of an element
    tasksTracker.update();
    showRemainingTasks();
  }

  function callCreateFunction() {
    if (input.value === "") return;
    createTask(input.value);
    input.value = "";
  }

  // listening for clicks to create an element
  const input = document.querySelector("input");
  input.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      callCreateFunction();
    }
  });

  const addIcon = document.querySelector(".fa-plus");
  addIcon.addEventListener("click", callCreateFunction);
})();

const sortTasks = (function () {
  const remainingTasks = document.querySelector(".active-tasks");
  const allbtn = document.querySelector("#all");
  const activebtn = document.querySelector("#active");
  const completedbtn = document.querySelector("#completed");

  // listening for a click to show active tasks
  activebtn.addEventListener("click", () => {
    if (tasksTracker.activeNumber === 0) {
      alert("No active tasks available");
    } else {
      hideElements(tasksTracker.completed);
      unHideElements(tasksTracker.active);
    }
  });

  // listening for a click to show completed tasks
  completedbtn.addEventListener("click", () => {
    if (tasksTracker.completedNumber === 0) {
      alert("No Completed tasks available");
    } else {
      hideElements(tasksTracker.active);
      unHideElements(tasksTracker.completed);
    }
  });

  // showing all tasks
  allbtn.addEventListener("click", () => {
    if (tasksTracker.all.length === 0) {
      alert("No tasks available");
    } else {
      unHideElements(tasksTracker.all);
    }
  });
})();

// global event listeners
clearAllButton.addEventListener("click", () => {
  const completedTasks = Array.from(document.querySelectorAll(".task.done"));
  completedTasks.forEach((task) => {
    deleteElement(task, "task");
  });
});

// sort object for dragging to reorder the list
new Sortable(document.querySelector(".tasks"));

export { tasks };
