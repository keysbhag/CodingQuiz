// All the variables I will need to access certain elements. 
// The function of each variable matches the description in their names.
let mainStartScreen = document.querySelector('.container-start');
let viewHighScoresBtn = document.querySelector('.view-high-scores');
let quizOpen = document.querySelector('.container-quiz');
let highScoreScreen = document.querySelector('.container-high-score');
let changeQuestionNum = document.querySelector('#question-num');
let questionPrompt = document.querySelector('#question');
let answerButtons = document.querySelectorAll('.answer');
let answerAlert = document.querySelector('#alert');
let timerEl = document.getElementById('timer');
let removeTimePlaceHold = document.getElementById('remove-time');
let gameIntro = document.createElement('h2');
let infoTag = document.createElement('p');
let startQuizBtn = document.createElement('button');
startQuizBtn.classList.add('.btn-start'); // adds a class to the quiz start button
let cutDisplay = document.querySelector('.anchor');

let renderCount = 0 // If the storage is already rendered once 

let fakeRender = 0;

let sortedDictionary;  // Randomizes the questions in the questionDictionary object.
let sortedDictionaryIndex = 0; // Lets me index the next question

// Keeps track of the score for the user and displays it while he is doing the quiz
let scoreCount = 0; 
let updateScore = document.querySelector('.score-count')
updateScore.textContent = scoreCount; 

let highScoresList = [ ]; // sets a null object to store highScores

// The purpose of this function is to show and populate the main screen
let mainScreen = function () {
    // hides the highscore screen and shows the start menu
    mainStartScreen.style.display = 'flex';
    highScoreScreen.style.display = 'none';

    gameIntro.textContent = "Welcome to The Ultimate Coding Quiz";
    infoTag.textContent = "Answer the multiple choice questions in the correct amount of time. Each right answer is 5 points. Each wrong answer is minus 5 seconds from the clock. GOODLUCK!";
    startQuizBtn.textContent ="Start Quiz!";
    startQuizBtn.classList.add('btn-start')

    mainStartScreen.appendChild(gameIntro);
    mainStartScreen.appendChild(infoTag);
    mainStartScreen.appendChild(startQuizBtn);

    for (let i = 0; i < 3; i++) {
        mainStartScreen.children[i].setAttribute("style", "margin: 20px;")
    }
}
 // The countdown function sets the timer for the quiz and handles any events that must take place when certain conditions are met
function countdown() {
    // Creates an h4 element to display the time count down
    let timeSeconds = document.createElement("h4");
    let timeStart = 60; // Starts timer at 60 seconds
    timeSeconds.classList.add('seconds'); 
       timerEl.appendChild(timeSeconds); // Appends it to the timer id
    // 
    let startTimer = setInterval(function() {
        // Once the timer starts this removes the placeholder
        if (timeStart === 60) {
            timerEl.removeChild(removeTimePlaceHold);
        }
        if (answerAlert.innerText == "Incorrect. -5 seconds") { // Checks if an incorrect prompt pops up, and takes away 5 seconds if it does.
            timeStart = timeStart - 5; 
        }
        timeStart--;
        timeSeconds.textContent = timeStart;
        // If the timer falls below 0 the time interval stops and enters the submit highscore page
        if (timeStart < 0 ){
            timeSeconds.textContent = 0;
            clearInterval(startTimer);
            enterHighScore();
        }
        // If user finishes quiz before that time the the high score page is popped up
        else if (sortedDictionaryIndex === questionsDictionary.length) {
            timeSeconds.textContent = timeStart;
            clearInterval(startTimer);
        }
        // If user leaves to high score page in the middle of the quiz, the timer is stopped
        viewHighScoresBtn.onclick = function() {
            timeSeconds.textContent = timeStart;
            clearInterval(startTimer);
        }
        
    }, 1000);
}

// This function randomizes the questions dictionary and then loads values to the corresponding locations so that it appears as a questions with four answer options 
function loadFirstQuestion () {
    sortedDictionary = questionsDictionary.sort(function(){return 0.5 - Math.random()});
    questionPrompt.innerText = sortedDictionary[sortedDictionaryIndex].question;
    changeQuestionNum.textContent = (sortedDictionaryIndex + 1);
    for (let i = 0; i < 4; i++) {
        answerButtons[i].innerText = sortedDictionary[sortedDictionaryIndex].answers[i]["answer"];
        answerButtons[i].value = sortedDictionary[sortedDictionaryIndex].answers[i]["status"];
    }
    answerButtons.forEach(item => {item.addEventListener('click',selectAnswer)})
}

// This function loads any other question after that
function loadOtherQuestions () {
    questionPrompt.innerText = sortedDictionary[sortedDictionaryIndex].question;
    changeQuestionNum.textContent = (sortedDictionaryIndex + 1);
    for (let i = 0; i < 4; i++) {
        answerButtons[i].innerText = sortedDictionary[sortedDictionaryIndex].answers[i]["answer"];
        answerButtons[i].value = sortedDictionary[sortedDictionaryIndex].answers[i]["status"];
    }
    answerButtons.forEach(item => {item.addEventListener('click',selectAnswer)})
}

// Selects the button and uses event target to get the value of the button. Depending on the value of the button will give me the the correct prompt 
function selectAnswer (event) {
    let selectedButton = event.target;

    if (selectedButton.value === "1"){
        correctAnswerAlert();
        scoreCount = scoreCount + 5;
        updateScore.textContent = scoreCount;
    }
    else {
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

// Pops up an alert for two seconds saying the answer is correct
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

// Pops up an alert for two seconds saying the answer is incorrect. lets the user know 5 seconds will be deducted.
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

// 
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
        renderHighScores(1, scoreText, scoreCount);

    });

}

function renderHighScores(renderCount,scoreText,scoreCount) {
    let highScores = document.querySelector(".high-score-list");
    if (renderCount > 0) {
        let newRow = document.createElement('tr');
        let tdName = document.createElement("td");
        let tdScore = document.createElement("td");

        tdName.textContent = scoreText;
        tdScore.textContent = scoreCount;

        highScores.appendChild(newRow);
        newRow.appendChild(tdName);
        newRow.appendChild(tdScore);

        return;
    }
  
    renderCount++;
    for (let i = 0; i < highScoresList.length; i++) {
        let newRow = document.createElement('tr');
        let tdName = document.createElement('td');
        let tdScore = document.createElement('td');

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

    return storedScores;
}

//--------------------------------
mainScreen();
init();
startQuizBtn.addEventListener("click", function() {
    mainStartScreen.style.display = 'none';
    quizOpen.style.display = 'flex';
    countdown();
    loadFirstQuestion();
});

viewHighScoresBtn.addEventListener('click', function() {
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






