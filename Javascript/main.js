let url = "https://potterhead-api.vercel.app/api/characters";

document.querySelectorAll('.cardcasa').forEach(card => {
    card.addEventListener('click', () => {
        const houseId = card.id;
        window.location.href = `/page/detailsHouses.html?houseId=${houseId}`;
    });
});

function newID(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const houseId = newID('houseId');

function HouseDetails(houseId) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const characterList = document.getElementById('characterList');
            const houseNameElement = document.getElementById('houseName');
            const filteredCharacters = data.filter(character => character.house === houseId);

            if (filteredCharacters.length > 0) {
                houseNameElement.textContent = houseId;
                
                filteredCharacters.forEach(student => {
                    const studentImage = student.image || '/img/undefinedStudent.png';
                    const characterCard = document.createElement('div');
                    characterCard.innerHTML = `
                        <div class="carddetails p-2 m-3">
                        <a href="/page/details.html?value=${student.id}"> 
                        <img class="studentImg w-100 h-100 object-fit-cover" src="${studentImage}" alt="${student.name}">
                        </a>   
                        </div>
                    `;
                    characterList.appendChild(characterCard);
                });
            } else {
                console.log("se rompió");
            }
        });
}

HouseDetails(houseId);
