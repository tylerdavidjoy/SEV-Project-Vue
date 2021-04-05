<template>
  <div id="app">
    <meta name="google-signin-client_id" content="761915308223-ua9pjnk2765b2qd88dda10htmhlu64js.apps.googleusercontent.com">
    <div id="nav">
        <v-app-bar app> 
          <v-toolbar-title class="flex text-center" style="color:maroon;">{{ $route.name }} Page</v-toolbar-title>
          <button v-if="['Login', 'Logout'].includes($route.name) != true" v-on:click="signOut()" class="btn btn-dark btn-lg"><v-icon>{{ logoutIcon.icon }}</v-icon>Logout</button> 
        </v-app-bar>
        <div class="g-signin2" data-onsuccess="onSignIn" data-onfailure="failed" style="height:0px;"></div> <!--***LEAVE ALONE ITS HIDDEN BUT MAKES LOGOUT WORK***-->
        <v-navigation-drawer v-if="['Login', 'Logout'].includes($route.name) != true" :expand-on-hover="true" :mini-variant="true" app>
        <v-list>
            <v-list-item
              v-for="tab in tabs"
              v-bind:key="tab.icon"
              router-link :to="tab.route">
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

<script src="https://apis.google.com/js/platform.js" async defer></script>
<script>
export default {
  mounted(){
  },
  data() {
    return {
    login: true,
    user: {

    },
    polling: null,
    drawer: null,
    tabs:[
      {icon:'mdi-home',text:'Home', route:{name:'Home'}},
      {icon:'mdi-account',text:'Account', route:{name:'Account', params:{ id:window.person.id }}},
      {icon:'mdi-home-group',text:'HouseHold', route:{name:'HouseHold', params:{ id:window.person.id}}},
      {icon:'mdi-account-group',text:'Groups', route:{name:'Group List'}},
      {icon:'mdi-calendar',text:'Events', route:{name:'Events'}},
      {icon:'mdi-church',text:'Directory', route:{name:'Directory'}},
      {icon:'mdi-help',text:'Help', route:{name:'Help'}},
    ],
    logoutIcon : {icon:'mdi-logout',text:'Logout', path:'/logout'}
    }
  },
    methods: {
      signOut: function() {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
          window.user = null;
          window.person = null;
          console.log('User signed out.');
            });
        
        if(process.env.NODE_ENV === 'development'){
          window.location.href = 'http://localhost:8080/#/';
        }
        else
        {
          window.location.href = 'http://team2.eaglesoftwareteam.com/#/';
        }
      }
    },
};
</script>

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