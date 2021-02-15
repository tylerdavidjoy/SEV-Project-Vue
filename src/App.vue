<template>
  <div id="app">
    <div id="nav">
        <v-app-bar app>
          <!-- <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon> -->

          <v-toolbar-title class="flex text-center" style="color:maroon;">{{ $route.name }}</v-toolbar-title>
        </v-app-bar>

        <v-navigation-drawer v-if="['Login', 'Logout'].includes($route.name) != true" expand-on-hover="expandOnHover" mini-variant="miniVariant" app>
        <v-list>
            <v-list-item
              v-for="tab in tabs"
              v-bind:key="tab.icon"
              router :to="tab.path">
              <v-list-item-icon>
                <v-icon>{{ tab.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ tab.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: maroon;
}

#nav {
  padding: 30px;
  background-color: darkslategrey;
  a {
    font-weight: bold;
    color: #2c3e50;
    // &.router-link-exact-active {
    //   color: #42b983;
    // }
  }
}
</style>
<script>

  export default {
    data: () => ({ 
    drawer: null,
    tabs:[
    {icon:'mdi-home',text:'Home', path:'/'},
    {icon:'mdi-account',text:'Account', path:'/account'},
    {icon:'mdi-home-group',text:'HouseHold', path:'/household'},
    {icon:'mdi-account-group',text:'Groups', path:'/groups'},
    {icon:'mdi-calendar',text:'Events', path:'/events'},
    {icon:'mdi-church',text:'Directory', path:'/directory'},

    ],

    }
    ),
  }
</script>
