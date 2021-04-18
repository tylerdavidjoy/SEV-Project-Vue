<template>
  <v-app>
    <v-main class="grey lighten-2 pa-0" >
        <v-container class="pa-0">
          <v-row>
            <v-col cols="auto">
              <v-container>
                <v-sheet class="transparent">
                  <v-img class="rounded-lg" :class="'my-2'" contain src="https://s3.amazonaws.com/media.cloversites.com/60/600d2d44-1897-4a0e-a36b-cdbcfca6584e/gallery/slides/dc347db4-eed0-471c-a85f-d148ea80afee@2x.jpg">
                    <!-- Used to bring balance to the force -->
                    <v-container>
                      <v-sheet height="450" class="transparent"/>
                    </v-container>
                    <v-container>
                      <v-sheet class="transparent" :class="'mt-16 pt-16'">
                        <div class="g-signin2" data-onsuccess="onSignIn" data-onfailure="failed" data-theme="dark" style="margin: 2% auto; width:100px;"></div>
                      </v-sheet>
                    </v-container>
                  </v-img>
                </v-sheet>
              </v-container>
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