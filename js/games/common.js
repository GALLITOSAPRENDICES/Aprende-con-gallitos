// Inicializa variables globales
let score = 0;
let currentQuestion = 0;
const totalQuestions = 5;

// Rutas de imágenes para feedback
const correctImage = './../../../assets/images/correcto.png';
const incorrectImage = './../../../assets/images/incorrecto.png';

/////////////////////////
// Funciones Generales para Generar Preguntas
/////////////////////////

// Función principal para generar una pregunta basada en la operación
function generateQuestion(operation) {
    document.getElementById('feedback-image').style.backgroundImage = '';

    let questionText, correctAnswer;

    // Selecciona la operación y genera los números y respuestas según el grado y tipo de operación
    if (operation === 'suma') {
        ({ questionText, correctAnswer } = generateAdditionQuestion(20));
    } else if (operation === 'resta') {
        ({ questionText, correctAnswer } = generateSubtractionQuestion(20));
    } else if (operation === 'suma_segundo') {
        ({ questionText, correctAnswer } = generateAdditionQuestion(50));
    } else if (operation === 'resta_segundo') {
        ({ questionText, correctAnswer } = generateSubtractionQuestion(50));
    } else if (operation === 'multiplicacion_segundo') {
        ({ questionText, correctAnswer } = generateMultiplicationQuestion(50));
    } else if (operation === 'division_segundo') {
        ({ questionText, correctAnswer } = generateDivisionQuestion(50));
    }

    document.getElementById('question').innerText = questionText;
    generateAnswers(correctAnswer, operation.includes("segundo") ? 50 : 20); // Rango depende del grado
}

// Funciones específicas para cada operación
function generateAdditionQuestion(maxResult) {
    let num1, num2, correctAnswer;
    do {
        num1 = Math.floor(Math.random() * (maxResult / 2)) + 1;
        num2 = Math.floor(Math.random() * (maxResult / 2)) + 1;
        correctAnswer = num1 + num2;
    } while (correctAnswer > maxResult);
    return { questionText: `¿Cuánto es ${num1} + ${num2}?`, correctAnswer };
}

function generateSubtractionQuestion(maxValue) {
    let num1, num2, correctAnswer;
    do {
        num1 = Math.floor(Math.random() * maxValue) + 1;
        num2 = Math.floor(Math.random() * maxValue) + 1;
    } while (num1 < num2);
    correctAnswer = num1 - num2;
    return { questionText: `¿Cuánto es ${num1} - ${num2}?`, correctAnswer };
}

function generateMultiplicationQuestion(maxResult) {
    let num1, num2, correctAnswer;
    do {
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        correctAnswer = num1 * num2;
    } while (correctAnswer > maxResult);
    return { questionText: `¿Cuánto es ${num1} × ${num2}?`, correctAnswer };
}

function generateDivisionQuestion(maxValue) {
    let num1, num2, correctAnswer;
    do {
        num2 = Math.floor(Math.random() * 9) + 2; // Evita que el divisor sea 1
        correctAnswer = Math.floor(Math.random() * (maxValue / num2)) + 1;
        num1 = correctAnswer * num2; // Asegura que el resultado sea un número entero
    } while (num1 > maxValue || num1 % num2 !== 0 || correctAnswer < 0 || !Number.isInteger(correctAnswer));
    return { questionText: `¿Cuánto es ${num1} ÷ ${num2}?`, correctAnswer };
}

/////////////////////////
// Generación de Respuestas y Verificación
/////////////////////////

// Función para generar respuestas incorrectas y asignarlas junto con la respuesta correcta
function generateAnswers(correctAnswer, maxRange) {
    let wrongAnswer1, wrongAnswer2;
    const maxAttempts = 10; // Limita el número de intentos para generar respuestas incorrectas
    let attempts = 0;

    do {
        wrongAnswer1 = correctAnswer + Math.floor(Math.random() * 10) + 1;
        attempts++;
        if (attempts >= maxAttempts) {
            wrongAnswer1 = (correctAnswer + 1) % maxRange; // Genera un valor alternativo si se exceden los intentos
            break;
        }
    } while (wrongAnswer1 > maxRange || wrongAnswer1 === correctAnswer);

    attempts = 0; // Reinicia los intentos para el segundo número
    do {
        wrongAnswer2 = correctAnswer - Math.floor(Math.random() * 10) - 1;
        attempts++;
        if (attempts >= maxAttempts) {
            wrongAnswer2 = (correctAnswer - 1 + maxRange) % maxRange; // Genera un valor alternativo si se exceden los intentos
            break;
        }
    } while (wrongAnswer2 < 0 || wrongAnswer2 === correctAnswer || wrongAnswer2 === wrongAnswer1);

    const answers = [correctAnswer, wrongAnswer1, wrongAnswer2].sort(() => Math.random() - 0.5);
    document.querySelectorAll('.option').forEach((button, index) => {
        button.innerText = answers[index];
        button.onclick = () => checkAnswer(answers[index], correctAnswer);
    });
}

// Función para verificar la respuesta y mostrar feedback
function checkAnswer(selectedAnswer, correctAnswer) {
    const feedbackImage = document.getElementById('feedback-image');
    if (selectedAnswer === correctAnswer) {
        score++;
        feedbackImage.style.backgroundImage = `url(${correctImage})`;
    } else {
        feedbackImage.style.backgroundImage = `url(${incorrectImage})`;
    }

    currentQuestion++;

    if (currentQuestion >= totalQuestions) {
        setTimeout(() => {
            window.location.href = `./../../../templates/game-result.html?score=${score}`;
        }, 1000);
    } else {
        setTimeout(() => generateQuestion(currentOperation), 1000);
    }
}
