let userScore = 0;
let compScore = 0;
let username = "You";
let gameOver = false;

const startBtn = document.getElementById("startBtn");
const welcomeScreen = document.getElementById("welcome-screen");
const gameScreen = document.getElementById("game-screen");
const userScorePara = document.getElementById("user-score");
const compScorePara = document.getElementById("comp-score");
const userNameDisplay = document.getElementById("user-name");
const msg = document.getElementById("msg");
const choices = document.querySelectorAll(".choice");
const finishBtn = document.getElementById("finishBtn");
const restartBtn = document.getElementById("restartBtn");

startBtn.addEventListener("click", () => {
  const inputName = document.getElementById("username").value.trim();
  if (inputName === "") {
    alert("Please enter your name.");
    return;
  }

  username = inputName;
  userNameDisplay.innerText = username;

  welcomeScreen.style.display = "none";
  gameScreen.style.display = "block";
});

const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  return options[Math.floor(Math.random() * 3)];
};

const drawGame = () => {
  msg.innerText = "Game was Draw. Play again.";
  msg.style.backgroundColor = "#081b31";
};

const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `${username} wins! ${userChoice} beats ${compChoice}`;
    msg.style.backgroundColor = "green";
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `Computer wins! ${compChoice} beats ${userChoice}`;
    msg.style.backgroundColor = "red";
  }
};

const playGame = (userChoice) => {
  if (gameOver) return;

  const compChoice = genCompChoice();

  if (userChoice === compChoice) {
    drawGame();
  } else {
    let userWin = true;
    if (userChoice === "rock") {
      userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      userWin = compChoice === "scissors" ? false : true;
    } else {
      userWin = compChoice === "rock" ? false : true;
    }
    showWinner(userWin, userChoice, compChoice);
  }
};

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});

finishBtn.addEventListener("click", () => {
  gameOver = true;

  if (userScore > compScore) {
    alert(`${username} wins the game! 🎉`);
  } else if (userScore < compScore) {
    alert(`Computer wins the game. Better luck next time, ${username}!`);
  } else {
    alert(`It's a draw, ${username}!`);
  }

  restartBtn.style.display = "inline-block";
});

restartBtn.addEventListener("click", () => {
  userScore = 0;
  compScore = 0;
  gameOver = false;

  userScorePara.innerText = userScore;
  compScorePara.innerText = compScore;
  msg.innerText = "Play your move";
  msg.style.backgroundColor = "#081b31";
  restartBtn.style.display = "none";
});
