let contenDetails = document.getElementById("details")
let idDetails = window.location.href
idDetails = new URL(idDetails).searchParams.get("value")

const urlData = "https://potterhead-api.vercel.app/api/characters"

fetch(urlData).then(response => response.json())
    .then(data => {
        pintarDetalles(data, contenDetails)

        function pintarDetalles(student, contenDetails) {
            let card = student.filter(estudiante => estudiante.id == idDetails)
            card.forEach(student => {
                let contenedorDetails = document.createElement("div")
                contenedorDetails.className = "row g-0"
                contenedorDetails.innerHTML = `
                        <div class="row g-0">
                            <div class="col-md-8">
                                <img src="${student.image}" class="img-fluid" alt="${student.name}">
                            </div>
                            <div class="col-md-4 d-flex">
                                <div class="card-body d-flex flex-column justify-content-around">
                                    <h3 class="card-title">${student.name}</h3>
                                    <p>Actor: ${student.actor}</p>
                                    <p>Alternate name: ${student.alternate_names}</p>
                                    <p>Birth: ${student.dateOfBirth}</p>
                                    <p>Eye colour: ${student.eyeColour}</p>
                                    <p>Gender: ${student.gender}</p>
                                    <p>Hair colour: ${student.hairColour}</p>
                                    <p>House: ${student.house}</p>
                                    <p>Patronus: ${student.patronus}</p>
                                    <p>Specie: ${student.species}</p>
                                </div>
                            </div>
                        </div>`
                contenDetails.appendChild(contenedorDetails)
            }
            )
        }
    })