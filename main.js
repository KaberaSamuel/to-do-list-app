const body = document.querySelector("body");
const main = document.querySelector("main");
const tasks = document.querySelector(".tasks");

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

function mainStartingState() {
  main.classList.add("cleared");
}

function deletetasks() {
  // Actual deletion of an element
  function deleteElement(element) {
    element.style.cssText = "animation: delete-animation 0.3s ease-in both";
    element.addEventListener("animationend", () => {
      if (tasks.contains(element)) {
        tasks.removeChild(element);
      }

      // updating UI after deletion
      if (tasks.childElementCount === 0) {
        mainStartingState();
      }

      tasksTracker.update();
      showRemainingTasks();
    });
  }

  // listening for a click on delete elements to invoke deleting function
  const deleteIcons = Array.from(document.querySelectorAll(".close"));
  deleteIcons.forEach(function (icon) {
    icon.addEventListener("click", (event) => {
      deleteElement(event.target.parentNode.parentNode);
    });
  });

  const clearAll = document.querySelector(".clear-all");
  clearAll.addEventListener("click", () => {
    const completedTasks = Array.from(document.querySelectorAll(".task.done"));
    completedTasks.forEach((task) => {
      deleteElement(task);
    });
  });
}

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

const toggleDisplyMode = (function () {
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

const toggleTaskState = (function () {
  const updateTasksState = function () {
    const checkRadios = Array.from(document.querySelectorAll(".check-radio"));
    const iconContent = `<i class="fa-solid fa-check"></i>`;

    // handler for adding and removing tick icon when radio check is clicked
    const eventHandler = function (event) {
      const parent = event.target.parentNode;
      parent.classList.toggle("done");
      event.currentTarget.innerHTML = parent.classList.contains("done")
        ? iconContent
        : "";

      // updating some UI variables
      tasksTracker.update();
      showRemainingTasks();
    };

    checkRadios.forEach(function (element) {
      if (!element.hasEventListener) {
        element.addEventListener("click", eventHandler);
        element.hasEventListener = true;
      }
    });
  };

  return {
    updateTasksState,
  };
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
    main.classList.remove("cleared");

    // updating UI variables after creation of an element
    toggleTaskState.updateTasksState();
    deletetasks();
    tasksTracker.update();
    showRemainingTasks();
  }

  function callCreateFunction() {
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

toggleTaskState.updateTasksState();
deletetasks();
tasksTracker.update();
showRemainingTasks();
