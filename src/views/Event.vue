<template>
  <v-app>
    <div class="groups">
      <v-main class="grey lighten-2">
        <v-container>
          <v-row>
                <v-col>

                  <v-sheet 
                  color="transparent">
                    <v-card elevation="2" v-if="renderLeader" :height="420">
                      <v-card-title style="font-size:30px">
                        Event Leader
                      </v-card-title >
                      <br/>
                      <v-card-subtitle style="font-size:20px">
                        {{leader.f_name + " " + leader.l_name}}
                      </v-card-subtitle>
                      <v-card-text style="font-size:20px">
                        {{leader.address}}
                      </v-card-text>
                        <v-card-text v-for="phone in leader.phone" :key="phone.ID" style="font-size:20px">
                          <v-icon v-if="phone.type === 'mobile'">mdi-cellphone</v-icon> 
                          <v-icon v-else-if="phone.type === 'work'">mdi-toolbox</v-icon>
                          <v-icon v-else>mdi-phone</v-icon>
                          {{phone.number}}
                        </v-card-text>
                        


                        <v-card-text style="font-size:20px">
                          {{this.leader.email}}
                        </v-card-text>

                        <v-layout row>
                          <v-spacer/>

                        <v-card-actions>
                          <v-btn v-on:click="$router.push({name: 'Account', params:{personID: leader.ID}})">
                            View Member Page
                          </v-btn>
                        </v-card-actions>
                      

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
                          <v-card-title>Select Member to Make<br/>Event Leader</v-card-title>
                          <v-divider></v-divider>
                          <v-card-text style="height: 300px;">
                            <v-radio-group
                              v-model="dialogm2"
                              column
                            >
                              <v-radio
                              v-for="changePerson in eventMembers"
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

<v-spacer/>
                      </v-layout>

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
                    <v-card :height="420">
                      <v-card-title style="font-size:30px">Event Information</v-card-title>
                      <br/>
                      <v-card-text style="font-size:20px"> <strong>Name:</strong> {{event.name}}</v-card-text>
                      <v-card-text style="font-size:20px"> <strong>Description:</strong> {{event.description}}</v-card-text>
                      <v-card-text style="font-size:20px"> <strong>Date</strong>: {{event.date}}</v-card-text>
                      <v-card-text style="font-size:20px"> <strong>Location:</strong> {{event.location}}</v-card-text>

                    <v-row justify="center" v-if="userHasPerms">
                      <v-dialog
                        v-model="dialog4"
                        scrollable
                        max-width="330px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-card-actions>
                          <v-btn
                            color="primary"
                            dark
                            v-bind="attrs"
                            v-on="on"
                            
                          >
                            Edit Event
                          </v-btn>
                          </v-card-actions>
                        </template>

                        <v-card>
                          <v-card-title>Edit Event:</v-card-title>
                          <v-divider></v-divider>
                          <v-card-text style="height: 400px;">
                             <v-text-field
                              label="Name"
                              v-model="event.name"
                              />

                              <v-text-field
                              label="Description"
                              v-model="event.description"
                              />

                              <v-date-picker v-model="date"/>

                              <v-select
                                :items="room_list"
                                label="Location"
                                item-text="room_number"
                                item-value = "room_number"
                                v-model="event.location"
                              />

                            
                          </v-card-text>
                          <v-divider></v-divider>
                          <v-card-actions>
                            <v-btn
                              color="blue darken-1"
                              text
                              @click="dialog4 = false"
                            >
                              Cancel
                            </v-btn>
                            <v-btn
                              color="blue darken-1"
                              text
                              @click="updateEvent()"
                            >
                              Save
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-row>

                    </v-card>
                  </v-sheet>

                  

                </v-col>
          </v-row>
            <AnnouncementViewer v-if="announcements.length > 0" :announcements="announcements" :hasPerms="userHasPerms" class="mt-5"/>
          <v-row>
            <v-col>
              <v-container>
                <v-list color="transparent">
                    <template v-if="renderMembers" >
                      <v-card v-for="(member, index) in eventMembers" :key="member.ID" class="my-2">
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
                        <v-btn v-on:click="$router.push({name: 'Account', params:{personID: member.ID}})">
                          View Member Page
                        </v-btn>
                        <v-btn v-on:click="removeEventMember(member.ID, index)" v-if="userHasPerms">
                          Remove Member
                        </v-btn>
                      </v-card-actions>
                      </v-card>
                    </template>
                    <template v-else-if="this.eventMembers.length > 0">
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
              max-width="750px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  v-bind="attrs"
                  v-on="on"
                >
                  Add member(s) to Event
                </v-btn>
              </template>
              <v-card>
                <v-card-title>Select Members to Add</v-card-title>
                <v-divider></v-divider>
                <v-card-text style="height: 300px;">
                  <v-autocomplete
                  v-model="addList"
                  :items="possibleAddList"
                  :item-text="member => member.f_name + ' ' + member.l_name + ' ' + member.email"
                  return-object
                  label="Members to Add"
                  multiple
                  clearable
                  hide-details="auto"
                  >
                  </v-autocomplete>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="dialog = false, addList = []"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="addEventMember()"
                  >
                    Add
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
          <v-row justify="center" v-if="userHasPerms">
            <v-dialog
              v-model="dialog3"
              scrollable
              max-width="750px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  v-bind="attrs"
                  v-on="on"
                >
                  Add Family to Event
                </v-btn>
              </template>
              <v-card>
                <v-card-title>Select Family to Add</v-card-title>
                <v-divider></v-divider>
                <v-card-text style="height: 300px;">
                  <v-autocomplete
                  v-model="addFamilyList"
                  :items="addPossibleFamilyList"
                  :item-text="member => member.l_name + ' Family'"
                  return-object
                  label="Members to Add"
                  multiple
                  clearable
                  hide-details="auto"
                  >
                  </v-autocomplete>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="dialog3 = false, addFamilyList = []"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="addFamily()"
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
import AnnouncementViewer from "@/components/Announcements.vue";

export default {
  name: "EventMembers",
    components: {
      AnnouncementViewer
  },
  data() {
    return {
        announcements: [],
        possibleAddList: [],
        addList: [],
        addFamilyList: [],
        addPossibleFamilyList: [],
        user: this.$person,
        userHasPerms: false,
        event: {},
        date: null,
        eventImgSrc: "",
        leader: {},
        eventMembers: [],
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
        dialog3: false,
        dialog4: false,
        fileType:"PDF",
        picture:false,
        phoneTypes: [],
        currentAddress: null,
        room_list: []
      }
  },
  methods:
  {
    updateEvent()
    {
      var data = this.event;
      data.location = this.room_list.find(x => x.room_number == data.location).ID;
      data.date = new Date(this.date);

      axios.put(`${apiBaseUrl}/event?id=${this.event.ID}`,data)
      .then(response => {
        console.log(response)
        this.event.date = new Date(this.date).toDateString();
        this.event.location = this.room_list.find(x => x.ID == data.location).room_number
        this.dialog4 = false;
      })
      .catch(error => {
        console.error(error)
      })

    },

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
      this.eventMembers.push(this.leader);
      
      axios.put(`${apiBaseUrl}/event?id=${this.event.ID}`, {
        date: this.event.date,
        leader: this.dialogm2.ID,
        location: this.event.location,
        description: this.event.description,
        recurring: this.event.recurring
      })
      .then()
      .catch(error =>{
        console.error(error);
      })

      this.$nextTick(()=>{
        this.leader = this.dialogm2;
        this.$delete(this.eventMembers, this.eventMembers.indexOf(this.eventMembers.find(x => x.ID === this.dialogm2.ID)));
      })

      this.dialog2 = false;
    },
    removeEventMember: function(memberID, index){
      this.possibleAddList.push(this.eventMembers.find(x=>x.ID === memberID));
      this.$delete(this.eventMembers, index);
      axios.delete(`${apiBaseUrl}/attendee?event_ID=${this.event.ID}&person_ID=${memberID}`);
    },
    addEventMember () {
      console.log(this.addList)
      this.addList.forEach(person => {
        axios.post(`${apiBaseUrl}/attendee`, {
            event_ID: this.event.ID,
            person_ID: person.ID
          })
        this.eventMembers.push(person);
        this.$set(this.eventMembers, this.eventMembers.indexOf(person), person);
        this.possibleAddList.splice(this.possibleAddList.indexOf(person), 1);
      })
      this.addList = [];
      this.dialog = false;
      this.renderMembers = true;
    },
    addFamily(){
      console.log("Family clicked!")
      console.log("Families", this.addFamilyList)

      this.addFamilyList.forEach((family, index) => {
        this.memberAddressesReceived = false;
        this.memberPhonesReceived = false;
        this.renderMembers = false;
        axios.post(`${apiBaseUrl}/attendee?family_ID=${family.family_ID}&event_ID=${this.$route.params.eventID}`)
        .then(() => {
          axios.get(`${apiBaseUrl}/attendee?event_ID=${this.$route.params.eventID}&isGetPersonObjects=1`)
          .then(response => {
            console.log("TEST")
            console.log("EventMembers: ", response.data)
            this.eventMembers = response.data.filter(x => x.ID != this.event.leader)

            // For every event member we need to grab the phones and addresses
            for(let i = 0; i < this.eventMembers.length; i++)
            {
              axios.get(`${apiBaseUrl}/phone_number?person_ID=${this.eventMembers[i].ID}`)
              .then(memberPhones => {
                // Initializing phone property like before with leader
                this.eventMembers[i].phone = [];
                for(let j = 0; j < memberPhones.data.length; j++)
                {
                  if(memberPhones.data[j].can_publish){
                    let tempPhone = {};
                    // Get the phone type
                    let tempPhoneType = this.phoneTypes.find(x => x.ID === memberPhones.data[j].type).value;
                    tempPhone.type = tempPhoneType;
                    tempPhone.number = memberPhones.data[j].number;
                    this.eventMembers[i].phone.push(tempPhone);
                     console.log("Bagels1", i, this.eventMembers.length, tempPhone)
                  }
                    if(i === this.eventMembers.length - 1){
                      this.memberPhonesReceived = true;
                      // Tell the page to check if both address and phones are loaded for all members
                      this.finishedLoadingMemberData();
                  }
                }          
              })
              .catch((error) => {
                if(i === this.eventMembers.length - 1){
                    this.memberPhonesReceived = true;
                    // Tell the page to check if both address and phones are loaded for all members
                    this.finishedLoadingMemberData();
                }
                console.error(error);
              })

              axios.get(`${apiBaseUrl}/address?person_ID=${this.eventMembers[i].ID}`)
              .then(memberAddresses => {
                // Initializing address property like before with leader
                this.eventMembers[i].address = memberAddresses.data.find(x => x.type === this.currentAddress).address;
                console.log("Pizza", i, this.eventMembers.length, this.eventMembers[i].address)
                if(i === this.eventMembers.length - 1){
                  this.memberAddressesReceived = true;
                  // Tell the page to check if both address and phones are loaded for all members
                  this.finishedLoadingMemberData();
                }
              })
              .catch(error => {
                if(i === this.eventMembers.length - 1){
                  this.memberAddressesReceived = true;
                  // Tell the page to check if both address and phones are loaded for all members
                  this.finishedLoadingMemberData();
                }
                console.error(error);
              })
            
            if(index === this.addFamilyList.length - 1)
            {
              this.addFamilyList = [];
              this.dialog3 = false;
            }
            }
          })
          
        })

      })
    }
  },
  beforeCreate()
  {
    axios.all([

      axios.get(`${apiBaseUrl}/event?id=${this.$route.params.eventID}`),
      axios.get(`${apiBaseUrl}/attendee?event_ID=${this.$route.params.eventID}&isGetPersonObjects=1`),
      axios.get(`${apiBaseUrl}/valid_value`),
      axios.get(`${apiBaseUrl}/person`),
      axios.get(`${apiBaseUrl}/family`),
      axios.get(`${apiBaseUrl}/room`)
      ])
      .then(axios.spread((event, eventMembers, types, churchMembers, families, rooms) => {
      console.log(event, eventMembers, types, churchMembers, families, rooms)
      this.room_list = rooms.data;
      let messageTypeID = types.data.find(x => x.value_group === "message" && x.value === "event").ID;
      axios.get(`${apiBaseUrl}/message?receipient=(${this.$route.params.eventID})&receipient_type=${messageTypeID}`)
        .then(messages => {
          if(messages.data.length > 0)
            this.announcements = messages.data;
          else
            this.announcements.push({message: "No announcements to show."})
          console.log(this.announcements)
        })
        .catch(error => {
          console.error(error);
        })
      
      // Setting the currentAddress id for grabbing a member's current address later.
      this.currentAddress = types.data.find(x => x.value_group === "address" && x.value === "current").ID;
      
      // Get the valid values for phone to put the type with the number later.
      this.phoneTypes = types.data;
      
      // Setting the view's event and eventMembers variables up with data.
      console.log(event.data);
      
      this.event = event.data;
      this.date = new Date(this.event.date).toISOString().substr(0, 10)
      var temp = new Date(this.event.date)
      this.event.date = temp.toDateString()
      this.event.location = rooms.data.find(x => x.ID === this.event.location).room_number;
      this.eventMembers = eventMembers.data;

      console.log(this.eventMembers.find(x => x.ID === this.event.leader))

      // Setting the view's leader variable with the leader in eventMembers
      this.leader = this.eventMembers.find(x => x.ID === this.event.leader);

      let adminRoleID = types.data.find(x => x.value === 'admin').ID;

      this.$nextTick(()=>{
        if(this.$person.ID === this.leader.ID || this.$person.role === adminRoleID)
          this.userHasPerms = true;
      });

      // Set list of possible members to add to event to everyone, remove current members
      this.possibleAddList = churchMembers.data;
      this.possibleAddList = this.possibleAddList.filter(member => !this.eventMembers.includes(this.eventMembers.find(x=>x.ID===member.ID)));

      // Set list of possible families to add to a event
      families.data.forEach(family => {
        this.addPossibleFamilyList.push(churchMembers.data.find(x => x.ID === family.head_ID))
      })

      // Remove the leader from the list of event members
      this.eventMembers.splice(eventMembers.data.indexOf(this.leader), 1);  

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
            let tempPhoneType = this.phoneTypes.find(x => x.ID === phones.data[i].type).value;
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
        this.leader.address = addresses.data.find(x => x.type === this.currentAddress).address;
        this.leaderAddressReceived = true;
        this.finishedLoadingLeaderData();
      })
      .catch(error => {
        this.leaderAddressReceived = true;
        this.finishedLoadingLeaderData();
        console.error(error);
      })
      
      // For every event member we need to grab the phones and addresses
      for(let i = 0; i < this.eventMembers.length; i++)
      {
        axios.get(`${apiBaseUrl}/phone_number?person_ID=${this.eventMembers[i].ID}`)
        .then(memberPhones => {
          // Initializing phone property like before with leader
          this.eventMembers[i].phone = [];
          for(let j = 0; j < memberPhones.data.length; j++)
          {
            if(memberPhones.data[j].can_publish){
              let tempPhone = {};
              // Get the phone type
              let tempPhoneType = this.phoneTypes.find(x => x.ID === memberPhones.data[j].type).value;
              tempPhone.type = tempPhoneType;
              tempPhone.number = memberPhones.data[j].number;
              this.eventMembers[i].phone.push(tempPhone);
            }

              if(i === this.eventMembers.length - 1){
                this.memberPhonesReceived = true;
                // Tell the page to check if both address and phones are loaded for all members
                this.finishedLoadingMemberData();
            }
          }          
        })
        .catch((error) => {
          if(i === this.eventMembers.length - 1){
              this.memberPhonesReceived = true;
              // Tell the page to check if both address and phones are loaded for all members
              this.finishedLoadingMemberData();
          }
          console.error(error);
        })

        axios.get(`${apiBaseUrl}/address?person_ID=${this.eventMembers[i].ID}`)
        .then(memberAddresses => {
          // Initializing address property like before with leader
          this.eventMembers[i].address = memberAddresses.data.find(x => x.type === this.currentAddress).address;
          if(i === this.eventMembers.length - 1){
            this.memberAddressesReceived = true;
            // Tell the page to check if both address and phones are loaded for all members
            this.finishedLoadingMemberData();
          }
        })
        .catch(error => {
          if(i === this.eventMembers.length - 1){
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