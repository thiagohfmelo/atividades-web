document.addEventListener("DOMContentLoaded", () => {
    const backButton = document.getElementById("back-button");
    const revealPlayerButton = document.getElementById("reveal-player-number");
    const revealMachineButton = document.getElementById("reveal-machine-number");
    const submitButton = document.getElementById("submit-guess");
    const playerInput = document.getElementById("player-input");
    const gameLog = document.getElementById("game-log");
    const bullsScore = document.getElementById("bulls-score");
    const cowsScore = document.getElementById("cows-score");

    let playerSecret = generateUniqueNumber();
    let machineSecret = generateUniqueNumber();
    let playerScore = 0;
    let machineScore = 0;

    console.log(`Seu número secreto: ${playerSecret}`);
    console.log(`Número secreto da máquina: ${machineSecret}`);


    backButton.addEventListener("click", () => {
        window.location.href = "index.html";
    });

    
    revealPlayerButton.addEventListener("click", () => {
        alert(`Seu Número Secreto: ${playerSecret}`);
    });

   
    revealMachineButton.addEventListener("click", () => {
        alert(`Número Secreto da Máquina: ${machineSecret}`);
    });

  
    submitButton.addEventListener("click", () => {
        const playerGuess = playerInput.value;

        if (!isValidGuess(playerGuess)) {
            alert("Por favor, insira um número válido de 4 dígitos com dígitos diferentes.");
            return;
        }

        const machineGuess = generateUniqueNumber();
        const playerResult = calculateBullsAndCows(playerGuess, machineSecret);
        const machineResult = calculateBullsAndCows(machineGuess, playerSecret);

        let logMessage = `Você: ${playerGuess} (${playerResult.bulls} Bulls, ${playerResult.cows} Cows) | Máquina: ${machineGuess} (${machineResult.bulls} Bulls, ${machineResult.cows} Cows)`;

        if (playerResult.bulls === 4) {
            playerScore++;
            logMessage += " | Você venceu!";
            alert("Parabéns! Você revelou o número da máquina!");
            resetGame();
        } else if (machineResult.bulls === 4) {
            machineScore++;
            logMessage += " | Máquina venceu!";
            alert("A máquina revelou o seu número!");
            resetGame();
        }

        updateScores();
        updateLog(logMessage);
        playerInput.value = "";
    });

   
    function generateUniqueNumber() {
        let digits = [];
        while (digits.length < 4) {
            const digit = Math.floor(Math.random() * 10);
            if (!digits.includes(digit)) digits.push(digit);
        }
        return digits.join("");
    }


    function isValidGuess(guess) {
        return guess.length === 4 && new Set(guess).size === 4 && !isNaN(guess);
    }

    
    function calculateBullsAndCows(guess, secret) {
        let bulls = 0;
        let cows = 0;

        guess.split("").forEach((digit, index) => {
            if (digit === secret[index]) {
                bulls++;
            } else if (secret.includes(digit)) {
                cows++;
            }
        });

        return { bulls, cows };
    }

   
    function updateScores() {
        bullsScore.textContent = playerScore;
        cowsScore.textContent = machineScore;
    }

   
    function updateLog(message) {
        const logEntry = document.createElement("p");
        logEntry.textContent = message;
        gameLog.prepend(logEntry);
    }

   
    function resetGame() {
        playerSecret = generateUniqueNumber();
        machineSecret = generateUniqueNumber();
        updateScores();
    }
});
