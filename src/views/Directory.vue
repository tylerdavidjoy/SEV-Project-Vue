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
                          hint="Search for a person / family'"
                          clearable
                          @input="SearchAPI()"
                          @click:clear="clearAPI()"
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
                                    <v-btn @click='viewMode("person")' block elevation="2" outlined>Person View</v-btn>
                                  </div>
                                  
                                  <div>
                                    <v-btn style="margin-top: 2%;" @click='addPerson()' elevation="2" outlined>+ Person</v-btn>
                                  </div>
                                </v-sheet>
                              </v-container>
                            </v-col>
                            <v-col cols="6">
                              <v-container>    
                                <v-sheet class="rounded-lg">
                                  <div>
                                    <v-btn @click='viewMode("family")' block elevation="2" outlined >Family View</v-btn>
                                  </div>
                                  <div>
                                    <v-btn style="margin-top: 2%;" @click='addFamily()' elevation="2" outlined>+ Family</v-btn>
                                  </div>
                                </v-sheet>
                              </v-container>
                            </v-col>
                          </v-row>
                        </v-container>
                      </div>

                      <!-- Results Bar -->
                      <div class="pt-2">
                        <v-container>

                          <div id="content" ref="content" style="width:100%; margin:auto; padding-left:3.5%;">
                            <div v-for="person in display" :key="person.name" style="float:left; padding: 15px;">
                              <v-btn style="text-transform:none" height="auto" color="transparent" @click="goToPage(person.ID)" elevation="10">
                                <div>
                                  <v-avatar size="auto" tile min-height="175" max-height="175" min-width="175" max-width="175">
                                    <v-img
                                      height="175px"
                                      width="175px"
                                      lazy-src="../assets/logo.png"
                                      src="../assets/logo.png"
                                    ></v-img>
                                  </v-avatar>
                                  <div style="width: 175px; font-size: 128%; font-weight: bold; word-wrap: break-word;">{{person.name}}</div> <!--Person Name-->
                                </div>
                              </v-btn>
                            </div>
                          </div>

                          <v-container class="max-width">
                            <v-pagination
                              v-model="page"
                              class="my-4"
                              :length="pageLength"
                              :total-visible="7"
                            ></v-pagination>
                          </v-container>
                          <DirectoryReportNoImg/>
                          <RoleReport/>
                           <GroupReportNoImg/>
                           <GroupListReport/>
                          <LifeEventReport/>
                          
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
import DirectoryReportNoImg from "@/components/directory_report.vue";
import GroupReportNoImg from "@/components/group_report.vue";
import GroupListReport from "@/components/group_list_report.vue";
import LifeEventReport from "@/components/lifeEvent_report.vue";
import RoleReport from "@/components/role_report.vue";
export default {
  name: "Home",
  components: {
    DirectoryReportNoImg,
    GroupReportNoImg,
    LifeEventReport,
    GroupListReport,
    RoleReport
  },
  mounted() {
    //People
    axios.get("http://team2.eaglesoftwareteam.com/person")
    .then(response => {
      console.log("people Res:", response.data);
      for(var i = 0; i < response.data.length; i++)
      {
        this.people.push({
          id: response.data[i].ID,
          name: response.data[i].f_name + " " + response.data[i].l_name
        })
      }
      if(this.people.length > 20)
        this.display = this.people.slice(0,19);
      
      else
        this.display = this.people;

      if(this.people.length == 20)
        this.pageLength = 1;
      
      else
        this.pageLength = (this.people.length / 20) + 1;
    })
    .catch(error => {
      console.log(error);
    })

    axios.get("http://team2.eaglesoftwareteam.com/family?isGetNameList=1")
    .then(response => {
      console.log(response.data);
      for(var i = 0; i < response.data.length; i++)
      {
        this.family.push({
          id: response.data[i].ID,
          name: response.data[i].l_name
        })
      }
    })
    .catch(error => {
      console.log(error);
    })


  },
    data() {
    return {
      isAdmin:true,
      search:'',
      page:1,
      pageLength:20,
      display:[],
      people:[],
      family: [],
      displayMode: "person",
    }
  },
  methods:{
    addPerson()
    {

    },

    addFamily()
    {

    },

    goToPage(ID)
    {
      if(this.displayMode == "person")
        this.$router.push({name: 'Account', params: {personID: ID}})

      else
        this.$router.push({name: 'HouseHold', params: {familyID: ID}})
    },

    clearAPI()
    {
      this.search = "";
      this.SearchAPI();
    },
    //Function for loading in the Events based on given API filters and Search Parameters
    SearchAPI()
    {
      if(this.search.length > 0)
      {
        var temp = [];
        if(this.displayMode == "person")
          temp = JSON.parse(JSON.stringify(this.people));

        else
          temp = JSON.parse(JSON.stringify(this.family));
        

        temp.forEach(x => x.name = x.name.toLowerCase());
        temp = temp.filter(item => item.name.includes(this.search.toLowerCase()));

        temp.forEach(x => 
          {
            var split = x.name.split(" ");
            for(var y = 0; y < split.length; y++)
            {
              split[y] = split[y][0].toUpperCase() + split[y].substr(1);
            }
            if(this.viewMode == "person")
              x.name = split[0] + " " + split[1];
            else 
              x.name = split[0];
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

    viewMode(mode)
    {
      console.log(this);
      this.displayMode = mode;
      if(mode == "person")
      {
        if(this.people.length > 20)
          this.display = this.people.slice(0,19);
      
        else
          this.display = this.people;

        if(this.people.length == 20)
          this.pageLength = 1;
        
        else
          this.pageLength = (this.people.length / 20) + 1;
      }

      else
      {
        if(this.family.length > 20)
          this.display = this.people.slice(0,19);
      
        else
          this.display = this.family;

        if(this.family.length == 20)
          this.pageLength = 1;
        
        else
          this.pageLength = (this.family.length / 20) + 1;
      }
    }
  },

}
</script>
