<template>
  <v-app>
    <v-container>
      <div class="flex-container">
      <div class="flex-child-small">
        <img src="../assets/dog.jpg" class="familyImg">
        <br />
        <h1>HouseHold Information</h1>
        <br />
        <label>Address</label>
        <v-text-field label="Family Address" disabled></v-text-field>
        <label>Phone Number</label>
        <v-text-field label="Family Phone Number" disabled></v-text-field>
        <label>Email</label>
        <v-text-field label="Family Email" disabled></v-text-field>
        <v-btn class="ma-2" outlined large fab color="indigo">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn class="ma-2" outlined large fab color="indigo">
          <v-icon>mdi-content-save</v-icon>
        </v-btn>
      </div>
      <div class="flex-child">
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
                <v-list-item-title class="large">{{ member.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
      </div>
      </div>
    </v-container>
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
        baseURL: "http://team2.eaglesoftwareteam.com/#/",
        members:[
          {name: 'Billy Bob jr.'},
          {name: 'Billy Bob sr.'},
          {name: 'Sally Bob jr.'},
          {name: 'Sally Bob sr.'},
          {name: 'Junior Bob jr.'},
        ],
        familyMembers: [],
        userId: 1,
      }

    
    
    },
    created() {
      console.log("Hello there :)");
      console.log(this.baseURL);
      console.log(this.userId);
      var url = this.baseURL + "family?person_ID=" + this.userId;
      console.log(url);
        // axios
        // .get(url)
        // .then(response => {
        //   console.log(response.data)
        //   this.familyMembers = response.data;
        // })
        axios({
          method: 'get',
          url: this.baseURL + "family?person_ID=" + this.userId
        })
        .then(function (response) {
          console.log(response.data),
          this.familyMembers = response.data
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