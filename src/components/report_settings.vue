
<template>
    <v-row style = "width: 50%;">
        <v-col>
            <v-select
            v-model="selected"
            :items="items"
            :rules="[v => !!v || 'Item is required']"
            label="File Format"
            :item-value="items[0]"
            required
            />
        </v-col>
        
        <v-col>
            <v-checkbox
            v-model="picture"
            label="Include Pictures ?"
            />
        </v-col>
    </v-row>
</template>

<script>


export default ({
    name: "ReportSettings",
    methods: 
    {
    
    },
    data() {
        return {
            items: ["PDF","CSV"],
            selected: "PDF",
            picture: false
        }
    }
})
</script>