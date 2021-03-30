<template>
  <v-app id="inspire">
    <div>
      <v-main class="grey lighten-2">
        <v-container>
          <v-row>
            <v-col cols="6">
              <v-container>
                <v-sheet width="600">
                  <!-- <v-avatar size="auto" :tile="true" min-height="230" max-height="270" min-width="230" max-width="270"> -->
                  <img :src="familyImgSrc"  class="familyImg" />
                        
                  <!-- </v-avatar>  -->
                  <br />
                  <PhotoUpload v-bind:familyId="this.familyId"/>
                  <br />
                  <h1>HouseHold Information</h1>
                  <br />
                  <label>Address</label>
                  <v-text-field v-model="address" label="Family Address" :readonly="!editable"></v-text-field>
                  <label>Phone Number</label>
                  <v-text-field v-model="phone" label="Family Phone Number" :readonly="!editable"></v-text-field>
                  <label>Email</label>
                  <v-text-field v-model="email" label="Family Email" :readonly="true"></v-text-field>
                  <v-btn @click="onEdit" class="ma-2" outlined large fab color="red darken-4" v-if="hasEditPermission()">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn @click="onSave" class="ma-2" outlined large fab color="red darken-4" v-if="hasEditPermission()">
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
                      v-bind:key="member.ID" class="list" @click="navToAccountPage(member.ID)">
                      <v-list-item-icon>
                        <img src="../assets/dog.jpg" class="smallUserImg">
                      </v-list-item-icon>

                      <v-list-item-content class="large">
                        <v-list-item-title class="large">{{ member.f_name }} {{ member.l_name }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>

                  <v-dialog
                    v-model="dialogDelete"
                    scrollable
                    max-width="300px"
                    v-if="isAdmin"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn @click="deleteMemberDialog"
                        class="ma-2"
                        outlined
                        large
                        fab
                        color="red darken-4"
                        v-on="on"
                        v-bind="attrs"
                      >
                        <v-icon>mdi-account-minus</v-icon>
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>Select Person</v-card-title>
                      <v-divider></v-divider>
                      <v-card-text style="height: 300px;">
                        <v-list class="list">
                          <v-checkbox
                            v-for="member in deletableMembers"
                            v-bind:key="member.ID"
                            multiple
                            :value="member"
                            :label="member.f_name + ' ' + member.l_name"
                            v-model="deleteList"
                            >
                          </v-checkbox>
                        </v-list>
                      </v-card-text>
                      <v-divider></v-divider>
                      <v-card-actions>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="dialogDelete = false"
                        >
                          Close
                        </v-btn>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="deleteMemberFromFamily()"
                        >
                          Save
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>

                  <v-dialog
                    v-model="dialogAdd"
                    scrollable
                    max-width="300px"
                    v-if="hasEditPermission()"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn @click="addMemberDialog"
                        class="ma-2"
                        outlined
                        large
                        fab
                        color="red darken-4"
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
                          <v-checkbox
                            v-for="member in churchMembers"
                            v-bind:key="member.ID"
                            multiple
                            :value="member"
                            :label="member.f_name + ' ' + member.l_name"
                            v-model="addList"
                            >
                          </v-checkbox>
                        </v-list>
                      </v-card-text>
                      <v-divider></v-divider>
                      <v-card-actions>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="dialogAdd = false"
                        >
                          Close
                        </v-btn>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="addMemberToFamily()"
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

import axios from 'axios';
import PhotoUpload from "../components/PhotoUpload.vue";

  export default {
    components: {
      PhotoUpload
    },
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
        deletableMembers: [],
        churchMembers: [],
        addList: [],
        deleteList: [],
        userId: 1,
        familyId: "",
        address_ID: "",
        address_Type: "",
        phoneNumber_Type: "",
        can_publish: "",
        editable: false,
        isHeadOfFamily: false,
        isAdmin: false,
        dialogAdd: false,
        dialogDelete: false
      }

    
    
    },
    created() {

      // Get family ID of the currently logged in user
        axios
        .get(this.baseURL + "family?person_ID=" + this.userId)
        .then(response => {
          this.familyId = response.data[0].ID;
          this.familyImgSrc = this.baseURL + "images/" + response.data[0].image;
          // console.log(this.familyImgSrc);
          return axios.get(this.baseURL + "family?id=" + this.familyId + "&isGetPersons=1&isGetHeadOfFamily=0")
        })

      // Get family members of the currently logged in user
        .then(response => {
          this.familyMembers = response.data;
          this.deletableMembers = response.data;
          return axios.get(this.baseURL + "address?person_ID=" + this.userId)
        })


      // Get the household address
        // axios
        // .get(this.baseURL + "address?person_ID=" + this.userId)
        .then(response => {
          this.address = response.data[0].address;
          this.address_ID = response.data[0].ID;
          this.address_Type = response.data[0].type;
          return axios.get(this.baseURL + "family?id=" + this.familyId + "&isGetPersons=0&isGetHeadOfFamily=1")
          // return axios.get(this.baseURL + "person?id=" + this.userId)
        })


      // Find the head of the family
        // axios
        // .get(this.baseURL + "family?id=" + this.familyId + "&isGetPersons=0&isGetHeadOfFamily=1")
        .then(response => {
          this.headOfFamilyID = response.data[0].ID;
          this.isHeadOfHousehold();
          return axios.get(this.baseURL + "person?id=" + this.headOfFamilyID)
        })

        
      // Get the family email and store information for updating a person
        .then(response => {
          this.email = response.data[0].email;
          this.congregationID = response.data[0].congregation_ID;
          this.f_name = response.data[0].f_name;
          this.l_name = response.data[0].l_name;
          this.occupation = response.data[0].occupation;
          this.employer = response.data[0].employer;
          return axios.get(this.baseURL + "phone_number?person_ID=" + this.headOfFamilyID)
        })


      // Get the family phone number
        .then(response => {
          this.phone = response.data[0].number;
          this.phoneNumberID = response.data[0].ID;
          this.phoneNumber_Type = response.data[0].type;
          this.can_publish = response.data[0].can_publish;
        })

        this.isAdminFunction();
          
    },

    methods: {
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
      },

      isHeadOfHousehold: function() {
        if(this.userId === this.headOfFamilyID) {
          this.isHeadOfFamily = true;
        }
        // return this.isHeadOfFamily;
      },

      isAdminFunction: function() {
        var validValueId = "";
        axios
        .get(this.baseURL + "person?id=" + this.userId)
        .then(response => {
          console.log(response.data[0].role)
          validValueId = response.data[0].role;
          return(axios.get(this.baseURL + "valid_value?id=" + validValueId))
        })
        .then(response => {
          console.log(response.data.value)
            this.$nextTick(() => {
              if(response.data.value === "admin")
                console.log("True")
                this.isAdmin = true;
                console.log(this.isAdmin)
          })
        })
      },

      navToAccountPage: function(param) {
        console.log("Navigate to account page!")
        console.log(param)
        this.$router.push({ path: '/account', params: { id: param }})
      },

      addMemberDialog: function() {
        var tempArr = [];
        console.log("member add dialog")
        axios
        .get(this.baseURL + "person")
        .then(response => {
          console.log(response.data)
          tempArr = response.data;
          this.churchMembers = tempArr.filter(member => member.family_ID!=this.familyId)
        })
      },

      deleteMemberDialog: function() {
        console.log("member remove dialog")
        // axios
        // .get(this.baseURL + "family?id=" + this.familyId + "&isGetPersons=1&isGetHeadOfFamily=0")
        // .then(response => {
        //   this.familyMembers = response.data;
        //   console.log(response.data)
        //   console.log(this.familyMembers)
        // })
        this.deletableMembers = this.deletableMembers.filter(member => member.ID!=this.headOfFamilyID)
      },

      addMemberToFamily() {
        this.dialogAdd = false;
        this.addList.forEach(member => {
          axios.put(this.baseURL + "person?id="  + member.ID, {
            congregation_ID: member.congregation_ID,
            f_name: member.f_name,
            l_name: member.l_name,
            occupation: member.occupation,
            employer: member.employer,
            family_ID: this.familyId,
            email: member.email,
            gender: member.gender,
            preferred_name: member.preferred_name,
            role: member.role,
            image: member.image
          })
          .then(response => {
            console.log(response.data)
            console.log("Person added to family: " + member.f_name + ", " + member.l_name)
          })
          this.familyMembers.push(member);
          this.deletableMembers.push(member);
          this.$set(this.familyMembers, this.familyMembers.indexOf(member), member);
          this.$set(this.deletableMembers, this.deletableMembers.indexOf(member), member);
        })
      },

      deleteMemberFromFamily() {
        this.dialogDelete = false;
        console.log(this.deleteList);
        this.deleteList.forEach(member => {
          if(member.ID != this.headOfFamilyID) {
            axios.put(this.baseURL + "person?id="  + member.ID, {
              congregation_ID: member.congregation_ID,
              f_name: member.f_name,
              l_name: member.l_name,
              occupation: member.occupation,
              employer: member.employer,
              family_ID: null,
              email: member.email,
              gender: member.gender,
              preferred_name: member.preferred_name,
              role: member.role,
              image: member.image
            })
            .then(response => {
              console.log(response.data)
              console.log("Person deleted from family: " + member.f_name + ", " + member.l_name)
            })
            this.$delete(this.familyMembers, this.familyMembers.indexOf(member), member);
          }
        })

        // .then(response => {
        //   this.familyMembers = response.data;
        //   console.log(response.data)
        //   console.log(this.familyMembers)
        // })
      },

      hasEditPermission: function() {
        var canEdit = false;
        console.log("Is Head of Household: " + this.isHeadOfFamily);
        console.log("Is Admin: " + this.isAdmin);
        if(this.isHeadOfFamily || this.isAdmin) {
          canEdit = true;
        }
        return canEdit;
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
  max-height: 270px;
  size: auto;
}

h1 {
  color: maroon;
  padding: 10px;
  text-decoration: underline;
}

</style>