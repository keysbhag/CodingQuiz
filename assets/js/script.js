let mainScreen = function () {
    let mainPrompt = document.querySelector('.container');
    let gameIntro = document.createElement("h1");
    let infoTag = document.createElement("p");
    // let startQuiz = document.createElement("button");

    gameIntro.textContent = "Welcome to The Ultimate Coding Quiz";
    infoTag.textContent = "Answer the multiple choice questions in the correct amount of time. Each right answer is 5 points. every 5 seconds passed is minus 1 point ";
    // startQuiz.textContent ="Start Quiz";

    mainPrompt.appendChild(gameIntro);
    mainPrompt.appendChild(infoTag);
    // mainPrompt.appendChild(startQuiz);

    for (let i = 0; i < 2; i++) {
        mainPrompt.children[i].setAttribute("style", "margin: 10px;")
    }
}

let trollScreen = function () {
    let mainPrompt = document.querySelector('.container2');
    let trollIntro = document.createElement("h1");

    trollIntro.textContent = "HAHA Just Trolling 🤪";

    mainPrompt.appendChild(trollIntro)
}

mainScreen();

trollScreen();

let mainClose = document.querySelector('.container');
let trollOpen = document.querySelector(".container2");
let executeQuiz = document.querySelector(".btn-start");

executeQuiz.addEventListener("click", function() {
    mainClose.style.display = 'none';
    trollOpen.style.display = 'flex';

});






