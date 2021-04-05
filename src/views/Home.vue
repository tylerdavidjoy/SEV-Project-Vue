<template>
  <v-app id="inspire">
      
    <v-main class="grey lighten-2">
      <v-container>
        <template v-if="name != ''">
          <div>
            <v-sheet class="rounded-pill" height="5%" width="50%" style="margin:auto">
              <div class="flex text-center" style="color:maroon; font-size:xx-large;background-color:transparent; font-weight:500;">
                Welcome {{name}}
              </div>
            </v-sheet>
          </div>
        </template>
        <v-row style="margin-top:2%;">
              <v-col v-for="tab in tabs" v-bind:key="tab.icon" :link="tab.path" cols="auto" md="4" lg="4" xl="4">
                  <!-- <button @click="$router.push(tab.path)"> -->
                    <v-btn  v-on:click="$router.push(tab.path)" height="250" width="250">
                      <div>
                        <div style="margin-top:5%;"><v-icon size="800%">{{tab.icon}}</v-icon></div>
                        <div style="font-size:270%">{{tab.text}}</div>
                      </div>
                    </v-btn>
                  <!-- </button> -->
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
    mounted() {
      console.log("Window.person: " + window.person.f_name);
      this.name = window.person.f_name + " " + window.person.l_name;
      
    },
    data: () => ({
    name:"", 
    drawer: null,
    tabs:[
    {icon:'mdi-account',text:'Account', path:'/account', params: { id:window.user.id}},
    {icon:'mdi-home-group',text:'HouseHold', path:'/household', params: { id:window.user.id}},
    {icon:'mdi-account-group',text:'Groups', path:'/grouplist', params: { id:window.user.id}},
    {icon:'mdi-calendar',text:'Events', path:'/events', params: { id:window.user.id}},
    {icon:'mdi-church',text:'Directory', path:'/directory', params: { id:window.user.id}},
    {icon:'mdi-help',text:'Help', path:'/help', params: { id:window.user.id}},
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
          if(messages.data.length > 0)
            this.announcements = messages.data;
          else
            this.announcements.push({message: "No announcements to show."})
          console.log(this.announcements)
          
        })
        .catch(error => {
          console.error(error);
        })
      })
    }
  }
</script>