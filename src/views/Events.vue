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
                <v-sheet class="rounded-lg">
                  <div class="px-4">
                    <div>Filters</div>
                    <v-spacer></v-spacer>
                    <div>
                      <v-combobox
                        v-model="filters"
                        :items="filterTypes"
                        label="Filter Events"
                        multiple
                        chips
                        disable-lookup
                        @change="SearchAPI()"
                      ></v-combobox>
                    </div>
                  </div>
                </v-sheet>
              </v-col>
              <v-col cols="12">
                <v-sheet  class="rounded-lg">
                  <v-container>
                    <v-row>
                      <v-col cols="6">
                        <v-container>    
                          <v-sheet class="rounded-lg">
                            <div>
                              <v-btn
                                block
                                elevation="2"
                                outlined
                              >My Events</v-btn>
                            </div>
                          </v-sheet>
                        </v-container>
                      </v-col>
                      <v-col cols="6">
                        <v-container>    
                          <v-sheet class="rounded-lg">
                            <div>
                              <v-btn
                                block
                                elevation="2"
                                outlined
                              >All Events</v-btn>
                            </div>
                          </v-sheet>
                        </v-container>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-sheet>
              </v-col>
              <v-col cols="12">
                  <v-sheet class="rounded-lg">
                    <div class="px-4">
                      <!-- Search Bar -->
                      <div>
                        <v-text-field
                          v-model="search"
                          label="Search Bar"
                          hint="Search for a Specific Event. I.E. 'Men's Retreat'"
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
                      <div>
                        <v-container>
                          <v-row>
                            <v-col cols="6">
                              <v-container>    
                                <v-sheet class="rounded-lg">
                                  <div>
                                    <v-btn
                                      block
                                      elevation="2"
                                      outlined
                                    >List View</v-btn>
                                  </div>
                                </v-sheet>
                              </v-container>
                            </v-col>
                            <v-col cols="6">
                              <v-container>    
                                <v-sheet class="rounded-lg">
                                  <div>
                                    <v-btn
                                      block
                                      elevation="2"
                                      outlined
                                    >Calendar View</v-btn>
                                  </div>
                                </v-sheet>
                              </v-container>
                            </v-col>
                          </v-row>
                        </v-container>
                      </div>
                      <!-- Div for is the user is an Admin -->
                      <div>
                        <template v-if="isAdmin">
                          <v-container>
                            <v-row>
                              <v-col cols="12">
                                <v-container>    
                                  <v-sheet class="rounded-lg">
                                    <div>
                                      <v-btn
                                        block
                                        elevation="2"
                                        outlined
                                      >Add Event</v-btn>
                                    </div>
                                  </v-sheet>
                                </v-container>
                              </v-col>
                            </v-row>
                          </v-container>
                        </template>

                      </div>
                      <!-- Results Bar -->
                      <div class="pt-2">
                        <v-container>
                          <v-row v-for="k in 6" v-bind:key="k" sm="4" md="12">
                                <v-col v-for="n in 6" v-bind:key="n" cols="2" >
                                    <button class="rounded-lg">
                                      <v-sheet class="rounded-lg">
                                        <div>
                                          <v-img
                                            height="175px"
                                            width="175px"
                                            lazy-src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.jAioCeiE6Cwhq9Ph3dee4gHaHa%26pid%3DApi&f=1"
                                            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.ffM2c8XIZTLve4CbmxytyQHaHa%26pid%3DApi&f=1"
                                          ></v-img>
                                        </div>
                                        <div style="font-size:300%">{{(page * 36 - 36) + (k * 6 - 6) + n}}</div>
                                      </v-sheet>
                                    </button>
                                </v-col>
                          </v-row>
                          <v-container class="max-width">
                            <v-pagination
                              v-model="page"
                              class="my-4"
                              :length="15"
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
// import axios from "axios";
export default {
  //For all the data that we need to import at startup of the page.
  mounted() {

  },
  data:() => ({
    userID:0,//ID for the user to get from the Router header on mounted for fetching data from the backend
    //variable for the filter types. By standard it should do a all search with A-Z Sorting
    filterTypes:["A-Z Sorting"," Earliest Date","Retreats","Wednesday Events","Sunday Events"],
    filters:[],//Array for the filters that are being used for searching
    search:'',//Variable for the Search Bar
    page:1,//Variable to determine the page and also the amount to load up for the search
    CalendarFlag:false,//Flag for switching from a pagination view to calendar view
    isAllEvents:false,//Flag for the All the events in the church or just your personal events
    Events:[],//Array of the Events that are to be pulled up.
    isAdmin:false,//Test Data for if the user is admin
  }),
  methods:{
    //Function for loading in the Events based on given API filters and Search Parameters
    SearchAPI()
    {

      console.log("Filter Types: " + this.filters);
      console.log("Search Parameters: " + this.search);
    },
    //Function for Displaying the correct amount of events for the Pagenation selection of the 
    loadingEvents()
    {

    }
  },

}
</script>
