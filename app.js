const body = document.getElementsByTagName('body')[0]; // Select the first <body> element
let question = document.getElementById("question");

let box = document.getElementsByClassName("box")[0]; // Select the first element with class "box"
var quizData;

function getQuizData() {
    fetch("https://opentdb.com/api.php?amount=10&category=23")
        .then((response) => response.json())
        .then((data) => {
            quizData = data.results;
            console.log(quizData);
            populateBox(quizData);
        })
        .catch(() => {
            alert("Something went wrong, please refresh.");
        });
}

function populateBox(quizData) {
    let optionsetBox = document.getElementById('optionsetBox');

    let optionsets = '';
    question.innerText = quizData[0].question;

    let incorrect_answers = quizData[0].incorrect_answers;

    let randomNumber = Math.floor(Math.random() * (incorrect_answers.length + 1));
    
    incorrect_answers.splice(randomNumber, 0, quizData[0].correct_answer);

    incorrect_answers.forEach((e) => {
        optionsets += `<div class="row">
                <input name="choice" type="radio">
                <label for="choice">${e}</label>
            </div>`;
    });

    optionsetBox.innerHTML = optionsets;
}

// Function call
getQuizData();
