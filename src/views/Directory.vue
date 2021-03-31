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
                      <v-tabs
                        v-model="tab"
                            fixed-tabs
                            background-color="white">
                        <v-tabs-slider color="Blue"/>
                        <v-tab
                          v-for="item in items"
                          :key="item"
                          @click = "viewMode(item)">
                          {{ item }}
                        </v-tab>
                      </v-tabs>
                      <v-btn v-if="isAdmin" @click="addItem()">+ {{displayMode}}</v-btn>

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
                              :length="numPages"
                              :total-visible="7"
                              @next="pageChange('next')"
                              @previous="pageChange('previous')"
                              @input="pageChange(page)"
                            ></v-pagination>
                          </v-container>

                          <div v-if="isAdmin">
                            <ReportSettings :selected.sync="fileType" :picture.sync="picture"/>
                            <DirectoryReportNoImg :selected.sync="fileType" :picture.sync="picture"/>
                            <RoleReport :selected.sync="fileType" :picture.sync="picture"/>
                            <GroupReportNoImg :selected.sync="fileType" :picture.sync="picture"/>
                            <GroupListReport :selected.sync="fileType" :picture.sync="picture"/>
                            <LifeEventReport :selected.sync="fileType" :picture.sync="picture"/>
                          </div>
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
import ReportSettings from "@/components/report_settings.vue";
import DirectoryReportNoImg from "@/components/directory_report.vue";
import GroupReportNoImg from "@/components/group_report.vue";
import GroupListReport from "@/components/group_list_report.vue";
import LifeEventReport from "@/components/lifeEvent_report.vue";
import RoleReport from "@/components/role_report.vue";
export default {
  name: "Home",
  components: {
    ReportSettings,
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
      this.autoPagination(this.people);
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
      numPages:0,
      maxPageLength: 20,
      display:[],
      people:[],
      family: [],
      displayMode: "person",
      items: ["person", "family"],
      fileType:"PDF",
      picture:false
    }
  },
  methods:{
    pageChange(target)
    {
      switch(target) {
        case "next":
          if(this.page < this.numPages){
            this.page++;
          }
          break;
        case "previous":
          if(this.page > 1){
            this.page--;
          }
          break;
        default:
          this.page = target;
      }

      this.viewMode(this.displayMode)

    },
    addPerson()
    {

    },

    addFamily()
    {
      if(this.displayMode == "person")
      {
        console.log("Add Person");
      }

      else
      {
        console.log("Add Family");
      }
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
      this.search = " ";
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
            if(this.displayMode == "person")
              x.name = split[0] + " " + split[1];
            else 
              x.name = split[0];
          })
         this.autoPagination(temp);
      }
      else
        this.viewMode(this.displayMode);
    },

    autoPagination(data)
    {
      console.log(data);
      if(data.length > this.maxPageLength)
          this.display = data.slice(((this.page - 1) * this.maxPageLength) ,((this.page * this.maxPageLength)));
      
        else
          this.display = data;

        if (this.maxPageLength % data.length == 0)
          this.numPages = 1;
        
        else
          this.numPages = Math.ceil(data.length / this.maxPageLength);
      },

    viewMode(mode)
    {
      this.displayMode = mode;
      if(this.displayMode == "person")
        this.autoPagination(this.people);

      else 
        this.autoPagination(this.family);
    }
  }
}
</script>
