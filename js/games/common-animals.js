// Lista de animales y sus nombres, común a ambos juegos
const animals = [
    { name: "Perro", image: "./../../../assets/images/animals/perro.jpg" },
    { name: "Gato", image: "./../../../assets/images/animals/gato.jpg" },
    { name: "Pez", image: "./../../../assets/images/animals/pez.jpg" },
    { name: "Conejo", image: "./../../../assets/images/animals/conejo.jpg" },
    { name: "Pato", image: "./../../../assets/images/animals/pato.jpg" },
    { name: "León", image: "./../../../assets/images/animals/leon.jpg" },
    { name: "Elefante", image: "./../../../assets/images/animals/elefante.jpg" },
    { name: "Cebra", image: "./../../../assets/images/animals/cebra.jpg" },
    { name: "Jirafa", image: "./../../../assets/images/animals/jirafa.jpg" },
    { name: "Mono", image: "./../../../assets/images/animals/mono.jpg" },
    { name: "Oso", image: "./../../../assets/images/animals/oso.jpg" },
    { name: "Tigre", image: "./../../../assets/images/animals/tigre.jpg" },
    { name: "Tortuga", image: "./../../../assets/images/animals/tortuga.jpg" },
    { name: "Pingüino", image: "./../../../assets/images/animals/pinguino.jpg" },
    { name: "Delfín", image: "./../../../assets/images/animals/delfin.jpg" },
    { name: "Caballo", image: "./../../../assets/images/animals/caballo.jpg" },
    { name: "Vaca", image: "./../../../assets/images/animals/vaca.jpg" },
    { name: "Oveja", image: "./../../../assets/images/animals/oveja.jpg" },
    { name: "Rana", image: "./../../../assets/images/animals/rana.jpg" },
    { name: "Lobo", image: "./../../../assets/images/animals/lobo.jpg" }
];

// Variables para el juego
let score = 0;
let currentQuestion = 0;
const totalQuestions = 5;
const correctImage = "./../../../assets/images/correcto.png";
const incorrectImage = "./../../../assets/images/incorrecto.png";
let lastAnimalIndex = null;

// Función para seleccionar un animal aleatorio sin repetir el último
function getRandomAnimal() {
    let currentAnimalIndex;
    do {
        currentAnimalIndex = Math.floor(Math.random() * animals.length);
    } while (currentAnimalIndex === lastAnimalIndex);
    
    lastAnimalIndex = currentAnimalIndex; // Actualiza el índice del último animal mostrado
    return animals[currentAnimalIndex];
}

// Función para mostrar el feedback visual
function showFeedback(isCorrect) {
    const feedbackImage = document.getElementById('feedback-image');
    feedbackImage.style.backgroundImage = `url(${isCorrect ? correctImage : incorrectImage})`;
    if (isCorrect) score++;
}

// Función para verificar si el juego ha terminado
function checkEndOfGame() {
    currentQuestion++;
    if (currentQuestion >= totalQuestions) {
        setTimeout(() => {
            window.location.href = `./../../../templates/game-result.html?score=${score}`;
        }, 1000);
    } else {
        setTimeout(generateQuestion, 1000);
    }
}

// Función para mezclar un array
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}
