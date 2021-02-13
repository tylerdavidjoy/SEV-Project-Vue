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
