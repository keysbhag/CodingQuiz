let mainStartScreen = document.querySelector('.container-start');
let quizOpen = document.querySelector('.container-quiz');
let highScoreScreen = document.querySelector(".container-high-score");
let questionPrompt = document.querySelector("#question");
let answerAlert = document.querySelector("#alert");
let answerButtons = document.querySelectorAll(".answer");
let timerEl = document.getElementById('timer');
let removeTimePlaceHold = document.getElementById('remove-time');
let gameIntro = document.createElement("h2");
let infoTag = document.createElement("p");
let startQuiz = document.createElement("button");
startQuiz.classList.add(".btn-start");

let renderCount=0

let sortedDictionary;
let sortedDictionaryIndex = 0;

let timerStartClock = 60;

let scoreCount = 0;
let updateScore = document.querySelector(".score-count")
updateScore.textContent = scoreCount;

let highScoresList = [ { name: "JV",
                        score: 0 }];

console.log(highScoresList);

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
            let timerResult = document.querySelector(".seconds")
            console.log(timerResult.innerText);
        }
        
    }, 1000);
}

// ---------------------------------
function loadFirstQuestion () {
    sortedDictionary = questionsDictionary.sort(function(){return 0.5 - Math.random()});
    questionPrompt.innerText = sortedDictionary[sortedDictionaryIndex].question;
    let btnTags = document.querySelectorAll(".answer");
    for (let i = 0; i < 4; i++) {
        btnTags[i].innerText = sortedDictionary[sortedDictionaryIndex].answers[i]["text"];
        btnTags[i].value = sortedDictionary[sortedDictionaryIndex].answers[i]["status"];
    }
    btnTags.forEach(item => {item.addEventListener('click',selectAnswer)})
}

// ---------------------------------
function loadOtherQuestions () {
    questionPrompt.innerText = sortedDictionary[sortedDictionaryIndex].question;
    console.log(sortedDictionaryIndex);
    let btnTags = document.querySelectorAll(".answer");
    for (let i = 0; i < 4; i++) {
        btnTags[i].innerText = sortedDictionary[sortedDictionaryIndex].answers[i]["text"];
        btnTags[i].value = sortedDictionary[sortedDictionaryIndex].answers[i]["status"];
    }
    btnTags.forEach(item => {item.addEventListener('click',selectAnswer)})
}

//------------------------------------
function selectAnswer (event) {
    let selectedButton = event.target;
    console.log(selectedButton);
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

        enterScore.value = " ";
        
        storeScore();
        renderHighScores();
    });

}

function renderHighScores(renderCount) {
    let highScores = document.querySelector(".high-score-list");

    if (renderCount !== 0) {
        let liName = document.createElement("li");
        let liScore = document.createElement("li");


        liName.textContent = highScoresList[highScoresList.length -1].name;
        liScore.textContent = highScoresList[highScoresList.length -1]["score"];
        liName.setAttribute = ("data-index", highScoresList.length -1 );
        liScore.setAttribute = ("data-index", highScoresList.length -1);

        highScores.appendChild(liName);
        highScores.appendChild(liScore);

        return;
    }
  
    renderCount++;

    for (let i = 0; i < highScoresList.length; i++) {
        let liName = document.createElement("li");
        let liScore = document.createElement("li");


        liName.textContent = highScoresList[i].name;
        liScore.textContent = highScoresList[i]["score"];
        liName.setAttribute = ("data-index", i);
        liScore.setAttribute = ("data-index", i);

        highScores.appendChild(liName);
        highScores.appendChild(liScore);
    }
}

function storeScore() {
    localStorage.setItem("highScoreList", JSON.stringify(highScoresList));
    console.log("boom");
}

function init() {
    let storedScores = JSON.parse(localStorage.getItem("highScoreList"));

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

// -------------------------------------
let questionsDictionary = [
    {
        question: 'Why did the chicken cross the road?',
        answers: [
          { text: 'to get to the other side', status: 1 },
          { text: 'to dance', status: 0 },
          { text: 'to invest in crypto', status: 0 },
          { text: 'to buy grapes', status: 0 }
        ]
      },
      {
        question: 'What is the most important syntax?',
        answers: [
          { text: 'semi-colon ;', status: 1 },
          { text: 'variable', status: 0 },
          { text: 'beep bop', status: 0 },
          { text: 'if statement', status: 0 }
        ]
      },
      {
        question: 'Whats the best programming language?',
        answers: [
          { text: ' C ', status: 0 },
          { text: 'Python', status: 0 },
          { text: 'Java', status: 0 },
          { text: 'JavaScript', status: 1 }
        ]
      },
      {
        question: 'What is the language that makes pages beautiful',
        answers: [
          { text: 'Flask', status: 0 },
          { text: 'HTML', status: 0 },
          { text: 'CSS', status: 1 },
          { text: 'Door Dash', status: 0 }
        ]
      }
    ]






