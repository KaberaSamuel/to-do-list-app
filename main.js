const body = document.querySelector("body");
const main = document.querySelector("main");
const tasks = document.querySelector(".tasks");
const remainingTasks = document.querySelector(".active-tasks");

function mainStartingState() {
  main.classList.add("cleared");
}

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

    const eventHandler = function (event) {
      const parent = event.target.parentNode;
      parent.classList.toggle("done");
      event.currentTarget.innerHTML = parent.classList.contains("done")
        ? iconContent
        : "";
    };

    checkRadios.forEach(function (element) {
      // element.removeEventListener("click", eventHandler);
      element.addEventListener("click", eventHandler);
    });
  };

  return {
    updateTasksState,
  };
})();

const deletetasks = function () {
  function deleteElement(element) {
    Array.from(element.children).forEach((child) => {
      child.style.cssText = "animation: delete-animation 0.3s ease-in both";
    });

    window.setTimeout(() => {
      tasks.removeChild(element);
      if (tasks.childElementCount === 0) {
        mainStartingState();
      }
    }, 300);
  }

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
};

const newTasks = (function () {
  function initialize(content) {
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

    toggleTaskState.updateTasksState();
    deletetasks();
  }

  const input = document.querySelector("input");
  input.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      initialize(input.value);
      input.value = "";
    }
  });
})();

toggleTaskState.updateTasksState();
deletetasks();
