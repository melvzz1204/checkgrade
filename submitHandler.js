import { bsit1e } from "./BSIT1E.js";
import { bsis2c } from "./BSIS2C.js";
import { bsis2b } from "./BSIS2B.js";

const sections = {
  bsit1e,
  bsis2c,
  bsis2b,
};

function getCurrentSection() {
  const sectionSelect = document.getElementById("sectionSelect");
  return sections[sectionSelect.value] || bsit1e; // default to bsit1e if no selection
}

document.querySelector("button").addEventListener("click", () => {
  const firstName = document.querySelector('[name="firstname"]').value.trim();
  const lastName = document.querySelector('[name="lastname"]').value.trim();
  const codeDisplay = document.getElementById("studentCode");
  const selectedSection = getCurrentSection();

  if (!firstName || !lastName) {
    codeDisplay.textContent = "Please enter both first name and last name";
    codeDisplay.className = "text-center text-lg font-semibold text-red-500";
    return;
  }

  const foundStudent = selectedSection.find((s) => {
    const fullName = s.name.toLowerCase();
    return (
      fullName.includes(firstName.toLowerCase()) &&
      fullName.includes(lastName.toLowerCase())
    );
  });

  if (foundStudent) {
    codeDisplay.className = "text-center text-lg font-semibold text-green-500";
    codeDisplay.textContent = `Your Code: ${foundStudent.code}`;
  } else {
    codeDisplay.className = "text-center text-lg font-semibold text-red-500";
    codeDisplay.textContent = "Student not found in selected section";
  }
});

document.getElementById("checkGrade").addEventListener("click", () => {
  const codeInput = document.querySelector('[name="code"]').value.trim();
  const gradeDisplay = document.getElementById("gradeDisplay");
  const currentSection = getCurrentSection();

  if (!codeInput) {
    gradeDisplay.textContent = "Please enter a code";
    gradeDisplay.className = "text-center text-lg font-semibold text-red-500";
    return;
  }

  const foundStudent = currentSection.find(
    (s) => s.code === codeInput.toUpperCase()
  );

  if (foundStudent) {
    gradeDisplay.className = "text-center text-lg font-semibold text-green-500";
    gradeDisplay.textContent = `Your grade is: ${foundStudent.grade}`;
  } else {
    gradeDisplay.className = "text-center text-lg font-semibold text-red-500";
    gradeDisplay.textContent = "Invalid code";
  }
});
