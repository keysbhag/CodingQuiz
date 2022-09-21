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

// The purpose of this function is to show and populate the main screen as well as hide any other screens behind it.
let mainScreen = function () {
    // hides the high score screen and shows the start menu
    mainStartScreen.style.display = 'flex';
    highScoreScreen.style.display = 'none';
    
    // populates the main screen with text
    gameIntro.textContent = "Welcome to The Ultimate Coding Quiz";
    infoTag.textContent = "Answer the multiple choice questions in the correct amount of time. Each right answer is 10 points. Each wrong answer is minus 10 seconds from the clock. GOODLUCK!";
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
        if (answerAlert.innerText == "Incorrect. -10 seconds") { // Checks if an incorrect prompt pops up, and takes away 5 seconds if it does.
            timeStart = timeStart - 10; 
        }
        timeStart--;
        timeSeconds.textContent = timeStart;
        // If the timer falls below 0 the time interval stops and enters the submit high score page
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

// This function randomizes the questions dictionary and then calls the loadQuestions function 
function initializeDictionary() {
    sortedDictionary = questionsDictionary.sort(function(){return 0.5 - Math.random()});
    loadQuestion();
}

// This function loads questions and values to the corresponding locations so that it appears as a question with four answer options 
function loadQuestion () {
    // puts the question value in the right box
    questionPrompt.innerText = sortedDictionary[sortedDictionaryIndex].question;
    // Adds a number to the end of every "Question" display
    changeQuestionNum.textContent = (sortedDictionaryIndex + 1);
    // For loop populates each of the 4 question boxes
    for (let i = 0; i < 4; i++) {
        answerButtons[i].innerText = sortedDictionary[sortedDictionaryIndex].answers[i]["answer"];
        answerButtons[i].value = sortedDictionary[sortedDictionaryIndex].answers[i]["status"];
    }
    answerButtons.forEach(item => {item.addEventListener('click',selectAnswer)})
}

// Selects the button and uses event target to get the value of the button. Depending on the value of the button will give me the the correct prompt or the incorrect prompt.
// if the correct value is selected you gain 10 points.  
function selectAnswer (event) {
    let selectedButton = event.target;
    // Correct answers are given a value of 1
    if (selectedButton.value === "1"){
        correctAnswerAlert();
        scoreCount = scoreCount + 10;
        updateScore.textContent = scoreCount;
    }
    else {
        wrongAnswerAlert();
    }
    // increment the index to move to the next question
    sortedDictionaryIndex ++;
    // if the index value and the length of the dictionary value are the same it means the user has completed the quiz before the timer and the high score screen is loaded
    if(sortedDictionaryIndex === questionsDictionary.length) {
        enterHighScore();
    } 
    else {
        loadQuestion();
    }
}

// Pops up a nice alert for 1 second letting the user know the answer is correct
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

// Pops up a nice alert for 1 second saying the answer is incorrect. lets the user know 10 seconds will be deducted.
function wrongAnswerAlert () {
    let time = 1;
    answerAlert.innerText = "Incorrect. -10 seconds";
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

// This function will fill in the text content for the final score the user has accumulated. It will then prompt the user to
// enter an initial (or full name) to store with their score in an object. This is then stored in local storage and displayed
// at the bottom of the screen as a table.
function enterHighScore () {        
    let finalScore = document.querySelector(".your-score");
    let enterScore = document.querySelector(".high-score-input");
    let submitScore = document.querySelector(".high-score-enter");

    finalScore.textContent = "Final Score: "+scoreCount;

    quizOpen.style.display = 'none';
    highScoreScreen.style.display = 'flex';

    highScoreScreen.appendChild(finalScore);
    // When the submit score button is clicked, the function called will push the score value along with the users initial to be stored in an object.
    submitScore.addEventListener("click",function(event) {
        event.preventDefault();
        let scoreText = enterScore.value.trim();

        if (scoreText === " ") {
            enterHighScore();
        }

        highScoresList.push({
            name: scoreText,
            score: scoreCount});

        // Sorts the object by score in descending order so that you can see the top scores
        let sortedHighScoresList = highScoresList.sort((a,b) => { return b.score - a.score;})
        highScoresList = sortedHighScoresList;
        
        // Clears the input text and hides the submit button and conclusion statement
        enterScore.value = " ";
        cutDisplay.style.display= 'none';
        
        // Stores the scores to the local storage
        storeScore();

        // Re renders the high score list to add the new score to the list
        renderHighScores(1, scoreText, scoreCount);

    });

}

// Renders the high scores so that they are listed in a table in the high score display and after the quiz is finished
function renderHighScores(renderCount,scoreText,scoreCount) {
    let highScores = document.querySelector(".high-score-list");
    
    // When the display initializes the first time it uses a for loop to display all stored values.
    // Any time after that, which is kept track by renderCount, the newly entered score is appended to the list and the
    // list is reloaded
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

    // prints the list the first time
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

// Stores the object of highScoresList
function storeScore() {
    localStorage.setItem("highScoresList", JSON.stringify(highScoresList));
}

// initializes the object of stored scores so it is already displayed
function init() {
    let storedScores = JSON.parse(localStorage.getItem("highScoresList"));

    if (storedScores !== null){
        highScoresList = storedScores;
    }

    renderHighScores(renderCount);

    return storedScores;
}

// The code below kicks off the program with the mainScreen function, then calls the init function
mainScreen();
init();

// Once the Start button is clicked, all the other functions are called for us through out the program. It also takes care
// of any displays that need to be opened or closed
startQuizBtn.addEventListener("click", function() {
    mainStartScreen.style.display = 'none';
    quizOpen.style.display = 'flex';
    countdown();
    initializeDictionary();
});

// If the high scores button is clicked it takes us to a display of the list of high scores. If this button is clicked during a game 
// the timer also stops.   
viewHighScoresBtn.addEventListener('click', function() {
    mainStartScreen.style.display = 'none';
    quizOpen.style.display = 'none';
    highScoreScreen.style.display = 'flex';
    cutDisplay.style.display = 'none';
});


// Stored questions library 
let questionsDictionary = [
    {
        question: 'The first index of an array is ____.',
        answers: [
          { answer: '0', status: 1 },
          { answer: '1', status: 0 },
          { answer: 'custom', status: 0 },
          { answer: 'the length of the array', status: 0 }
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
      },
      {
        question: 'Sal needs to execute a section of code ten times within a program. Compare the selection structures below and select which one meets the needs identified.',
        answers: [
          { answer: 'If-Else', status: 0 },
          { answer: 'Let', status: 0 },
          { answer: 'For', status: 1 },
          { answer: 'Function', status: 0 }
        ]
      },
      {
        question: 'A loop that never ends is referred to as a(n)_________.',
        answers: [
          { answer: 'While-loop', status: 0 },
          { answer: 'Infinite-loop', status: 1 },
          { answer: 'Recursive loop', status: 0 },
          { answer: 'Switch-statement', status: 0 }
        ]
      },
      {
        question: 'How awesome is coding',
        answers: [
          { answer: 'Meh', status: 0 },
          { answer: 'Super Awesome', status: 1 },
          { answer: 'I hate it', status: 0 },
          { answer: 'Idk I do not code', status: 0 }
        ]
      },
      {
        question: 'Who invented JavaScript?',
        answers: [
          { answer: 'Teddy D Rosevelt', status: 0 },
          { answer: 'Brendan Schaub', status: 0 },
          { answer: 'Frank Reich', status: 0 },
          { answer: 'Brendan Eich', status: 1 }
        ]
      }
    ]






