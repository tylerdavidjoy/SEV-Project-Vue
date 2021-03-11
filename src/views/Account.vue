<template>
  <v-app id="inspire">
    <div class="account">
      <v-system-bar app>
        <v-spacer></v-spacer>

        <v-icon>mdi-logout</v-icon>
      </v-system-bar>

      <v-main class="grey lighten-2">
        <v-container>
          <v-row>
            <v-col cols="6">
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-sheet height="400" width="500" class="rounded-lg">
                      <div :class="'px-6'">
                        <v-avatar
                          size="auto"
                          :tile="true"
                          min-height="200"
                          max-height="250"
                          min-width="200"
                          max-width="250"
                        >
                          <v-img
                            lazy-src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.jAioCeiE6Cwhq9Ph3dee4gHaHa%26pid%3DApi&f=1"
                            :src="user.image"
                          ></v-img>
                        </v-avatar>
                      </div>
                      <v-spacer></v-spacer>
                      <div :class="'px-6'">
                        <v-file-input
                          color="primary"
                          placeholder="Upload Profile Picture"
                          id="fileupload"
                          accept="image/*"
                          small-chips
                          truncate-length="50"
                          @change="getFileObject($event)"
                        ></v-file-input>
                      </div>
                      <div :class="'px-6'">
                        <v-btn
                          tile
                          outlined
                          color="primary"
                          width="auto"
                          v-on:click="chooseFiles()"
                        >
                          <v-icon left>mdi-pencil</v-icon>Upload Profile Picture
                        </v-btn>
                      </div>
                    </v-sheet>
                  </v-col>
                  <v-col cols="12">
                    <v-sheet width="500" class="rounded-lg">
                      <v-card>
                        <v-tabs
                          center-active
                          dark
                          grow
                        >
                          <v-tab>Life Events</v-tab>
                            <v-tab-item>
                              <v-card flat>
                                <v-card-title class="headline">
                                  {{ user.f_name }}'s Life Events 
                                  <v-spacer></v-spacer>
                                  <v-list-item-content>
                                    <v-dialog v-model="dialogEvents" max-width="500px" min-height="600px">
                                      <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                          dark
                                          class="mb-2"
                                          v-bind="attrs"
                                          v-on="on"
                                        >
                                        Add Event
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
                                                  v-model="editedEvent.type"
                                                  :items="form.LifeEventTypes"
                                                  label="Event Type"
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
                                                  v-model="editedEvent.description"
                                                  label="Event Description"
                                                ></v-text-field>
                                              </v-col>
                                              <v-col
                                                cols="12"
                                                sm="6"
                                                md="4"
                                              >
                                                <v-menu
                                                  ref="menu"
                                                  v-model="menuDate"
                                                  :close-on-content-click="true"
                                                  transition="scale-transition"
                                                  offset-y
                                                  min-width="290px"
                                                >
                                                  <template v-slot:activator="{ on, attrs }">
                                                    <v-text-field
                                                      v-model="editedEvent.date"
                                                      :label="'Date: ' + editedEvent.date"
                                                      prepend-icon="mdi-calendar"
                                                      readonly
                                                      v-bind="attrs"
                                                      v-on="on"
                                                    ></v-text-field>
                                                  </template>
                                                  <v-date-picker
                                                    ref="picker"
                                                    v-model="editedEvent.date"
                                                    :max="new Date().toISOString().substr(0, 10)"
                                                    min="1950-01-01"
                                                    @change="saveDate"
                                                  ></v-date-picker>
                                                </v-menu>
                                              </v-col>
                                            </v-row>
                                          </v-container>
                                        </v-card-text>
                                        <v-card-actions>
                                          <v-spacer></v-spacer>
                                          <v-btn
                                            color="blue darken-1"
                                            text
                                            @click="closeEvent(0)"
                                          >
                                            Cancel
                                          </v-btn>
                                          <v-btn
                                            color="blue darken-1"
                                            text
                                            @click="saveEvent(0)"
                                          >
                                            Save
                                          </v-btn>
                                        </v-card-actions>
                                      </v-card>
                                    </v-dialog>

                                    <v-dialog v-model="dialogDeleteEvents" max-width="500px">
                                      <v-card>
                                        <v-card-title class="headline"
                                          >Are you sure you want to delete this
                                          Event?</v-card-title
                                        >
                                        <v-card-actions>
                                          <v-spacer></v-spacer>
                                          <v-btn
                                            color="blue darken-1"
                                            text
                                            @click="closeDeleteEvent(0)"
                                            >Cancel</v-btn
                                          >
                                          <v-btn
                                            color="blue darken-1"
                                            text
                                            @click="deleteEventConfirm(0)"
                                            >OK</v-btn
                                          >
                                          <v-spacer></v-spacer>
                                        </v-card-actions>
                                      </v-card>
                                    </v-dialog>

                                  </v-list-item-content>
                                </v-card-title>
                                <v-card-text>
                                  <v-list>
                                    <v-list-item
                                      v-for="LifeEvent in form.LifeEvents"
                                      v-bind:key="LifeEvent">
                                      <v-list-item-content>
                                        <v-list-item-title>{{LifeEvent.type}}</v-list-item-title>
                                        <v-list-item-subtitle>Event Description: {{LifeEvent.description}}</v-list-item-subtitle>
                                        <v-list-item-subtitle>Event Date: {{LifeEvent.date}}</v-list-item-subtitle> 
                                      </v-list-item-content>
                                      <v-list-item-content>
                                        <v-btn icon v-on:click="editEvent(LifeEvent,0)">
                                          <v-icon dark>
                                            mdi-pencil-outline
                                          </v-icon>
                                        </v-btn>

                                        <v-btn icon v-on:click="deleteEvent(LifeEvent,0)">
                                          <v-icon dark>
                                            mdi-trash-can-outline
                                          </v-icon>
                                        </v-btn>
                                      </v-list-item-content>                                    
                                    </v-list-item>
                                  </v-list>
                                </v-card-text>
                              </v-card>
                            </v-tab-item>
                          <v-tab>Relationships</v-tab>
                            <v-tab-item>
                              <v-card flat>
                                <v-card-title class="headline">
                                  {{ user.f_name }}'s Relationships 
                                  <v-spacer></v-spacer>
                                  <v-list-item-content>

                                    <v-dialog v-model="dialogRelationship" max-width="600px" min-height="600px">
                                      <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                          dark
                                          class="mb-1"
                                          v-bind="attrs"
                                          v-on="on"
                                        >
                                        Add Relation
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
                                                  v-model="editedEvent.type"
                                                  :items="form.RelationType"
                                                  label="Relationship Type"
                                                  menu-props="auto"
                                                  single-line 
                                                ></v-select>
                                              </v-col>
                                              <v-col
                                                cols="12"
                                                sm="6"
                                                md="4"
                                              >
                                                <v-autocomplete
                                                  v-model="editedEvent.person_id"
                                                  :items="people"
                                                  clearable
                                                  solo
                                                  item-text="name"
                                                  label="Person"
                                                ></v-autocomplete>
                                              </v-col>
                                              <v-col
                                                cols="12"
                                                sm="6"
                                                md="4"
                                              >
                                                
                                              </v-col>
                                            </v-row>
                                          </v-container>
                                        </v-card-text>
                                        <v-card-actions>
                                          <v-spacer></v-spacer>
                                          <v-btn
                                            color="blue darken-1"
                                            text
                                            @click="closeEvent(1)"
                                          >
                                            Cancel
                                          </v-btn>
                                          <v-btn
                                            color="blue darken-1"
                                            text
                                            @click="saveEvent(1)"
                                          >
                                            Save
                                          </v-btn>
                                        </v-card-actions>
                                      </v-card>
                                    </v-dialog>

                                    <v-dialog v-model="dialogDeleteRelationship" max-width="500px">
                                      <v-card>
                                        <v-card-title class="headline"
                                          >Are you sure you want to delete this
                                          Relationship?</v-card-title
                                        >
                                        <v-card-actions>
                                          <v-spacer></v-spacer>
                                          <v-btn
                                            color="blue darken-1"
                                            text
                                            @click="closeDeleteEvent(1)"
                                            >Cancel</v-btn
                                          >
                                          <v-btn
                                            color="blue darken-1"
                                            text
                                            @click="deleteEventConfirm(1)"
                                            >OK</v-btn
                                          >
                                          <v-spacer></v-spacer>
                                        </v-card-actions>
                                      </v-card>
                                    </v-dialog>

                                  </v-list-item-content>
                                </v-card-title>
                                <v-card-text>
                                  <v-list>
                                    <v-list-item
                                      v-for="Relation in form.Relations"
                                      v-bind:key="Relation">
                                      <v-list-item-content>
                                        <v-list-item-title>Relationship: {{Relation.type}}</v-list-item-title>
                                        <v-list-item-subtitle>Person ID: {{Relation.id}}</v-list-item-subtitle>
                                      </v-list-item-content>
                                      <v-list-item-content>
                                        <v-btn icon v-on:click="editEvent(Relation,1)">
                                          <v-icon dark>
                                            mdi-pencil-outline
                                          </v-icon>
                                        </v-btn>

                                        <v-btn icon v-on:click="deleteEvent(Relation,1)">
                                          <v-icon dark>
                                            mdi-trash-can-outline
                                          </v-icon>
                                        </v-btn>
                                      </v-list-item-content>                                    
                                    </v-list-item>
                                  </v-list>
                                </v-card-text>
                              </v-card>
                            </v-tab-item>
                        </v-tabs>
                      </v-card>
                    </v-sheet>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
            <v-col cols="auto">
              <v-container>    
                <v-sheet width="500" class="rounded-lg">
                  <div>
                    <v-form ref="form" v-model="valid" lazy-validation>
                      <div :class="'px-6'" class="pt-6">
                        <v-text-field
                          v-model="form.f_name"
                          :counter="15"
                          :rules="nameRules"
                          :label="'First Name: ' + user.f_name"
                          required
                        ></v-text-field>
                      </div>

                      <v-divider></v-divider>

                      <div :class="'px-6'">
                        <v-text-field
                          v-model="form.l_name"
                          :counter="15"
                          :rules="nameRules"
                          :label="'Last Name: ' + user.l_name"
                          required
                        ></v-text-field>
                      </div>

                      <v-divider></v-divider>

                      <div :class="'px-6'">
                        <v-text-field
                          v-model="form.email"
                          :rules="emailRules"
                          :label="'E-mail: ' + user.email"
                          required
                        ></v-text-field>
                      </div>

                      <v-divider></v-divider>

                      <div :class="'px-6'">
                        <v-checkbox
                          v-model="immersionFlag"
                          label="Are you immersed in the church?"
                        ></v-checkbox>

                        <v-menu
                          ref="menu"
                          v-model="menu"
                          :close-on-content-click="true"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                          :disabled="!immersionFlag"
                        >
                          <template
                            v-slot:activator="{ on, attrs }"
                            :disabled="!immersionFlag"
                          >
                            <v-text-field
                              v-model="form.data_Immersed"
                              :label="'Immersion Date: ' + user.data_Immersed"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                              :disabled="!immersionFlag"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            ref="picker"
                            v-model="form.data_Immersed"
                            :max="new Date().toISOString().substr(0, 10)"
                            min="1950-01-01"
                            @change="saveImmersion"
                            :disabled="!immersionFlag"
                          ></v-date-picker>
                        </v-menu>
                      </div>

                      <v-divider></v-divider>

                      <div :class="'px-6'">
                        <v-menu
                          ref="menu"
                          v-model="menuBirthday"
                          :close-on-content-click="true"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="form.birthday"
                              :label="'Birthday: ' + user.birthday"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            ref="picker"
                            v-model="form.birthday"
                            :max="new Date().toISOString().substr(0, 10)"
                            min="1950-01-01"
                            @change="savebirthday"
                          ></v-date-picker>
                        </v-menu>
                      </div>

                      <v-divider></v-divider>

                      <div :class="'px-6'">
                        <v-text-field
                          v-model="form.occupation"
                          :counter="30"
                          :rules="nameRules"
                          :label="'Occupation: ' + user.occupation"
                          required
                        ></v-text-field>
                      </div>

                      <v-divider></v-divider>

                      <div :class="'px-6'">
                        <v-text-field
                          v-model="form.employer"
                          :counter="30"
                          :rules="nameRules"
                          :label="'Employer: ' + user.employer"
                          required
                        ></v-text-field>
                      </div>

                      <v-divider></v-divider>

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
                                            :items="form.cellPhoneTypes"
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
                                            v-model="editedItem.isPublic"
                                            label="Public Phone?"
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
                            v-for="phone in form.phones"
                            v-bind:key="phone">
                            <v-list-item-content>
                              <template v-if="phone.type == '1'">
                                <v-icon>mdi-toolbox</v-icon>
                              </template>
                              <template v-else-if="phone.type == '2'">
                                <v-icon>mdi-phone</v-icon>
                              </template>
                              <template v-else>
                                <v-icon>mdi-cellphone</v-icon>
                              </template>
                            </v-list-item-content>
                            <v-list-item-content>
                              <v-list-item-title>{{phone.number}}</v-list-item-title>
                            </v-list-item-content>
                            <v-spacer></v-spacer>
                            <v-list-item-content>
                              <template v-if="phone.isPublic == true">
                                <v-checkbox
                                  input-value="true"
                                  value
                                  disabled
                                ></v-checkbox>
                              </template>
                              <template v-else>
                                <v-checkbox
                                  value
                                  disabled
                                ></v-checkbox>
                              </template>
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

                      <v-divider></v-divider>

                      <div :class="'px-6'">
                        <v-combobox
                          v-model="form.hobbies"
                          label="Hobbies and Interests"
                          dense
                          filled
                          clearable
                          multiple
                          small chips
                        ></v-combobox>
                      </div>

                      <v-divider></v-divider>

                      <div :class="'px-6'">
                        <v-btn :disabled="!valid" type="submit" color="primary" class="mr-4" @click="submit">
                          Save
                        </v-btn>

                        <v-btn color="secondary" class="mr-4" @click="reset">
                          Reset
                        </v-btn>
                      </div>

                    </v-form>
                  </div>
                </v-sheet>
              </v-container>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </div>
  </v-app>
</template>
<script>
import axios from "axios";
export default {
  mounted() {
    //Get User Info
    
    //axios call to get phones

    axios.get("http://team2.eaglesoftwareteam.com/phone_number")
    .then(response => {
      this.form.phones = response.data;
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => console.log("Done Loading: " + this.form.phones));

    //Axios call for all users for Relationships

    //Axios calls for Life Events

    
    this.form.f_name = this.user.f_name;
    this.form.l_name = this.user.l_name;
    this.form.email = this.user.email;
    this.form.data_Immersed = this.user.data_Immersed;
    this.form.birthday = this.user.birthday;
    this.form.occupation = this.user.occupation;
    this.form.employer = this.user.employer;
    this.form.phones = this.user.phones;
    this.form.isPublic = this.user.isPublic;
    this.form.workPhone = this.user.workPhone;
    this.form.hobbies = this.user.hobbies;
    this.editedItem = this.defaultItem;
  },
  
  data: () => ({
    //Variables for the Datatable
    dialog: false,
    dialogDelete: false,
    editedIndex: -1,
    editedItem: {
      type: "",
      number: "",
      isPublic: false,
    },
    defaultItem: {
      type: "",
      number: "000-000-0000",
      isPublic: false,
    },
    //Variables for the Life Events and relationships
    menuDate: false,
    //Variables for the Life Events cards
    dialogEvents: false,
    dialogDeleteEvents: false,
    //Variables for the Relationship Cards
    dialogRelationship:false,
    dialogDeleteRelationship:false,
    
    EventsIndex: -1,
    //Life Events
    editedEvent: {
      
    },
    defaultLifeEvent: {
      id: 0,
      person_id: 0,
      description:"",
      date: '',
      type: '',
      
    },
    defaultRelationship: {
      id:0,//id of user
      person_id: null,//Id of the person that you have a relationship with
      type: '', //relationship type that you can have with the person
    },
    menu: false,
    menuBirthday: false,
    immersionFlag: false,
    //Variables for the Form
    form: {
      id: 0,
      f_name: "",
      l_name: "",
      email: "",
      immersed: false,
      data_Immersed: "",
      birthday: "",
      occupation: "",
      employer: "",
      cellPhoneTypes: ["Work","Home","Mobile"],
      LifeEventTypes: ["Marriage","Baptizemal","Birthday","Death","Divorce","Birth of family member","Other"],
      RelationType: ["Parent","Spouse","Sibling","Child","Extended-Family"],
      phones: [],
      hobbies:[], //Should be comma seperating to keep it all in one field
      LifeEvents:[],
      Relations:[],
    },
    //User Info Class
    user: {
      id: 0,
      congregation_id: 0,
      f_name: "John",
      l_name: "Smith",
      email: "John.Smith@AOL.com",
      immersed: true,
      data_Immersed: "",
      birthday: "",
      occupation: "IT Specialist",
      employer: "Ron Pearlman",
      phones: [],
      hobbies:["AutoMechanics","Carpentry","Children's Ministry"], //Should be comma seperating to keep it all in one field
      LifeEvents:[],
      Relations:[],
      family_ID: 0,
      image:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.wKCOPiWXFnsPQdoYbNlZowHaHi%26pid%3DApi&f=1",
    },
    //Test Data for searching for People
    people:[
      { id:0, name:"Sarah Conner"},
      { id:1, name:"John Conner"},
      { id:2, name:"Kate Brewster"},
      { id:3, name:"Terminator"},
      { id:4, name:"T-X"},
    ],
    newFile: {},
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 15) || "Name must be less than 10 characters",
    ],
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
  }),
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    dialogEvents(val) {
      val || this.closeEvent(0);
    },
    dialogDeleteEvents(val) {
      val || this.closeDeleteEvent(0);
    },
    dialogRelationship(val) {
      val || this.closeEvent(1);
    },
    dialogDeleteRelationship(val) {
      val || this.closeDeleteEvent(1);
    },
  },
  methods: {
    saveDate (Event) {
      Event.date = this.editedEvent.date;
    },
    chooseFiles() {
      if (this.newFile != "") {
        this.user.image = "./" + this.newFile.name;
      }
      console.log(this.newFile);
    },
    getFileObject(file) {
      const selectedFile = file;
      this.newFile = selectedFile;
      console.log("Selected File: " + this.newFile);
    },
    uploadFile() {
      const formData = new FormData();
      formData.append("file", this.newFile);

      formData.mv(`../public/${this.newFile.name}`);
    },
    submit() {
      if (this.$refs.form.validate()) {
        this.user.f_name = this.form.f_name;
        this.user.l_name = this.form.l_name;
        this.user.email = this.form.email;
        this.user.data_Immersed = this.form.data_Immersed;
        this.user.immersed = this.form.immersed;
        this.user.birthday = this.form.birthday;
        this.user.occupation = this.form.occupation;
        this.user.employer = this.form.employer;
        this.user.cellPhones = this.form.cellPhones;
        this.user.workPhone = this.form.workPhone;
        this.user.Hobbies_Interests = this.form.Hobbies_Interests;
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },

    //Functions for the DatePicker functionality
    saveImmersion(date) {
      this.form.data_Immersed = date;
    },
    savebirthday(date) {
      this.form.birthday = date;
    },

    //Functions for the Data List of Phones
    editItem(item) {
      this.editedIndex = this.form.phones.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.form.phones.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.form.phones.splice(this.editedIndex, 1);
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
        Object.assign(this.form.phones[this.editedIndex], this.editedItem);
      } else {
        this.form.phones.push(this.editedItem);
      }
      this.close();
    },
    //Functions for Events lists
    editEvent(Event,type) { //Would be life event
      if(type == 0)
      {
        this.EventsIndex = this.form.LifeEvents.indexOf(Event);
        this.editedEvent = Object.assign({}, Event);
        this.dialogEvents = true;
      }
      else{ //Assume that it is a relationship
        this.EventsIndex = this.form.Relations.indexOf(Event);
        this.editedEvent = Object.assign({}, Event);
        this.dialogRelationship = true;
      }
    },

    deleteEvent(Event,type) {
      if(type == 0) //Assume that the Event is a Life Event
      {
        this.editedEvent = this.form.LifeEvents.indexOf(Event);
        this.editedEvent = Object.assign({}, Event);
        this.dialogDeleteEvents = true;
      }
      else{//Else the Event is a Relationship
        this.editedEvent = this.form.Relations.indexOf(Event);
        this.editedEvent = Object.assign({}, Event);
        this.dialogDeleteRelationship = true;
      }
    },

    deleteEventConfirm(type) {
      if(type == 0)
      {
        this.form.LifeEvents.splice(this.EventsIndex, 1);
      }
      else{
        this.form.Relations.splice(this.EventsIndex, 1);
      }
      this.closeDeleteEvent(type);
    },

    closeEvent(type) {
      if(type == 0 )
      {
        this.dialogEvents = false;
        this.$nextTick(() => {
          this.editedEvent = Object.assign({}, this.defaultLifeEvent);
          this.EventsIndex = -1;
        });
      }
      else{
        this.dialogRelationship = false;
        this.$nextTick(() => {
          this.editedEvent = Object.assign({}, this.defaultRelationship);
          this.EventsIndex = -1;
        });
      }
    },

    closeDeleteEvent(type) {
      if(type == 0)
      {
        this.dialogDeleteEvents = false;
        this.$nextTick(() => {
          this.editedEvent = Object.assign({}, this.defaultLifeEvent);
          this.EventsIndex = -1;
        });
      }
      else{
        this.dialogDeleteRelationship = false;
        this.$nextTick(() => {
          this.editedEvent = Object.assign({}, this.defaultRelationship);
          this.EventsIndex = -1;
        });
      }
    },
    saveEvent(type) {
      if(type == 0)
      {
        if (this.EventsIndex > -1) {
          Object.assign(this.form.LifeEvents[this.EventsIndex], this.editedEvent);
        } else {
          this.form.LifeEvents.push(this.editedEvent);
        }
        this.closeEvent(type);
      }
      else{
        if (this.EventsIndex > -1) {
          Object.assign(this.form.Relations[this.EventsIndex], this.editedEvent);
        } else {
          this.form.Relations.push(this.editedEvent);
        }
        this.closeEvent(type);
      }
    },
    customFilter (item, queryText) {
      const textOne = item.name.toLowerCase();
      const searchText = queryText.toLowerCase();
      if(this.people[textOne.indexOf(searchText)] > -1)
      {
        const returnValue = this.people[textOne.indexOf(searchText)];
        console.log(returnValue.name + " " + returnValue.id);
        Object.assign(this.editedEvent.person_id, returnValue);
      }
      console.log("After assignment if not Null: " + this.editedEvent.person_id.name + " " + this.editedEvent.person_id.id);
    },
    //Function for making axios calls for the phones

    //Function for making axios calls for the Life Events

    //Function for making axios calls for the Relationships
  },
};
</script>