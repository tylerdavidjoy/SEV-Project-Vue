
<template>
    <v-row style = "width: 50%;">
        <v-col>
            <v-select
            v-model="selected"
            :items="items"
            :rules="[v => !!v || 'Item is required']"
            label="File Format"
            required
            @change="$emit('update:selected', selected);"
            />
        </v-col>
        
        <v-col>
            <v-checkbox
            v-model="picture"
            label="Include Pictures ?"
            @change="$emit('update:picture', picture);"
            />
        </v-col>
    </v-row>
</template>

<script>


export default ({
    name: "ReportSettings",
    props:
    {
        selected: String,
        picture: Boolean
    },
    methods: 
    {
    
    },
    data() {
        return {
            items: ["PDF","CSV"]
        }
    }
})
</script>