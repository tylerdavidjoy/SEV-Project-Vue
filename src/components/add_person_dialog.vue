
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
        Add Person
    </v-btn>
    </template>


<!--Pop up Box -->
    <v-card>
        <v-card-title>
          <span class="headline">Add Person</span>
        </v-card-title>
        
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="First name*"
                  v-model="person.f_name"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Last name*"
                  v-model="person.l_name"
                  required
                ></v-text-field>
              </v-col>
            
            <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field label="Preferred name"
                v-model="person.preferred_name"/>
            </v-col>

            
              <v-col
                cols="12"
                sm="6"
              >
                <v-select
                  :items="['Male','Female','Other']"
                  label="Gender*"
                  v-model="person.gender"
                  required/>
              </v-col>

              <v-col cols="12">
                <v-text-field label="Email"
                v-model="person.email"/>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field label="Occupation"
                v-model="person.occupation"/>
              </v-col>

              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field label="Employeer"
                v-model="person.employer"/>
              </v-col>

              <v-col
                cols="12"
                sm="6"
              >
                <v-select
                  :items="['User', 'Decan', 'Admin']"
                  label="User Type*"
                  v-model="person.role"
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
            @click="createPerson()"
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
    name: "AddPersonDialog",
    mounted()
    {
    axios.get("http://team2.eaglesoftwareteam.com/valid_value?value_group=role")
    .then(response => {
      console.log(response.data);
      for(var i = 0; i < response.data.length; i++)
      {
        this.rolesObj.push(
        {
            ID: response.data[i].ID,
            value_group: response.data[i].value_group,
            value: response.data[i].value
        })

        this.roles.push(response.data[i].value);
      }
    })
    .catch(error => {
      console.log(error);
    })

    },
    methods: 
    {
        createPerson()
        {
            this.person.gender = this.person.gender.toLowerCase();
            this.person.role = this.rolesObj.find(item => item.value == this.person.role.toLowerCase()).ID;
            
            //axios.post('http://team2.eaglesoftwareteam.com/person', this.person);
            this.dialog = false;
            this.$parent.$parent.$parent.$parent.getData();
        }
    },

    data() {
        return {
            dialog: false,
            rolesObj:[],
            roles:[],
            person: 
            {
                congregation_ID: this.$person.congregation_ID,
                f_name:null,
                l_name:null,
                occupation: null,
                employer:null,
                family_ID:null,
                email:null,
                gender:null,
                preferred_name:null,
                role:null,
                image:"default.jpg"
            },
            err: ""
        }
    }
})
</script>