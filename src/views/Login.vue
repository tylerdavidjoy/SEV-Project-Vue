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
            <v-btn
              elevation="2"
              text
            >Google</v-btn>
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
}
</script>