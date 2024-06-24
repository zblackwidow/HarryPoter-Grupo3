
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
            <div class="carddetails p-2 m-3">
                <a href="/index.html"> <img class="img w-100 object-fit-cover" src="${personaje.image}"  alt="${personaje.name}"></a>   
            </div>
        `;
        cardContainer.innerHTML += cardContenedor;
    });
}

obtenerPersonajes();
