
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

            <v-row>
              <v-col cols="12">
                <v-text-field label="Address*"
                v-model="address.address"
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
            @click="createFamily()"
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
        async createFamily()
        {

          var myPromise = new Promise((resolve, reject) => { 
          axios.get("http://team2.eaglesoftwareteam.com/valid_value?value_group=address")
            .then(response => {
              this.address.type = response.data.filter(x => x.value == "current")[0].ID
              console.log(this.address)
              resolve()
            })
            .catch(error => {
              console.log(error);
              reject()
            })
          })

        this.family.head_ID = this.people.filter(x => x.name == this.headOfFamily)[0].id;
        console.log("Family Head ID: ", this.family.head_ID)
        myPromise.then(() => { 
          axios.post('http://team2.eaglesoftwareteam.com/address?person_ID=' + this.family.head_ID, this.address) //Adds address
          .then( async () => {
            axios.get("http://team2.eaglesoftwareteam.com/address?person_ID=" + this.family.head_ID) //Gets ID of the address that was added for that person
            .then(response => {
              console.log(response)
              this.family.address_ID = response.data[0].ID
              axios.post('http://team2.eaglesoftwareteam.com/family', this.family) //Adds Family
            })
            .catch(error => {
              console.log(error);
            })

              await this.resolveAfter2Seconds(200)
              this.dialog = false;
              this.$parent.$parent.$parent.$parent.getData();
              console.log(this.family)
            })
          })
        },

        resolveAfter2Seconds(x) {
          return new Promise(resolve => {
            setTimeout(() => {
              resolve(x);
            }, x);
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
              congregation_ID: window.person.congregation_ID,
              address_ID: null,
              head_ID: null,
              image: "default.jpg"
            },
            address:{
              address:null,
              type:null
            },
            err: ""
        }
    }
})
</script>