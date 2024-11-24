// Función para generar una pregunta para "¿Con qué letra empieza?"
function generateQuestion() {
    // Oculta la imagen de feedback
    document.getElementById('feedback-image').style.backgroundImage = '';

    // Obtiene un animal aleatorio
    const correctAnimal = getRandomAnimal();

    // Establece la imagen del animal
    const animalImageElement = document.getElementById('animal-image');
    animalImageElement.src = correctAnimal.image;

    // Establece la letra correcta
    const correctLetter = correctAnimal.name.charAt(0).toUpperCase();

    // Genera opciones de letras
    const options = generateLetterOptions(correctLetter);

    // Asigna las opciones a los botones
    document.querySelectorAll('.option').forEach((button, index) => {
        button.innerText = options[index];
        button.onclick = () => selectAnswer(button.innerText, correctLetter);
    });
}

// Función para generar opciones de letras
function generateLetterOptions(correctLetter) {
    const options = new Set();
    options.add(correctLetter);

    // Genera dos letras incorrectas aleatorias
    while (options.size < 3) {
        const randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        options.add(randomLetter);
    }

    // Retorna las opciones en orden aleatorio
    return shuffleArray(Array.from(options));
}

// Función para manejar la selección de una respuesta
function selectAnswer(selectedLetter, correctLetter) {
    const isCorrect = (selectedLetter === correctLetter);
    showFeedback(isCorrect);
    checkEndOfGame();
}

// Inicia el juego generando la primera pregunta
generateQuestion();
