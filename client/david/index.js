const form = document.querySelector("form")

function sendQuery() {
  // fetch("http://localhost:8080", {})
  const baseUrl = 'http://195.242.25.207:5000/api'

  // Parameters to be included in the query string
  const params = {
      param1: 'value1',
      param2: 'value2',
      param3: 'value3'
  };
  const url = new URL(baseUrl);
  url.search = new URLSearchParams(params).toString();

  // Log the final URL (optional)
  console.log('Final URL:', url.toString());

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
      })
      .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
      });
}

form.addEventListener("submit", (e) => {
  e.preventDefault()
  sendQuery("asdsdasd")
  console.log("SUBMIT: ", e)
})