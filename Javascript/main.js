
let charactersApiUrl = "https://potterhead-api.vercel.app/api/characters";

let characters = [];

function obtenerPersonajes() {
    fetch(charactersApiUrl)
        .then(response => response.json())
        .then(data => {
            characters = data;
            let gryffindorCharacters = characters.filter(character => character.house === "Gryffindor");
            mostrarPersonajes(gryffindorCharacters);
        })
}

function mostrarPersonajes(personajes) {
    let cardContainer = document.getElementById('card');
    cardContainer.innerHTML = ''; 
    personajes.forEach(personaje => {
        let cardContenedor = `
            <div class="card d-flex m-1" style="width: 12%;">
                <img class="img2" src="${personaje.image}" alt="${personaje.name}">
                <div class="texto3">
                    <h4>${personaje.name}</h4>
                </div>
            </div>
        `;
        cardContainer.innerHTML += cardContenedor;
    });
}

obtenerPersonajes();
