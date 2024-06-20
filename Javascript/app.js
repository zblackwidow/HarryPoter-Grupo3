const urlApi = "https://potterhead-api.vercel.app/api"
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
            studentsBk: [],
            staff: [],
            staffBk: [],
            house: [],
            studentsHouse: [],
            search: "",
            checkboxCheck: []
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
                this.studentsBk = this.allData.filter(data => data.hogwartsStudent == true)
                this.staff = this.allData.filter(data => data.hogwartsStaff == true)
                this.staffBk = this.allData.filter(data => data.hogwartsStaff == true)
                console.log(this.staff);
                this.house = [...new Set(this.allData.map((data) => data.house))]
                console.log(this.house);
                this.studentsHouse = this.staff.filter(data => data.house == urlHouse);
                console.log(this.studentsHouse);
            })
        }
    },
    computed: {
        filterHouse() {
            if (window.location.href == "http://127.0.0.1:5500/page/students.html") {
                let searchFilter = this.studentsBk.filter(dato => dato.name.toLowerCase().includes(this.search.toLowerCase()))
                if (this.checkboxCheck.length > 0) {
                    this.students = searchFilter.filter(data => this.checkboxCheck.includes(data.house))
                } else {
                    this.students = searchFilter
                }
            } else if (window.location.href == "http://127.0.0.1:5500/page/staff.html") {
                let searchFilter = this.staffBk.filter(dato => dato.name.toLowerCase().includes(this.search.toLowerCase()))
                if (this.checkboxCheck.length > 0) {
                    this.staff = searchFilter.filter(data => this.checkboxCheck.includes(data.house))
                } else {
                    this.staff = searchFilter
                }
            }

        }
    }
}).mount('#app')
