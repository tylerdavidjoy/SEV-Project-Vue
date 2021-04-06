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
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    data: () => ({ 
    drawer: null,
    tabs:[
    {icon:'mdi-account',text:'Account', path:'/account'},
    {icon:'mdi-home-group',text:'HouseHold', path:'/household', params: {familyID:this.$person.family_ID}},
    {icon:'mdi-account-group',text:'Groups', path:'/grouplist'},
    {icon:'mdi-calendar',text:'Events', path:'/events'},
    {icon:'mdi-church',text:'Directory', path:'/directory'},
    ],
    }),
  }
</script>