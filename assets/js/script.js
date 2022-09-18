let mainScreen = function () {
    let mainPrompt = document.querySelector('.container-start');
    let gameIntro = document.createElement("h2");
    let infoTag = document.createElement("p");

    gameIntro.textContent = "Welcome to The Ultimate Coding Quiz";
    infoTag.textContent = "Answer the multiple choice questions in the correct amount of time. Each right answer is 5 points. Each wrong answer is minus 3 seconds from the clock. every 5 seconds passed is minus 1 point ";

    mainPrompt.appendChild(gameIntro);
    mainPrompt.appendChild(infoTag);

    for (let i = 0; i < 2; i++) {
        mainPrompt.children[i].setAttribute("style", "margin: 20px;")
    }
}

let timerEl = document.getElementById('timer');
let removePH = document.getElementById('remove-time');

function countdown() {
    let timeStart = 60;
    let timeSeconds = document.createElement("h4");
    timerEl.appendChild(timeSeconds);

    let startTimer = setInterval(function() {
        if (timeStart === 60) {
            timerEl.removeChild(removePH);
        }
        timeStart--;
        timeSeconds.textContent = timeStart+" sec";
        if (timeStart < 0 ){
            timeSeconds.textContent = '0 sec';
            clearInterval(startTimer);
        }
    }, 1000);
}

let mainClose = document.querySelector('.container-start');
let quizOpen = document.querySelector('.container-quiz')
let executeQuiz = document.querySelector(".btn-start");

mainScreen();

executeQuiz.addEventListener("click", function() {
    mainClose.style.display = 'none';
    countdown();
    quizOpen.style.display = 'flex';
    loadFirstQuestion();


});

let loadFirstQuestion = function () {
    
}






