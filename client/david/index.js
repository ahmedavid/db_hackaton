const form = document.querySelector("form")
const answer = document.querySelector("#answer")
const promptInput = document.querySelector("#promptInput")

const promptBtn = document.querySelector("#promptBtn")
const supportBtn = document.querySelector("#supportBtn")
const promptBtnSpinner = document.querySelector("#promptBtnSpinner")

promptBtnSpinner.style.display = "none"
supportBtn.style.display = "none"

let buttonDisabled = true

function sendQuery() {
  // fetch("http://localhost:8080", {})
  const baseUrl = 'http://195.242.25.207:5000/api'

  console.log("PROMPT: ", promptInput.value)

  // Parameters to be included in the query string
  const params = {
      query: promptInput.value
  };
  const url = new URL(baseUrl);
  url.search = new URLSearchParams(params).toString();

  // Log the final URL (optional)
  console.log('Final URL:', url.toString());

  promptBtn.disabled = true
  promptBtn.style.display = "none"
  promptBtnSpinner.style.display = "block"

  // Send the GET request using fetch
  fetch(url)
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok ' + response.statusText);
          }
          return response.json(); // Parse JSON response
      })
      .then(data => {
          console.log('Data received:', data); // Handle the data

          if(data.includes("don't know") || data.includes("I'am not sure")) {
            supportBtn.style.display = "block"
          }

          answer.textContent = data
          promptBtn.disabled = false
          promptBtn.style.display = "block"
          promptBtnSpinner.style.display = "none"
      })
      .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
          promptBtn.disabled = false
          promptBtn.style.display = "block"
          promptBtnSpinner.style.display = "none"
      });
}

form.addEventListener("submit", (e) => {
  e.preventDefault()
  sendQuery("asdsdasd")
  console.log("SUBMIT: ", e)
})