<template>
    <div :class="'px-6'">
      <v-list>
        <v-list-item
          v-for="n in 1"
          v-bind:key="n">
          <v-list-item-content>
            <v-icon>mdi-phone</v-icon>
          </v-list-item-content>

          <v-list-item-content>
            <v-list-item-title>Phones</v-list-item-title>
          </v-list-item-content>

          <v-list-item-content>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                Add New Phone
                </v-btn>
              </template>
              <v-card>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-select
                          v-model="editedItem.type"
                          :items="PhoneTypes"
                          label="Phone Type"
                          menu-props="auto"
                          single-line
                        ></v-select>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-text-field
                          v-model="editedItem.number"
                          label="Phone Number"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                      <v-checkbox
                        v-model="editedItem.can_publish"
                        label="Include in Directory?"
                        hint="This phone will be used public information for things like Events, or Directory listings."
                        ></v-checkbox>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="close"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="save"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="headline"
                  >Are you sure you want to delete this
                  item?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="closeDelete"
                    >Cancel</v-btn
                  >
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="deleteItemConfirm"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-for="phone in phones"
          v-bind:key="phone">
          <v-list-item-content>
            <div>
                <template v-if="phone.type == '1'">
                    <v-icon>mdi-toolbox</v-icon>
                    <div>Work</div>
                </template>
                <template v-else-if="phone.type == '2'">
                    <v-icon>mdi-phone</v-icon>
                    <div>Home</div>
                </template>
                <template v-else>
                    <v-icon>mdi-cellphone</v-icon>
                    <div>Cell</div>
                </template>
            </div>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-title>{{phone.number}}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>
            <div :class="'px-0'">
                <template v-if="phone.can_publish == true">
                    <v-checkbox
                    input-value="true"
                    value
                    disabled
                    label="Include in Directory?"
                    ></v-checkbox>
                </template>
                <template v-else>
                    <v-checkbox
                    value
                    disabled
                    label="Include in Directory?"
                    ></v-checkbox>
                </template>
            </div>
          </v-list-item-content>

          <v-list-item-content>
              <v-btn icon v-on:click="editItem(phone)">
                <v-icon dark>
                  mdi-pencil-outline
                </v-icon>
              </v-btn>

              <v-btn icon v-on:click="deleteItem(phone)">
                <v-icon dark>
                  mdi-trash-can-outline
                </v-icon>
              </v-btn>
          </v-list-item-content>

        </v-list-item>
      </v-list>
    </div>
    <!-- <v-btn>Press Me</v-btn> -->
</template>

<script>
// import { defineComponent } from '@vue/composition-api'
import Vue from 'vue'
import vuetify from '../plugins/vuetify';
import router from '../router'
import axios from 'axios'

// export default defineComponent({
//   setup() {
    
const app = Vue.createApp({})

// Create a Vue application

// Define a new component called button-counter
app.component('card-list',{
  component:{
    vuetify,
      router,
      axios,
    },
    props: {
        phones: Array,
        PhoneTypes: Array,
    },
    data: function () {
      return {
        //Variables for the Dialog boxes
        dialog: false,
        dialogDelete: false,
        editedIndex: -1,
        editedItem: {
        type: "",
        number: "",
        can_publish: false,
        },
        defaultItem: {
          type: "",
        number: "000-000-0000",
        can_publish: false,
        },
      }
    },
    watch: {
        dialog(val) {
          val || this.close();
        },
        dialogDelete(val) {
          val || this.closeDelete();
        },
    },
    methods:{
        //Functions for the Data List of Phones
        editItem(item) {
            this.editedIndex = this.phones.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },

        deleteItem(item) {
            this.editedIndex = this.phones.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialogDelete = true;
        },

        deleteItemConfirm() {
          this.phones.splice(this.editedIndex, 1);
            this.closeDelete();
        },

        close() {
          this.dialog = false;
            this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem);
            this.editedIndex = -1;
            });
        },

        closeDelete() {
            this.dialogDelete = false;
            this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem);
            this.editedIndex = -1;
            });
        },

        save() {
          if (this.editedIndex > -1) {
            Object.assign(this.phones[this.editedIndex], this.editedItem);
            } else {
              this.phones.push(this.editedItem);
            }
            this.close();
        },
    },
})
app.mount({el:'#phone'})
//   },

</script>