// import Vue from 'vue'
// import App from './App.vue'
// import vuetify from './plugins/vuetify';
// import router from './router'
// import store from './store'
// import axios from 'axios'
// // Define a new component called button-counter
// Vue.component('Card-List', {
//     component:{
//       vuetify,
//       router,
//       axios,
//     },
//     data: function () {
//       return {
//         count: 0
//       }
//     },
//     template: '
//     <div :class="'px-6'">
//       <v-list>
//         <v-list-item
//           v-for="n in 1"
//           v-bind:key="n">
//           <v-list-item-content>
//             <v-icon>mdi-phone</v-icon>
//           </v-list-item-content>

//           <v-list-item-content>
//             <v-list-item-title>Phones</v-list-item-title>
//           </v-list-item-content>

//           <v-list-item-content>
//             <v-dialog v-model="dialog" max-width="500px">
//               <template v-slot:activator="{ on, attrs }">
//                 <v-btn
//                   color="primary"
//                   dark
//                   class="mb-2"
//                   v-bind="attrs"
//                   v-on="on"
//                 >
//                 Add New Phone
//                 </v-btn>
//               </template>
//               <v-card>
//                 <v-card-text>
//                   <v-container>
//                     <v-row>
//                       <v-col
//                         cols="12"
//                         sm="6"
//                         md="4"
//                       >
//                         <v-select
//                           v-model="editedItem.type"
//                           :items="form.cellPhoneTypes"
//                           label="Phone Type"
//                           menu-props="auto"
//                           single-line
//                         ></v-select>
//                       </v-col>
//                       <v-col
//                         cols="12"
//                         sm="6"
//                         md="4"
//                       >
//                         <v-text-field
//                           v-model="editedItem.number"
//                           label="Phone Number"
//                         ></v-text-field>
//                       </v-col>
//                       <v-col
//                         cols="12"
//                         sm="6"
//                         md="4"
//                       >
//                         <v-checkbox
//                           v-model="editedItem.isPublic"
//                           label="Public Phone?"
//                         ></v-checkbox>
//                       </v-col>
//                     </v-row>
//                   </v-container>
//                 </v-card-text>
//                 <v-card-actions>
//                   <v-spacer></v-spacer>
//                   <v-btn
//                     color="blue darken-1"
//                     text
//                     @click="close"
//                   >
//                     Cancel
//                   </v-btn>
//                   <v-btn
//                     color="blue darken-1"
//                     text
//                     @click="save"
//                   >
//                     Save
//                   </v-btn>
//                 </v-card-actions>
//               </v-card>
//             </v-dialog>
//             <v-dialog v-model="dialogDelete" max-width="500px">
//               <v-card>
//                 <v-card-title class="headline"
//                   >Are you sure you want to delete this
//                   item?</v-card-title
//                 >
//                 <v-card-actions>
//                   <v-spacer></v-spacer>
//                   <v-btn
//                     color="blue darken-1"
//                     text
//                     @click="closeDelete"
//                     >Cancel</v-btn
//                   >
//                   <v-btn
//                     color="blue darken-1"
//                     text
//                     @click="deleteItemConfirm"
//                     >OK</v-btn
//                   >
//                   <v-spacer></v-spacer>
//                 </v-card-actions>
//               </v-card>
//             </v-dialog>
//           </v-list-item-content>
//         </v-list-item>
//         <v-list-item
//           v-for="phone in form.phones"
//           v-bind:key="phone">
//           <v-list-item-content>
//             <template v-if="phone.type == '1'">
//               <v-icon>mdi-toolbox</v-icon>
//             </template>
//             <template v-else-if="phone.type == '2'">
//               <v-icon>mdi-phone</v-icon>
//             </template>
//             <template v-else>
//               <v-icon>mdi-cellphone</v-icon>
//             </template>
//           </v-list-item-content>
//           <v-list-item-content>
//             <v-list-item-title>{{phone.number}}</v-list-item-title>
//           </v-list-item-content>
//           <v-spacer></v-spacer>
//           <v-list-item-content>
//             <template v-if="phone.isPublic == true">
//               <v-checkbox
//                 input-value="true"
//                 value
//                 disabled
//               ></v-checkbox>
//             </template>
//             <template v-else>
//               <v-checkbox
//                 value
//                 disabled
//               ></v-checkbox>
//             </template>
//           </v-list-item-content>

//           <v-list-item-content>
//               <v-btn icon v-on:click="editItem(phone)">
//                 <v-icon dark>
//                   mdi-pencil-outline
//                 </v-icon>
//               </v-btn>

//               <v-btn icon v-on:click="deleteItem(phone)">
//                 <v-icon dark>
//                   mdi-trash-can-outline
//                 </v-icon>
//               </v-btn>
//           </v-list-item-content>

//         </v-list-item>
//       </v-list>
//   </div>
//   '}),