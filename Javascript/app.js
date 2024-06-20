const urlApi = "https://hp-api.onrender.com/api"
//console.log(urlApi);
const urlAllCharacters = urlApi+"/characters"
//console.log(urlAllCharacters);
/*const urlAllStudents = urlAllCharacters+"/students"
console.log(urlAllStudents);
const urlAllStaff = urlAllCharacters+"/staff"
console.log(urlAllStaff);
const urlHouse = urlAllCharacters+"/house"
console.log(urlHouse);
const urlHouseGryffindor = urlHouse+"/gryffindor"
console.log(urlHouseGryffindor);
const urlHouseSlytherin = urlHouse+"/slytherin"
console.log(urlHouseSlytherin);
const urlHouseHufflepuff = urlHouse+"/hufflepuff"
console.log(urlHouseHufflepuff);
const urlHouseRavenclaw = urlHouse+"/ravenclaw"
console.log(urlHouseRavenclaw);*/

let urlHouse = ""//new URL(window.location.href).searchParams.get("id");

fetch(urlAllCharacters).then(response => response.json()).then(data => {
    console.log(data);
    allData = data
    students = allData.filter(data => data.hogwartsStudent == true)
    staff = allData.filter(data => data.hogwartsStaff == true)
    console.log(staff);
    house = [...new Set(allData.map((data) => data.house))]
    console.log(house);
    studentsHouse = staff.filter(data => data.house == urlHouse);    
    console.log(studentsHouse);
})