
<template>

<!--Always Shown -->
    <v-dialog
    v-model="dialog"
    persistent
    max-width="600px">

    <template v-slot:activator="{ on, attrs }">
    <v-btn
        color="primary"
        dark
        v-bind="attrs"
        v-on="on">
        Add Family
    </v-btn>
    </template>


<!--Pop up Box -->
    <v-card>
        <v-card-title>
          <span class="headline">Add Family</span>
        </v-card-title>
        
        <v-card-text>
          <v-container>
            <v-row>          
              <v-col
                cols="12"
                sm="6"
              >
                <v-select
                  :items="people_names"
                  label="Head of Family*"
                  v-model="headOfFamily"
                  required/>
              </v-col>

            </v-row>
          </v-container>
          <small>*indicates required field</small>
          <small>{{err}}</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="createfamily()"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import axios from "axios";
export default ({
    name: "AddFamilyDialog",
    props:
    {
      people: Array
    },
    mounted()
    {
      for(var i = 0; i < this.people.length; i++)
      {
        this.people_names.push(this.people[i].name)
      }
    },
    methods: 
    {
        createFamily()
        {
          axios.post('http://team2.eaglesoftwareteam.com/family', this.family)
          .then((response) => {
          response.use();
          this.dialog = false;
          }, (error) => {
          this.err = error;
          });
        }
    },

    data() {
        return {
            dialog: false,
            headOfFamily:null,
            people_names:[],
            family: 
            {
              congregation_ID: this.$person.congregation_id,
              address_ID:null
            },
            err: ""
        }
    }
})
</script>