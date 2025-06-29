import { showMessage } from "./notification.js";

export const validateUser = () => {
    const userData = localStorage.getItem("taskflowUser");
    if (!userData) {
        showMessage("Register First...", true);
        window.location.href = "index.html";
        return false;
    }
    return true;
}


export const Signout = (signoutbtn) => {
    signoutbtn.addEventListener('click', () => {
        localStorage.removeItem('taskflowUser');
        localStorage.removeItem('todos');
        showMessage("Logging out...", false, 2000);
        setTimeout(() => {
          window.location.href = "index.html";
        }, 2000);
    })
}