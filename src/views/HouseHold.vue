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
                  <input style="display: none"
                    type="file"
                    @change="onFileSelected"
                    ref="fileInput">
                  <v-btn @click="$refs.fileInput.click()" class="ma-2">Pick Photo</v-btn>
                  <v-btn @click="onUpload" class="ma-2">Upload</v-btn>
                  <br />
                  <h1>HouseHold Information</h1>
                  <br />
                  <label>Address</label>
                  <v-text-field v-model="address" label="Family Address" :readonly="!editable"></v-text-field>
                  <label>Phone Number</label>
                  <v-text-field v-model="phone" label="Family Phone Number" :readonly="!editable"></v-text-field>
                  <label>Email</label>
                  <v-text-field v-model="email" label="Family Email" :readonly="true"></v-text-field>
                  <v-btn @click="onEdit" class="ma-2" outlined large fab color="red darken-4" v-if="isHeadOfFamily">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn @click="onSave" class="ma-2" outlined large fab color="red darken-4" v-if="isHeadOfFamily">
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
                      v-for="member in familyMembers"
                      v-bind:key="member" class="list" @click="navToAccountPage(member.ID)">
                      <v-list-item-icon>
                        <img src="../assets/dog.jpg" class="smallUserImg">
                      </v-list-item-icon>

                      <v-list-item-content class="large">
                        <v-list-item-title class="large">{{ member.f_name }} {{ member.l_name }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                  <v-dialog
                    v-model="dialog"
                    scrollable
                    max-width="300px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn @click="addMember"
                        class="ma-2"
                        outlined
                        large
                        fab
                        color="red darken-4"
                        v-if="isAdmin"
                        v-on="on"
                        v-bind="attrs"
                      >
                        <v-icon>mdi-account-plus</v-icon>
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>Select Person</v-card-title>
                      <v-divider></v-divider>
                      <v-card-text style="height: 300px;">
                        <v-list class="list">
                          <v-list-item
                            v-for="member in churchMembers"
                            v-bind:key="member" class="list" @click="addMemberToFamily(member.ID)">
                            <!-- <v-list-item-icon>
                              <img src="../assets/dog.jpg" class="smallUserImg">
                            </v-list-item-icon> -->

                            <v-list-item-content class="large">
                              <v-list-item-title class="large">{{ member.f_name }} {{ member.l_name }}</v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                        </v-list>
                      </v-card-text>
                      <v-divider></v-divider>
                      <v-card-actions>
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
                          @click="dialog = false"
                        >
                          Save
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
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
    data() { 
      return {
        selectedFile: null,
        address: "",
        phone: "",
        email: "",
        headOfFamilyID: "",
        phoneNumberID: "",
        congregationID: "",
        f_name: "",
        l_name: "",
        occupation: "",
        employer: "",
        baseURL: "http://team2.eaglesoftwareteam.com/",
        members:[
          {name: 'Billy Bob jr.'},
          {name: 'Billy Bob sr.'},
          {name: 'Sally Bob jr.'},
          {name: 'Sally Bob sr.'},
          {name: 'Junior Bob jr.'},
        ],
        familyMembers: [],
        churchMembers: [],
        userId: 1,
        familyId: "",
        address_ID: "",
        address_Type: "",
        phoneNumber_Type: "",
        can_publish: "",
        editable: false,
        isHeadOfFamily: false,
        isAdmin: true,
        dialog: false
      }

    
    
    },
    created() {

      // Get family ID of the currently logged in user
        axios
        .get(this.baseURL + "family?person_ID=" + this.userId)
        .then(response => {
          this.familyId = response.data[0].ID;
          console.log(response.data);
          console.log("Family ID: " + this.familyId)
          return axios.get(this.baseURL + "family?id=" + this.familyId + "&isGetPersons=1&isGetHeadOfFamily=0")
        })
        // .catch(error => {
        //   console.log("ERROR: " + error.response)
        // })

      // Get family members of the currently logged in user
        .then(response => {
          this.familyMembers = response.data;
          console.log(response.data)
          console.log(this.familyMembers)
          return axios.get(this.baseURL + "address?person_ID=" + this.userId)
        })


      // Get the household address
        // axios
        // .get(this.baseURL + "address?person_ID=" + this.userId)
        .then(response => {
          console.log("Household address " + response.data)
          this.address = response.data[0].address;
          this.address_ID = response.data[0].ID;
          this.address_Type = response.data[0].type;
          console.log("Address Type: " + this.address_Type)
          console.log("Address ID: " + this.address_ID)
          // return axios.get(this.baseURL + "family?id=" + this.familyId + "&isGetPersons=0&isGetHeadOfFamily=1")
          return axios.get(this.baseURL + "person?id=" + this.userId)
        })


      // Find the head of the family
        // axios
        // .get(this.baseURL + "family?id=" + this.familyId + "&isGetPersons=0&isGetHeadOfFamily=1")
        .then(response => {
          this.headOfFamilyID = response.data[0].ID;
          console.log("Head of family ID" + this.headOfFamilyID)
          this.isHeadOfHousehold();
          return axios.get(this.baseURL + "person?id=" + this.headOfFamilyID)
        })

        
      // Get the family email and store information for updating a person
        .then(response => {
          console.log(response.data)
          this.email = response.data[0].email;
          this.congregationID = response.data[0].congregation_ID;
          this.f_name = response.data[0].f_name;
          this.l_name = response.data[0].l_name;
          this.occupation = response.data[0].occupation;
          this.employer = response.data[0].employer;
          console.log(this.email)
          return axios.get(this.baseURL + "phone_number?person_ID=" + this.headOfFamilyID)
        })


      // Get the family phone number
        .then(response => {
          console.log(response.data)
          this.phone = response.data[0].number;
          this.phoneNumberID = response.data[0].ID;
          this.phoneNumber_Type = response.data[0].type;
          this.can_publish = response.data[0].can_publish;
          console.log(this.phone)
          console.log(this.phoneNumberID)
          console.log(this.can_publish)
        })

        
          
    },

    methods: {
      onFileSelected(event) {
        console.log(event)
        this.selectedFile = event.target.files[0]
      },
      onUpload() {

      },
      onEdit: function() {

        // If the head of household is logged in give edit permission
        if(this.userId == this.headOfFamilyID) {
          this.editable = true;
        }

        // If the head of household is not logged in do not allow edit permission
        else {
          alert("You are not head of household. You do not have permission to edit.")
        }
      },
      onSave: function() {
        this.editable = false;


      // Update family address
        axios
        .put(this.baseURL + "address?id=" + this.address_ID, {
          address: this.address,
          type: this.address_Type
        })


      // Update family phone number
        axios
        .put(this.baseURL + "phone_number?id=" + this.phoneNumberID, {
          number: this.phone,
          can_publish: this.can_publish,
          type: this.phoneNumber_Type
        })


      // Update family email
        // axios
        // .put(this.baseURL + "person?id=" + this.headOfFamilyID, {
        //   congregation_ID: this.congregationID,
        //   f_name: this.f_name,
        //   l_name: this.l_name,
        //   occupation: this.occupation,
        //   employer: this.employer,
        //   family_ID: this.familyId,
        //   email: this.email
        // })
      },

      isHeadOfHousehold: function() {
        console.log("isHeadOfHousehold function")
        if(this.userId === this.headOfFamilyID) {
          this.isHeadOfFamily = true;
        }
        // return this.isHeadOfFamily;
      },

      navToAccountPage: function(param) {
        console.log("Navigate to account page!")
        console.log(param)
        this.$router.push({ path: '/account', params: { id: param }})
      },

      addMember: function() {
        console.log("member added")
        axios
        .get(this.baseURL + "person")
        .then(response => {
          console.log(response.data)
          this.churchMembers = response.data;
        })
      },

      addMemberToFamily(memberID) {
        console.log(memberID)
        var userID = null;
        var congregationID = null;
        var user_f_name = null;
        var user_l_name = null;
        var user_occupation = null;
        var user_employer = null;
        // var familyID = null;
        var user_email = null;
        var user_gender = null;
        var preferredName = null;
        var user_role = null;
        axios
        .get(this.baseURL + "person?id=" + memberID)
        .then(response => {
          console.log(response.data)
          userID = response.data[0].ID;
          congregationID = response.data[0].congregation_ID;
          user_f_name = response.data[0].f_name;
          user_l_name = response.data[0].l_name;
          user_occupation = response.data[0].occupation;
          user_employer = response.data[0].employer;
          // familyID = response.data[0].family_ID;
          user_email = response.data[0].email;
          user_gender = response.data[0].gender;
          preferredName = response.data[0].preferred_name;
          user_role = response.data[0].role;
        })

        axios.put(this.baseURL + "person?id="  + memberID, {
          ID: userID,
          congregation_ID: congregationID,
          f_name: user_f_name,
          l_name: user_l_name,
          occupation: user_occupation,
          employer: user_employer,
          family_ID: this.familyId,
          email: user_email,
          gender: user_gender,
          preferred_name: preferredName,
          role: user_role

        })
      }
    }
  }
</script>

<style lang="scss"> 

.large {
  font-size: 1.3em;
}

.list {
  color: white;
}

img.userImg {
  margin: 20px;
  height: 10%;
  size: auto
}

img.smallUserImg {
  height: 80px;
  size: auto
}

img.familyImg {
  margin: 20px;
  height: 40%;
  size: auto
}

h1 {
  color: maroon;
  padding: 10px;
  text-decoration: underline;
}

</style>