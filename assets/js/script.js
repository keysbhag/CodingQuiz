let mainClose = document.querySelector('.container-start');
let quizOpen = document.querySelector('.container-quiz')
let executeQuiz = document.querySelector(".btn-start");
let answerButtons = document.querySelectorAll(".answer");
let questionPrompt = document.querySelector("#question")
let sortedDictionary;
let sortedDictionaryIndex = 0;

let answerAlert = document.querySelector("#alert");
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
    btnTags.forEach(item => {item.addEventListener('click',selectAnswer)})
}

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

function selectAnswer (event) {
    let selectedButton = event.target;
    console.log(selectedButton);
    if (selectedButton.value === "1"){
        answerAlert.innerText = "Correct";
        answerAlert.style.backgroundColor="lightgreen";
    } else {
        answerAlert.innerText = "Incorrect";
        answerAlert.style.backgroundColor="crimson";
    }
    sortedDictionaryIndex ++;
    if(sortedDictionaryIndex === questionsDictionary.length) {
        enterHighScore();
    }
    loadOtherQuestions();
}

function enterHighScore () {
    let gameOutro = document.createElement("h2");
    let goodBye = document.createElement("p");
    gameOutro.textContent = "Thanks for playing!";
    goodBye.textContent = "See you next time ";

    quizOpen.style.display = 'none';
    mainClose.style.display = 'flex';

    mainClose.appendChild(gameOutro);
    mainClose.appendChild(goodBye);
}


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






