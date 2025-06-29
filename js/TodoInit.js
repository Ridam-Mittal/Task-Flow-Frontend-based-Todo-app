// app.js or todoInit.js
export const initializeTodos = async () => {
    const user = JSON.parse(localStorage.getItem("taskflowUser") || "{}");
    if (!user.first_visit) return;

    try {
        const res = await fetch("https://dummyjson.com/todos");
        const data = await res.json();
        const todos = data.todos.map((t, idx) => ({
            id: crypto.randomUUID(), // universally unique id
            text: t.todo,
            completed: false,
            archived: false,
            lastModified: Date.now()
        }));
        localStorage.setItem("todos", JSON.stringify(todos));
        user.first_visit = false;
        localStorage.setItem("taskflowUser", JSON.stringify(user));
    } catch (err) {
        console.error("Failed to fetch dummy todos", err);
    }
}
