<template>
  <v-app id="inspire">
    <div>
      <v-main class="grey lighten-2">
        <v-container>
          <v-row>
            <v-col cols="6">
              <v-container>
                <v-sheet width="600">
                  <img src="../assets/dog.jpg" class="familyImg">
                  <br />
                  <h1>HouseHold Information</h1>
                  <br />
                  <label>Address</label>
                  <v-text-field v-model="address" label="Family Address" disabled></v-text-field>
                  <label>Phone Number</label>
                  <v-text-field v-model="phone" label="Family Phone Number" disabled></v-text-field>
                  <label>Email</label>
                  <v-text-field v-model="email" label="Family Email" disabled></v-text-field>
                  <v-btn class="ma-2" outlined large fab color="indigo">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn class="ma-2" outlined large fab color="indigo">
                    <v-icon>mdi-content-save</v-icon>
                  </v-btn>
                </v-sheet>
              </v-container>
            </v-col>
            <v-col cols="auto">
              <v-container>
                <v-sheet width="600">
                  <img src="../assets/dog.jpg" class="userImg">
                  <br />
                  <h1>Family Members</h1>
                  <br />
                  <v-list class="list">
                    <v-list-item
                      v-for="member in members"
                      v-bind:key="member" class="list">
                      <v-list-item-icon>
                        <img src="../assets/dog.jpg" class="smallUserImg">
                      </v-list-item-icon>

                      <v-list-item-content class="large">
                        <v-list-item-title class="large">{{ member.f_name }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-sheet>
              </v-container>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </div>
  </v-app>
</template>

<script>

import axios from 'axios'

  export default {
  // components: { Directory },
    data() { 
      return {
    // members:[
    // {icon:'mdi-home',text:'Home', path:'/'},
    // {icon:'mdi-account',text:'Account', path:'/account'},
    // {icon:'mdi-home-group',text:'HouseHold', path:'/household'},
    // {icon:'mdi-account-group',text:'Groups', path:'/groups'},
    // {icon:'mdi-calendar',text:'Events', path:'/events'},
    // {icon:'mdi-church',text:'Directory', path:'/directory'},

    // ],
        address: "",
        phone: "",
        email: "",
        baseURL: "http://localhost:3000/",
        members:[
          {name: 'Billy Bob jr.'},
          {name: 'Billy Bob sr.'},
          {name: 'Sally Bob jr.'},
          {name: 'Sally Bob sr.'},
          {name: 'Junior Bob jr.'},
        ],
        familyMembers: [],
        userId: 1,
        familyId: 2
      }

    
    
    },
    created() {
      console.log("Hello there :)");
      console.log(this.baseURL);
      console.log(this.userId);
      var myUrl = this.baseURL + "family?id=" + this.familyId + "&isGetPersons=1";
      console.log(myUrl);
        // axios
        // .get(url)
        // .then(response => {
        //   console.log(response.data)
        //   this.familyMembers = response.data;
        // })
        axios({
          method: 'get',
          url: 'http://localhost:3000/family?id=2&isGetPersons=1',
          headers: {
          }
        })
        .then(function (response) {
          console.log(response.data),
          this.familyMembers = response.data
        })
        .catch((error) => {
          console.log("ERROR: " + error.response);
        });
    },

    methods: {
      getFamily: function() {
        
      }
    }
  }
</script>

<style lang="scss">

.flex-container {
    display: flex;
}

.flex-child {
    flex: 1;
    padding: 15px;
}  

.flex-child-small{
    flex: 0.4;
    width: 30%;
    padding: 15px;
}  

.large {
  font-size: 1.3em;
}
// div.rightDiv {
// float: left;
// text-align: left;
// width: 49%;
// margin: 5px;
// height: 100vh;
// color: darkblue;
// background-color: slategray;
// border-radius: 10px;
// }

// div.leftDiv {
//  float: left;
//  text-align: left;
//  width: 49%;
//  margin: 5px;
//  height: 100vh;
//  color: darkblue;
//  background-color: slategray;
//  border-radius: 10px;
// }

.list {
  // background-color: darkslategray;
  color: white;
}

img.userImg {
  margin: 20px;
  // width: 10%;
  height: 10%;
  size: auto
}

img.smallUserImg {
  // width: 50px;
  height: 80px;
  size: auto
}

img.familyImg {
  margin: 20px;
  // width: 40%;
  height: 40%;
  size: auto
}

h1 {
  color: maroon;
  // background-color: slategray;
  padding: 10px;
  text-decoration: underline;
}

</style>