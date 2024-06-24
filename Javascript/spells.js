const urlApi = "https://api.potterdb.com/v1/spells"

const { createApp } = Vue

const aplicationSpell = createApp({

    data() {
        return {
            spell: [],
            category: [],
            search: "",
            selectOrder: ``,
            selectSort: ``,
            spellBk: [],
            categorySelect: ``,
        }
    },
    created() {
        this.date(urlApi)
    },
    methods: {
        date(url) {
            fetch(url).then(response => response.json()).then(datas => {
                let { data } = datas
                this.category = Array.from(new Set(data.map((e) => e.attributes.category)))
                this.spell = data
                this.spellBk = data
            })
        }
    },
    computed: {
        filter() {
            let filterText = this.spellBk.filter(e => e.attributes.name.toLowerCase().includes(this.search.toLowerCase().trim()))

            if (this.categorySelect.length > 0) {
                this.spell = filterText.filter(e => this.categorySelect.includes(e.attributes.category))
            } else {
                this.spell = filterText
            }

            let sorts = this.selectSort
            let orders = this.selectOrder

            if (sorts === "name" && orders === "falling") {
                let nameDesc = this.spell.sort((a, b) => b.attributes.name.localeCompare(a.attributes.category))
                this.spell = nameDesc
            }

            if (sorts === "name" && orders === "upward") {
                let nameAsce = this.spell.sort((a, b) => a.attributes.name.localeCompare(b.attributes.name))
                this.spell = nameAsce
            }

            if (sorts === "category" && orders === "upward") {
                let categoryAsc = this.spell.sort((a, b) => a.attributes.category.localeCompare(b.attributes.category))
                this.spell = categoryAsc
            }

            if (sorts === "category" && orders === "falling") {
                let categoryDes = this.spell.sort((a, b) => b.attributes.category.localeCompare(a.attributes.category))
                this.spell = categoryDes
            }
        }
    }
}).mount('#aplicationSpell')