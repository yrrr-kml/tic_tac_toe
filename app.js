let gameIntro = document.querySelector("#game-intro");
let introBtn = document.querySelector(".intro-btn");

let gameForm = document.querySelector("#game-form");
let inp = document.querySelectorAll("input");
let formBtn = document.querySelector(".form-btn");

let gameContainer = document.querySelector("#game-container");
let player = document.querySelector(".player");

let turnIndicator = document.querySelector(".turn-indicator");

let Xscore = document.querySelector(".X-Score");
let Oscore = document.querySelector(".O-Score");
let Draws = document.querySelector(".draws-Score");

let result = document.querySelector(".result-card");
let resultMsg = document.querySelector(".result-msg");

let nextRound = document.querySelector(".another-round");
let restart = document.querySelector(".restart");

let playerXname;
let playerOname;

// Score board ke liye
let playerXwins = 0;
let playerOwins = 0;
let draws = 0;

let gameOver = false; // Game chale ga false pe

let boxes = document.querySelectorAll(".box");
let turn = true;

let winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
];

// INTRO
introBtn.addEventListener("click", () => {
    gameIntro.style.display = "none";
    gameForm.style.display = "flex";
});

// PLAYER FORM
formBtn.addEventListener("click", () => {
    playerXname = inp[0].value;
    playerOname = inp[1].value;
    if (playerXname === "" || playerOname === "") {
        let x = Math.random() * (window.innerWidth - formBtn.offsetWidth);
        let y = Math.random() * (window.innerHeight - formBtn.offsetHeight);
        formBtn.style.position = "absolute";
        formBtn.style.left = x + "px";
        formBtn.style.top = y + "px";
    } else {
        gameForm.style.display = "none";
        gameContainer.style.display = "flex";
        player.innerText = `${playerXname} vs ${playerOname}`;
        turnIndicator.innerHTML = `${playerXname}'s turn - X`;
    }
});

// CHECK WINNER
const checkWinner = () => {
    let allFilled = [...boxes].every(box => box.children.length === 1);
    let winnerFound = false;
    winPatterns.forEach(pattern => {
        let pos1 = boxes[pattern[0]];
        let pos2 = boxes[pattern[1]];
        let pos3 = boxes[pattern[2]];
        // Teeno boxes occupied hain?
        if (
            pos1.children.length &&
            pos2.children.length &&
            pos3.children.length
        ) {
            // Teeno same image hain?
            if (
                pos1.children[0].src === pos2.children[0].src &&
                pos2.children[0].src === pos3.children[0].src
            ) {
                winnerFound = true;
                pos1.classList.add("winner");
                pos2.classList.add("winner");
                pos3.classList.add("winner");
                // Winner X hai?
                if (pos1.children[0].src.includes("x.png")) {
                    result.style.display = "flex";
                    resultMsg.innerText = `${playerXname} is the winner! 🏆\nand ${playerOname} loses! 😭 `;
                    playerXwins++;
                    Xscore.innerText = `${playerXwins}`;
                    gameOver = true;

                } else {
                    result.style.display = "flex";
                    resultMsg.innerText = `${playerOname} is the winner! 🏆\nand ${playerXname} loses! 😭`;
                    playerOwins++;
                    Oscore.innerText = `${playerOwins}`;
                    gameOver = true;
                }
            }
        }
    });
    if (allFilled && !winnerFound) {
        result.style.display = "flex";
        resultMsg.innerText = "It's a Draw! 🤝";
        draws++;
        Draws.innerText = `${draws}`;
        gameOver = true;
    }
};

// BOARD
for (let box of boxes) {
    box.addEventListener("click", () => {
        if (gameOver === true) {
            alert("winner mil gaya hai");
        } else {
            let ele = box.children;
            // Box empty hai?
            if (ele.length === 0) {
                if (turn) {
                    let img = document.createElement("img");
                    img.src = "x.png";
                    img.classList.add("img");
                    box.append(img);
                    turn = false;
                    turnIndicator.innerHTML = `${playerOname}'s turn - O`;
                } else {
                    let img = document.createElement("img");
                    img.src = "o.png";
                    img.classList.add("img");
                    box.append(img);
                    turn = true;
                    turnIndicator.innerHTML = `${playerXname}'s turn - X`;
                }
                // Move ke baad winner check
                checkWinner();
            } else {
                alert("already occupied");
            }
        }
    });
}

const restartBoard = () => {
    for (let box of boxes) {
        if (box.children.length === 1) {
            box.removeChild(box.children[0]);
        }
        box.classList.remove("winner");
    }
    gameOver = false;
    turn = true;
    turnIndicator.innerHTML = `${playerXname}'s turn - X`;
};

nextRound.addEventListener("click", () => {
    restartBoard();
    result.style.display = "none";
});

restart.addEventListener("click", () => {
    restartBoard();
    playerXwins = 0;
    playerOwins = 0;
    draws = 0;
    Xscore.innerText = `${playerXwins}`;
    Oscore.innerText = `${playerOwins}`;
    Draws.innerText = `${draws}`;
    result.style.display = "none";
});