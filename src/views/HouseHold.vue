<template>
  <v-app id="inspire">
    <div>
      <v-main class="grey lighten-2">
        <v-container>
          <v-row>
            <v-col cols="6">
              <v-container>
                <v-sheet width="600">
                  <img :src="familyImgSrc"  class="familyImg" />
                  <br />
                  <PhotoUpload v-bind:canEdit="hasEditPermission()" v-bind:familyId="this.familyId" v-bind:familyImgSrc="this.familyImgSrc" @onFileChange="familyImgSrc=$event"/>
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
                  <br />
                  <h1>Family Members</h1>
                  <br />
                  <v-list class="list">
                    <v-list-item
                      v-for="member in familyMembers"
                      v-bind:key="member.ID" class="list" @click="navToAccountPage(member.ID)">
                      <v-list-item-icon>
                        <img :src="baseURL + 'images/' + member.image" class="smallUserImg">
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
                      <div class="search-wrapper">
                        <input type="text" v-model="searchDelete" placeholder="Search title.."/>
                          <label>Search title:</label>
                      </div>
                      <v-card-text style="height: 300px;">
                        <v-list class="list">
                          <v-checkbox
                            v-for="member in filteredDeleteList"
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
                      <div class="search-wrapper">
                        <input type="text" v-model="searchAdd" placeholder="Search title.."/>
                          <label>Search title:</label>
                      </div>
                      <v-card-text style="height: 300px;">
                        <v-list class="list">
                          <v-checkbox
                            v-for="member in filteredAddList"
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
        searchAdd: "",
        searchDelete: "",
        address: "",
        phone: "",
        hasPhone: null,
        email: "",
        headOfFamilyID: "",
        phoneNumberID: "",
        congregationID: "",
        f_name: "",
        l_name: "",
        occupation: "",
        employer: "",
        baseURL: "http://team2.eaglesoftwareteam.com/",
        familyImgSrc: "",
        familyMembers: [],
        deletableMembers: [],
        churchMembers: [],
        addList: [],
        deleteList: [],
        phoneTypeArr: [],
        userId: window.person.id,
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
      console.log(this.$route.params.familyID)
      console.log("Logged in user ID: " + this.userId)
        axios.all([
          axios.get(`${this.baseURL}family?id=${this.$route.params.familyID}&isGetPersons=0&isGetHeadOfFamily=0`), // gets family object
          axios.get(`${this.baseURL}family?id=${this.$route.params.familyID}&isGetPersons=1&isGetHeadOfFamily=0`), // this gets all persons of family
          axios.get(`${this.baseURL}family?id=${this.$route.params.familyID}&isGetPersons=0&isGetHeadOfFamily=1`), // this gets the person of head of family
        ])
        .then(axios.spread((family, familyMembers, headOfFamily) => {

          this.familyId = family.data.ID;
          this.address_ID = family.data.address_ID;
          this.familyImgSrc = this.baseURL + "images/" + family.data.image;

          this.familyMembers = familyMembers.data;
          this.deletableMembers = familyMembers.data;

          this.email = headOfFamily.data[0].email;
          this.headOfFamilyID = headOfFamily.data[0].ID;

          axios
          .get(`${this.baseURL}address?id=${family.data.address_ID}`) // Address object from family address ID
          .then(familyAddress => {
            this.address = familyAddress.data.address;
            this.address_Type = familyAddress.data.type;
            this.address_ID = familyAddress.data.ID;
          })
          axios
          .get(`${this.baseURL}phone_number?person_ID=${headOfFamily.data[0].ID}`) // Gets array of phone #s
          .then(headOfFamilyPhones => {
            let tempPhone = headOfFamilyPhones.data.find(x => x.can_publish === 1);
            this.phone = tempPhone.number;
            this.phoneNumber_Type = tempPhone.type;
            this.phoneNumberID = tempPhone.ID;
            this.can_publish = 1;
            this.hasPhone = true;
          })
          .catch(err => {  // If there is no phone number(s)
            console.log(err);
            this.hasPhone = false;
          })
        }))

         this.isHeadOfHousehold();
         this.isAdminFunction();
          
    },

    methods: {
      onEdit: function() {
        this.editable = true;
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
        if(!this.hasPhone) {
          console.log("No phone number");
          axios
          .get(`${this.baseURL}valid_value?value_group=phone`)
          .then(phoneTypes => {
            this.phoneTypeArr = phoneTypes.data;
            this.phoneTypeArr = this.phoneTypeArr.filter(type => type.value=="mobile")
            console.log(this.phoneTypeArr[0])
          })
          axios
          .post(`${this.baseURL}phone_number?id=${this.headOfFamilyID}`, {
            number: this.phone,
            can_publish: 1,
            type: this.phoneTypeArr[0].ID
          })
          .then(response => {
            console.log(response)
          })
        }

        else {
          console.log("Yes phone number");
          axios
          .put(this.baseURL + "phone_number?id=" + this.phoneNumberID, {
            number: this.phone,
            can_publish: this.can_publish,
            type: this.phoneNumber_Type
          })
        }
      },

      isHeadOfHousehold: function() {
        this.$nextTick(() => {
          if(this.userId === this.headOfFamilyID) {
            this.isHeadOfFamily = true;
          }
        })
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
            this.$nextTick(() => {
              if(response.data.value === "admin")
                this.isAdmin = true;
          })
        })
      },

      navToAccountPage: function(param) {
        console.log("Navigate to account page!")
        console.log(param)
        this.$router.push({ name: 'Account', params: { personID: param }})
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
        this.deletableMembers = this.deletableMembers.filter(member => member.ID!=this.headOfFamilyID)
      },

      addMemberToFamily() {
        this.dialogAdd = false;
        this.addList.forEach(member => {
          console.log("hello")
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
          console.log(this.familyMembers)
          this.familyMembers.push(member);
          this.deletableMembers.push(member);
          this.$set(this.familyMembers, this.familyMembers.indexOf(member), member);
          this.$set(this.deletableMembers, this.deletableMembers.indexOf(member), member);
          this.familyMembers = Array.from(new Set(this.familyMembers))
          this.deletableMembers = Array.from(new Set(this.deletableMembers))  
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
            this.$delete(this.deletableMembers, this.deletableMembers.indexOf(member), member);
          }
        })
      },

      hasEditPermission: function() {
        var canEdit = false;
        if(this.isHeadOfFamily || this.isAdmin) {
          canEdit = true;
        }
        return canEdit;
      }
    },

    computed: {
      filteredAddList() {
        return this.churchMembers.filter(member => {
          return member.f_name.toLowerCase().includes(this.searchAdd.toLowerCase())
        })
      },

      filteredDeleteList() {
        return this.deletableMembers.filter(member => {
          return member.f_name.toLowerCase().includes(this.searchDelete.toLowerCase())
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
  max-height: 270px;
  size: auto;
}

input.search {
  padding: 4px 12px;
  color: rgba(0,0,0,.70);
  border: 1px solid rgba(0,0,0,.12);
  transition: .15s all ease-in-out;
  background: white;
  &:focus {
    outline: none;
    transform: scale(1.05);
    & + label  {
      font-size: 10px;
      transform: translateY(-24px) translateX(-12px);
    }
  }
  &::-webkit-input-placeholder {
    font-size: 12px;
    color: rgba(0,0,0,.50);
    font-weight: 100;
  }
}

div.search-wrapper {
  position: relative;
  label {
    position: absolute;
    font-size: 12px;
    color: rgba(0,0,0,.50);
    top: 8px;
    left: 12px;
    z-index: -1;
    transition: .15s all ease-in-out;
  }
}

h1 {
  color: maroon;
  padding: 10px;
  text-decoration: underline;
}

</style>