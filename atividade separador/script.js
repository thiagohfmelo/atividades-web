function separateLetters() {
    const word = document.getElementById("inputWord").value;
    const outputDiv = document.getElementById("output");

    // Limpa o conteúdo anterior
    outputDiv.innerHTML = "";

    // Cria um quadrado para cada letra da palavra
    for (let i = 0; i < word.length; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        square.textContent = word[i];
        outputDiv.appendChild(square);
    }
}