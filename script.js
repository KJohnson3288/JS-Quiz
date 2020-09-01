//Variables that will be for the questions
const questionEl = document.getElementById("questionText");
const questionContainerEl = document.getElementById("question-container")
let questionsIndex = [];
let currentQuestion = {};
let questionCounter = 0;
let availableQuestions = [];

//varible relating to answers
let answerBtn ;
let answersIndex = [];
let answerButton = document.getElementsByClassName("btn btn-outline-dark");
let correctAnswer ;

//quiz questions go here
let questions = [
        {
            question : "What tag is used for Javascript?",
            answers : ["<script>", "<JS>", "<Java>"],
            correct : 0
        },
        {
            question : "What are the three core languages in web pages?",
            answers : ["FBI, CIA, CSS","CSS, Java, C++", "HTML, CSS, JavaScript"],
            correct : 2
        },
        {
            question : "What are the three ways you can declare a variable?",
            answers : ["dude, bro, guy","var, let, const", "for, const, bill"],
            correct : 1
        },
        {
            question : "What is a list of variables called?",
            answers : ["Array", "Bank", "Cart"],
            correct : 0
        },
        {
            question : "What two parts make up an object?",
            answers : ["base: value", "key: item", "var: count"],
            correct : 1
        },
        {
            question : "Which of these functions is used to loop code?",
            answers : ["object()", "loop()", "for()"],
            correct : 2
        },
        {
            question : "What Function is used to randomly generate numbers?",
            answers : ["Math.floor", "Math.random()", "randomize"],
            correct : 1
        },
        {
            question : "DOM stands for?",
            answers : ["Document Object Model", "Drop Off Mail", "Dynamic Opposite Marking"],
            correct : 0
        },
        {
            question : "What syntax is used when accessing a class?",
            answers : ["#className","$className", ".className"],
            correct : 2
        },
        
        {
            question : "A variable the results as a true or false statement is called?",
            answers : ["Cloud", "Hadoken","Boolean"],
            correct : 2
        }   
    ]
  
//Variable to retrieve the answer choices for the question
let answerEl = document.getElementById("answer-buttons")

//variables for timer
var timer ;
var counter = 0;
var timeLeft = 120;

//Showing user info
var userInput = document.getElementById("user-input");
var userName = document.getElementById("user-name");
var userScore = document.getElementById("score");
var score;
var users = JSON.parse(localStorage.getItem("users"));
var scoreList = JSON.parse(localStorage.getItem("scores"));

//variable for the start button
var startButton = document.getElementById("start-btn");
startButton.addEventListener("click", startGame);

//varible for the back button
var backBtn = document.getElementById("back-button");


//results page
var topScores = document.getElementById("top-scores");


//function for starting the quiz
function startGame() {



getArr();

console.log(users);
console.log(scoreList);

startButton.classList.add("hide");
userName.classList.add("hide");
userInput.classList.add("hide");
questionContainerEl.classList.remove("hide");

questionCounter = 0;
availableQuestions = [...questions];
score = 0

getNewQuestion();
startTimer();

}

function getArr() {
    if (users === null && scoreList === null) {
        users = [];
        scoreList = [];
    } else {
        users = JSON.parse(localStorage.getItem("users"));
        scoreList = JSON.parse(localStorage.getItem("scores"));
    }
}

function getNewQuestion() {

    resetState();

    questionCounter++
    let questionIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex]
    questionEl.innerText = currentQuestion.question;

    answersIndex = currentQuestion.answers;
    addAnswers(answersIndex); 

    availableQuestions.splice(questionsIndex, 1);

    if (availableQuestions == 0) {
        users.push(userName.value);
        console.log(users);
        scoreList.push(score);
        console.log(scoreList);
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("scores", JSON.stringify(scoreList));
        questionContainerEl.classList.add("hide");
        topScores.classList.remove("hide")
        results();
    }
}

function addAnswers() {
    
    let correctAnswer = currentQuestion.correct;
                
    
    for(let i = 0; i < answersIndex.length; i++) {
            answerBtn = document.createElement("button");
            answerBtn.setAttribute("type", "button");
            answerBtn.className += "btn btn-outline-dark answers";
            answerBtn.innerText = answersIndex[i];
            answerBtn.setAttribute("value", i)
            answerEl.appendChild(answerBtn)
            answerBtn.addEventListener("click", function(e) {
                if (e.target.value == correctAnswer) {
                    score++
                    getNewQuestion();
                } else {
                    getNewQuestion();
                    console.log(counter)
                }
                
            })
        }
}
   

function resetState() {
     while(answerEl.firstChild) {
         answerEl.removeChild(answerEl.firstChild)
     }
}



function startTimer() {

//convert time to show like clock
function convertSeconds(s) {
    var min = Math.floor(s/60);
    var sec = s % 60;
    var time = min.toString().padStart(2, 0) + ":" + sec.toString().padStart(2, 0)
    
    return time;
    
}

//setting the time interval
var timer = document.getElementById("timer");
    timer.textContent = convertSeconds(timeLeft - counter);

    var interval = setInterval(timeIt, 1000);

 function timeIt(){
        counter++;
        timer.textContent = convertSeconds(timeLeft - counter);

//time needs to stop at zero. Once time is out record score and go to the rankings page.
        if(counter == timeLeft) {
            users.push(userName.value);
            console.log(users);
            scoreList.push(score);
            console.log(scoreList);
            localStorage.setItem("users", JSON.stringify(users));
            localStorage.setItem("scores", JSON.stringify(scoreList));
            questionContainerEl.classList.add("hide");
            topScores.classList.remove("hide")
            results();
        }
    }
}

function results() {
    let userScore = JSON.parse(localStorage.getItem("scores"));
    console.log(userScore);
    let userName = JSON.parse(localStorage.getItem("users"));
    console.log(userName);
   
    for(let i = 0; i < userScore.length; i++) {
        let scoreList = document.getElementById("score-list");  
        let playerScore = document.createElement("li");
        playerScore.textContent = "Name: " + userName[i] + " " + "Score: " + userScore[i];
        scoreList.appendChild(playerScore);
    }
        
}





    
    


