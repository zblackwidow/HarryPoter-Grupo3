let contenDetails = document.getElementById("details")
// let idDetails = window.location.href
// idDetails = new URL(idDetails).searchParams.get("value")

const urlData = "https://potterhead-api.vercel.app/api/characters"

fetch(urlData).then(response => response.json())
    .then(data => {
        console.log(data);
        // pintarDetalles(data., contenDetails)

        
    })