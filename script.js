// Seleccionar elementos del DOM
const board = document.getElementById("board"); // Tablero de cartas
const movesDisplay = document.getElementById("moves"); // Contador de movimientos
const timerDisplay = document.getElementById("timer"); // Temporizador
const resetButton = document.getElementById("reset"); // Botón para reiniciar

let cards = []; // Almacena las cartas
let flippedCards = []; // Almacena las cartas volteadas
let moves = 0; // Contador de movimientos
let time = 0; // Tiempo transcurrido
let interval; // Almacena el intervalo del temporizador

// Array de símbolos para las cartas
const symbols = ["🍎", "🍌", "🍒", "🍇", "🍉", "🍓", "🍍", "🥭"];

// Duplicar los símbolos para crear parejas
const cardSymbols = [...symbols, ...symbols];

// Función para iniciar el juego
function startGame() {
    cards = createCards(); // Crea las cartas
    shuffleCards(cards); // Baraja las cartas
    renderBoard(cards); // Muestra las cartas en el tablero
    startTimer(); // Inicia el temporizador
}

// Función para crear las cartas
function createCards() {
    return cardSymbols.map((symbol, index) => ({
        id: index, // Identificador único
        symbol: symbol, // Símbolo de la carta
        flipped: false, // Indica si la carta está volteada
        matched: false, // Indica si la carta tiene pareja
    }));
}

// Función para barajar las cartas
function shuffleCards(cards) {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]]; // Intercambia las cartas
    }
}

// Función para mostrar las cartas en el tablero
function renderBoard(cards) {
    board.innerHTML = ""; // Limpia el tablero
    cards.forEach(card => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.textContent = card.flipped ? card.symbol : ""; // Muestra el símbolo si está volteada
        cardElement.addEventListener("click", () => flipCard(card)); // Evento al hacer clic
        if (card.matched) cardElement.classList.add("matched"); // Marca como coincidente
        if (card.flipped) cardElement.classList.add("flipped"); // Marca como volteada
        board.appendChild(cardElement); // Agrega la carta al tablero
    });
}

// Función para voltear una carta
function flipCard(card) {
    if (flippedCards.length < 2 && !card.flipped && !card.matched) {
        card.flipped = true; // Voltea la carta
        flippedCards.push(card); // Agrega a las cartas volteadas
        renderBoard(cards); // Actualiza el tablero

        if (flippedCards.length === 2) {
            moves++; // Incrementa el contador de movimientos
            movesDisplay.textContent = moves; // Actualiza el contador
            checkMatch(); // Verifica si las cartas coinciden
        }
    }
}

// Función para verificar si las cartas coinciden
function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.symbol === card2.symbol) {
        card1.matched = true; // Marca como coincidente
        card2.matched = true; // Marca como coincidente
        flippedCards = []; // Limpia las cartas volteadas
        if (cards.every(card => card.matched)) endGame(); // Verifica si el juego ha terminado
    } else {
        setTimeout(() => {
            card1.flipped = false; // Voltea la carta de nuevo
            card2.flipped = false; // Voltea la carta de nuevo
            flippedCards = []; // Limpia las cartas volteadas
            renderBoard(cards); // Actualiza el tablero
        }, 1000); // Espera 1 segundo antes de voltear las cartas
    }
}

// Función para iniciar el temporizador
function startTimer() {
    interval = setInterval(() => {
        time++; // Incrementa el tiempo
        const minutes = Math.floor(time / 60); // Calcula los minutos
        const seconds = time % 60; // Calcula los segundos
        timerDisplay.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`; // Muestra el tiempo
    }, 1000); // Actualiza cada segundo
}

// Función para terminar el juego
function endGame() {
    clearInterval(interval); // Detiene el temporizador
    alert(`¡Felicidades! Terminaste el juego en ${moves} movimientos y ${timerDisplay.textContent} minutos.`);
}

// Función para reiniciar el juego
function resetGame() {
    clearInterval(interval); // Detiene el temporizador
    time = 0; // Reinicia el tiempo
    moves = 0; // Reinicia los movimientos
    movesDisplay.textContent = moves; // Actualiza el contador
    timerDisplay.textContent = "0:00"; // Reinicia el temporizador
    startGame(); // Inicia un nuevo juego
}

// Event listener para el botón de reiniciar
resetButton.addEventListener("click", resetGame);

// Iniciar el juego al cargar la página
startGame();