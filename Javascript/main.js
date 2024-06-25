
let url = "https://potterhead-api.vercel.app/api/characters";

document.querySelectorAll('.cardcasa').forEach(card => {
    card.addEventListener('click', () => {
        const houseId = card.id;
        window.location.href = `/page/detailsHouses.html?houseId=${houseId}`;
    });
});
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const houseId = getQueryParam('houseId');

function HouseDetails(houseId) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const characterList = document.getElementById('characterList');
            const filteredCharacters = data.filter(character => character.house === houseId);

            
            if (filteredCharacters.length > 0) {
                filteredCharacters.forEach(student => {
                    const characterCard = document.createElement('div');
                    characterCard.innerHTML = `
                        <div class="carddetails p-2 m-3">
                        <a href="/page/details.html?value=${student.id}"> 
                        <img class="studentImg w-100 object-fit-cover" src="${student.image}"  alt="${student.name}">
                        </a>   
                        </div>
                    `;
                    characterList.appendChild(characterCard);
                });
            } else {
                characterList.innerHTML = '<p>No characters found for this house.</p>';
            }
        })
}


HouseDetails(houseId);
