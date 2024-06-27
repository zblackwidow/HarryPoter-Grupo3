const urlApi = "https://potterhead-api.vercel.app/api/characters"
let idDetails = new URL(window.location.href).searchParams.get("id")
let urlHouse = new URL(window.location.href).searchParams.get("id");

let colorOfHouse = {
    Gryffindor: '#ff6347',
    Ravenclaw: '#4682b4',
    Hufflepuff: '#90ee90',
    Slytherin: '#ffa500',
    Homeless: '#808080' 
  };

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
        this.apiData(urlApi)
    },
    methods: {
        apiData(url) {
            fetch(url).then(response => response.json()).then(data => {
                this.allData = data
                this.allData.forEach(dato => {
                    if (!dato.house || dato.house.trim() === "") {
                        dato.house = "Homeless"
                    }
                    if (!dato.patronus || dato.patronus.trim() === "") {
                        dato.patronus = "Does not have"
                    }
                    if (!dato.eyeColour || dato.eyeColour.trim() === "") {
                        dato.eyeColour = "No data"
                    }
                    if (!dato.dateOfBirth || dato.dateOfBirth.trim() === "") {
                        dato.dateOfBirth = "No data"
                    }
                    if (!dato.image || dato.image.trim() === "") {
                        dato.image = "https://e1.pxfuel.com/desktop-wallpaper/747/257/desktop-wallpaper-hogwarts-logo-hogwarts-crest.jpg"
                    }
                });
                this.students = this.allData.filter(data => data.hogwartsStudent == true)
                this.studentsBk = this.allData.filter(data => data.hogwartsStudent == true)
                this.staff = this.allData.filter(data => data.hogwartsStaff == true)
                this.staffBk = this.allData.filter(data => data.hogwartsStaff == true)
                this.house = [...new Set(this.allData.map((data) => data.house))]
                this.studentsHouse = this.studentsBk.filter(data => data.house == urlHouse);
                this.details = this.allData.filter(dato => dato.id == idDetails);
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
        },
        changeShadow(event) {
            let house = event.target.dataset.house; // Obtener la casa desde el dataset
            let colorShadows = colorOfHouse[house] || '#808080'; // Obtener el color específico o color por defecto
            event.target.style.boxShadow = `5px 5px 10px ${colorShadows}`;
          },
        
          resetShadow(event) {
            event.target.style.boxShadow = '5px 5px 10px rgba(210, 170, 107, 0.5)';
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