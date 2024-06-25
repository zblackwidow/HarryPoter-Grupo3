const urlApi = "https://api.potterdb.com/v1/spells"

const { createApp } = Vue

const aplicationSpell = createApp({

    data() {
        return {
            spell: [],
            category: [],
            search: "",
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

            if (sorts === "namefall") {
                let nameDesc = this.spell.sort((a, b) => b.attributes.name.localeCompare(a.attributes.category))
                this.spell = nameDesc
            }

            if (sorts === "nameup") {
                let nameAsce = this.spell.sort((a, b) => a.attributes.name.localeCompare(b.attributes.name))
                this.spell = nameAsce
            }

            if (sorts === "categoryup") {
                let categoryAsc = this.spell.sort((a, b) => a.attributes.category.localeCompare(b.attributes.category))
                this.spell = categoryAsc
            }

            if (sorts === "categoryfall") {
                let categoryDes = this.spell.sort((a, b) => b.attributes.category.localeCompare(a.attributes.category))
                this.spell = categoryDes
            }
            if (sorts === "effectup") {
                let effectUp = this.spell.sort((a, b) => a.attributes.effect.localeCompare(b.attributes.effect))
                this.spell = effectUp
            }
            if (sorts === "effectfall") {
                let effectFall = this.spell.sort((a, b) => b.attributes.effect.localeCompare(a.attributes.effect))
                this.spell = effectFall
            }
        }
    }
}).mount('#aplicationSpell')