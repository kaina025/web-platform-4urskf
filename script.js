const player1Btn = document.getElementById("player1Btn");
const player2Btn = document.getElementById("player2Btn");
const resetBtn = document.getElementById("resetBtn");
const turnMessage = document.querySelector("p");
const roundResult = document.getElementById("roundResult");
const gameResult = document.getElementById("gameResult");

let player1Score = 0,
  player2Score = 0,
  currentPlayer = 1,
  currentRound = 1,
  player1Roll = 0;

player2Btn.disabled = true;

function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

function switchTurns() {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  if (currentPlayer === 1) {
    turnMessage.textContent = "É a vez do jogador 1";
    player2Btn.disabled = true;
    player1Btn.disabled = false;
  } else {
    turnMessage.textContent = "É a vez do jogador 2";
    player1Btn.disabled = true;
    player2Btn.disabled = false;
  }
}

function updateScores(player1Roll, player2Roll) {
  if (player1Roll > player2Roll) {
    player1Score++;
    roundResult.textContent = `Rodada ${currentRound}: Jogador 1 ganhou!`;
  } else if (player2Roll > player1Roll) {
    player2Score++;
    roundResult.textContent = `Rodada ${currentRound}: Jogador 2 ganhou!`;
  } else {
    roundResult.textContent = `Rodada ${currentRound}: Empate!`;
  }
}

function endGame() {
  let winner = "";
  if (player1Score > player2Score) {
    roundResult.style.color = "green";
    roundResult.style.fontWeight = "bold";
    roundResult.style.fontSize = "24px";
    roundResult.style.marginTop = "30px";
    roundResult.textContent = "Player 1 Venceu o Jogo!";
    winner = "Player 1";
  } else if (player2Score > player1Score) {
    roundResult.style.color = "red";
    roundResult.style.fontWeight = "bold";
    roundResult.style.fontSize = "24px";
    roundResult.style.marginTop = "30px";
    roundResult.textContent = "Player 2 Venceu o Jogo!";
    winner = "Player 2";
  } else {
    roundResult.textContent = "O jogo terminou empatado!";
  }
  let resultText = "Resultado das rodadas:";
  for (let i = 1; i <= currentRound; i++) {
    resultText += `\nRodada ${i}: ${
      i > player1Score + player2Score ? "Empate" : winner
    }`;
  }
  gameResult.textContent = resultText;
  player1Btn.disabled = true;
  player2Btn.disabled = true;
  resetBtn.disabled = false;
}

function resetGame() {
  player1Score = 0;
  player2Score = 0;
  currentPlayer = 1;
  currentRound = 1;
  player1Roll = 0;
  turnMessage.textContent = "É a vez do jogador 1";
  roundResult.textContent = "";
  gameResult.textContent = "";
  player2Btn.disabled = true;
  player1Btn.disabled = false;
}

player1Btn.addEventListener("click", () => {
  player1Roll = rollDice();
  roundResult.style.color = "black";
  roundResult.style.fontWeight = "normal";
  roundResult.style.fontSize = "16px";
  roundResult.style.margin = "0";

  roundResult.textContent = `Player 1: ${player1Roll}`;
  player1Btn.disabled = true;
  player2Btn.disabled = false;
  currentPlayer = 2;

  // Salva o estado do jogo no localStorage
  saveGameData();
});

player2Btn.addEventListener("click", () => {
  const player2Roll = rollDice();
  roundResult.textContent += `   Player 2: ${player2Roll}`;
  player2Btn.disabled = true;

  updateScores(player1Roll, player2Roll);

  if (currentRound === 10) {
    endGame();
  } else {
    currentRound++;
    switchTurns();
  }

  // Salva o estado do jogo no localStorage
  saveGameData();
});

resetBtn.addEventListener("click", () => {
  resetGame();
  resetBtn.disabled = true;

  // Remove o estado do jogo do localStorage
  localStorage.removeItem("gameData");
});

// Verifica se há dados salvos no localStorage e os carrega
if (localStorage.getItem("gameData")) {
  const savedGameData = JSON.parse(localStorage.getItem("gameData"));
  player1Score = savedGameData.player1Score;
  player2Score = savedGameData.player2Score;
  currentPlayer = savedGameData.currentPlayer;
  currentRound = savedGameData.currentRound;
  player1Roll = savedGameData.player1Roll;
  roundResult.textContent = savedGameData.roundResult;
  gameResult.textContent = savedGameData.gameResult;
  if (currentPlayer === 1) {
    turnMessage.textContent = "É a vez do jogador 1";
    player2Btn.disabled = true;
    player1Btn.disabled = false;
  } else {
    turnMessage.textContent = "É a vez do jogador 2";
    player1Btn.disabled = true;
    player2Btn.disabled = false;
  }
}

// Função para salvar o estado do jogo no localStorage
function saveGameData() {
  const gameData = {
    player1Score,
    player2Score,
    currentPlayer,
    currentRound,
    player1Roll,
    roundResult: roundResult.textContent,
    gameResult: gameResult.textContent,
  };
  localStorage.setItem("gameData", JSON.stringify(gameData));
}
