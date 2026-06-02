const studentInput = document.getElementById("student-input");  // Get the input field for student names

const addBtn = document.getElementById("add-btn");// Get the button that will trigger adding a new student to the list

const studentList = document.getElementById("student-list");// Get the unordered list element where student names will be displayed

addBtn.addEventListener("click", function() {// Attach a click event listener to the add button

  const studentName = studentInput.value; // Retrieve the value entered in the input field

  // Validate that the input is not empty or just whitespace

  if(studentName.trim() === "") { // Check if the trimmed input is empty
    alert("Please enter a valid student name."); // Alert the user to enter a valid name
    return;
  }

  // CREATE LI
  const li = document.createElement("li");

  li.className =
    "list-group-item d-flex justify-content-between align-items-center";

  li.textContent = studentName;

  // CREATE DELETE BUTTON
  const deleteBtn = document.createElement("button");

  deleteBtn.textContent = "X";

  deleteBtn.className =
    "btn btn-danger btn-sm";

  // DELETE EVENT
  deleteBtn.addEventListener("click", function() {

    li.remove();

  });

  // APPEND BUTTON TO LI
  li.appendChild(deleteBtn);

  // APPEND LI TO UL
  studentList.appendChild(li);

  // CLEAR INPUT
  studentInput.value = "";

});