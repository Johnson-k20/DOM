// Student Management System
let students = [];

// DOM Elements
const studentNameInput = document.getElementById("student-name");
const studentIdInput = document.getElementById("student-id");
const studentCourseInput = document.getElementById("student-course");
const addStudentBtn = document.getElementById("add-student-btn");
const studentList = document.getElementById("student-list");
const searchInput = document.getElementById("search-student");
const totalStudentsSpan = document.getElementById("total-students");

// Load students from localStorage on page load
function loadStudents() {
  const saved = localStorage.getItem("students");
  if (saved) {
    students = JSON.parse(saved);
    displayStudents(students);
    updateTotalCount();
  }
}

// Save students to localStorage
function saveStudents() {
  localStorage.setItem("students", JSON.stringify(students));
}

// Add a new student
function addStudent() {
  const name = studentNameInput.value.trim();
  const id = studentIdInput.value.trim();
  const course = studentCourseInput.value.trim();

  if (!name || !id || !course) {
    alert("Please fill in all fields");
    return;
  }

  const student = {
    id: Date.now(),
    name: name,
    studentId: id,
    course: course,
    dateAdded: new Date().toLocaleDateString(),
  };

  students.push(student);
  saveStudents();
  displayStudents(students);
  updateTotalCount();
  clearInputs();
}

// Display students in the list
function displayStudents(studentsToDisplay) {
  studentList.innerHTML = "";

  if (studentsToDisplay.length === 0) {
    studentList.innerHTML =
      '<li class="list-group-item text-muted">No students found</li>';
    return;
  }

  studentsToDisplay.forEach((student) => {
    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `
            <div>
                <h6 class="mb-1">${student.name}</h6>
                <small class="text-muted">ID: ${student.studentId} | Course: ${student.course}</small>
                <br>
                <small class="text-muted">Added: ${student.dateAdded}</small>
            </div>
            <button class="btn btn-danger btn-sm" onclick="deleteStudent(${student.id})">Delete</button>
        `;
    studentList.appendChild(li);
  });
}

// Delete a student
function deleteStudent(studentId) {
  students = students.filter((student) => student.id !== studentId);
  saveStudents();
  displayStudents(students);
  updateTotalCount();
}

// Update total students count
function updateTotalCount() {
  totalStudentsSpan.textContent = students.length;
}

// Clear input fields
function clearInputs() {
  studentNameInput.value = "";
  studentIdInput.value = "";
  studentCourseInput.value = "";
  studentNameInput.focus();
}

// Search students
function searchStudents() {
  const searchTerm = searchInput.value.toLowerCase();
  const filtered = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm) ||
      student.studentId.toLowerCase().includes(searchTerm) ||
      student.course.toLowerCase().includes(searchTerm),
  );
  displayStudents(filtered);
}

// Event Listeners
addStudentBtn.addEventListener("click", addStudent);
searchInput.addEventListener("input", searchStudents);

// Allow Enter key to add student
studentCourseInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addStudent();
  }
});

// Initialize on page load
document.addEventListener("DOMContentLoaded", loadStudents);
