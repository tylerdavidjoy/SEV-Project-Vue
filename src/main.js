import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import store from './store'
import MenuTile from './components/MenuTile.vue'

Vue.config.productionTip = false

new Vue({
  components: {
    'Menu-Tile' : MenuTile,
  },
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
window.onSignIn = function (googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail());

  window.user = {
    id: profile.getId(),
    name: profile.getName(),
    imgUrl: profile.getImageUrl(),
    email: profile.getEmail()
  };
}
