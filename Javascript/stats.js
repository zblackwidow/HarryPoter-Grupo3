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
    

    // Función para calcular la edad en función del año de nacimiento
    function calcularEdad(anoDeNacimiento) {
      const anoActual = new Date().getFullYear();
      return anoActual - anoDeNacimiento;
    }

    // Función para obtener las 10 personas más viejas y más jóvenes
    function obtenerExtremosDeEdad(personajes) {
      // Calcular la edad de cada personaje
      personajes.forEach(personaje => {
        // Solo calcular la edad si yearOfBirth no es null o undefined
        if (personaje.yearOfBirth) {
          personaje.edad = calcularEdad(personaje.yearOfBirth);
        } else {
          personaje.edad = null; // Si no hay año de nacimiento, asignar null
        }
      });

      // Filtrar personajes sin edad (null)
      const personajesConEdad = personajes.filter(personaje => personaje.edad !== null);

      // Ordenar por edad de menor a mayor
      personajesConEdad.sort((a, b) => a.edad - b.edad);

      // Obtener las 10 personas más jóvenes
      const masJovenes = personajesConEdad.slice(0, 10);

      // Obtener las 10 personas más viejas (ordenadas de mayor a menor)
      const masViejos = personajesConEdad.slice(-10).reverse();

      return { masJovenes, masViejos };
    }

     // Obtener los extremos de edad de los datos
     const { masJovenes, masViejos } = obtenerExtremosDeEdad(data);

     // Mostrar los resultados en la tabla HTML
     const ContenedorEdad = document.getElementById("topEdades");
 
     // Iterar sobre el máximo número de filas (10 en este caso)
     for (let i = 0; i < 10; i++) {
       // Crear una nueva fila
       let tablaEdades = document.createElement("tr");
       tablaEdades.classList.add("text-center");
 
       // Agregar las celdas para las personas más jóvenes y más viejas
       let celdaJoven = document.createElement("td");
       if (masJovenes[i]) {
         celdaJoven.textContent = `${masJovenes[i].name}, ${masJovenes[i].edad} años`;
       } else {
         celdaJoven.textContent = ''; // Si no hay personaje, dejar la celda vacía
       }
 
       let celdaViejo = document.createElement("td");
       if (masViejos[i]) {
         celdaViejo.textContent = `${masViejos[i].name}, ${masViejos[i].edad} años`;
       } else {
         celdaViejo.textContent = ''; // Si no hay personaje, dejar la celda vacía
       }
 
       // Agregar las celdas a la fila
       
       tablaEdades.appendChild(celdaViejo);
       tablaEdades.appendChild(celdaJoven);
 
       // Agregar la fila al cuerpo de la tabla
       ContenedorEdad.appendChild(tablaEdades);
    }




  });

