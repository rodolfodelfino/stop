const letterElement = document.getElementById('letter');
const timerElement = document.getElementById('timer');
const categoryInputs = document.querySelectorAll('.category-input');
const startButton = document.getElementById('start-button');
const scoresList = document.getElementById('scores');

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let currentLetter = '';
let timer = 60;
let intervalId;
let scores = {};

function getRandomLetter() {
    return alphabet[Math.floor(Math.random() * alphabet.length)];
}

function updateLetter() {
    currentLetter = getRandomLetter();
    letterElement.textContent = currentLetter;
}

function startGame() {
    for (const input of categoryInputs) {
        input.value = '';
        input.disabled = false;
    }
    startButton.disabled = true;

    // Reinicia o temporizador e define a função `stopGame` para ser chamada após o tempo
    timer = 60;
    updateTimer();
    intervalId = setInterval(updateTimer, 1000);

    updateLetter();
}

function stopGame() {
    clearInterval(intervalId);
    startButton.disabled = false;
    for (const input of categoryInputs) {
        input.disabled = true;
    }

    // Calculate scores
    let roundScore = 0;
    const currentScores = {};
    for (const input of categoryInputs) {
        const category = input.parentElement.textContent.split(':')[0].trim();
        const word = input.value.toUpperCase();
        if (word.startsWith(currentLetter)) {
            currentScores[category] = word.length === 0 ? 0 : 10;
            roundScore += currentScores[category];
        } else {
            currentScores[category] = 0;
        }
    }

    scores = currentScores;
    updateScores(roundScore);
}

function updateTimer() {
    timerElement.textContent = timer;
    if (timer === 0) {
        stopGame();
    } else {
        timer--;
    }
}

function updateScores(roundScore) {
    scoresList.innerHTML = '';
    let totalScore = 0;
    for (const category in scores) {
        const listItem = document.createElement('li');
        listItem.textContent = `${category}: ${scores[category]}`;
        scoresList.appendChild(listItem);
        totalScore += scores[category];
    }

    const roundScoreItem = document.createElement('li');
    roundScoreItem.textContent = `Pontuação da Rodada: ${roundScore}`;
    scoresList.appendChild(roundScoreItem);

    const totalScoreItem = document.createElement('li');
    totalScoreItem.textContent = `Pontuação Total: ${totalScore}`;
    scoresList.appendChild(totalScoreItem);
}

startButton.addEventListener('click', startGame);
