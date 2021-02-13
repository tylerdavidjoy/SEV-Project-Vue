Vue.component('Menu-Tile', {
  props: ['icon','text','path'],
  template: '
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <router-link to={{ path }}> {{ text }} </router-link>
          </v-list-item-content>'
})