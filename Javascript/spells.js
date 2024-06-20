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
            category: []

        }
    },
    created() {
        this.traerData(urlApi)
    },
    methods: {
        traerData(url) {
            fetch(url).then(response => response.json()).then(datas => {
                console.log(datas);
                let {data} = datas
                console.log(data);

                this.image = data.map((e) => e.attributes.image)
                this.name = data.map((e) => e.attributes.name) 
                this.description = data.map((e) => e.attributes.description) 
                this.effect = data.map((e) => e.attributes.effect) 
                this.category = Array.from(new Set(data.map((e) => e.attributes.category)))
                this.spell = data

                console.log(this.spell);              
            })
        }
    },
    computed: {
      
    }
}).mount('#aplicationSpell')