const body = document.querySelector("body");
const main = document.querySelector("main");

function mainStartingState() {
  main.innerHTML = `<p>No todo items left</p>`;
  main.classList.add("cleared");
}

const toggleMode = (function () {
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
  const checkRadios = Array.from(document.querySelectorAll(".check-radio"));
  const iconContent = `<i class="fa-solid fa-check"></i>`;

  checkRadios.forEach(function (element) {
    element.addEventListener("click", (event) => {
      const parent = event.target.parentNode;
      parent.classList.toggle("done");
      element.innerHTML = parent.classList.contains("done") ? iconContent : "";
    });
  });
})();

const deletetasks = (function () {
  function deleteElement(element) {
    Array.from(element.children).forEach((child) => {
      child.style.cssText = "animation: delete-animation 0.8s ease both";
    });

    window.setTimeout(() => {
      main.removeChild(element);
      if (main.childElementCount === 1) {
        mainStartingState();
      }
    }, 600);
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
})();
