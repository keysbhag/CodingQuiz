let mainClose = document.querySelector('.container-start');
let quizOpen = document.querySelector('.container-quiz')
let executeQuiz = document.querySelector(".btn-start");
let answerButtons = document.querySelectorAll(".answer");
let questionPrompt = document.querySelector("#question")
let sortedDictionary;
let sortedDictionaryIndex = 0;

// ------------------------------
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
 // --------------------------
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

//--------------------------------

mainScreen();

executeQuiz.addEventListener("click", function() {
    mainClose.style.display = 'none';
    quizOpen.style.display = 'flex';
    countdown();
    loadFirstQuestion();
});
    
function loadFirstQuestion () {
    sortedDictionary = questionsDictionary.sort(function(){return 0.5 - Math.random()});
    questionPrompt.innerText = sortedDictionary[sortedDictionaryIndex].question;
    let btnTags = document.querySelectorAll(".answer");
    for (let i = 0; i < 4; i++) {
        btnTags[i].innerText = sortedDictionary[sortedDictionaryIndex].answers[i]["text"];
        btnTags[i].value = sortedDictionary[sortedDictionaryIndex].answers[i]["status"];
    } 
}

function loadOtherQuestions () {

}

function selectAnswer (event) {
    let btnTags = documentQuerySelectorAll(".answer");
    let selectedButton = event.target;
    for (let i = 0; i < 4; i++) {
        if 
    }

}


let questionsDictionary = [
    {
        question: 'What is 2 + 2?',
        answers: [
          { text: '4', status: 1 },
          { text: '22', status: 0 },
          { text: '22', status: 0 },
          { text: '22', status: 0 }
        ]
      },
      {
        question: 'Who is the best YouTuber?',
        answers: [
          { text: 'Web Dev Simplified', status: 0 },
          { text: 'Traversy Media', status: 0 },
          { text: 'Dev Ed', status: 1 },
          { text: 'Fun Fun Function', status: 0 }
        ]
      },
      {
        question: 'Is web development fun?',
        answers: [
          { text: 'Kinda', status: 0 },
          { text: 'YES!!!', status: 0 },
          { text: 'Um no', status: 0 },
          { text: 'IDK', status: 1 }
        ]
      },
      {
        question: 'What is 4 * 2?',
        answers: [
          { text: '6', status: 0 },
          { text: '8', status: 1 },
          { text: '8', status: 1 },
          { text: '8', status: 1 }
        ]
      }
    ]






