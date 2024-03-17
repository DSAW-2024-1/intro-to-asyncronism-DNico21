let charactersLoaded = 0;
let characters = []; // Variable global para almacenar todos los personajes

const createCharacterElement = (character) => {
  const article = document.createElement("article");
  const imageContainer = document.createElement("div");
  const image = document.createElement("img");
  const heading = document.createElement("h2");
  const quote = document.createElement("span");

  image.src = character.image;
  image.alt = "Personaje";
  heading.textContent = character.character;
  quote.textContent = character.quote;

  imageContainer.classList.add("image-container");

  imageContainer.appendChild(image);
  article.appendChild(imageContainer);
  article.appendChild(heading);
  article.appendChild(quote);

  return article;
};

const inputBox = document.getElementById("input-box");
inputBox.addEventListener("input", () => {
  let inputValue = inputBox.value.trim().toLowerCase();

  const main = document.querySelector("main");
  main.innerHTML = "";

  if (characters.length > 0) {
    const filteredCharacters = characters.filter((character) =>
      character.character.toLowerCase().includes(inputValue)
    );
    displayCharacters(filteredCharacters);
  }
});

let filteredCharacters = []; // Variable global para almacenar los personajes filtrados

const displayCharacters = () => {
  const main = document.querySelector("main");
  main.innerHTML = ""; // Limpiar el contenido anterior antes de mostrar los personajes nuevos

  let inputValue = inputBox.value.trim().toLowerCase(); // Obtener el valor actual del input

  // Si hay algo escrito en el input, filtrar los personajes basados en el valor del input
  if (inputValue) {
    filteredCharacters = characters.filter((character) =>
      character.character.toLowerCase().includes(inputValue)
    );
  } else {
    // Si no hay nada escrito en el input, mostrar todos los personajes
    filteredCharacters = characters;
  }

  // Mostrar los personajes filtrados
  filteredCharacters.forEach((character) => {
    const characterElement = createCharacterElement(character);
    main.appendChild(characterElement);
  });
};

const getMoreCharacters = async () => {
  try {
    const response = await fetch(
      `https://thesimpsonsquoteapi.glitch.me/quotes?count=20&offset=${charactersLoaded}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const apiCharacters = await response.json();
    characters.push(...apiCharacters); // Agregar los nuevos personajes al array global
    displayCharacters(apiCharacters); // Mostrar los personajes encontrados
    charactersLoaded += apiCharacters.length;
  } catch (error) {
    console.error("Error fetching characters:", error);
  }
};

const loadMoreButton = document.getElementById("load-more-button");

loadMoreButton.addEventListener("click", () => {
  getMoreCharacters();
});

getMoreCharacters();