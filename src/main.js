import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import store from './store'
// import cardlist from './components/card-list.vue'
import axios from 'axios'

Vue.config.productionTip = false


new Vue({
  components: {
    // 'card-list':cardlist,
  },
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
window.onSignIn = function (googleUser) {
  var profile = googleUser.getBasicProfile();
  // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  // console.log('Name: ' + profile.getName());
  // console.log('Image URL: ' + profile.getImageUrl());
  // console.log('Email: ' + profile.getEmail());

  window.user = {
    id: profile.getId(),
    name: profile.getName(),
    imgUrl: profile.getImageUrl(),
    email: profile.getEmail()
  };





  axios
    .get('http://team2.eaglesoftwareteam.com/person?email='+ window.user.email)
    .then(response => {
      if(response.data[0].f_name)
      {
        // console.log("Response: " + JSON.parse(response.data[0]));
        window.person = {
          id: response.data[0].ID,
          congregation_id: response.data[0].congregation_ID,
          f_name: response.data[0].f_name,
          l_name: response.data[0].l_name,
          occupation: response.data[0].occupation,
          employer: response.data[0].employer,
          family_id: response.data[0].family_id,
          email: response.data[0].email
        };
        console.log(window.person);
      }
      })
    .catch(error => {
      console.log("User Fetch Error: " + error);
      this.errored = true;
      })
    // .finally(() => {
    //   if(window.person == null)
    //     console.log("Not a Valid Congregation Member");
    //   //Set the name variable that will load on the Home page to greet the user
    // });
}

