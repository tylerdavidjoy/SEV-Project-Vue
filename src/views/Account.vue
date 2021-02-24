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
            <v-col cols="auto">
              <v-sheet height="400" width="500">
                <div>
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
                <div>
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
                <v-btn
                  tile
                  outlined
                  color="primary"
                  width="auto"
                  v-on:click="chooseFiles()"
                >
                  <v-icon left>mdi-pencil</v-icon>Upload Profile Picture
                </v-btn>
              </v-sheet>
            </v-col>
            <v-col cols="auto">
              <v-sheet height="1000" width="500">
                <div width="85%">
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <div>
                      <v-text-field
                        v-model="form.f_name"
                        :counter="15"
                        :rules="nameRules"
                        :label="'First Name: ' + user.f_name"
                        required
                      ></v-text-field>
                    </div>

                    <v-divider></v-divider>

                    <div>
                      <v-text-field
                        v-model="form.l_name"
                        :counter="15"
                        :rules="nameRules"
                        :label="'Last Name: ' + user.l_name"
                        required
                      ></v-text-field>
                    </div>

                    <v-divider></v-divider>

                    <div>
                      <v-text-field
                        v-model="form.email"
                        :rules="emailRules"
                        :label="'E-mail: ' + user.email"
                        required
                      ></v-text-field>
                    </div>

                    <div>
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

                    <div>
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

                    <div>
                      <v-text-field
                        v-model="form.occupation"
                        :label="'Occupation: ' + user.occupation"
                        required
                      ></v-text-field>
                    </div>

                    <v-divider></v-divider>

                    <div>
                      <v-text-field
                        v-model="form.employer"
                        :label="'Employer: ' + user.employer"
                        required
                      ></v-text-field>
                    </div>

                    <v-divider></v-divider>

                    <div>
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
                                          attach
                                          label="Phone Type"
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
                            <template v-if="phone.type == 'Work'">
                              <v-icon>mdi-toolbox</v-icon>
                            </template>
                            <template v-else-if="phone.type == 'Home'">
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

                    <div>
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

                    <div>
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
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </div>
  </v-app>
</template>
<script>
export default {
  mounted() {
    this.form.f_name = this.user.f_name;
    this.form.l_name = this.user.l_name;
    this.form.email = this.user.email;
    this.form.data_Immersed = this.user.data_Immersed;
    this.form.birthday = this.user.birthday;
    this.form.occupation = this.user.occupation;
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
    menu: false,
    menuBirthday: false,
    immersionFlag: false,
    form: {
      f_name: "",
      l_name: "",
      email: "",
      immersed: false,
      data_Immersed: "",
      birthday: "",
      occupation: "Cram Salesman",
      employer: "John Stamose",
      cellPhoneTypes: ["Work","Home","Mobile"],
      phones: [],
      hobbies:[], //Should be comma seperating to keep it all in one field
    },
    user: {
      id: 0,
      congregation_id: 0,
      f_name: "John",
      l_name: "Smith",
      email: "Beavis@dam.com",
      immersed: true,
      data_Immersed: "",
      birthday: "",
      occupation: "Cram Salesman",
      employer: "John Stamose",
      phones: [],
      hobbies:['Caddyshack','Ronald McDonald','Owls'], //Should be comma seperating to keep it all in one field
      family_ID: 0,
      image:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.b4uniHhcS-RBvCuV7__9XQHaHd%26pid%3DApi&f=1",
    },
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
  },
  methods: {
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
      console.log(this.editedIndex);
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
  },
};
</script>
