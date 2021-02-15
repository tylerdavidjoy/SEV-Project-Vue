<template>
  <v-app>
  <meta name="google-signin-client_id" content="761915308223-ua9pjnk2765b2qd88dda10htmhlu64js.apps.googleusercontent.com">
    <v-main class="grey lighten-2">
      <h1>Welcome to the {{'PLACEHOLDER-TEXT'}} Church Management System.</h1>
      <v-container>
        <v-row>
          <v-col>
          </v-col>
          <v-col>
            <v-text-field
              label="Username"
              solo
            ></v-text-field>
          </v-col>
          <v-col>
          </v-col>  
        </v-row>
        <v-row>
          <v-col>
          </v-col>
          <v-col>
          <v-text-field
            label="Password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            solo
            @click:append="show1 = !show1"
          ></v-text-field>
          <v-btn
              elevation="2"
              text
              v-on:click="$router.push('/')"
            >Submit</v-btn>
          </v-col>
          <v-col>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
          </v-col>
          <v-col>
            <button v-on:click="login()" class="btn btn-dark btn-lg " style="width:20%">Google</button>
            <div class="g-signin2" data-onsuccess="onSignIn" data-onfailure="failed" data-theme="dark" style="margin: 2% auto; width:200px"></div>
          </v-col>
          <v-col>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script src="https://apis.google.com/js/platform.js" async defer></script>

<script>
export default {
  data () {
    return {
      show1: false
    }
  },
  methods: {
    login: function() {
      this.$router.push("/");
    }
  },
}
window.onLoadCallback = function(){
  gapi.auth2.init({
    client_id: '761915308223-ua9pjnk2765b2qd88dda10htmhlu64js.apps.googleusercontent.com'
  });
}
</script>