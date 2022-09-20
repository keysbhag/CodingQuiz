let mainStartScreen = document.querySelector('.container-start');
let viewHighScores = document.querySelector('.view-high-scores');
let quizOpen = document.querySelector('.container-quiz');
let highScoreScreen = document.querySelector('.container-high-score');
let questionPrompt = document.querySelector('#question');
let answerAlert = document.querySelector('#alert');
let changeQuestionNum = document.querySelector('#question-num');
let answerButtons = document.querySelectorAll(".answer");
let timerEl = document.getElementById('timer');
let removeTimePlaceHold = document.getElementById('remove-time');
let gameIntro = document.createElement('h2');
let infoTag = document.createElement('p');
let startQuiz = document.createElement('button');
startQuiz.classList.add('.btn-start');
let cutDisplay = document.querySelector('.anchor'); //------

let renderCount=0

let sortedDictionary;
let sortedDictionaryIndex = 0;

let timerStartClock = 60;

let scoreCount = 0;
let updateScore = document.querySelector('.score-count')
updateScore.textContent = scoreCount;

let highScoresList = [ { name: "jj", score: "0"}];



//------------------------------
let mainScreen = function () {
    mainStartScreen.style.display = 'flex';
    highScoreScreen.style.display = 'none';

    gameIntro.textContent = "Welcome to The Ultimate Coding Quiz";
    infoTag.textContent = "Answer the multiple choice questions in the correct amount of time. Each right answer is 5 points. Each wrong answer is minus 3 seconds from the clock. GOODLUCK!";
    startQuiz.textContent ="Start Quiz!";
    startQuiz.classList.add('btn-start')

    mainStartScreen.appendChild(gameIntro);
    mainStartScreen.appendChild(infoTag);
    mainStartScreen.appendChild(startQuiz);

    for (let i = 0; i < 3; i++) {
        mainStartScreen.children[i].setAttribute("style", "margin: 20px;")
    }
}
 //--------------------------
function countdown(timeStart) {
    let timeSeconds = document.createElement("h4");

    timeSeconds.classList.add('seconds');

    timerEl.appendChild(timeSeconds);

    let startTimer = setInterval(function() {
        if (timeStart === 60) {
            timerEl.removeChild(removeTimePlaceHold);
        }
        timeStart--;
        timeSeconds.textContent = timeStart;
        if (answerAlert.innerText == "Incorrect. -5 seconds") {
            timeStart = timeStart - 5;
        }
        if (timeStart < 0 ){
            timeSeconds.textContent = 0;
            clearInterval(startTimer);
            enterHighScore();
        }
        else if (sortedDictionaryIndex === questionsDictionary.length) {
            timeSeconds.textContent = timeStart;
            clearInterval(startTimer);
        }

        viewHighScores.onclick = function() {
            timeSeconds.textContent = timeStart;
            clearInterval(startTimer);
        }
        
    }, 1000);
}

// ---------------------------------
function loadFirstQuestion () {
    sortedDictionary = questionsDictionary.sort(function(){return 0.5 - Math.random()});
    questionPrompt.innerText = sortedDictionary[sortedDictionaryIndex].question;
    changeQuestionNum.textContent = (sortedDictionaryIndex + 1);
    let btnTags = document.querySelectorAll(".answer");
    for (let i = 0; i < 4; i++) {
        btnTags[i].innerText = sortedDictionary[sortedDictionaryIndex].answers[i]["answer"];
        btnTags[i].value = sortedDictionary[sortedDictionaryIndex].answers[i]["status"];
    }
    btnTags.forEach(item => {item.addEventListener('click',selectAnswer)})
}

// ---------------------------------
function loadOtherQuestions () {
    questionPrompt.innerText = sortedDictionary[sortedDictionaryIndex].question;
    changeQuestionNum.textContent = (sortedDictionaryIndex + 1);
    let btnTags = document.querySelectorAll(".answer");
    for (let i = 0; i < 4; i++) {
        btnTags[i].innerText = sortedDictionary[sortedDictionaryIndex].answers[i]["answer"];
        btnTags[i].value = sortedDictionary[sortedDictionaryIndex].answers[i]["status"];
    }
    btnTags.forEach(item => {item.addEventListener('click',selectAnswer)})
}

//------------------------------------
function selectAnswer (event) {
    let selectedButton = event.target;

    if (selectedButton.value === "1"){
        correctAnswerAlert();
        scoreCount = scoreCount + 5;
        updateScore.textContent = scoreCount;
    } else {
        wrongAnswerAlert();
    }
    sortedDictionaryIndex ++;
    if(sortedDictionaryIndex === questionsDictionary.length) {
        enterHighScore();
    }
    if (sortedDictionaryIndex < questionsDictionary.length) {
        loadOtherQuestions();
    }
}

//---------------------------------
function correctAnswerAlert () {
    let time = 1;
    answerAlert.innerText = "Correct";
    answerAlert.style.backgroundColor="lightgreen";
    let startTimer = setInterval(function() {
        time--;
        if (time === 0){
            answerAlert.innerText = " ";
            answerAlert.style.backgroundColor="transparent";
            clearInterval(startTimer);
        }
        
    }, 1000);
}

//------------------------------------
function wrongAnswerAlert () {
    let time = 1;
    answerAlert.innerText = "Incorrect. -5 seconds";
    answerAlert.style.backgroundColor="crimson";
    let startTimer = setInterval(function() {
        time--;
        if (time === 0){
            answerAlert.innerText = " ";
            answerAlert.style.backgroundColor="transparent";
            clearInterval(startTimer);
        }
        
    }, 1000);
}

//-------------------------------
function enterHighScore () {        
    let finalScore = document.querySelector(".your-score");
    let enterScore = document.querySelector(".high-score-input");
    let submitScore = document.querySelector(".high-score-enter");

    finalScore.textContent = "Final Score: "+scoreCount;

    quizOpen.style.display = 'none';
    highScoreScreen.style.display = 'flex';

    highScoreScreen.appendChild(finalScore);

    submitScore.addEventListener("click",function(event) {
        event.preventDefault();
        let scoreText = enterScore.value.trim();

        if (scoreText === " ") {
            enterHighScore();
        }

        highScoresList.push({
            name: scoreText,
            score: scoreCount});

        let sortedHighScoresList = highScoresList.sort((a,b) => { return b.score - a.score;})

        highScoresList = sortedHighScoresList;

        enterScore.value = " ";

        cutDisplay.style.display= 'none';
        
        storeScore();
        // renderHighScores();
    });

}

function renderHighScores(renderCount) {
    let highScores = document.querySelector(".high-score-list");
    if (renderCount !== 0) {
        let newRow = document.createElement('tr');
        let tdName = document.createElement("td");
        let tdScore = document.createElement("td");

        tdName.textContent = highScoresList[highScoresList.length -1].name;
        tdScore.textContent = highScoresList[highScoresList.length -1].score;

        highScores.appendChild(newRow);
        newRow.appendChild(tdName);
        newRow.appendChild(tdScore);

        return;
    }
  
    renderCount++;
    for (let i = 0; i < highScoresList.length; i++) {
        let newRow = document.createElement('tr');
        let tdName = document.createElement("td");
        let tdScore = document.createElement("td");

        tdName.textContent = highScoresList[i].name;
        tdScore.textContent = highScoresList[i].score;
        
        highScores.appendChild(newRow);
        newRow.appendChild(tdName);
        newRow.appendChild(tdScore);
    }
}

function storeScore() {
    localStorage.setItem("highScoresList", JSON.stringify(highScoresList));
}

function init() {
    let storedScores = JSON.parse(localStorage.getItem("highScoresList"));

    if (storedScores !== null){
        highScoresList = storedScores;
    }

    renderHighScores(renderCount);
}

//--------------------------------
mainScreen();
init();
startQuiz.addEventListener("click", function() {
    mainStartScreen.style.display = 'none';
    quizOpen.style.display = 'flex';
    countdown(timerStartClock);
    loadFirstQuestion();
});

viewHighScores.addEventListener('click', function() {
    mainStartScreen.style.display = 'none';
    quizOpen.style.display = 'none';
    highScoreScreen.style.display = 'flex';
    cutDisplay.style.display = 'none';
});


// -------------------------------------
let questionsDictionary = [
    {
        question: 'Why did the chicken cross the road?',
        answers: [
          { answer: 'to get to the other side', status: 1 },
          { answer: 'to dance', status: 0 },
          { answer: 'to invest in crypto', status: 0 },
          { answer: 'to buy grapes', status: 0 }
        ]
      },
      {
        question: 'What is the most important syntax?',
        answers: [
          { answer: 'semi-colon ;', status: 1 },
          { answer: 'variable', status: 0 },
          { answer: 'beep bop', status: 0 },
          { answer: 'if statement', status: 0 }
        ]
      },
      {
        question: 'Whats the best programming language?',
        answers: [
          { answer: ' C ', status: 0 },
          { answer: 'Python', status: 0 },
          { answer: 'Java', status: 0 },
          { answer: 'JavaScript', status: 1 }
        ]
      },
      {
        question: 'What is the language that makes pages beautiful',
        answers: [
          { answer: 'Flask', status: 0 },
          { answer: 'HTML', status: 0 },
          { answer: 'CSS', status: 1 },
          { answer: 'Door Dash', status: 0 }
        ]
      }
    ]






