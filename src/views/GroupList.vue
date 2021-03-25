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
                          hint="Search for a group'"
                          clearable
                          @change="SearchAPI()"
                        ></v-text-field>
                      </div>

                    </div>
                  </v-sheet>
              </v-col>
              <v-col cols="12">
                  <v-sheet class="rounded-lg">
                    <div class="px-4">
                      <!-- Switch for Pagenation and Calendar -->
                      

                      <!-- Results Bar -->
                      <div class="pt-2">
                        <v-container>

                          <div style="width:100%; margin:auto; padding-left:3.5%;">
                            <div v-if="display.length === 0">
                              Looks like you aren't in any groups.
                            </div>
                            <div v-else>
                              <div v-for="group in display" :key="group.name" style="float:left; padding: 15px;">
                                <v-btn height="auto" color="transparent" @click="goToGroupPage(group.ID, group.leader)">
                                  <div>
                                    <v-avatar size="auto" tile min-height="175" max-height="175" min-width="175" max-width="175">
                                      <v-img
                                        lazy-src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.jAioCeiE6Cwhq9Ph3dee4gHaHa%26pid%3DApi&f=1"
                                        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.ffM2c8XIZTLve4CbmxytyQHaHa%26pid%3DApi&f=1"
                                      ></v-img>
                                    </v-avatar>
                                    <div style="width: 175px; font-size: 128%; font-weight: bold; word-wrap: break-word;">{{group.name}}</div>
                                  </div>
                                </v-btn>
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

export default {
  data() {
    return {
      isAdmin: false,
      user: this.$person,
      search:'',
      page:1,
      pageLength:20,
      display:[],
      groups:[],
    }
  },
  beforeCreate(){
    axios.all([
      axios.get(`${apiBaseUrl}/group`),
      axios.get(`${apiBaseUrl}/valid_value`),
    ])
    .then(axios.spread((groups, types) =>{
      let adminRoleID = types.data.find(x => x.value === 'admin').ID;

      this.$nextTick(()=>{
        if(this.user.role != adminRoleID){
          axios.get(`${apiBaseUrl}/group?person_ID=${this.$person.ID}`)
          .then(response =>{
            this.groups = response.data;
          })
          .catch(error =>{
            this.groups = [];
            console.error(error)
          })
        }
        else{
          this.groups = groups.data;
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
    //Function for loading in the Events based on given API filters and Search Parameters
    SearchAPI()
    {

      console.log("Filter Types: " + this.filters);
      console.log("Search Parameters: " + this.search);
    },

    viewMode()
    {
        if(this.groups.length > 20)
          this.display = this.groups.slice(0,19);
      
        else
          this.display = this.groups;

        if(this.groups.length == 20)
          this.pageLength = 1;
        
        else
          this.pageLength = (this.groups.length / 20) + 1;
      
    },

    goToGroupPage(gID, gLID){
      this.$router.push({name: 'Group', params: {groupID:gID, groupLeaderID:gLID}})
    }
  },

}
</script>
