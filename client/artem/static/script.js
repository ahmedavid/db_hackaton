document.addEventListener("DOMContentLoaded", function() {
    const welcomeText = document.getElementById("welcomeText");
    setTimeout(() => {
        welcomeText.style.opacity = 1;
    }, 100); // Delay to allow the DOM to fully load
});

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('questionForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const query = document.getElementById('question').value;
        sendQuery(query);
    });
});

function sendQuery(query) {
    const baseUrl = 'http://195.242.25.207:5000/api';

    // Parameters to be included in the query string
    const params = {
        query: query
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
            // Log the received data to inspect its structure
            console.log('Data received:', data);

            // Update this line according to the structure of the received data
            const answer = data || "Your question is not very easy to answer... Could you ask in some other way?";
            console.log('Parsed answer:', answer);

            const answerDiv = document.getElementById('answer');
            typeEffect(answerDiv, answer);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function typeEffect(element, text) {
    element.innerHTML = "";
    let i = 0;
    const speed = 10; // typing speed in milliseconds
    function typeWriter() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }
    typeWriter();
}
