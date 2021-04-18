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
                          hint="Search for a group"
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
                            Add Group
                          </v-btn>
                          </v-card-actions>
                        </template>
                        <v-card>
                          <v-card-title>Create a Group</v-card-title>
                          <v-divider></v-divider>
                            <v-card-text  style="height: 300px;">
                            <v-form v-model="isAddValid">
                              <v-autocomplete
                              v-model="dialogm2type"
                              :items="groupTypes"
                              :item-text="type => type.value"
                              return-object
                              label="Group Type"
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
                              label="Group Leader"
                              clearable
                              auto-select-first
                              :rules="[rules.required]"
                              hide-details="auto"
                            >
                            </v-autocomplete>
                            <v-text-field
                            v-model="dialogm2name"
                            label="Group Name"
                            :rules="[rules.required]"
                            hide-details="auto"
                            ></v-text-field>
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
                              @click="addGroup()"
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
                              Looks like you aren't in any groups or we can't find any groups related to your search.
                            </div>
                            <div v-else>
                              <div v-for="group in display" :key="group.name" style="float:left; padding: 15px;">
                                <v-card>
                                  <div>
                                    <v-avatar size="auto" tile min-height="175" max-height="175" min-width="175" max-width="175">
                                      <v-img
                                        :src="'http://team2.eaglesoftwareteam.com/images/'+group.image"
                                      ></v-img>
                                    </v-avatar>
                                    <div style="width: 175px; font-size: 128%; font-weight: bold; word-wrap: break-word;">{{group.name}}</div>
                                  </div>
                                  <v-card-actions>
                                    <v-btn height="auto" color="transparent" @click="goToGroupPage(group.ID, group.leader)">
                                      View Group
                                    </v-btn>
                                    <v-btn  v-if="isAdmin" height="auto" color="transparent" @click="deleteGroup(group.ID, groups.indexOf(group))">
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
                    <GroupListReport class="primary" :selected.sync="fileType" :picture.sync="picture"/>
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
import GroupListReport from "@/components/group_list_report.vue";
import ReportSettings from "@/components/report_settings.vue";

export default {
  components: {
    ReportSettings,
    GroupListReport
  },
  data() {
    return {
      isAdmin: false,
      user: this.$person,
      search:'',
      page:1,
      pageLength:20,
      display:[],
      groups:[],
      members:[],
      groupTypes:[],
      dialogm2leader: null,
      dialogm2name: '',
      dialogm2type: null,
      dialog2: false,
      rules: {
        required: value => !!value || 'Required.'
      },
      isAddValid: false,
      fileType:"PDF",
      picture:false
    }
  },
  beforeCreate(){
    axios.all([
      axios.get(`${apiBaseUrl}/group`),
      axios.get(`${apiBaseUrl}/valid_value`),
      axios.get(`${apiBaseUrl}/person`)
    ])
    .then(axios.spread((groups, types, members) =>{
      let adminRoleID = types.data.find(x => x.value === 'admin').ID;

      this.groupTypes = types.data.filter(x => x.value_group === "group");
      
      this.members = members.data;

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
    ClearAPI(){
      this.search = "";
      this.SearchAPI();
    },
    //Function for loading in the groups based on given API Search Parameters
    SearchAPI()
    {

      if(this.search.length > 0)
      {
        var temp = [];
        temp = JSON.parse(JSON.stringify(this.groups));        

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
    },

    addGroup: function(){   
      let tempGroup = {
        type: this.dialogm2type.ID,
        leader: this.dialogm2leader.ID,
        congregation_ID: this.$person.congregation_ID,
        name: this.dialogm2name,
        image: "default.jpg"
      }
      
      axios.post(`${apiBaseUrl}/group`, {
        type: tempGroup.type,
        leader: tempGroup.leader,
        congregation_ID: tempGroup.congregation_ID,
        name: tempGroup.name
      })
      .then(() => {
        axios.get(`${apiBaseUrl}/group`)
        .then(groups => {
          
          this.groups.push(tempGroup);
          let tempGroupIndex = this.groups.indexOf(tempGroup)
          tempGroup = groups.data[groups.data.length-1]
          this.$set(this.groups, tempGroupIndex, tempGroup)
          
          axios.post(`${apiBaseUrl}/group_person`, {
            group_ID: tempGroup.ID,
            person_ID: this.dialogm2leader.ID
          })
          .then(() => {
            this.dialog2 = false;
          })
          .catch(error =>{
            console.error(error);
          })
        })
        .catch(error =>{
          console.error(error);
        })
      })
      .catch(error =>{
        console.error(error);
      })

      

      // this.$nextTick(()=>{
      //   this.leader = this.dialogm2;
      //   this.$delete(this.groupMembers, this.groupMembers.indexOf(this.groupMembers.find(x => x.ID === this.dialogm2.ID)));
      // })
      
      
    },

    deleteGroup: function(groupID, index){
      this.$delete(this.groups, index);
      axios.delete(`${apiBaseUrl}/group?id=${groupID}`);
    }
  },

}
</script>
