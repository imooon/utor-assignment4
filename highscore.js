var score = 0;
var container = document.querySelector("#container");
var quizQuestions = document.querySelector("#quizQuestions");
var questionTitle = document.querySelector("#questionTitle");
var timer = document.querySelector("#timer");
var startBtn = document.querySelector("#start");
var questionIndex = 0;
var countdown = 60;
var penalty = 5;

var questions = [
    { title: "What is the last month in a year?", choices: ["January", "March", "August", "December"], answer: "December" },
    { title: "How many weeks in a full year?", choices: ["16", "52", "48", "56"], answer: "52" },
    { title: "What kind of cat is the biggest?", choices: ["Lion", "Leopard", "Tiger", "My pet cat"], answer: "Tiger" },
    { title: "How many hours do lions sleep in a day?", choices: ["More than 20", "Less than 6", "About 2 hours", "Sleep is for the weak"], answer: "More than 20" }
];

var createUl = document.createElement("ul");
createUl.setAttribute("id", "rulesUl");

var timeInterval = 0;

startBtn.addEventListener("click", function () {
    if (timeInterval === 0) {
        timeInterval = setInterval(function () {
            countdown--;
            timer.textContent = "Time left: " + countdown;
            if (countdown <= 0) {
                clearInterval(timeInterval);
                theEnd();
            }
        }, 1000);
    }
    newQuestion(questionIndex);
});

function newQuestion(index) {
    quizQuestions.innerHTML = "";
    createUl.innerHTML = "";
    var displayQuestion = document.createElement("h2");
    displayQuestion.innerHTML = questions[index].title;
    var displayChoices = questions[index].choices;
    quizQuestions.appendChild(displayQuestion);
    displayChoices.forEach(function (choice) {
        var listItem = document.createElement("li");
        listItem.innerHTML += "<button>" + choice + "</button>";
        quizQuestions.appendChild(createUl);
        createUl.appendChild(listItem);
        listItem.addEventListener("click", checkAns);
    });
}

var newDiv = document.createElement("div");
var feedback = document.createElement("h3");
newDiv.setAttribute("id", "newDiv");

function checkAns(event) {
    var choice = event.target;
    quizQuestions.appendChild(newDiv);
    newDiv.appendChild(feedback);
    var next = document.createElement("button");
    next.setAttribute("id", "nextButton");
    next.textContent = "Next Question";
    if (choice.textContent == questions[questionIndex].answer) {
        score++;
        feedback.textContent = "Correct!";
        newDiv.appendChild(feedback);
        newDiv.appendChild(next);
        next.addEventListener("click", movingOn);
    } else {
        countdown -= penalty;
        feedback.textContent = "Incorrect!";
        newDiv.appendChild(feedback);
    }
}

function movingOn() {
    newDiv.innerHTML = "";
    questionIndex++;
    if (questionIndex >= questions.length) {
        theEnd();
    } else {
        newQuestion(questionIndex);
    }
}

function theEnd() {
    quizQuestions.innerHTML = "";
    timer.innerHTML = "";

    var newH1 = document.createElement("h1");
    newH1.setAttribute("id", "newH1");
    newH1.textContent = "Finished!"
    quizQuestions.appendChild(newH1);

    if (countdown >= 0) {
        score = countdown;
        clearInterval(timeInterval);
        var newP = document.createElement("p");
        newP.textContent = "Your final score is: " + score;
        quizQuestions.appendChild(newP);
    } else {
        score = 0;
        var outOfTime = document.createElement("h2");
        outOfTime.textContent = "Time up!";
        quizQuestions.appendChild(outOfTime);
        var newP = document.createElement("p");
        newP.textContent = "Your final score is: " + score;
        quizQuestions.appendChild(newP);
    }

    // Initials submission 
    var initialsPrompt = document.createElement("label");
    initialsPrompt.setAttribute("for", "inputBox");
    initialsPrompt.textContent = "Enter your initials: ";
    quizQuestions.appendChild(initialsPrompt);

    var inputBox = document.createElement("input");
    inputBox.setAttribute("type", "text");
    inputBox.setAttribute("id", "inputBox");
    inputBox.textContent = "";
    quizQuestions.appendChild(inputBox);

    var submit = document.createElement("button");
    submit.setAttribute("type", "submit");
    submit.setAttribute("id", "submit");
    submit.textContent = "Submit";
    quizQuestions.appendChild(submit);

    submit.addEventListener("click", function () {
        var initials = inputBox.value.trim(); // Trim to remove leading/trailing whitespaces

        if (initials === "") {
            console.log("No initials provided");
            window.alert("Please enter your initials");
        } else {
            var finalScore = {
                initials: initials,
                score: score
            };

            var storeScores = localStorage.getItem("storeScores");
            if (storeScores === null) {
                storeScores = [];
            } else {
                storeScores = JSON.parse(storeScores);
            }
            storeScores.push(finalScore);
            var newScore = JSON.stringify(storeScores);
            localStorage.setItem("storeScores", newScore);
            window.location.replace("highscore.html");
        }
    });
};
