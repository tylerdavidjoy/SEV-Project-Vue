<template>
  <v-app>
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
            <v-sheet class="grey lighten-2">
              <div class="g-signin2" data-onsuccess="onSignIn" data-onfailure="failed" data-theme="dark" style="margin: 2% auto; width:100px;"></div>
            </v-sheet>
          </v-col>
          <v-col>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

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
   mounted(){
      let recaptchaScript = document.createElement('script')
      recaptchaScript.setAttribute('src', 'https://apis.google.com/js/platform.js')
      document.head.appendChild(recaptchaScript)
      
      this.polling = setInterval(() => {
      if(window.user){
        this.user = window.user;
        this.$router.push("/");
      }
    }, 1000)
  },
  beforeDestroy() {
    clearInterval(this.polling);
  }
}
</script>