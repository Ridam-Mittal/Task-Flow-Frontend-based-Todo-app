import { validateUser } from "./auth.js";

export const setupTabs = () => {
  validateUser();
  const buttons = document.querySelectorAll(".tab-btn");
  buttons[0].classList.add("active");
  const panels = {
    todo: document.getElementById("todo-panel"),
    completed: document.getElementById("completed-panel"),
    archived: document.getElementById("archived-panel")
  };
  panels.todo.style.display = "block";
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      // console.log(btn);
      const target = btn.dataset.tab;

      // Show only the selected panel
      Object.keys(panels).forEach(key => {
        panels[key].style.display = key === target ? "block" : "none";
        console.log()
      });
    });
  });


};






