<template>
  <v-app id="inspire">
      
    <v-main class="grey lighten-2">
      <v-container>
         <v-card color="gray">
          <v-card-title class="text-center justify-center py-6">
            <h1 class="font-weight-bold display-3 dark--text">
              Help Page
            </h1>
          </v-card-title>
      
          <v-tabs
            v-model="tab"
            color="gray"
            grow
          >
            <v-tab
              v-for="item in items"
              :key="item"
            >
              {{ item }}
            </v-tab>
          </v-tabs>
      
          <v-tabs-items v-model="tab">
            <!-- The v-Tab for the Account Page -->
            <v-tab-item>
              <v-card color="dark" flat>
                <v-container>
                  <v-stepper >
                    <v-stepper-header>
                      <template v-for="n in content.account.steps">
                        <v-stepper-step :key="`${n}-step`" :step="n" editable>Step {{ n }}</v-stepper-step>
              
                        <v-divider v-if="n !== content.account.steps" :key="n"></v-divider>
                      </template>
                    </v-stepper-header>
              
                    <v-stepper-items>
                      <v-stepper-content v-for="n in content.account.steps" :key="`${n}-content`" :step="n">
                        <v-card class="mb-12" color="grey lighten-1" height="200px">
                        <v-card-title>Step {{n}}</v-card-title>
                        <v-card-text></v-card-text>
                        </v-card>
                      </v-stepper-content>
                    </v-stepper-items>
                  </v-stepper>
                </v-container>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    mounted() {
      // console.log(this.content[0].steps)
    },
    data: () => ({
      tab: null,
      items: [
      'Account','Photo & File Uploading', 'Groups', 'Events','Report Printing','Searching Directory','Administrators'
      ],
      itemText:[
        'The Account page is for a person to view and edit all their information like phone number and Life Events that a congregation might like to keep track of',
        ],
      
      content:{
        account:{id:0, steps:[1,2], info:['Hello','Test'], image:'',},
      }
    }),
  }
</script>