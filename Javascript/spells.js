const urlApi = "https://api.potterdb.com/v1/spells"

const { createApp } = Vue

const aplicationSpell = createApp({

    data() {
        return {
            spell: [],
            image: [],
            name: [],
            description: [],
            effect: [],
            category: [],
            search: "",
            selectOrder: ``,
            selectSort: ``,
            spellBk: [],
        }
    },
    created() {
        this.traerData(urlApi)
    },
    methods: {
        traerData(url) {
            fetch(url).then(response => response.json()).then(datas => {
                console.log(datas);
                let { data } = datas
                console.log(data);

                this.image = data.map((e) => e.attributes.image)
                this.name = data.map((e) => e.attributes.name)
                this.description = data.map((e) => e.attributes.description)
                this.effect = data.map((e) => e.attributes.effect)
                this.category = Array.from(new Set(data.map((e) => e.attributes.category)))
                this.spell = data
                this.spellBk = data
                console.log(this.spell);
            })
        }
    },
    computed: {
        filter() {
            let filterText = this.spellBk.filter(e => e.attributes.name.toLowerCase().includes(this.search.toLowerCase().trim()))
            this.spell = filterText

            let nameDesc = this.name.sort((a, b) => b.localeCompare(a))
            console.log(nameDesc);

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