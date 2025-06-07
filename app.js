let gameSeq = [];
let userSeq = [];
let highestScore = 0;

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("Game Started");
        started = true;
    }
    levelUp();
})

function gameFlash(btn) {
    btn.classList.add("game-flash");
    setTimeout(function () {
        btn.classList.remove("game-flash")
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("user-flash");
    setTimeout(function () {
        btn.classList.remove("user-flash")
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}\nHighest Score: ${highestScore}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    // console.log(randIdx);
    // console.log(randColor);
    // console.log(randBtn);

    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function checkAns(idx) {
    // console.log(`Curr level: ${level}`);
    // let idx = level-1;
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        let userScore = level-1;
        highestScore = Math.max(highestScore,userScore);
        h2.innerHTML = `GAME OVER! Your score was <b>${userScore}</b> <br>Highest Score: ${highestScore}<br>Press any key to start.`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(() => {
            document.querySelector("body").style.backgroundColor="white";
        }, 200);
        reset();
    }
}

function btnPress() {
    // console.log(this);
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}