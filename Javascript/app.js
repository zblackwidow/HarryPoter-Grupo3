const urlApi = "https://hp-api.onrender.com/api"
//console.log(urlApi);
const urlAllCharacters = urlApi + "/characters"
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

const { createApp } = Vue

const app = createApp({
    data() {
        return {
            allData: [],
            students: [],
            staff: [],
            house: [],
            studentsHouse: []
        }

    },
    created() {
        this.apiData(urlAllCharacters)
    },
    methods: {
        apiData(url) {
            fetch(url).then(response => response.json()).then(data => {
                console.log(data);
                this.allData = data
                this.students = this.allData.filter(data => data.hogwartsStudent == true)
                this.staff = this.allData.filter(data => data.hogwartsStaff == true)
                console.log(this.staff);
                this.house = [...new Set(this.allData.map((data) => data.house))]
                console.log(this.house);
                this.studentsHouse = staff.filter(data => data.house == urlHouse);
                console.log(this.studentsHouse);
            })
        }
    },
    computed: {
    }
}).mount('#app')
