<template>
  <v-app>
    <meta name="google-signin-client_id" content="761915308223-ua9pjnk2765b2qd88dda10htmhlu64js.apps.googleusercontent.com">
  <div>
    <label class="mt-8=">
      You are being logged out, you will be redirected soon.
      <br />
      Click <router-link to="login">here</router-link> to be redirected if you are not automatically redirected.
    </label>
  </div>
  </v-app>
</template>
    
<script src="https://apis.google.com/js/platform.js?onload=onLoadCallback" async defer></script>

<!--
<script>
export default{
  methods:{
    onLoadCallback: function(){
      console.log("Something I don't really care");
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log('User signed out.');
          });
      
      if(process.env.NODE_ENV === 'development'){
        window.location.href = 'http://localhost:8080/#/login';
      }
      else
      {
        window.location.href = 'http://team2.eaglesoftwareteam.com/';
      }
    }
  }
}
</script>
-->

<script>
window.onLoadCallback = function(){
  console.log("Something I don't really care");
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log('User signed out.');
          });
      
      if(process.env.NODE_ENV === 'development'){
        window.location.href = 'http://localhost:8080/#/login';
      }
      else
      {
        window.location.href = 'http://team2.eaglesoftwareteam.com/';
      }
}
</script>