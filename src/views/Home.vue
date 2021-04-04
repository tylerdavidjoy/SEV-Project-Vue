<template>
  <v-app id="inspire">
    <v-main class="grey lighten-2">
      <v-container>
        <v-row>
              <v-col v-for="tab in tabs" v-bind:key="tab.icon" :link="tab.path" cols="auto" md="4" lg="4" xl="4">
                  <button @click="$router.push(tab.path)">
                    <v-sheet  height="250" width="250">
                      <div style="margin-top:5%; background-color:white;"><v-icon size="800%">{{tab.icon}}</v-icon></div>
                      <div style="font-size:300%">{{tab.text}}</div>
                    </v-sheet>
                  </button>
              </v-col>
        </v-row>
        <AnnouncementViewer v-if="announcements.length > 0" :announcements="announcements" :hasPerms="isAdmin" class="mt-5"/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios';

const apiBaseUrl = "http://team2.eaglesoftwareteam.com";
import AnnouncementViewer from '@/components/Announcements.vue'
  export default {
    components: {
      AnnouncementViewer
    },
    data: () => ({ 
    drawer: null,
    tabs:[
    {icon:'mdi-account',text:'Account', path:'/account'},
    {icon:'mdi-home-group',text:'HouseHold', path:'/household'},
    {icon:'mdi-account-group',text:'Groups', path:'/grouplist'},
    {icon:'mdi-calendar',text:'Events', path:'/events'},
    {icon:'mdi-church',text:'Directory', path:'/directory'},
    ],
    announcements: [],
    isAdmin: false,
    }),
    beforeCreate(){
      axios.get(`${apiBaseUrl}/valid_value`)
      .then(values => {
        let messageTypeID = values.data.find(x => x.value_group === "message" && x.value === "congregation").ID;

        let adminID = values.data.find(x => x.value === "admin").ID

        this.$nextTick(() => {
          if(this.$person.role === adminID){
            this.isAdmin = true;
          }
        })

        console.log(this.$person.congregation_ID, values.data.find(x => x.value_group === "message" && x.value === "congregation").ID)
        console.log(`${apiBaseUrl}/message?receipient=(${this.$person.congregation_ID})&receipient_type=${messageTypeID}`)

        axios.get(`${apiBaseUrl}/message?receipient=(${this.$person.congregation_ID})&receipient_type=${messageTypeID}`)
        .then(messages => {
          this.announcements = messages.data;
          console.log(this.announcements)
          
        })
        .catch(error => {
          console.error(error);
        })
      })
    }
  }
</script>