<template>
  <v-app id="inspire">
    <v-system-bar app>
      <v-spacer></v-spacer>

      <v-icon>mdi-square</v-icon>

      <v-icon>mdi-circle</v-icon>

      <v-icon>mdi-triangle</v-icon>
    </v-system-bar>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
    >
    <v-list>
        <v-list-item
          v-for="tab in tabs"
          v-bind:key="tab.icon"
          link>
          <v-list-item-icon>
            <v-icon>{{ tab.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <router-link :to="tab.path"> {{ tab.text }} </router-link>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <!--  -->
    </v-navigation-drawer>

    <v-main class="grey lighten-2">
      <v-container>
        <v-row>
          <template v-for="n in 4">
            <v-col
              :key="n"
              class="mt-2"
              cols="12"
            >
              <strong>Category {{ n }}</strong>
            </v-col>

            <v-col
              v-for="j in 6"
              :key="`${n}${j}`"
              cols="6"
              md="2"
            >
              <v-sheet height="150"></v-sheet>
            </v-col>
          </template>
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
    {icon:'mdi-inbox-arrow-down',text:'Home', path:'/'},
    {icon:'mdi-inbox-arrow-down',text:'Account', path:'/account'},
    {icon:'mdi-inbox-arrow-down',text:'HouseHold', path:'/household'},
    {icon:'mdi-inbox-arrow-down',text:'Groups', path:'/groups'},
    {icon:'mdi-inbox-arrow-down',text:'Events', path:'/events'},
    {icon:'mdi-inbox-arrow-down',text:'Directory', path:'/directory'},

    ],

    }),
  }
</script>