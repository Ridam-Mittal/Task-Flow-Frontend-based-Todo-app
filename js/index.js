import { showMessage } from "./notification.js";
const form = document.getElementById("registration-form");
const nameInput = document.getElementById("name");
const dobInput = document.getElementById("dob");
const submitBtn = document.getElementById("submit-btn");


function calculateAge(dob, currentDate) {
    let age = currentDate.getFullYear() - dob.getFullYear();
    const monthDiff = currentDate.getMonth() - dob.getMonth();
    const dateDiff = currentDate.getDate() - dob.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dateDiff < 0)) {
        age--;
    }
    return age;
}


function addUser(user){
    localStorage.setItem('taskflowUser', JSON.stringify(user));
}


form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = nameInput.value.trim();
    const dobValue = dobInput.value;

    if (name === "" || dobValue === "") {
        showMessage("All fields are required!", true);
        return;
    }

    const dob = new Date(dobValue);
    const currentDate = new Date();
    const age = calculateAge(dob, currentDate);

    if (age <= 10) {
        showMessage("You must be older than 10 years!", true);
        return;
    }


    const user = {
        name: name.toLowerCase(),
        dob: dobValue,
        age: age,
        first_visit: true
    };

    addUser(user);

    form.reset();
    submitBtn.disabled = true;
    nameInput.disabled = true;
    dobInput.disabled = true;

    showMessage("User Registered.  Redirecting to TaskFlow...", false, '#289c28', 2000);

    setTimeout(() => {
        window.location.href = "app.html";
    }, 1500);
});


// Auto-redirect if user already exists
function checkForExistingUser() {
  const existingUser = localStorage.getItem("taskflowUser");
  if (existingUser) {
    submitBtn.disabled = true;
    nameInput.disabled = true;
    dobInput.disabled = true;
    showMessage("Redirecting to TaskFlow...", false, '#289c28', 2000);
    setTimeout(() => {
      window.location.href = "app.html";
    }, 2000);

  }
}

checkForExistingUser();
