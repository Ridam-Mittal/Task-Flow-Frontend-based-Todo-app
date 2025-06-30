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



export const addTodos = (input, stage) => {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];

    const exist = todos.some(todo => todo.text.trim().toLowerCase() === input.trim().toLowerCase());
    if (exist) {
        showMessage(`Task already exists in ${stage} section.`, true, 2000);
        return;
    }
    const newtask = {
        id: crypto.randomUUID(), // universally unique id
        text: input,
        completed: stage === "completed",
        archived: stage === "archived",
        lastModified: Date.now()
    }

    todos.unshift(newtask);
    localStorage.setItem("todos", JSON.stringify(todos));    
}



