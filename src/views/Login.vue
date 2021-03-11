<template>
  <v-app>
    <v-main class="grey lighten-2" style="background-image: url(https://s3.amazonaws.com/media.cloversites.com/60/600d2d44-1897-4a0e-a36b-cdbcfca6584e/gallery/slides/dc347db4-eed0-471c-a85f-d148ea80afee@2x.jpg);
  background-size: cover;">
        <h1>Welcome to the {{'PLACEHOLDER-TEXT'}} Church Management System.</h1>
        <v-container>
          <v-sheet  class="transparent">
            <div class="g-signin2" data-onsuccess="onSignIn" data-onfailure="failed" data-theme="dark" style="margin: 2% auto; width:100px;"></div>
          </v-sheet>
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
      this.$router.push("/home");
    }
  },
   mounted(){
      let recaptchaScript = document.createElement('script')
      recaptchaScript.setAttribute('src', 'https://apis.google.com/js/platform.js')
      document.head.appendChild(recaptchaScript)
      
      this.polling = setInterval(() => {
      if(window.user){
        this.user = window.user;
        this.$router.push("/home");
      }
    }, 1000)
  },
  beforeDestroy() {
    clearInterval(this.polling);
  }
}
</script>