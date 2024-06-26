const { createApp } = Vue;
const app = createApp({
    data() {
        return {
            url: "https://potterhead-api.vercel.app/api/characters",
            houseId: new URL(window.location.href).searchParams.get("houseId"),
            characters: [],
            houseName: ''
        }
    },
    created() {
        this.fetchHouseDetails();
    },
    methods: { 
        fetchHouseDetails() {
            fetch(this.url)
                .then(response => response.json())
                .then(data => {
                    const filteredCharacters = data.filter(character => character.house === this.houseId);
                    if (filteredCharacters.length > 0) {
                        this.houseName = this.houseId;
                        this.characters = filteredCharacters;
                    } else {
                        console.log("No characters found for this house.");
                    }
                });
        },
    },
    computed: {
        addCardClickListeners() {
            document.querySelectorAll('.cardcasa').forEach(card => {
                card.addEventListener('click', () => {
                    const houseId = card.id;
                    window.location.href = `/page/detailsHouses.html?houseId=${houseId}`;
                    console.log("ahj?");
                });
            });
        }
    }
});

app.mount('#app');


// let url = "https://potterhead-api.vercel.app/api/characters";

// document.querySelectorAll('.cardcasa').forEach(card => {
//     card.addEventListener('click', () => {
//         const houseId = card.id;
//         window.location.href = `/page/detailsHouses.html?houseId=${houseId}`;
//     });
// });
// function addCardClickListeners() {
//     document.querySelectorAll('.cardcasa').forEach(card => {
//         card.addEventListener('click', () => {
//             const houseId = card.id;
//             window.location.href = `/page/detailsHouses.html?houseId=${houseId}`;
//         });
//     });
// }

// // Call the function to add the event listeners
// addCardClickListeners();


// function newID(param) {
//     const urlParams = new URLSearchParams(window.location.search);
//     return urlParams.get(param);
// }

// const houseId = newID('houseId');

// function HouseDetails(houseId) {
//     fetch(url)
//         .then(response => response.json())
//         .then(data => {
//             const characterList = document.getElementById('characterList');
//             const houseNameElement = document.getElementById('houseName');
//             const filteredCharacters = data.filter(character => character.house === houseId);

//             if (filteredCharacters.length > 0) {
//                 houseNameElement.textContent = houseId;

//                 filteredCharacters.forEach(student => {
//                     const studentImage = student.image || '/img/undefinedStudent.png';
//                     const characterCard = document.createElement('div');
//                     characterCard.innerHTML = `
//                     <div class="tarjetaDetails m-3"><a href="/page/details.html?id=${student.id}">
//                     <img src="${studentImage}" class="img w-100 h-100 object-fit-cover">
//                     <div class="profile-name"> ${student.name}</a></div>
//                      </div>
//                     `;
//                     characterList.appendChild(characterCard);
//                 });
//             } else {
//                 console.log("se rompió");
//             }
//         });
// }

// HouseDetails(houseId);
