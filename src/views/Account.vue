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
                      <v-sheet height="400" width="500">
                        <div>
                          <v-avatar size="auto" :tile="true" min-height="200" max-height="250" min-width="200" max-width="250">
                            <v-img
                            lazy-src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.jAioCeiE6Cwhq9Ph3dee4gHaHa%26pid%3DApi&f=1" :src="user.image"></v-img>
                          </v-avatar>
                        </div>
                        <v-spacer></v-spacer>
                        <div>
                          <v-file-input color="primary" placeholder="Upload Profile Picture" id="fileupload" accept="image/*" small-chips truncate-length="50"  @change="getFileObject($event)"></v-file-input>
                        </div>
                        <v-btn tile outlined color="primary" width="auto" v-on:click="chooseFiles()">
                          <v-icon left >mdi-pencil</v-icon>Upload Profile Picture
                        </v-btn>
                      </v-sheet>
                </v-col>
                <v-col cols="6">
                    <v-sheet height="1000" width="500">
                      <div width="85%">
                        <v-form
                          ref="form"
                          v-model="valid"
                          lazy-validation
                        >
                          <v-text-field
                            v-model="form.f_name"
                            :counter="15"
                            :rules="nameRules"
                            :label="'First Name: ' + user.f_name"
                            required
                          ></v-text-field>
                      
                          <v-text-field
                            v-model="form.l_name"
                            :counter="15"
                            :rules="nameRules"
                            :label="'Last Name: ' + user.l_name"
                            required
                          ></v-text-field>

                          <v-text-field
                            v-model="form.email"
                            :rules="emailRules"
                            :label="'E-mail: ' + user.email"
                            required
                          ></v-text-field>
                      
                          <!-- <v-select
                            v-model="select"
                            :items="items"
                            :rules="[v => !!v || 'Item is required']"
                            label="Item"
                            required
                          ></v-select> -->
                      
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
                            <template v-slot:activator="{ on, attrs }" :disabled="!immersionFlag">
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
                              @change="save"
                              :disabled="!immersionFlag"
                            ></v-date-picker>
                          </v-menu>

                          
                          <v-btn
                            :disabled="!valid"
                            type="submit"
                            color="primary"
                            class="mr-4"
                            @click="submit"
                          >
                            Save
                          </v-btn>
                      
                          <v-btn
                            color="secondary"
                            class="mr-4"
                            @click="reset"
                          >
                            Reset
                          </v-btn>
                      
                          <!-- <v-btn
                            color="secondary"
                            @click="resetValidation"
                          >
                            Reset Validation
                          </v-btn> -->
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
    mounted(){
      this.form.f_name = this.user.f_name;
      this.form.l_name = this.user.l_name;
      this.form.email = this.user.email;
      this.form.data_Immersed = this.user.data_Immersed;
    },
    data: () => ({ 
      "menu":false,
      "immersionFlag":false,
      form:{
        "f_name":"",
        "l_name":"",
        "email":"",
        "immersed": false,
        "data_Immersed": "",
        "birthday": null,
        "occupation":"Cram Salesman",
        "employer":"John Stamose",
      },
      user:{
        "id":0,
        "congregation_id":0,
        "f_name":"John",
        "l_name":"Smith",
        "email":"Beavis@dam.com",
        "immersed": true,
        "data_Immersed": "",
        "birthday": null,
        "occupation":"Cram Salesman",
        "employer":"John Stamose",
        "family_ID":0,
        "image":"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.b4uniHhcS-RBvCuV7__9XQHaHd%26pid%3DApi&f=1"
      },
      "newFile":{},
      "nameRules": [
      v => !!v || 'Name is required',
      v => (v && v.length <= 15) || 'Name must be less than 10 characters',
      ],
      "emailRules": [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
    }),
    methods: {
      chooseFiles() 
      {
        if(this.newFile != "")
        {
          this.user.image = "./" + this.newFile.name;
        }
        console.log(this.newFile);
      },
      getFileObject(file) {
        const selectedFile = file;
        this.newFile = selectedFile;
        console.log("Selected File: " + this.newFile);
      },
      uploadFile(){
      const formData = new FormData();
      formData.append("file", this.newFile);

      formData.mv(`../public/${this.newFile.name}`);
      },
      submit(){
        if(this.$refs.form.validate())
        {
          this.user.f_name = this.form.f_name;
          this.user.l_name = this.form.l_name;
          this.user.email = this.form.email;
          this.user.data_Immersed = this.form.data_Immersed;
        }
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },

      //Functions for the DatePicker functionality
      save(date) {
      this.form.data_Immersed = date;
      },
    },
  }
</script>
