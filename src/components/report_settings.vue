
<template>
    <div style = "margin:auto;">

         <v-row style = "width: 50%; margin:auto;">
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

            <v-col>
                
                <v-select
                    v-if="life_event_types"
                    :items="life_event_list"
                    label="Type of Life Event"
                    style=" margin:auto;"
                />
            </v-col>
            
        </v-row>

        <v-row style="margin-bottom:10%;" v-if="start && end">
        <v-col
        cols="12"
        lg="6">
        <v-menu
          v-model="menu1"
          :close-on-content-click="false"
          max-width="20%"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              :value="start"
              clearable
              label="Start Date"
              readonly
              v-bind="attrs"
              v-on="on"
              @click:clear="start = null"

            ></v-text-field>
          </template>
          <v-date-picker
            v-model="start"
            @change="menu1 = false"
            :max="end"
            
          ></v-date-picker>
        </v-menu>
      </v-col>

      <v-col
        cols="12"
        lg="6"
      >
        <v-menu
          v-model="menu2"
          :close-on-content-click="false"
          max-width="20%"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              :value="end"
              clearable
              label="End Date"
              readonly
              v-bind="attrs"
              v-on="on"
              @click:clear="end = null"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="end"
            class="mt-4"
            :min="start"
            @change="menu2 = false"
          ></v-date-picker>
        </v-menu>
      </v-col>
    </v-row>



    </div>
</template>

<script>


export default ({
    name: "ReportSettings",
    props:
    {
        selected: String,
        picture: Boolean,
        start: String,
        end: String,
        life_event_types: []
    },
    methods: 
    {
        life_event_filter()
        {
            for(var i=0; i < this.life_event_types.length; i++)
            {
                this.life_event_list = this.life_event_types[i].value
            }
        }
    },
    data() {
        return {
            items: ["PDF","CSV"],
            menu1: false,
            menu2: false,
            life_event_list:[]
        }
    }
})
</script>