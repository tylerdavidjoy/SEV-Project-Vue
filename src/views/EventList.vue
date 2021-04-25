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
            <v-container fluid>
              <v-data-iterator
                :items="events"
                :items-per-page.sync="itemsPerPage"
                :page.sync="page"
                :search="search"
                :sort-by="sortBy.toLowerCase()"
                hide-default-footer
              >
                <template v-slot:header>
                  <v-toolbar
                    dark
                    color="blue darken-3"
                    class="mb-1"
                  >
                    <v-text-field
                      v-model="search"
                      clearable
                      flat
                      solo-inverted
                      hide-details
                      prepend-inner-icon="mdi-magnify"
                      label="Search"
                      hint="Search for an event"
                    ></v-text-field>
                  </v-toolbar>
                </template>

                <template v-slot:default="props">
                  <v-row>
                    <v-col
                      v-for="item in props.items"
                      :key="item.name"
                      cols="12"
                      sm="6"
                      md="4"
                      lg="3"
                    >
                    
                      <v-card
                      color="grey lighten-4"
                      width="250px"
                      flat
                      >
                        <v-toolbar
                        :color="item.color"
                        dark
                        >
                          <v-toolbar-title v-html="item.name"></v-toolbar-title>
                          <v-spacer></v-spacer>
                          <v-btn icon @click="deleteEvent(item.id, events.indexOf(item))" v-if="isAdmin">
                            <v-icon>mdi-trash-can</v-icon>
                          </v-btn>
                        </v-toolbar>
                        <v-card-text>
                          <div v-html="item.details"></div>
                        </v-card-text>
                        <v-card-actions>
                          <v-btn
                            text
                            color="secondary"
                            @click="goToEventPage(item.id, item.leader)"
                          >
                            View Event
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-col>
                  </v-row>
                </template>

                <template v-slot:footer>
                  <v-row
                    class="mt-2"
                    align="center"
                    justify="center"
                  >

                    <span
                      class="mr-4
                      grey--text"
                    >
                      Page {{ page }} of {{ numberOfPages }}
                    </span>
                    <v-btn
                      fab
                      dark
                      color="blue darken-3"
                      class="mr-1"
                      @click="formerPage"
                    >
                      <v-icon>mdi-chevron-left</v-icon>
                    </v-btn>
                    <v-btn
                      fab
                      dark
                      color="blue darken-3"
                      class="ml-1"
                      @click="nextPage"
                    >
                      <v-icon>mdi-chevron-right</v-icon>
                    </v-btn>
                  </v-row>
                </template>
              </v-data-iterator>
            </v-container>
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
                <v-card-title>Create an Event</v-card-title>
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
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="timePicker"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="timePicker"
                        label="Event Time"
                        prepend-icon="mdi-clock-time-four-outline"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      v-if="menu"
                      v-model="timePicker"
                      full-width
                      @click:minute="$refs.menu.save(timePicker)"
                    ></v-time-picker>
                  </v-menu>
                  <v-menu
                    v-model="menu2"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="datePicker"
                        label="Event Date"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="datePicker"
                      @input="menu2 = false"
                    ></v-date-picker>
                  </v-menu>
                  <v-checkbox
                  label="Does this event recur?"
                  v-model="recurChkbx"
                  >
                  </v-checkbox>
                  <v-checkbox
                  label="Is this event for a group?"
                  v-model="groupChkbx"
                  >
                  </v-checkbox>
                  <v-autocomplete v-if="groupChkbx"
                  v-model="eventGroup"
                  :items="groups"
                  :item-text="group => group.name"
                  return-object
                  label="Event Group"
                  clearable
                  hide-details="auto"
                  >
                  </v-autocomplete>
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
            <v-sheet>
              <v-toolbar elevation="0">
                <v-btn
                  icon
                  class="ma-2"
                  @click="$refs.calendar.prev()"
                >
                  <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
                <v-spacer><v-toolbar-title v-if="$refs.calendar">{{$refs.calendar.title}}</v-toolbar-title></v-spacer>
                <v-btn
                  icon
                  class="ma-2"
                  @click="$refs.calendar.next()"
                >
                  <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
              </v-toolbar>
            </v-sheet>
            <v-sheet height="600">
              <v-calendar
                ref="calendar"
                v-model="calendarDay"
                color="primary"
                :events="events"
                @click:event="showEvent"
              ></v-calendar>
              <v-menu
                v-model="selectedOpen"
                :close-on-content-click="false"
                :activator="selectedElement"
                offset-x
              >
                <v-card
                  color="grey lighten-4"
                  min-width="350px"
                  flat
                >
                  <v-toolbar
                    :color="selectedEvent.color"
                    dark
                  >
                    <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="deleteEvent(selectedEvent.id, events.indexOf(selectedEvent)), selectedOpen = false" v-if="isAdmin">
                      <v-icon>mdi-trash-can</v-icon>
                    </v-btn>
                  </v-toolbar>
                  <v-card-text>
                    <div v-html="selectedEvent.details"></div>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn
                      text
                      color="secondary"
                      @click="goToEventPage(selectedEvent.id, selectedEvent.leader)"
                    >
                      View Event
                    </v-btn>
                    <v-btn
                      text
                      color="secondary"
                      @click="selectedOpen = false"
                    >
                      Cancel
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-menu>
            </v-sheet>
            <v-sheet class="rounded-lg">                    
              <ReportSettings style="margin:auto" :selected.sync="fileType"/>
              <EventListReport class="primary" :selected.sync="fileType"/>
            </v-sheet>
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
import EventListReport from "@/components/event_list_report.vue";

export default {
  components: {
    ReportSettings,
    EventListReport
  },
  data() {
    return {
      isAdmin: false,
      adminRoleID: null,
      user: this.$person,
      search:'',
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
      display:[],
      events:[],
      searchResults: [],
      members:[],
      groups: [],
      itemsPerPage: 4,
      eventGroup: {},
      eventLocations:[],
      menu: false,
      menu2: false,
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
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
      page: 1,
      sortBy: 'name',
      datePicker: null,
      timePicker: null,
      calendarDay: '',
      rooms: [],
      recurChkbx: false,
      groupChkbx: false,
    }
  },
  computed: {
      numberOfPages () {
        return Math.ceil(this.events.length / this.itemsPerPage)
      }
  },
  beforeCreate(){
    axios.all([
      axios.get(`${apiBaseUrl}/event`),
      axios.get(`${apiBaseUrl}/valid_value`),
      axios.get(`${apiBaseUrl}/person`),
      axios.get(`${apiBaseUrl}/room`),
      axios.get(`${apiBaseUrl}/group`)
    ])
    .then(axios.spread((events, types, members, rooms, groups) =>{
      this.adminRoleID = types.data.find(x => x.value === 'admin').ID;
      
      this.members = members.data;
      
      this.rooms = rooms.data;

      this.groups = groups.data;

      this.$nextTick(()=>{
        
          //this.events = events.data;
          events.data.forEach(event =>{
              const {f_name, l_name} = this.members.find(x => x.ID === event.leader)

              this.events.push({
                name: event.name?event.name:"Unnamed Event",
                id: event.ID,
                leader: event.leader,
                start: new Date(event.date),
                color: this.colors[this.rnd(0, this.colors.length - 1)],
                timed: true,
                details: event.description + `<br/>Event Leader: ${f_name} ${l_name}` 
              });

            })
          this.isAdmin = true;
        }

      )
    }))
    .catch(error =>{
      console.error(error)
    })
  },
  methods:{
    rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },

    showEvent ({ nativeEvent, event }) {
        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          setTimeout(() => {
            this.selectedOpen = true
          }, 10)
        }

        if (this.selectedOpen) {
          this.selectedOpen = false
          setTimeout(open, 10)
        } else {
          open()
        }

        nativeEvent.stopPropagation()
      },

    goToEventPage(eID, eLID){
      this.$router.push({name: 'Event', params: {eventID:eID, eventLeaderID:eLID}})
    },

    addEvent: function(){ 
      this.events = [];
      let tempEvent = {
        date: this.datePicker + "T" + this.timePicker + ":00.000Z",
        location: this.dialogm2room.ID,
        leader: this.dialogm2leader.ID,
        description: this.dialogm2desc,
        recurring: this.recurChkbx ? 1 : 0,
        name: this.dialogm2name
      }
      if(!this.groupChkbx){
        axios.post(`${apiBaseUrl}/event`, {
          date: tempEvent.date,
          leader: tempEvent.leader,
          location: tempEvent.location,
          description: tempEvent.description,
          recurring: tempEvent.recurring,
          name: tempEvent.name
        })
        .then(() => {
          axios.get(`${apiBaseUrl}/event`)
          .then(events => {
            
            this.$nextTick(()=>{
        
          //this.events = events.data;
          events.data.forEach(event =>{
                
            
              const {f_name, l_name} = this.members.find(x => x.ID === event.leader)

              this.events.push({
                name: event.name?event.name:"Unnamed Event",
                id: event.ID,
                leader: event.leader,
                start: new Date(event.date),
                color: this.colors[this.rnd(0, this.colors.length - 1)],
                timed: true,
                details: event.description + `<br/>Event Leader: ${f_name} ${l_name}` 
              });

            })
          this.isAdmin = true;
        }
      )

            this.dialog2 = false;
          })
          .catch(error =>{
            console.error(error);
          })
        })
        .catch(error =>{
          console.error(error);
        })
      }
      else{
        axios.post(`${apiBaseUrl}/event?group_ID=${this.eventGroup.ID}`, {
          date: tempEvent.date,
          leader: tempEvent.leader,
          location: tempEvent.location,
          description: tempEvent.description,
          recurring: tempEvent.recurring,
          name: tempEvent.name
        })
        .then(() => {
          axios.get(`${apiBaseUrl}/event`)
          .then(events => {
            
            this.$nextTick(()=>{
        
          //this.events = events.data;
          events.data.forEach(event =>{
                
              
              const {f_name, l_name} = this.members.find(x => x.ID === event.leader)

              this.events.push({
                name: event.name?event.name:"Unnamed Event",
                id: event.ID,
                leader: event.leader,
                start: new Date(event.date),
                color: this.colors[this.rnd(0, this.colors.length - 1)],
                timed: true,
                details: event.description + `<br/>Event Leader: ${f_name} ${l_name}` 
              });

            })
          this.isAdmin = true;
        }

      )

            this.dialog2 = false;
          })
          .catch(error =>{
            console.error(error);
          })
        })
        .catch(error =>{
          console.error(error);
        })
      }
      
    },

    deleteEvent: function(eventID, index){
      this.$delete(this.events, index);
      axios.delete(`${apiBaseUrl}/event?id=${eventID}`);
    },

    nextPage () {
        if (this.page + 1 <= this.numberOfPages) this.page += 1
      },

      formerPage () {
        if (this.page - 1 >= 1) this.page -= 1
      },

      updateItemsPerPage (number) {
        this.itemsPerPage = number
      },
  },

}
</script>
