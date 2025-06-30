import { showMessage } from "./notification.js";
import { Signout, validateUser } from "./auth.js";
import { fetchUserInfo } from "./user.js";
import { setupTabs } from "./navigation.js";
import { initializeTodos } from "./TodoInit.js";
import { addTodos, displayTodos } from "./Todo.js";

const loaderContainer = document.getElementById("loader-container");
const UsernameSpan = document.getElementById('user-name');
const appContent = document.getElementById("app-content");
const avatar = document.getElementById("user-avatar");
const signoutbtn = document.getElementById("signout-btn");


validateUser(); // Redirect if user is not found

// initializeTodos();

( async () => {
    await initializeTodos();
    fetchUserInfo(UsernameSpan, avatar);
    displayTodos();
    setTimeout(showAppContent, 1000);
})();


//  4️⃣ Show app content when avatar loads
let shown = false;

function showAppContent() {
    if (shown) return;
    shown = true;
    loaderContainer.style.display = "none";
    appContent.style.display = "block";
}

// setTimeout(showAppContent, 1000);

Signout(signoutbtn);
setupTabs();


const taskinputform = document.getElementById('task-input-form');
const taskinputfield = document.getElementById('new-task-input');
const addTaskBtn = document.getElementById('add-task-btn');

taskinputform.addEventListener('submit', (e) => {
    e.preventDefault();
    if(!validateUser()){
        return;
    }
    const activeTab = document.querySelector(".tab-btn.active").dataset.tab;
    console.log(activeTab);
    const taskinput = taskinputfield.value.trim();
    if(!taskinput || taskinput === ""){
        showMessage("Task field is empty!", true);
        return;
    }

    addTaskBtn.disabled = true;
    addTaskBtn.innerText = "Adding...";
    const todoadded = addTodos(taskinput, activeTab);
    taskinputform.reset();

    if(!todoadded) return;
    showMessage("Todo added successfully!", false);
    displayTodos();

    setTimeout(() => {
        addTaskBtn.disabled = false;
        addTaskBtn.innerText = "Add Task";
    }, 1300); 
});


document.getElementById("task-lists").addEventListener("click", (e) => {
    if(!validateUser()){
        return;
    }
    const btn = e.target;
    const taskDiv = btn.closest(".todo-item");
    if (!taskDiv) return;

    let todos = JSON.parse(localStorage.getItem("todos")) || [];

    // For update & edit
    const taskText = taskDiv.querySelector(".todo-title")?.innerText;
    let todo = todos.find(t => t.text === taskText);
    if (!todo) return;

    let shouldUpdate = false;

    if (btn.classList.contains("complete-btn")) {
        todo.completed = true;
        todo.lastModified = Date.now();
        showMessage('Marked as Completed', false);
        shouldUpdate = true;

    } else if (btn.classList.contains("archive-btn")) {
        todo.archived = true;
        todo.lastModified = Date.now();
        showMessage('Moved to Archive', false);
        shouldUpdate = true;

    } else if (btn.classList.contains("move-to-todo-btn")) {
        todo.completed = false;
        todo.archived = false;
        todo.lastModified = Date.now();
        showMessage('Moved to Todo', false);
        shouldUpdate = true;

    } else if (btn.classList.contains("move-to-completed-btn")) {
        todo.completed = true;
        todo.archived = false;
        todo.lastModified = Date.now();
        showMessage('Moved to Completed', false);
        shouldUpdate = true;
    } else if (btn.classList.contains("edit-todo")) {
        const inputField = document.getElementById("new-task-input");

        if (inputField.value.trim()) {
            showMessage("Input field already filled! First empty it", true);
            return;
        }

        // Set input value and remove the original todo
        inputField.value = todo.text;
        todos = todos.filter(item => item.id !== todo.id);
        localStorage.setItem("todos", JSON.stringify(todos));
        showMessage("Task moved to input. Edit it and click Add to save changes.", false, 2000);
        displayTodos();
        return;
    }
    if (shouldUpdate) {
        // Replace updated todo at top
        todos = todos.filter(item => item.id !== todo.id);
        todos.unshift(todo);
        localStorage.setItem("todos", JSON.stringify(todos));
        displayTodos();
    }
});


const clearbtn = document.getElementById('clear-archive');

clearbtn.addEventListener('click', () => {
    if(!validateUser()){
        return;
    }
    const arhiveCount = document.getElementById('archived-count').textContent;
    if(arhiveCount == 0){
        showMessage('No todos in Archive', true);
        return;
    }
    Swal.fire({
    title: 'Delete Archived Tasks?',
    text: "This will permanently remove all archived tasks.",
    icon: null,
    
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete!',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      let todos = JSON.parse(localStorage.getItem('todos')) || [];
      todos = todos.filter(todo => !todo.archived);
      localStorage.setItem('todos', JSON.stringify(todos));
      showMessage("Archived tasks deleted successfully", false);
      displayTodos();
    }
  });
});


document.getElementById("export-json-btn").addEventListener("click", () => {
    if(!validateUser()){
        return;
    }
    showMessage("Downloading todos in json format", false, 2500);
    const todos = JSON.parse(localStorage.getItem("todos")) || [];

    const blob = new Blob([JSON.stringify(todos, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "todos.json";
    a.click();

    URL.revokeObjectURL(url);
});