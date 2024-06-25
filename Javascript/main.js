
let url = "https://potterhead-api.vercel.app/api/characters";

document.querySelectorAll('.cardcasa').forEach(card => {
    card.addEventListener('click', () => {
        const House = card.id;
        window.location.href = `/page/detailsHouses.html?House=${House}`;
    });
});
function newUrl(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const House = newUrl('House');

function houseDetails (House) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const characterList = document.getElementById('characterList');
            const filteredCharacters = data.filter(character => character.house === House);

            if (filteredCharacters.length > 0) {
                filteredCharacters.forEach(student => {
                    const studentCard = document.createElement('div');
                    studentCard.innerHTML = `
                        <div class="carddetails p-2 m-3">
                        <a href="./details.html"> 
                        <img class="studentImg w-100 object-fit-cover" src="${student.image}"  alt="${character.name}">
                        </a>   
                        </div>
                    `;
                    characterList.appendChild(characterCard);
                });
            } else {
                characterList.innerHTML = '<p>No se encontraron personajes para esta casa.</p>';
            }
        })
}


houseDetails (House);

// let characters = [];

// function obtenerPersonajes() {
//     fetch(charactersApiUrl)
//         .then(response => response.json())
//         .then(data => {
//             characters = data;
//             let gryffindorCharacters = characters.filter(character => character.house === "Gryffindor");
//             mostrarPersonajes(gryffindorCharacters);
//         })
// }

// function mostrarPersonajes(personajes) {
//     let cardContainer = document.getElementById('card');
//     cardContainer.innerHTML = '';
//     personajes.forEach(personaje => {
//         let cardContenedor = `
//         <div class="carddetails p-2 m-3">
//            <a href="./details.html"> 
//            <img class="studentImg w-100 object-fit-cover" src="${personaje.image}"  alt="${personaje.name}">
//            </a>   
//         </div>
        
//         `;
//         cardContainer.innerHTML += cardContenedor;
//     });
// }

// obtenerPersonajes();
