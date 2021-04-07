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
                    <v-btn  v-on:click="$router.push({name: tab.name, params: tab.params})" height="250" width="250">
                      <div>
                        <div style="margin-top:5%;"><v-icon size="800%">{{tab.icon}}</v-icon></div>
                        <div style="font-size:270%">{{tab.text}}</div>
                      </div>
                    </v-btn>
                  <!-- </button> -->
              </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    mounted() {
      console.log("Window.person: " + window.person.f_name);
      this.name = window.person.f_name + " " + window.person.l_name;
      
    },
    data: () => ({
    name:"", 
    drawer: null,
    tabs:[
    {icon:'mdi-account',text:'Account', name:'Account', params: { id:1}},
    {icon:'mdi-home-group',text:'HouseHold', name:'HouseHold', params: { familyID:window.person.id}},
    {icon:'mdi-account-group',text:'Groups', name:'Group List', params: { id:window.person.id}},
    {icon:'mdi-calendar',text:'Events', name:'Events', params: { id:window.person.id}},
    {icon:'mdi-church',text:'Directory', name:'Directory', params: { id:window.person.id}},
    {icon:'mdi-help',text:'Help', name:'Help', params: { id:window.person.id}},
    ],
    }),
  }
</script>