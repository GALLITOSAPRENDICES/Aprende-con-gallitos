// Función para generar una pregunta para "¿Qué animal es?"
function generateQuestion() {
    // Oculta la imagen de feedback
    document.getElementById('feedback-image').style.backgroundImage = '';

    // Obtiene un animal aleatorio
    const correctAnimal = getRandomAnimal();

    // Establece la imagen del animal
    const animalImageElement = document.getElementById('animal-image');
    animalImageElement.src = correctAnimal.image;

    // Genera opciones de nombres de animales
    const options = generateAnimalOptions(correctAnimal.name);

    // Asigna las opciones a los botones
    document.querySelectorAll('.option').forEach((button, index) => {
        button.innerText = options[index];
        button.onclick = () => selectAnswer(button.innerText, correctAnimal.name);
    });
}

// Función para generar opciones de nombres de animales
function generateAnimalOptions(correctName) {
    const options = new Set();
    options.add(correctName);

    // Genera dos nombres incorrectos aleatorios
    while (options.size < 3) {
        const randomAnimal = animals[Math.floor(Math.random() * animals.length)].name;
        options.add(randomAnimal);
    }

    // Retorna las opciones en orden aleatorio
    return shuffleArray(Array.from(options));
}

// Función para manejar la selección de una respuesta
function selectAnswer(selectedName, correctName) {
    const isCorrect = (selectedName === correctName);
    showFeedback(isCorrect);
    checkEndOfGame();
}

// Inicia el juego generando la primera pregunta
generateQuestion();
