const form = document.querySelector("form");
const answer = document.querySelector("#answer");
const promptInput = document.querySelector("#promptInput");
const promptBtn = document.querySelector("#promptBtn");
const promptBtnSpinner = document.querySelector("#promptBtnSpinner");
const suggestionContainer = document.querySelector(
  ".suggested-questions .d-flex"
);

const questions = [
  "What is the company's dress code policy?",
  "How can I request time off?",
  "What are the working hours?",
  "How do I access my employee benefits?",
  "What is the company policy on remote work?",
  "How do I report a technical issue?",
  "Where can I find the employee handbook?",
  "What is the process for submitting expense reports?",
  "How do I enroll in the company's health insurance plan?",
  "What is the procedure for filing a complaint?",
  "How do I reset my company email password?",
  "What are the safety protocols in the office?",
  "How can I update my personal information?",
  "What training programs are available?",
  "How do I contact HR?",
  "What is the company's policy on social media usage?",
  "How do I book a meeting room?",
  "What are the guidelines for using the company gym?",
  "How can I participate in the company's volunteer programs?",
  "What are the company's core values?",
];

promptBtnSpinner.style.visibility = "hidden";

// Function to shuffle array and get random elements
function getRandomQuestions(arr, num) {
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}

// Function to display random questions
function displayRandomQuestions() {
  const randomQuestions = getRandomQuestions(questions, 3);
  suggestionContainer.innerHTML = "";
  randomQuestions.forEach((question) => {
    const button = document.createElement("button");
    button.className = "btn btn-outline-secondary suggestion-btn";
    button.textContent = question;
    button.addEventListener("click", () => {
      promptInput.value = question;
    });
    suggestionContainer.appendChild(button);
  });
}

function sendQuery() {
  const baseUrl = "http://195.242.25.207:5000/api";

  console.log("PROMPT: ", promptInput.value);

  const params = {
    query: promptInput.value,
  };
  const url = new URL(baseUrl);
  url.search = new URLSearchParams(params).toString();

  console.log("Final URL:", url.toString());

  promptBtn.disabled = true;
  promptBtn.style.visibility = "hidden";
  promptBtnSpinner.style.visibility = "visible";

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Data received:", data);

      // Clear previous content
      answer.innerHTML = "";

      // Check for specific phrases in the response
      if (/I am not sure|I don't know/i.test(data)) {
        const redirectBtn = document.createElement("button");
        redirectBtn.className = "btn btn-warning mt-3";
        redirectBtn.textContent = "Fill Out Form";
        redirectBtn.addEventListener("click", () => {
          window.location.href = "form.html"; // Replace with the actual URL of your form
        });
        answer.appendChild(redirectBtn);
      } else {
        answer.textContent = data;
      }

      promptBtn.disabled = false;
      promptBtn.style.visibility = "visible";
      promptBtnSpinner.style.visibility = "hidden";
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
      promptBtn.disabled = false;
      promptBtn.style.visibility = "visible";
      promptBtnSpinner.style.visibility = "hidden";
    });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  sendQuery();
  console.log("SUBMIT: ", e);
});

// Display random questions on page load
window.addEventListener("load", displayRandomQuestions);
