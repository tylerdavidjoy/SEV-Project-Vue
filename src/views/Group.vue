<template>
  <v-app>
    <div class="groups">
      <v-main class="grey lighten-2">
        <v-container>
            <v-banner>
              {{group.name}}
            </v-banner>
          <v-row>
                <v-col>
                  <v-sheet 
                  color="transparent">
                    <v-card elevation="2" v-if="renderLeader" :height="270">
                      <v-card-title>
                        Group Leader
                      </v-card-title>
                      <v-card-subtitle>
                        {{leader.f_name + " " + leader.l_name}}
                      </v-card-subtitle>
                      <v-card-text>
                        {{leader.address}}
                      </v-card-text>
                        <v-card-text v-for="phone in leader.phone" :key="phone.ID">
                          <v-icon v-if="phone.type === 'mobile'">mdi-cellphone</v-icon> 
                          <v-icon v-else-if="phone.type === 'work'">mdi-toolbox</v-icon>
                          <v-icon v-else>mdi-phone</v-icon>
                          {{phone.number}}
                        </v-card-text>
                      <v-card-text>
                        {{this.leader.email}}
                      </v-card-text>
                    </v-card>
                    <v-card v-else>
                      <v-card-subtitle>
                          <v-progress-circular
                          indeterminate
                          ></v-progress-circular>
                        </v-card-subtitle>
                        <v-card-text>
                          <v-progress-circular
                          indeterminate
                          ></v-progress-circular>
                        </v-card-text>
                        <v-card-text>
                          <v-progress-circular
                          indeterminate
                          ></v-progress-circular>
                        </v-card-text>
                        <v-card-text>
                          <v-progress-circular
                          indeterminate
                          ></v-progress-circular>
                        </v-card-text>
                    </v-card>
                  </v-sheet>
                </v-col>
                <v-col>
                  <v-sheet 
                  color="transparent">
                    <v-card :height="270">
                      <v-avatar size="auto" :tile="true" min-height="230" max-height="270" min-width="230" max-width="270">
                        <v-img src="https://i.imgur.com/NZtcOfi.jpg">
                        </v-img>
                      </v-avatar>
                    
                    <v-row justify="center" v-if="userHasPerms">
                      <v-dialog
                        v-model="dialog2"
                        scrollable
                        max-width="300px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-card-actions>
                          <v-btn
                            color="primary"
                            dark
                            v-bind="attrs"
                            v-on="on"
                            
                          >
                            Change Leader
                          </v-btn>
                          </v-card-actions>
                        </template>
                        <v-card>
                          <v-card-title>Select Member to Make<br/>Group Leader</v-card-title>
                          <v-divider></v-divider>
                          <v-card-text style="height: 300px;">
                            <v-radio-group
                              v-model="dialogm2"
                              column
                            >
                              <v-radio
                              v-for="changePerson in groupMembers"
                              :key="changePerson.ID"
                              :label="changePerson.f_name + ' ' + changePerson.l_name + ' ' + changePerson.email"
                              :value="changePerson"
                              />
                            </v-radio-group>
                          </v-card-text>
                          <v-divider></v-divider>
                          <v-card-actions>
                            <v-btn
                              color="blue darken-1"
                              text
                              @click="dialog2 = false"
                            >
                              Cancel
                            </v-btn>
                            <v-btn
                              color="blue darken-1"
                              text
                              @click="changeLeader()"
                            >
                              Select
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-row>
                    </v-card>
                  </v-sheet>
                </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-container>
                <v-list color="transparent">
                    <template v-if="renderMembers" >
                      <v-card v-for="(member, index) in groupMembers" :key="member.ID" class="my-2">
                        <v-card-subtitle>
                          {{member.f_name + " " + member.l_name}}
                        </v-card-subtitle>
                        <v-card-text>
                          {{member.address}}
                        </v-card-text>
                        <v-card-text v-for="p in member.phone" :key="p.ID">
                          <v-icon v-if="p.type === 'mobile'">mdi-cellphone</v-icon> 
                          <v-icon v-else-if="p.type === 'work'">mdi-toolbox</v-icon>
                          <v-icon v-else>mdi-phone</v-icon>
                          {{p.number}}
                        </v-card-text>
                        <v-card-text v-if="member.email != 'null'">
                          {{member.email}}
                        </v-card-text>
                        <v-card-actions>
                        <v-btn v-on:click="removeGroupMember(member.ID, index)" v-if="userHasPerms">
                          Remove Member
                        </v-btn>
                      </v-card-actions>
                      </v-card>
                    </template>
                    <template v-else-if="this.groupMembers.length > 0">
                      <v-card>
                        <v-card-subtitle>
                          <v-progress-circular
                          indeterminate
                          ></v-progress-circular>
                        </v-card-subtitle>
                        <v-card-text>
                          <v-progress-circular
                          indeterminate
                          ></v-progress-circular>
                        </v-card-text>
                        <v-card-text>
                          <v-progress-circular
                          indeterminate
                          ></v-progress-circular>
                        </v-card-text>
                        <v-card-text>
                          <v-progress-circular
                          indeterminate
                          ></v-progress-circular>
                        </v-card-text>
                      </v-card>
                    </template>
                </v-list>
              </v-container>
            </v-col>
          </v-row>
          <v-row justify="center" v-if="userHasPerms">
            <v-dialog
              v-model="dialog"
              scrollable
              max-width="300px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  v-bind="attrs"
                  v-on="on"
                >
                  Add member(s) to Group
                </v-btn>
              </template>
              <v-card>
                <v-card-title>Select Members to Add</v-card-title>
                <v-divider></v-divider>
                <v-card-text style="height: 300px;">
                  <v-item-group
                    v-model="dialogm1"
                    column
                  >
                    <v-checkbox
                    v-for="addPerson in possibleAddList"
                    :key="addPerson.ID"
                    multiple
                    :value="addPerson"
                    :label="addPerson.f_name + ' ' + addPerson.l_name + ', ' + addPerson.email"
                    v-model="addList"
                    />
                  </v-item-group>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="dialog = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="addGroupMember()"
                  >
                    Add
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
        </v-container>
      </v-main>
    </div>
  </v-app>
</template>

<script>
import axios from 'axios'

const apiBaseUrl = "http://team2.eaglesoftwareteam.com";

export default {
  name: "GroupMembers",
  data() {
    return {
        possibleAddList: [],
        addList: [],
        user: this.$person,
        userHasPerms: false,
        group: {},
        leader: {},
        groupMembers: [],
        renderMembers: false,
        memberAddressesReceived: false,
        memberPhonesReceived: false,
        renderLeader: false,
        leaderAddressReceived: false,
        leaderPhonesReceived: false,
        dialogm1: '',
        dialogm2: '',
        dialog: false,
        dialog2: false,
      }
  },
  methods:
  {
    finishedLoadingMemberData: function(){
      this.$nextTick(()=>{
        if(this.memberAddressesReceived && this.memberPhonesReceived)
          this.renderMembers = true;
      });
    },
    finishedLoadingLeaderData: function(){
      this.$nextTick(()=>{
        if(this.leaderAddressReceived && this.leaderPhonesReceived)
          this.renderLeader = true;
      });
    },
    changeLeader: function(){
      this.groupMembers.push(this.leader);
      
      axios.put(`${apiBaseUrl}/group?id=${this.group.ID}`, {
        type: this.group.type,
        leader: this.dialogm2.ID,
        congregation_ID: this.group.congregation_ID,
        name: this.group.name
      })
      .then()
      .catch(error =>{
        console.error(error);
      })

      this.$nextTick(()=>{
        this.leader = this.dialogm2;
        this.$delete(this.groupMembers, this.groupMembers.indexOf(this.groupMembers.find(x => x.ID === this.dialogm2.ID)));
      })

      this.dialog2 = false;
    },
    removeGroupMember: function(memberID, index){
      this.possibleAddList.push(this.groupMembers.find(x=>x.ID === memberID));
      this.$delete(this.groupMembers, index);
      axios.delete(`${apiBaseUrl}/group_person?group_ID=${this.group.ID}&person_ID=${memberID}`);
    },
    addGroupMember () {
      this.addList.forEach(person => {
        axios.post(`${apiBaseUrl}/group_person`, {
            group_ID: this.group.ID,
            person_ID: person.ID
          })
        this.groupMembers.push(person);
        this.$set(this.groupMembers, this.groupMembers.indexOf(person), person);
        this.possibleAddList.splice(this.possibleAddList.indexOf(person), 1);
      })
      this.dialog = false;
      this.renderMembers = true;
    },
  },
  beforeCreate()
  {
    axios.all([
      axios.get(`${apiBaseUrl}/group?id=${this.$route.params.groupID}`),
      axios.get(`${apiBaseUrl}/group?id=${this.$route.params.groupID}&get_members=${this.$route.params.groupLeaderID}`),
      axios.get(`${apiBaseUrl}/valid_value`),
      axios.get(`${apiBaseUrl}/person`)
      ])
      .then(axios.spread((group, groupMembers, types, churchMembers) => {
      // Setting the currentAddress id for grabbing a member's current address later.
      let currentAddress = types.data.find(x => x.value_group === "address" && x.value === "current").ID;
      
      // Get the valid values for phone to put the type with the number later.
      let phoneTypes = types.data;
      
      // Setting the view's group and groupMembers variables up with data.
      this.group = group.data;
      this.groupMembers = groupMembers.data;

      console.log(this.groupMembers.find(x => x.ID === this.group.leader))

      // Setting the view's leader variable with the leader in groupMembers
      this.leader = this.groupMembers.find(x => x.ID === this.group.leader);

      let adminRoleID = types.data.find(x => x.value === 'admin').ID;

      this.$nextTick(()=>{
        if(this.$person.ID === this.leader.ID || this.$person.role === adminRoleID)
          this.userHasPerms = true;
      });

      // Set list of possible members to add to group to everyone, remove current members
      this.possibleAddList = churchMembers.data;
      this.possibleAddList = this.possibleAddList.filter(member => !this.groupMembers.includes(this.groupMembers.find(x=>x.ID===member.ID)));

      // Remove the leader from the list of group members
      this.groupMembers.splice(groupMembers.data.indexOf(this.leader), 1);  

      axios.get(`${apiBaseUrl}/phone_number?person_ID=${this.leader.ID}`)
      .then(phones => {
        // Initialize a property "phone" in the leader's person object
        this.leader.phone = [];

        // For every phone we received for the leader we only want to show the one's specified as "can_publish == true"
        for(let i = 0; i < phones.data.length; i++)
        {
          if(phones.data[i].can_publish){
            let tempPhone = {};
            // Get phone type for each usable phone number
            let tempPhoneType = phoneTypes.find(x => x.ID === phones.data[i].type).value;
            tempPhone.type = tempPhoneType;
            tempPhone.number = phones.data[i].number;
            this.leader.phone.push(tempPhone);
          }
        }

        this.leaderPhonesReceived = true;
        this.finishedLoadingLeaderData();
      })
      .catch(error => {
        this.leaderPhonesReceived = true;
        this.finishedLoadingLeaderData();
        console.error(error);
      })

      axios.get(`${apiBaseUrl}/address?person_ID=${this.leader.ID}`)
      .then(addresses =>{
        // Initializing the leader person object property address with the current address
        this.leader.address = addresses.data.find(x => x.type === currentAddress).address;
        this.leaderAddressReceived = true;
        this.finishedLoadingLeaderData();
      })
      .catch(error => {
        this.leaderAddressReceived = true;
        this.finishedLoadingLeaderData();
        console.error(error);
      })
      
      // For every group member we need to grab the phones and addresses
      for(let i = 0; i < this.groupMembers.length; i++)
      {
        axios.get(`${apiBaseUrl}/phone_number?person_ID=${this.groupMembers[i].ID}`)
        .then(memberPhones => {
          // Initializing phone property like before with leader
          this.groupMembers[i].phone = [];
          for(let j = 0; j < memberPhones.data.length; j++)
          {
            if(memberPhones.data[j].can_publish){
              let tempPhone = {};
              // Get the phone type
              let tempPhoneType = phoneTypes.find(x => x.ID === memberPhones.data[j].type).value;
              tempPhone.type = tempPhoneType;
              tempPhone.number = memberPhones.data[j].number;
              this.groupMembers[i].phone.push(tempPhone);
            }

              if(i === this.groupMembers.length - 1){
                this.memberPhonesReceived = true;
                // Tell the page to check if both address and phones are loaded for all members
                this.finishedLoadingMemberData();
            }
          }          
        })
        .catch((error) => {
          if(i === this.groupMembers.length - 1){
              this.memberPhonesReceived = true;
              // Tell the page to check if both address and phones are loaded for all members
              this.finishedLoadingMemberData();
          }
          console.error(error);
        })

        axios.get(`${apiBaseUrl}/address?person_ID=${this.groupMembers[i].ID}`)
        .then(memberAddresses => {
          // Initializing address property like before with leader
          this.groupMembers[i].address = memberAddresses.data.find(x => x.type === currentAddress).address;
          if(i === this.groupMembers.length - 1){
            this.memberAddressesReceived = true;
            // Tell the page to check if both address and phones are loaded for all members
            this.finishedLoadingMemberData();
          }
        })
        .catch(error => {
          if(i === this.groupMembers.length - 1){
            this.memberAddressesReceived = true;
            // Tell the page to check if both address and phones are loaded for all members
            this.finishedLoadingMemberData();
          }
          console.error(error);
        })
      }
    }))
    .catch(error => {
      console.error(error);
    });
  },
}
</script>