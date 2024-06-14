document.addEventListener("DOMContentLoaded", function() {
    const welcomeText = document.getElementById("welcomeText");
    const supportBtn = document.querySelector("#supportBtn")
    supportBtn.style.display = "none"
    setTimeout(() => {
        welcomeText.style.opacity = 1;
    }, 100); // Delay to allow the DOM to fully load

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
        "What are the company's core values?"
    ];

    function getRandomQuestions() {
        const shuffled = questions.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 3);
    }

    function displayRandomQuestions() {
        const randomQuestionsContainer = document.getElementById('randomQuestions');
        const randomQuestions = getRandomQuestions();

        randomQuestions.forEach(question => {
            const button = document.createElement('button');
            button.className = 'random-question';
            button.textContent = question;
            button.onclick = () => {
                document.getElementById('question').value = question;
                sendQuery(question);
            };
            randomQuestionsContainer.appendChild(button);
        });
    }

    displayRandomQuestions();
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

            
            if(data.includes("Don't know") || data.includes("I'am not sure") || data.includes("don't know") || data.includes("I'm not sure")){
                supportBtn.style.display = "block"
            }

            // Update this line according to the structure of the received data
            const answer = data || "No answer found";
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
    const speed = 50; // typing speed in milliseconds
    function typeWriter() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }
    typeWriter();
}
