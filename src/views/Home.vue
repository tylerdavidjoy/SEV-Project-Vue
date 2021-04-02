<template>
  <v-app id="inspire">
      
    <v-main class="grey lighten-2">
      <v-container>
        <template v-if="name != ''">
          <div>
            <v-sheet height="200">
              <div class="flex text-center" style="color:maroon;">
                Welcome {{name}}
              </div>
            </v-sheet>
          </div>
        </template>
        <v-row>
              <v-col v-for="tab in tabs" v-bind:key="tab.icon" :link="tab.path" cols="auto" md="4" lg="4" xl="4">
                  <!-- <button @click="$router.push(tab.path)"> -->
                    <v-sheet  v-on:click="$router.push(tab.path)" height="250" width="250">
                      <div style="margin-top:5%; background-color:white;"><v-icon size="800%">{{tab.icon}}</v-icon></div>
                      <div style="font-size:300%">{{tab.text}}</div>
                    </v-sheet>
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
    {icon:'mdi-account',text:'Account', path:'/account', params: { id:window.user.id}},
    {icon:'mdi-home-group',text:'HouseHold', path:'/household', params: { id:window.user.id}},
    {icon:'mdi-account-group',text:'Groups', path:'/grouplist', params: { id:window.user.id}},
    {icon:'mdi-calendar',text:'Events', path:'/events', params: { id:window.user.id}},
    {icon:'mdi-church',text:'Directory', path:'/directory', params: { id:window.user.id}},
    {icon:'mdi-help',text:'Help', path:'/help', params: { id:window.user.id}},
    ],
    }),
  }
</script>