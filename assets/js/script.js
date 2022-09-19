let mainStartScreen = document.querySelector('.container-start');
let quizOpen = document.querySelector('.container-quiz')
let answerButtons = document.querySelectorAll(".answer");
let questionPrompt = document.querySelector("#question");
let timerEl = document.getElementById('timer');
let removeTimePlaceHold = document.getElementById('remove-time');
let gameIntro = document.createElement("h2");
let infoTag = document.createElement("p");
let startQuiz = document.createElement("button");
startQuiz.classList.add(".btn-start");
let sortedDictionary;
let sortedDictionaryIndex = 0;
let timerStartClock = 60;

let answerAlert = document.querySelector("#alert");

// ------------------------------
let mainScreen = function () {
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
 // --------------------------
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
    mainStartScreen.removeChild(gameIntro);
    mainStartScreen.removeChild(infoTag);
    mainStartScreen.removeChild(startQuiz);
    // ----------- keep above
    let gameOutro = document.createElement("h2");
    let goodBye = document.createElement("p");
    gameOutro.textContent = "Thanks for playing!";
    goodBye.textContent = "See you next time ";

    quizOpen.style.display = 'none';
    mainStartScreen.style.display = 'flex';

    mainStartScreen.appendChild(gameOutro);
    mainStartScreen.appendChild(goodBye);

}

//--------------------------------
mainScreen();

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






