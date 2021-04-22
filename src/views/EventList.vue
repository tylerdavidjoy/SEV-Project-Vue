<template>
  <v-app id="inspire">
    <div class="events">
      <v-system-bar app>
        <v-spacer></v-spacer>

        <v-icon>mdi-logout</v-icon>
      </v-system-bar>
      <v-main :class="'grey lighten-2'">
        <div :class="'mt-n12'">
          <v-container>
            <v-row>
              <v-col cols="12">
              </v-col>
              <v-col cols="12">
                  <v-sheet class="rounded-lg">
                    <div class="px-4">
                      
                      <!-- Search Bar -->
                      <div>
                        <v-text-field
                          v-model="search"
                          label="Search"
                          hint="Search for a event"
                          clearable
                          @input="SearchAPI()"
                          @click:clear="ClearAPI()"
                        ></v-text-field>
                      </div>
                      
                    </div>
                  </v-sheet>
              </v-col>
              <v-dialog
                        v-model="dialog2"
                        scrollable
                        max-width="500px"
                        v-if="isAdmin"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-card-actions>
                          <v-btn
                            color="primary"
                            dark
                            v-bind="attrs"
                            v-on="on"
                            
                          >
                            Add Event
                          </v-btn>
                          </v-card-actions>
                        </template>
                        <v-card>
                          <v-card-title>Create a Event</v-card-title>
                          <v-divider></v-divider>
                            <v-card-text  style="height: 300px;">
                            <v-form v-model="isAddValid">
                              <v-text-field
                              v-model="dialogm2name"
                              label="Event Name"
                              clearable
                              :rules="[rules.required]"
                              hide-details="auto"
                              >
                              </v-text-field>
                              <v-autocomplete
                              v-model="dialogm2room"
                              :items="rooms"
                              :item-text="room => room.room_number"
                              return-object
                              label="Event Location"
                              clearable
                              auto-select-first
                              :rules="[rules.required]"
                              hide-details="auto"
                            ></v-autocomplete>
                            <v-autocomplete
                              v-model="dialogm2leader"
                              :items="members"
                              :item-text="member => member.f_name + ' ' + member.l_name + ' ' + member.email"
                              return-object
                              label="Event Leader"
                              clearable
                              auto-select-first
                              :rules="[rules.required]"
                              hide-details="auto"
                            >
                            </v-autocomplete>
                            <v-textarea
                            v-model="dialogm2desc"
                            label="Event Description"
                            clearable
                            auto-grow
                            :rules="[rules.required]"
                            hide-details="auto"
                            ></v-textarea>
                            <v-date-picker v-model="picker"></v-date-picker>
                            <v-checkbox>
                            </v-checkbox>
                            <v-checkbox>
                            </v-checkbox>
                            </v-form>
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
                              @click="addEvent()"
                              :disabled="!isAddValid"
                            >
                              Add
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
              <v-col cols="12">
                  <v-sheet class="rounded-lg">
                    <div class="px-4">
                      <!-- Switch for Pagenation and Calendar -->
                      

                      <!-- Results Bar -->
                      <div class="pt-2">
                        <v-container>

                          <div style="width:100%; margin:auto; padding-left:3.5%;">
                            <div v-if="display.length === 0">
                              Looks like you aren't in any events or we can't find any events related to your search.
                            </div>
                            <div v-else>
                              <div v-for="event in display" :key="event.name" style="float:left; padding: 15px;">
                                <v-card>
                                  <v-card-title>
                                    {{event.description}}
                                  </v-card-title>
                                  <v-card-text>
                                    {{rooms.find(x => x.ID === event.location).room_number}}
                                  </v-card-text>
                                  <v-card-text>
                                    Leader: {{members.find(x => x.ID === event.leader).f_name + " " + members.find(x => x.ID === event.leader).l_name}}
                                  </v-card-text>
                                  <v-card-text>
                                    {{event.date}}
                                  </v-card-text>
                                  <v-card-actions>
                                    <v-btn height="auto" color="transparent" @click="goToEventPage(event.ID, event.leader)">
                                      View Event
                                    </v-btn>
                                    <v-btn  v-if="isAdmin" height="auto" color="transparent" @click="deleteEvent(event.ID, events.indexOf(event))">
                                      <v-icon>mdi-trash-can</v-icon>
                                    </v-btn>
                                  </v-card-actions>
                                </v-card>
                              </div>
                            </div>
                          </div>
                          <v-container class="max-width" v-if="display.length > 0">
                            <v-pagination
                              v-model="page"
                              class="my-4"
                              :length="pageLength"
                              :total-visible="7"
                            ></v-pagination>
                          </v-container>
                        </v-container>
                      </div>
                    </div>
                    <ReportSettings style="margin:auto" :selected.sync="fileType" :picture.sync="picture"/>
                  </v-sheet>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-main>
    </div>

  </v-app>
</template>

<script>
import axios from "axios";
const apiBaseUrl = "http://team2.eaglesoftwareteam.com";
import ReportSettings from "@/components/report_settings.vue";

export default {
  components: {
    ReportSettings,
  },
  data() {
    return {
      isAdmin: false,
      user: this.$person,
      search:'',
      page:1,
      pageLength:20,
      display:[],
      events:[],
      members:[],
      eventLocations:[],
      dialogm2leader: null,
      dialogm2desc: '',
      dialogm2room: null,
      dialogm2name: '',
      dialog2: false,
      rules: {
        required: value => !!value || 'Required.'
      },
      isAddValid: false,
      fileType:"PDF",
      picture:false,
      picker: new Date().toISOString().substr(0, 10),
      rooms: [],
    }
  },
  beforeCreate(){
    axios.all([
      axios.get(`${apiBaseUrl}/event`),
      axios.get(`${apiBaseUrl}/valid_value`),
      axios.get(`${apiBaseUrl}/person`),
      axios.get(`${apiBaseUrl}/room`)
    ])
    .then(axios.spread((events, types, members, rooms) =>{
      let adminRoleID = types.data.find(x => x.value === 'admin').ID;
      
      this.members = members.data;
      
      this.rooms = rooms.data;

      this.$nextTick(()=>{
        if(this.user.role != adminRoleID){
          axios.get(`${apiBaseUrl}/event?person_ID=${this.$person.ID}`)
          .then(response =>{
            this.events = response.data;
          })
          .catch(error =>{
            this.events = [];
            console.error(error)
          })
        }
        else{
          this.events = events.data;
          this.isAdmin = true;
        }

        this.viewMode()
      })
    }))
    .catch(error =>{
      console.error(error)
    })
  },
  methods:{
    ClearAPI(){
      this.search = "";
      this.SearchAPI();
    },
    //Function for loading in the events based on given API Search Parameters
    SearchAPI()
    {

      if(this.search.length > 0)
      {
        var temp = [];
        temp = JSON.parse(JSON.stringify(this.events));        

        temp.forEach(x => x.name = x.name.toLowerCase());
        temp = temp.filter(item => item.name.includes(this.search.toLowerCase()));

        temp.forEach(x => 
          {
            var split = x.name.split(" ");
            for(var y = 0; y < split.length; y++)
            {
              split[y] = split[y][0].toUpperCase() + split[y].substr(1);
            }
            
            x.name = split[0];

            split.forEach((word) => {
              if(word != split[0])
                x.name += " " + word;
            })
          })
          

        console.log(temp);
        if(temp.length > 20)
          this.display = temp.slice(0,19);
  
        else
          this.display = temp;

        if(this.temp.length == 20)
          this.pageLength = 1;
        
        else
          this.pageLength = (temp.length / 20) + 1;
      }

      else
      {
        console.log("People:",this.people);
        this.viewMode(this.displayMode);
      }
        
    },

    viewMode()
    {
        if(this.events.length > 20)
          this.display = this.events.slice(0,19);
      
        else
          this.display = this.events;

        if(this.events.length == 20)
          this.pageLength = 1;
        
        else
          this.pageLength = (this.events.length / 20) + 1;
      
    },

    goToEventPage(eID, eLID){
      this.$router.push({name: 'Event', params: {eventID:eID, eventLeaderID:eLID}})
    },

    addEvent: function(){   
      let tempEvent = {
        date: this.picker,
        location: this.dialogm2room.ID,
        leader: this.dialogm2leader.ID,
        description: this.dialogm2desc,
        recurring: 0
      }
      
      axios.post(`${apiBaseUrl}/event`, {
        date: tempEvent.date,
        leader: tempEvent.leader,
        location: tempEvent.location,
        description: tempEvent.description,
        recurring: tempEvent.recurring
      })
      .then(() => {
        axios.get(`${apiBaseUrl}/event`)
        .then(events => {
          
          this.events.push(tempEvent);
          let tempEventIndex = this.events.indexOf(tempEvent)
          tempEvent = events.data[events.data.length-1]
          this.$set(this.events, tempEventIndex, tempEvent)

          this.dialog2 = false;
        })
        .catch(error =>{
          console.error(error);
        })
      })
      .catch(error =>{
        console.error(error);
      })
      
      
    },

    deleteEvent: function(eventID, index){
      this.$delete(this.events, index);
      axios.delete(`${apiBaseUrl}/event?id=${eventID}`);
    }
  },

}
</script>
