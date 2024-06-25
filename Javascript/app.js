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
let idDetails = new URL(window.location.href).searchParams.get("id")
let urlHouse = new URL(window.location.href).searchParams.get("id");
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
            checkboxCheck: [],
            studentsFavorite: JSON.parse(localStorage.getItem('studentsFavorite')) || [],
            staffFavorite: JSON.parse(localStorage.getItem('staffFavorite')) || [],
            details: []
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
                this.allData.forEach(dato => {
                    if (!dato.house || dato.house.trim() === "") {
                        dato.house = "Homeless"
                    }
                });
                this.students = this.allData.filter(data => data.hogwartsStudent == true)
                this.studentsBk = this.allData.filter(data => data.hogwartsStudent == true)
                this.staff = this.allData.filter(data => data.hogwartsStaff == true)
                this.staffBk = this.allData.filter(data => data.hogwartsStaff == true)
                this.house = [...new Set(this.allData.map((data) => data.house))]
                this.studentsHouse = this.studentsBk.filter(data => data.house == urlHouse);
                this.details = this.allData.filter(dato => dato.id == idDetails);
                console.log(this.details);
            });
        },
        addFavorite(dato) {
            if (window.location.href == "http://127.0.0.1:5500/page/students.html") {
                if (!this.isFavorite(dato)) {
                    this.studentsFavorite.push(dato)
                    localStorage.setItem('studentsFavorite', JSON.stringify(this.studentsFavorite))
                }
            } else if (window.location.href == "http://127.0.0.1:5500/page/staff.html") {
                if (!this.isFavorite(dato)) {
                    this.staffFavorite.push(dato)
                    localStorage.setItem('staffFavorite', JSON.stringify(this.staffFavorite))
                }
            }
        },
        deleteFavorite(dato) {
            if (window.location.href == "http://127.0.0.1:5500/page/students.html") {
                const index = this.studentsFavorite.findIndex(data => data.id === dato.id)
                if (index !== -1) {
                    this.studentsFavorite.splice(index, 1)
                    localStorage.setItem('studentsFavorite', JSON.stringify(this.studentsFavorite))
                }
            } else if (window.location.href == "http://127.0.0.1:5500/page/staff.html") {
                const index = this.staffFavorite.findIndex(data => data.id === dato.id)
                if (index !== -1) {
                    this.staffFavorite.splice(index, 1)
                    localStorage.setItem('staffFavorite', JSON.stringify(this.staffFavorite))
                }
            }
        },
        isFavorite(dato) {
            if (window.location.href == "http://127.0.0.1:5500/page/students.html") {
                return this.studentsFavorite.some(data => data.id === dato.id);
            } else if (window.location.href == "http://127.0.0.1:5500/page/staff.html") {
                return this.staffFavorite.some(data => data.id === dato.id);
            }
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