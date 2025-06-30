import { formatTimestamp } from "./utlity.js";
import { emptyMessage } from "./utlity.js";
import { showMessage } from './notification.js';

export const displayTodos = () => {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    // console.log("Loaded Todos:", todos);
    const todoList = document.getElementById("todo-list");
    const completedList = document.getElementById("completed-list");
    const archivedList = document.getElementById("archived-list");

    let hasTodo = false, hasCompleted = false, hasArchived = false;

    // Clear existing content
    todoList.innerHTML = "";
    completedList.innerHTML = "";
    archivedList.innerHTML = "";

    todos.forEach((todo, idx) => {
        const todoDiv = document.createElement("div");
        todoDiv.className = "todo-item";

        todoDiv.innerHTML = `
            <div class="todo-header">
                <p class="todo-title">${todo.text}</p>
                <span class="todo-time">${formatTimestamp(todo.lastModified) || "Unknown"}</span>
            </div>
            <div class="todo-actions">
                ${!todo.completed && !todo.archived ? `
                <button class="complete-btn">Mark as Completed</button>
                <button class="archive-btn">Archive</button>
                <button class="edit-todo">Edit todo</button>
                ` : ''}
                ${todo.completed && !todo.archived ? `
                <button class="move-to-todo-btn">Move to Todo</button>
                <button class="archive-btn">Archive</button>
                <button class="edit-todo">Edit todo</button>
                ` : ''}
                ${todo.archived ? `
                <button class="move-to-todo-btn">Move to Todo</button>
                <button class="move-to-completed-btn">Move to Completed</button>
                <button class="edit-todo">Edit todo</button>
                ` : ''}
            </div>
        `;
        
        // Append based on status
        if (todo.archived) {
            hasArchived = true;
            archivedList.appendChild(todoDiv);
        } else if (todo.completed) {
            hasCompleted = true;
            completedList.appendChild(todoDiv);
        } else {
            hasTodo = true;
            todoList.appendChild(todoDiv);
        }
    });

    // Update counts
    document.getElementById("todo-count").innerText = todos.filter(t => !t.completed && !t.archived).length;
    document.getElementById("completed-count").innerText = todos.filter(t => t.completed && !t.archived).length;
    document.getElementById("archived-count").innerText = todos.filter(t => t.archived).length;

    if (!hasTodo) todoList.appendChild(emptyMessage("No tasks in Todo."));
    if (!hasCompleted) completedList.appendChild(emptyMessage("No completed tasks."));
    if (!hasArchived) archivedList.appendChild(emptyMessage("No archived tasks."));
    
};



export const addTodos = (input, stage, addTaskBtn) => {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];

    const trimmedInput = input.trim().toLowerCase();
    const existingTodo = todos.find(todo => todo.text.trim().toLowerCase() === trimmedInput);

    if (existingTodo) {
        let existingStage = "todo";
        if (existingTodo.archived) existingStage = "archived";
        else if (existingTodo.completed) existingStage = "completed";

        showMessage(`Task already exists in the ${existingStage} section.`, true, 2000);
        return;
    }

    addTaskBtn.disabled = true;
    addTaskBtn.innerText = "Adding...";

    const newTask = {
        id: crypto.randomUUID(),
        text: input.trim(),
        completed: stage === "completed",
        archived: stage === "archived",
        lastModified: Date.now()
    };

    todos.unshift(newTask);
    localStorage.setItem("todos", JSON.stringify(todos));

    showMessage("Todo added successfully!", false);

    setTimeout(() => {
        addTaskBtn.disabled = false;
        addTaskBtn.innerText = "Add Task";
    }, 1300);
};
