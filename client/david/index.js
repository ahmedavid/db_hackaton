const form = document.querySelector("form")
const answer = document.querySelector("#answer")
const promptInput = document.querySelector("#promptInput")
const promptBtn = document.querySelector("#promptBtn")
const promptBtnSpinner = document.querySelector("#promptBtnSpinner")

promptBtnSpinner.style.visibility = "hidden"

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
  promptBtn.style.visibility = "hidden"
  promptBtnSpinner.style.visibility = "visible"

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

          answer.textContent = data
          promptBtn.disabled = false
          promptBtn.style.visibility = "visible"
          promptBtnSpinner.style.visibility = "hidden"
      })
      .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
          promptBtn.disabled = false
          promptBtn.style.visibility = "visible"
          promptBtnSpinner.style.visibility = "hidden"
      });
}

form.addEventListener("submit", (e) => {
  e.preventDefault()
  sendQuery("asdsdasd")
  console.log("SUBMIT: ", e)
})