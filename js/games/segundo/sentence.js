// Lista de oraciones y sus opciones
const correctImage = "./../../../assets/images/correcto.png";
const incorrectImage = "./../../../assets/images/incorrecto.png";

const sentences = [
    { 
        sentence: "El perro come ____", 
        correctAnswer: "Croquetas", 
        options: ["Sopa", "Croquetas", "Miel"], 
        image: "./../../../assets/images/animals/perro.jpg" 
    },
    { 
        sentence: "El gato come ____", 
        correctAnswer: "Pescado", 
        options: ["Pan", "Pescado", "Arroz"], 
        image: "./../../../assets/images/animals/gato.jpg" 
    },
    { 
        sentence: "El conejo come ____", 
        correctAnswer: "Zanahorias", 
        options: ["Zanahorias", "Helado", "Pizza"], 
        image: "./../../../assets/images/animals/conejo.jpg" 
    },
    { 
        sentence: "El pez nada en ____", 
        correctAnswer: "Agua", 
        options: ["Tierra", "Agua", "Leche"], 
        image: "./../../../assets/images/animals/pez.jpg" 
    },
    { 
        sentence: "El pato vive en ____", 
        correctAnswer: "Lago", 
        options: ["Montaña", "Lago", "Casa"], 
        image: "./../../../assets/images/animals/pato.jpg" 
    },
    { 
        sentence: "El león es el rey de ____", 
        correctAnswer: "La selva", 
        options: ["El mar", "La selva", "La granja"], 
        image: "./../../../assets/images/animals/leon.jpg" 
    },
    { 
        sentence: "El elefante usa su ____ para beber agua", 
        correctAnswer: "Trompa", 
        options: ["Cola", "Orejas", "Trompa"], 
        image: "./../../../assets/images/animals/elefante.jpg" 
    },
    { 
        sentence: "La cebra tiene rayas de color ____", 
        correctAnswer: "Negro y blanco", 
        options: ["Negro y blanco", "Amarillo y verde", "Rojo y azul"], 
        image: "./../../../assets/images/animals/cebra.jpg" 
    },
    { 
        sentence: "La jirafa es el animal más ____", 
        correctAnswer: "Alto", 
        options: ["Pequeño", "Pesado", "Alto"], 
        image: "./../../../assets/images/animals/jirafa.jpg" 
    },
    { 
        sentence: "El mono come ____", 
        correctAnswer: "Plátanos", 
        options: ["Plátanos", "Pastel", "Uvas"], 
        image: "./../../../assets/images/animals/mono.jpg" 
    },
    { 
        sentence: "El oso hiberna durante el ____", 
        correctAnswer: "Invierno", 
        options: ["Verano", "Invierno", "Primavera"], 
        image: "./../../../assets/images/animals/oso.jpg" 
    },
    { 
        sentence: "El tigre tiene rayas de color ____", 
        correctAnswer: "Naranja y negro", 
        options: ["Naranja y negro", "Blanco y azul", "Verde y amarillo"], 
        image: "./../../../assets/images/animals/tigre.jpg" 
    },
    { 
        sentence: "La tortuga camina muy ____", 
        correctAnswer: "Lento", 
        options: ["Rápido", "Lento", "Pesado"], 
        image: "./../../../assets/images/animals/tortuga.jpg" 
    },
    { 
        sentence: "El pingüino vive en lugares ____", 
        correctAnswer: "Fríos", 
        options: ["Cálidos", "Fríos", "Desérticos"], 
        image: "./../../../assets/images/animals/pinguino.jpg" 
    },
    { 
        sentence: "El delfín es un animal que vive en ____", 
        correctAnswer: "El océano", 
        options: ["El desierto", "El campo", "El océano"], 
        image: "./../../../assets/images/animals/delfin.jpg" 
    },
    { 
        sentence: "El caballo galopa en ____", 
        correctAnswer: "La pradera", 
        options: ["La selva", "La pradera", "La playa"], 
        image: "./../../../assets/images/animals/caballo.jpg" 
    },
    { 
        sentence: "La vaca come ____", 
        correctAnswer: "Pasto", 
        options: ["Pasto", "Pastel", "Carne"], 
        image: "./../../../assets/images/animals/vaca.jpg" 
    },
    { 
        sentence: "La oveja tiene ____", 
        correctAnswer: "Lana", 
        options: ["Alas", "Lana", "Plumas"], 
        image: "./../../../assets/images/animals/oveja.jpg" 
    },
    { 
        sentence: "La rana vive cerca del ____", 
        correctAnswer: "Agua", 
        options: ["Agua", "Desierto", "Cielo"], 
        image: "./../../../assets/images/animals/rana.jpg" 
    },
    { 
        sentence: "El lobo vive en la ____", 
        correctAnswer: "Montaña", 
        options: ["Ciudad", "Montaña", "Granja"], 
        image: "./../../../assets/images/animals/lobo.jpg" 
    }
];

// Variables para manejar el juego
let score = 0;
let currentQuestion = 0;
const totalQuestions = 5;
let lastSentenceIndex = null;

// Función para generar una nueva pregunta
function generateQuestion() {
    // Oculta la imagen de feedback
    document.getElementById('feedback-image').style.backgroundImage = '';

    // Selecciona una oración aleatoria que no sea la última mostrada
    let currentSentenceIndex;
    do {
        currentSentenceIndex = Math.floor(Math.random() * sentences.length);
    } while (currentSentenceIndex === lastSentenceIndex);

    const sentenceData = sentences[currentSentenceIndex];
    lastSentenceIndex = currentSentenceIndex; // Actualiza el último índice mostrado

    // Muestra la imagen del animal
    const animalImageElement = document.getElementById('animal-image');
    animalImageElement.src = sentenceData.image;

    // Muestra la oración incompleta
    document.getElementById('sentence').innerText = sentenceData.sentence;

    // Genera y asigna opciones de respuesta a los botones
    const options = shuffleArray(sentenceData.options);
    document.querySelectorAll('.option').forEach((button, index) => {
        button.innerText = options[index];
        button.onclick = () => selectAnswer(button.innerText, sentenceData.correctAnswer);
    });
}

// Función para mezclar un array
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Función para manejar la selección de una respuesta
function selectAnswer(selectedAnswer, correctAnswer) {
    const feedbackImage = document.getElementById('feedback-image');
    if (selectedAnswer === correctAnswer) {
        score++;
        feedbackImage.style.backgroundImage = `url(${correctImage})`;
    } else {
        feedbackImage.style.backgroundImage = `url(${incorrectImage})`;
    }

    currentQuestion++;

    // Genera la siguiente pregunta o muestra los resultados
    if (currentQuestion >= totalQuestions) {
        setTimeout(() => {
            window.location.href = `./../../../templates/game-result.html?score=${score}`;
        }, 1000);
    } else {
        setTimeout(generateQuestion, 1000);
    }
}

// Inicia el juego generando la primera pregunta
generateQuestion();
