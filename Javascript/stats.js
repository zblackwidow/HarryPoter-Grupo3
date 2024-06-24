const enlaceData = "https://hp-api.onrender.com/api/characters";

fetch (enlaceData)
.then(response => response.json())
.then(data => 
  {

    let gryffindor=0; hufflepuff=0; ravenclaw=0; slytherin = 0;

    for (let i = 0; i < data.length; i++) {
      if (data[i].house === "Gryffindor") {
        gryffindor += 1;
      }  if (data[i].house === "Hufflepuff") {
        hufflepuff += 1;
      } if (data[i].house === "Ravenclaw") {
        ravenclaw += 1;
      } if (data[i].house === "Slytherin") {
        slytherin += 1;
      }
    document.getElementById("Gryffindor").innerHTML = `${gryffindor}`
    document.getElementById("Hufflepuff").innerHTML = `${hufflepuff}`
    document.getElementById("Ravenclaw").innerHTML = `${ravenclaw}`
    document.getElementById("Slytherin").innerHTML = `${slytherin}`
    
    }
    
    let mujeres = 0
    let hombre = 0
    let otrasEspecies = 0
    
    /* filtro Sexo */
    for (let i=0; i<data.length; i++){
      
      if(data[i].species === "human" && data[i].gender === "male"){
        hombre += 1
      } if(data[i].species === "human" && data[i].gender === "female") {
        mujeres += 1
      } if(data[i].species != "human"){
        otrasEspecies += 1
      }
    }
    let porcentajeHombres = (hombre / data.length * 100).toFixed(2)
    let porcentajeMujeres = (mujeres / data.length * 100).toFixed(2)
    let porcentajeEspecies = (otrasEspecies / data.length * 100).toFixed(2)
    document.getElementById("hombres").innerHTML = `${porcentajeHombres} %`
    document.getElementById("mujeres").innerHTML = `${porcentajeMujeres} %`
    document.getElementById("otrasEspecies").innerHTML = `${porcentajeEspecies} %`
    

    
    function calcularEdad(anoDeNacimiento) {
      const anoActual = new Date().getFullYear();
      return anoActual - anoDeNacimiento;
    }

    
    function obtenerExtremosDeEdad(personajes) {
     
      personajes.forEach(personaje => {
        
        if (personaje.yearOfBirth) {
          personaje.edad = calcularEdad(personaje.yearOfBirth);
        } else {
          personaje.edad = null; 
        }
      });

      
      const personajesConEdad = personajes.filter(personaje => personaje.edad !== null);

      
      personajesConEdad.sort((a, b) => a.edad - b.edad);

     
      const masJovenes = personajesConEdad.slice(0, 10);

     
      const masViejos = personajesConEdad.slice(-10).reverse();

      return { masJovenes, masViejos };
    }

     
     const { masJovenes, masViejos } = obtenerExtremosDeEdad(data);

    
     const ContenedorEdad = document.getElementById("topEdades");
 
     
     for (let i = 0; i < 10; i++) {
       
       let tablaEdades = document.createElement("tr");
       tablaEdades.classList.add("text-center");
 
       
       let celdaJoven = document.createElement("td");
       if (masJovenes[i]) {
         celdaJoven.textContent = `${masJovenes[i].name}, ${masJovenes[i].edad} años`;
       } else {
         celdaJoven.textContent = ''; 
       }
 
       let celdaViejo = document.createElement("td");
       if (masViejos[i]) {
         celdaViejo.textContent = `${masViejos[i].name}, ${masViejos[i].edad} años`;
       } else {
         celdaViejo.textContent = ''; 
       }
 
       
       
       tablaEdades.appendChild(celdaViejo);
       tablaEdades.appendChild(celdaJoven);
 
     
       ContenedorEdad.appendChild(tablaEdades);
    }




  });

