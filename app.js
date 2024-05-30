const body = document.getElementsByTagName('body')[0]; // Select the first <body> element
let question = document.getElementById("question");
let btn = document.getElementById("submit");

let index = 0; 
let correct = 0; 
let wrong = 0; 

let box = document.getElementsByClassName("box")[0]; // Select the first element with class "box"
var quizData;

function getQuizData() {
    fetch("https://opentdb.com/api.php?amount=5&category=23")
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
    
    let incorrect_answers = quizData[index].incorrect_answers;
    
    let randomNumber = Math.floor(Math.random() * (incorrect_answers.length + 1));
    
    question.innerText = quizData[index].question;
    incorrect_answers.splice(randomNumber, 0, quizData[index].correct_answer);

    incorrect_answers.forEach((e, i) => {
        optionsets += `<div class="row">
                <input id="choice${i}" name="choice" type="radio">
                <label for="choice${i}">${e}</label>
            </div>`;
    });

    optionsetBox.innerHTML = optionsets;
}

btn.addEventListener('click', function onClick(e) {
    e.preventDefault();
    
    let selectedOption = document.querySelector('input[name="choice"]:checked');
    
    if (selectedOption) {
        let labelValue  = selectedOption.nextElementSibling.innerText;
        console.log(labelValue);

        if (quizData[index].correct_answer == labelValue) {
            correct++;
            console.log(correct);
        } else {
            wrong++;
            console.log(wrong);
        }

        index++;
        if (index < quizData.length) {
            populateBox(quizData);
        } else {
           // alert(`Quiz finished! Correct: ${correct}, Wrong: ${wrong}`);
            box.innerHTML = `<h2 id="finish">  Quiz finished! <br>Correct: ${correct}, Wrong: ${wrong}</h2>`;        }
    } else {
        alert("No option selected");
    }
});

// Function call
getQuizData();
