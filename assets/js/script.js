let mainScreen = function () {
    let mainPrompt = document.querySelector('.container');
    let gameIntro = document.createElement("h1");
    let infoTag = document.createElement("p");
    // let startQuiz = document.createElement("button");

    gameIntro.textContent = "Welcome to The Ultimate Coding Quiz"
    infoTag.textContent = "Answer the multiple choice questions in the correct amount of time. Each right answer is 5 points. every 5 seconds passed is minus 1 point "
    // startQuiz.textContent ="Start Quiz";

    mainPrompt.appendChild(gameIntro);
    mainPrompt.appendChild(infoTag);
    // mainPrompt.appendChild(startQuiz);

    for (let i = 0; i < 2; i++) {
        mainPrompt.children[i].setAttribute("style", "margin: 10px;")
    }
}

mainScreen();

let mainClose = document.querySelector('.container');
let executeQuiz = document.querySelector(".btn-start");

executeQuiz.addEventListener("click", function() {
    mainClose.style.display = 'none';
});




