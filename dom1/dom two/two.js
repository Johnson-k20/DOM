const studentInput =
  document.getElementById("student-input"); // Get the input field for student names

const addBtn =
  document.getElementById("add-btn"); // Get the button that will trigger adding a new student to the list

const studentList =
  document.getElementById("student-list"); // Get the unordered list element where student names will be displayed

let students =
  JSON.parse(localStorage.getItem("students")) || [];  // Retrieve the students array from localStorage or initialize it as an empty array if not found

// 1. Add new list item

// RENDER FUNCTION
function renderStudents() {  // Clear the existing list to avoid duplicates

  studentList.innerHTML = "";  // Loop through the students array and create list items for each student

  students.forEach(function(student) { // Cre   ate a new <li> element for each student in the array

    const li = document.createElement("li"); // Create a new <li> element for each student

    li.className =
      "list-group-item d-flex justify-content-between align-items-center";

    const span = document.createElement("span");

    span.textContent = student;

    const deleteBtn =
      document.createElement("button");

    deleteBtn.textContent = "X";

    deleteBtn.className =
      "btn btn-danger btn-sm";

    deleteBtn.addEventListener("click", function() {

      removeStudent(student);

    });

    li.appendChild(span);

    li.appendChild(deleteBtn);

    studentList.appendChild(li);

  });

}

// SAVE FUNCTION
function saveStudents() {

  localStorage.setItem(
    "students",
    JSON.stringify(students)
  );

}

// REMOVE FUNCTION
function removeStudent(studentName) {

  students = students.filter(function(student) {

    return student !== studentName;

  });

  saveStudents();

  renderStudents();

}

// ADD EVENT
addBtn.addEventListener("click", function() {

  const studentName =
    studentInput.value.trim();

  if(studentName === "") {
    return;
  }

  students.push(studentName);

  saveStudents();

  renderStudents();

  studentInput.value = "";

});

// INITIAL RENDER
renderStudents();