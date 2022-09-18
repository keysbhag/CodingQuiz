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

mainScreen();

let mainClose = document.querySelector('.container-start');
let quizOpen = document.querySelector('.container-quiz')
let executeQuiz = document.querySelector(".btn-start");

executeQuiz.addEventListener("click", function() {
    mainClose.style.display = 'none';
    quizOpen.style.display = 'flex';

});






