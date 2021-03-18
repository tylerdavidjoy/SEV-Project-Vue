<template>
  <v-app id="inspire">
    <div class="account">
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
                        <v-tabs center-active dark grow>
                          <v-tab>Life Events</v-tab>
                          <v-tab-item>
                            <v-card flat>
                              <v-card-title class="headline">
                                <v-list-item-content>
                                  {{ user.f_name }}'s Life Events
                                </v-list-item-content>
                                <v-list-item-content>
                                  <template v-if="isAdmin">
                                    <v-dialog
                                      v-model="dialogEventType"
                                      max-width="600px"
                                      min-height="600px"
                                    >
                                      <template
                                        v-slot:activator="{ on, attrs }"
                                      >
                                        <v-btn
                                          dark
                                          class="mb-2"
                                          v-bind="attrs"
                                          v-on="on"
                                        >
                                          Open Events
                                        </v-btn>
                                      </template>
                                      <v-card>
                                        <v-card-title>
                                          Event types
                                          <v-list-item-content>
                                            <v-dialog
                                              v-model="dialogAdminEvent"
                                              max-width="550px"
                                              min-height="600px"
                                            >
                                              <template
                                                v-slot:activator="{ on, attrs }"
                                              >
                                                <v-btn
                                                  dark
                                                  class="mb-2"
                                                  v-bind="attrs"
                                                  v-on="on"
                                                >
                                                  Add Event Type
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
                                                        <v-text-field
                                                          v-model="
                                                            editedEvent.type
                                                          "
                                                          :label="'Event Type Name:'"
                                                        ></v-text-field>
                                                      </v-col>
                                                    </v-row>
                                                  </v-container>
                                                </v-card-text>
                                                <v-card-actions>
                                                  <v-spacer></v-spacer>
                                                  <v-btn
                                                    color="blue darken-1"
                                                    text
                                                    @click="closeEvent(2)"
                                                  >
                                                    Cancel
                                                  </v-btn>
                                                  <v-btn
                                                    color="blue darken-1"
                                                    text
                                                    @click="saveEvent(2)"
                                                  >
                                                    Save
                                                  </v-btn>
                                                </v-card-actions>
                                              </v-card>
                                            </v-dialog>

                                            <v-dialog
                                              v-model="dialogDeleteAdminEvent"
                                              max-width="550px"
                                            >
                                              <v-card>
                                                <v-card-title class="headline"
                                                  >Are you sure you want to
                                                  delete this Event
                                                  Type?</v-card-title
                                                >
                                                <v-card-actions>
                                                  <v-spacer></v-spacer>
                                                  <v-btn
                                                    color="blue darken-1"
                                                    text
                                                    @click="closeDeleteEvent(2)"
                                                    >Cancel</v-btn
                                                  >
                                                  <v-btn
                                                    color="blue darken-1"
                                                    text
                                                    v-on:click="deleteEventConfirm(2)"
                                                    >OK</v-btn
                                                  >
                                                  <v-spacer></v-spacer>
                                                </v-card-actions>
                                              </v-card>
                                            </v-dialog>
                                          </v-list-item-content>
                                        </v-card-title>
                                        <v-card-text>
                                          <v-container>
                                            <v-row>
                                              <v-col cols="12" sm="6" md="4">
                                                <v-list>
                                                  <v-list-item
                                                    v-for="EventType in form.LifeEventTypes"
                                                    v-bind:key="EventType"
                                                  >
                                                    <v-list-item-content>
                                                      <div>
                                                        <v-text-field
                                                          :label="EventType.type"
                                                          disabled
                                                        >
                                                        </v-text-field>
                                                      </div>
                                                    </v-list-item-content>
                                                    <v-list-item-content>
                                                      <div>
                                                        <v-btn
                                                          icon
                                                          v-on:click="editEvent(EventType,2)"
                                                        >
                                                          <v-icon dark>
                                                            mdi-pencil-outline
                                                          </v-icon>
                                                        </v-btn>

                                                        <v-btn
                                                          icon
                                                          v-on:click="deleteEvent(EventType,2)"
                                                        >
                                                          <v-icon dark>
                                                            mdi-trash-can-outline
                                                          </v-icon>
                                                        </v-btn>
                                                      </div>
                                                    </v-list-item-content>
                                                  </v-list-item>
                                                </v-list>
                                              </v-col>
                                            </v-row>
                                          </v-container>
                                        </v-card-text>
                                        <v-card-actions>
                                          <v-spacer></v-spacer>
                                          <v-btn
                                            color="blue darken-1"
                                            text
                                            v-on:click="dialogEventType = false"
                                          >
                                            Close
                                          </v-btn>
                                        </v-card-actions>
                                      </v-card>
                                    </v-dialog>
                                  </template>
                                </v-list-item-content>
                                <v-list-item-content>
                                  <v-dialog
                                    v-model="dialogEvents"
                                    max-width="500px"
                                    min-height="600px"
                                  >
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
                                            <v-col cols="12" sm="6" md="4">
                                              <v-select
                                                v-model="editedEvent.type"
                                                :items="form.LifeEventTypes"
                                                item-text="type"
                                                label="Select Event Type"
                                                menu-props="auto"
                                                return-object
                                                single-line
                                              ></v-select>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                              <v-text-field
                                                v-model="
                                                  editedEvent.description
                                                "
                                                label="Event Description"
                                              ></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                              <v-menu
                                                ref="menu"
                                                v-model="menuDate"
                                                :close-on-content-click="true"
                                                transition="scale-transition"
                                                offset-y
                                                min-width="290px"
                                              >
                                                <template
                                                  v-slot:activator="{
                                                    on,
                                                    attrs,
                                                  }"
                                                >
                                                  <v-text-field
                                                    v-model="editedEvent.date"
                                                    :label="
                                                      'Date: ' +
                                                      editedEvent.date
                                                    "
                                                    prepend-icon="mdi-calendar"
                                                    readonly
                                                    v-bind="attrs"
                                                    v-on="on"
                                                  ></v-text-field>
                                                </template>
                                                <v-date-picker
                                                  ref="picker"
                                                  v-model="editedEvent.date"
                                                  :max="
                                                    new Date()
                                                      .toISOString()
                                                      .substr(0, 10)
                                                  "
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

                                  <v-dialog
                                    v-model="dialogDeleteEvents"
                                    max-width="500px"
                                  >
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
                                    v-bind:key="LifeEvent"
                                  >
                                    <v-list-item-content>
                                      <v-list-item-title>{{
                                        LifeEvent.type.type
                                      }}</v-list-item-title>
                                      <v-list-item-subtitle
                                        >Event Description:
                                        {{
                                          LifeEvent.description
                                        }}</v-list-item-subtitle
                                      >
                                      <v-list-item-subtitle
                                        >Event Date:
                                        {{
                                          LifeEvent.date
                                        }}</v-list-item-subtitle
                                      >
                                    </v-list-item-content>
                                    <v-list-item-content>
                                      <v-btn
                                        icon
                                        v-on:click="editEvent(LifeEvent, 0)"
                                      >
                                        <v-icon dark>
                                          mdi-pencil-outline
                                        </v-icon>
                                      </v-btn>

                                      <v-btn
                                        icon
                                        v-on:click="deleteEvent(LifeEvent, 0)"
                                      >
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
                                  <v-dialog
                                    v-model="dialogRelationship"
                                    max-width="600px"
                                    min-height="600px"
                                  >
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
                                            <v-col cols="12" sm="6" md="4">
                                              <v-select
                                                v-model="editedEvent.type"
                                                :items="form.RelationType"
                                                item-text="type"
                                                label="Relationship Type"
                                                menu-props="auto"
                                                return-object
                                                single-line
                                              ></v-select>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                              <v-select
                                                v-model="editedEvent.person"
                                                :items="people"
                                                item-text="f_name"
                                                menu-props="auto"
                                                label="Person"
                                                return-object
                                                single-line
                                              ></v-select>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
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

                                  <v-dialog
                                    v-model="dialogDeleteRelationship"
                                    max-width="500px"
                                  >
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
                                    v-bind:key="Relation"
                                  >
                                    <v-list-item-content>
                                      <v-list-item-title
                                        >Relationship Type:
                                        {{ Relation.type }}</v-list-item-title
                                      >
                                      <!-- <v-list-item-subtitle
                                        >Person ID:
                                        {{ Relation.person.id }}</v-list-item-subtitle
                                      > -->
                                      <v-list-item-subtitle
                                        >Relationship With:
                                        {{ Relation.person.name }}</v-list-item-subtitle
                                      >
                                    </v-list-item-content>
                                    <v-list-item-content>
                                      <v-btn
                                        icon
                                        v-on:click="editEvent(Relation, 1)"
                                      >
                                        <v-icon dark>
                                          mdi-pencil-outline
                                        </v-icon>
                                      </v-btn>

                                      <v-btn
                                        icon
                                        v-on:click="deleteEvent(Relation, 1)"
                                      >
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
                          :disabled="!editflag"
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
                          :disabled="!editflag"
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
                          :label="'E-mail: ' + user.email"
                          disabled
                        ></v-text-field>
                      </div>

                      <v-divider></v-divider>

                      <div :class="'px-6'">
                        <v-text-field
                          :disabled="!editflag"
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
                          :disabled="!editflag"
                          v-model="form.employer"
                          :counter="30"
                          :rules="nameRules"
                          :label="'Employer: ' + user.employer"
                          required
                        ></v-text-field>
                      </div>

                      <v-divider></v-divider>

                      <div :class="'px-0'" class="mx-0">
                        <v-list >
                          <v-list-item v-for="n in 1" v-bind:key="n">
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
                                    :disabled="!editflag"
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
                                        <v-col cols="12" sm="6" md="4">
                                          <v-select
                                            v-model="editedItem.type"
                                            :items="form.cellPhoneTypes"
                                            label="Phone Type"
                                            menu-props="auto"
                                            single-line
                                          ></v-select>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                          <v-text-field
                                            v-model="editedItem.number"
                                            label="Phone Number"
                                          ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
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
                              <v-dialog
                                v-model="dialogDelete"
                                max-width="500px"
                              >
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
                            v-bind:key="phone"
                          >
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
                              <div :class="'mx-0'">
                                <v-list-item-title>{{
                                  phone.number
                                }}</v-list-item-title>
                              </div>
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
                              <v-btn :disabled="!editflag" fab icon tile v-on:click="editItem(phone)">
                                <v-icon dark> mdi-pencil-outline </v-icon>
                              </v-btn>

                              <v-btn
                                :disabled="!editflag"
                                fab
                                icon
                                tile
                                v-on:click="deleteItem(phone)"
                              >
                                <v-icon dark> mdi-trash-can-outline </v-icon>
                              </v-btn>
                            </v-list-item-content>
                          </v-list-item>
                        </v-list>
                        <!-- <CardList phones="form.phones" PhoneTypes="form.cellPhoneTypes"></CardList> -->
                      </div>

                      <v-divider></v-divider>

                      <div :class="'px-6'">
                        <v-combobox
                          :disabled="!editflag"
                          v-model="form.hobbies"
                          label="Hobbies and Interests"
                          dense
                          filled
                          clearable
                          multiple
                          small
                          chips
                        ></v-combobox>
                      </div>

                      <v-divider></v-divider>

                      <div :class="'px-6'">
                        <v-combobox
                          :disabled="!editflag"
                          v-model="form.involment"
                          label="Involvment in the Church"
                          :items="form.InvolmentTypes"
                          item-text="type"
                          dense
                          filled
                          clearable
                          multiple
                          small
                          chips
                        ></v-combobox>
                      </div>

                      <!-- Admin Button for Involment Types -->
                      <div :class="'px-6'">
                        <template v-if="isAdmin">
                          <v-dialog
                            v-model="dialogInvolvmentType"
                            max-width="600px"
                            min-height="600px"
                          >
                            <template
                              v-slot:activator="{ on, attrs }"
                            >
                              <v-btn
                                dark
                                class="mb-2"
                                v-bind="attrs"
                                v-on="on"
                              >
                                Open Involment Types
                              </v-btn>
                            </template>
                            <v-card>
                              <v-card-title>
                                Involment types
                                <v-list-item-content>
                                  <v-dialog
                                    v-model="dialogAdminInvolvment"
                                    max-width="550px"
                                    min-height="600px"
                                  >
                                    <template
                                      v-slot:activator="{ on, attrs }"
                                    >
                                      <v-btn
                                        dark
                                        class="mb-2"
                                        v-bind="attrs"
                                        v-on="on"
                                      >
                                        Add Event Type
                                      </v-btn>
                                    </template>
                                    <v-card>
                                      <v-card-text class="ma-10">
                                        <v-container>
                                          <v-row>
                                            <v-col
                                              cols="12"
                                              sm="6"
                                              md="4"
                                            >
                                              <div :class="'text-justify'" class="ma-16">
                                                <v-text-field
                                                  v-model="
                                                    editedEvent.type
                                                  "
                                                  :label="'Involment Type Name:'"
                                                ></v-text-field>
                                              </div>
                                            </v-col>
                                          </v-row>
                                        </v-container>
                                      </v-card-text>
                                      <v-card-actions>
                                        <div>
                                          <v-btn
                                            color="blue darken-1"
                                            text
                                            @click="closeEvent(3)"
                                          >
                                            Cancel
                                          </v-btn>
                                          <v-btn
                                            color="blue darken-1"
                                            text
                                            @click="saveEvent(3)"
                                          >
                                            Save
                                          </v-btn>
                                        </div>
                                      </v-card-actions>
                                    </v-card>
                                  </v-dialog>

                                  <!-- Delete Section -->
                                  <v-dialog
                                    v-model="dialogDeleteAdminInvolvment"
                                    max-width="550px"
                                  >
                                    <v-card>
                                      <v-card-title class="headline"
                                        >Are you sure you want to
                                        delete this Involment
                                        Type?</v-card-title
                                      >
                                      <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn
                                          color="blue darken-1"
                                          text
                                          @click="closeDeleteEvent(3)"
                                          >Cancel</v-btn
                                        >
                                        <v-btn
                                          color="blue darken-1"
                                          text
                                          v-on:click="deleteEventConfirm(3)"
                                          >OK</v-btn
                                        >
                                        <v-spacer></v-spacer>
                                      </v-card-actions>
                                    </v-card>
                                  </v-dialog>
                                </v-list-item-content>
                              </v-card-title>
                              <v-card-text>
                                <v-container>
                                  <v-row>
                                    <v-col cols="12" sm="6" md="4">
                                      <v-list>
                                        <v-list-item
                                          v-for="InvolvmentType in form.InvolmentTypes"
                                          v-bind:key="InvolvmentType"
                                        >
                                          <v-list-item-content>
                                            <div>
                                              <v-text-field
                                                :label="InvolvmentType.type"
                                                disabled
                                              >
                                              </v-text-field>
                                            </div>
                                          </v-list-item-content>
                                          <v-list-item-content>
                                            <div>
                                              <v-btn
                                                icon
                                                v-on:click="editEvent(InvolvmentType,3)"
                                              >
                                                <v-icon dark>
                                                  mdi-pencil-outline
                                                </v-icon>
                                              </v-btn>

                                              <v-btn
                                                icon
                                                v-on:click="deleteEvent(InvolvmentType,3)"
                                              >
                                                <v-icon dark>
                                                  mdi-trash-can-outline
                                                </v-icon>
                                              </v-btn>
                                            </div>
                                          </v-list-item-content>
                                        </v-list-item>
                                      </v-list>
                                    </v-col>
                                  </v-row>
                                </v-container>
                              </v-card-text>
                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                  color="blue darken-1"
                                  text
                                  v-on:click="dialogInvolvmentType = false"
                                >
                                  Close
                                </v-btn>
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                        </template>
                      </div>

                      <v-divider></v-divider>

                      <div :class="'px-6'">
                        <v-combobox
                          :disabled="!editflag"
                          v-model="form.ministry"
                          label="Ministry Interests"
                          :items="form.MinistryTypes"
                          item-text="type"
                          dense
                          filled
                          clearable
                          multiple
                          small
                          chips
                        ></v-combobox>
                      </div>

                      <div :class="'px-6'">
                        <template v-if="isAdmin">
                          <v-dialog
                            v-model="dialogMinistryType"
                            max-width="600px"
                            min-height="600px"
                          >
                            <template
                              v-slot:activator="{ on, attrs }"
                            >
                              <v-btn
                                dark
                                class="mb-2"
                                v-bind="attrs"
                                v-on="on"
                              >
                                Open Ministry Areas
                              </v-btn>
                            </template>
                            <v-card>
                              <v-card-title>
                                Ministry Areas
                                <v-list-item-content>
                                  <v-dialog
                                    v-model="dialogAdminMinistry"
                                    max-width="550px"
                                    min-height="600px"
                                  >
                                    <template
                                      v-slot:activator="{ on, attrs }"
                                    >
                                      <v-btn
                                        dark
                                        class="mb-2"
                                        v-bind="attrs"
                                        v-on="on"
                                      >
                                        Add Ministry Area
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
                                              <div>
                                                <v-text-field
                                                  v-model="editedEvent.type"
                                                  :label="'Ministry Area Name:'"
                                                ></v-text-field>
                                              </div>
                                            </v-col>
                                          </v-row>
                                        </v-container>
                                      </v-card-text>
                                      <v-card-actions>
                                        <div>
                                          <v-btn
                                            color="blue darken-1"
                                            text
                                            @click="closeEvent(4)"
                                          >
                                            Cancel
                                          </v-btn>
                                          <v-btn
                                            color="blue darken-1"
                                            text
                                            @click="saveEvent(4)"
                                          >
                                            Save
                                          </v-btn>
                                        </div>
                                      </v-card-actions>
                                    </v-card>
                                  </v-dialog>

                                  <!-- Delete Section -->
                                  <v-dialog
                                    v-model="dialogDeleteAdminMinistry"
                                    max-width="550px"
                                  >
                                    <v-card>
                                      <v-card-title class="headline"
                                        >Are you sure you want to
                                        delete this Involment
                                        Type?</v-card-title
                                      >
                                      <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn
                                          color="blue darken-1"
                                          text
                                          @click="closeDeleteEvent(4)"
                                          >Cancel</v-btn
                                        >
                                        <v-btn
                                          color="blue darken-1"
                                          text
                                          v-on:click="deleteEventConfirm(4)"
                                          >OK</v-btn
                                        >
                                        <v-spacer></v-spacer>
                                      </v-card-actions>
                                    </v-card>
                                  </v-dialog>
                                </v-list-item-content>
                              </v-card-title>
                              <v-card-text>
                                <v-container>
                                  <v-row>
                                    <v-col cols="12" sm="6" md="4">
                                      <v-list>
                                        <v-list-item
                                          v-for="MinistryType in form.MinistryTypes"
                                          v-bind:key="MinistryType"
                                        >
                                          <v-list-item-title
                                          v-text="MinistryType.type"
                                          >
                                          </v-list-item-title>
                                          <v-list-item-content>

                                          </v-list-item-content>
                                          <v-list-item-action>
                                            <div>
                                              <v-btn
                                                icon
                                                v-on:click="editEvent(MinistryType,4)"
                                              >
                                                <v-icon dark>
                                                  mdi-pencil-outline
                                                </v-icon>
                                              </v-btn>
                                            </div>

                                            <div>
                                              <v-btn
                                                icon
                                                v-on:click="deleteEvent(MinistryType,4)"
                                              >
                                                <v-icon dark>
                                                  mdi-trash-can-outline
                                                </v-icon>
                                              </v-btn>
                                            </div>
                                          </v-list-item-action>
                                        </v-list-item>
                                      </v-list>
                                    </v-col>
                                  </v-row>
                                </v-container>
                              </v-card-text>
                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                  color="blue darken-1"
                                  text
                                  v-on:click="dialogMinistryType = false"
                                >
                                  Close
                                </v-btn>
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                        </template>
                      </div>

                      <v-divider></v-divider>

                      <div :class="'px-6'">
                        <v-btn
                          color="primary"
                          class="mr-4"
                          v-on:click="editflag = !editflag"
                        >
                          Edit Info
                        </v-btn>

                        <v-btn
                          :disabled="!valid || !editflag"
                          type="submit"
                          color="primary"
                          class="mr-4"
                          @click="submit"
                        >
                          Save
                        </v-btn>

                        <v-btn 
                          :disabled="!editflag"
                          color="secondary" 
                          class="mr-4" 
                          @click="reset">
                          Reset
                        </v-btn>
                      </div>

                      <!-- <div id="phone">
                        <card-list></card-list>
                      </div> -->
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
    //Get User Info from window.person
    this.user.id = window.person.id;
    axios
    .get('http://team2.eaglesoftwareteam.com/person?email='+ window.user.email)
    .then(response => {
      if(response.data[0].f_name)
      {
        //Section for setting Form data from user data
        this.user.f_name = response.data[0].f_name;
        this.user.l_name = response.data[0].l_name;
        this.user.gender = response.data[0].gender;
        this.user.preferred_name = response.data[0].preferred_name;
        this.user.email = response.data[0].email;
        this.user.occupation = response.data[0].occupation;
        this.user.employer = response.data[0].employer;
      }
      })
    .catch(error => {
      console.log("User Fetch Error: " + error);
      this.errored = true;
      })
    .finally(() => {
      //Set the name variable that will load on the Home page to greet the user
      console.log("Finished Loading User for Account Page");
    });
    //axios call to get phones

    axios
      .get("http://team2.eaglesoftwareteam.com/phone_number")
      .then((response) => {
        this.form.phones = response.data;
        console.log("Loading Phones...");
        console.log(JSON.parse(this.form.phones));
      })
      .catch((error) => {
        console.log(error);
      });
      
    //Axios call for all users for Relationships

    //Axios calls for Life Events

    //Axios Call for Getting everyone in the congregation
    axios
      .get("http://team2.eaglesoftwareteam.com/person")
      .then((response) => {
        this.people = response.data;
        console.log("Loading Congregation Members...");
        console.log("Done Loading: " + JSON.parse(this.people));
      })
      .catch((error) => {
        console.log("Congregation Fetch: " + error);
      });

    //Section for setting Form data from user data
    this.form.f_name = this.user.f_name;
    this.form.l_name = this.user.l_name;
    this.form.gender = this.user.gender;
    this.form.preferred_name = this.user.preferred_name;
    this.form.email = this.user.email;
    this.form.data_Immersed = this.user.data_Immersed;
    this.form.birthday = this.user.birthday;
    this.form.occupation = this.user.occupation;
    this.form.employer = this.user.employer;
    this.form.ministry = this.user.ministry;
    this.form.involment = this.user.involment;
    this.form.phones = this.user.phones;
    this.form.workPhone = this.user.workPhone;
    this.form.hobbies = this.user.hobbies;
    this.editedItem = this.defaultItem;
  },

  data: () => ({
    //Dumbee data for the admin
    isAdmin: true,
    //Variables for the Datatable
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
    //Variables for the Life Events and relationships
    menuDate: false,
    //Variables for the Life Events cards
    dialogEvents: false,
    dialogDeleteEvents: false,
    //Variables for the Relationship Cards
    dialogRelationship: false,
    dialogDeleteRelationship: false,
    //Variables for the opening of event types, along with the variables for the Events
    dialogEventType: false,
    dialogAdminEvent: false,
    dialogDeleteAdminEvent: false,

    //Variables for the opening of Involvment types, along with the variables for the Involvments
    dialogInvolvmentType: false,
    dialogAdminInvolvment: false,
    dialogDeleteAdminInvolvment: false,

    //Variables for the opening of Ministry types, along with the variables for the Ministry
    dialogMinistryType: false,
    dialogAdminMinistry: false,
    dialogDeleteAdminMinistry: false,
    EventsIndex: -1,
    //Life Events
    editedEvent: {},
    defaultLifeEvent: {
      id: 0,
      person_id: 0,
      description: "",
      date: "",
      type: "",
    },
    defaultRelationship: {
      id: 0, //id of user
      person: {}, //Id of the person that you have a relationship with
      type: "", //relationship type that you can have with the person
    },
    defaultEvent: { //Used for Event Types, Involvment Types, and Ministery Types
      type: "",
    },
    //Variables for the Date picker for the Life Events
    menu: false,
    menuBirthday: false,
    //Variables for the Form
    form: {
      id: 0,
      f_name: "",
      l_name: "",
      gender:'',
      preferred_name:'',
      email: "",
      immersed: false,
      data_Immersed: "",
      birthday: "",
      occupation: "",
      employer: "",
      cellPhoneTypes: ["Work", "Home", "Mobile"],
      LifeEventTypes: [
        { type: "Marriage" },
        { type: "Baptizemal" },
        { type: "Birthday" },
        { type: "Death" },
        { type: "Divorce" },
        { type: "Birth of family member" },
        { type: "Other" },
      ],
      RelationType: ["Parent", "Spouse", "Sibling", "Child", "Extended-Family"],
      InvolmentTypes: [
        {type:"Adult Education"},
        {type:"College Education"},
        {type:"Youth Group (6th-12th Grade)"},
        {type:"Primary Education (1st-5th Grade)"},
        {type:"Children's Education (Nursery - K)"},
        {type:"Rainbow Village"},
        {type:"Nursery"},
        {type:"Vacation Bible School"},
        {type:"Family Life Groups"},
        {type:"Visitation"},
        {type:"Communion Preparation"},
        {type:"Worship Leadership"},
      ],
      MinistryTypes: [
        {type:"Men's Ministry"},
        {type:"Women's Ministry"},
        {type:"College Ministry"},
        {type:"Youth Ministry"},
        {type:"Personal Evangelism"},
        {type:"World Bible School"},
        {type:"Radio Ministry"},
        {type:"Transportation"},
        {type:"Building and Grounds"},
        {type:"Advertising"},
        {type:"Door Greeters"},
      ],
      ministry: [],
      involment: [],
      phones: [],
      hobbies: [], //Should be comma seperating to keep it all in one field
      LifeEvents: [],
      Relations: [],
    },
    //Variable for making form editable
    editflag:false,
    //User Info Class
    user: {
      id: null,
      congregation_id: null,
      f_name: "",
      l_name: "",
      gender:'',
      preferred_name:'',
      email: "",
      immersed: true,
      data_Immersed: "",
      birthday: "",
      occupation: "",
      employer: "",
      ministry: [],
      involment: [],
      phones: [],
      hobbies: [], //Should be comma seperating to keep it all in one field
      LifeEvents: [],
      Relations: [],
      family_ID: null,
      image:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.wKCOPiWXFnsPQdoYbNlZowHaHi%26pid%3DApi&f=1",
    },
    //Test Data for searching for People
    people: [
      // { id: 0, name: "Sarah Conner" },
      // { id: 1, name: "John Conner" },
      // { id: 2, name: "Kate Brewster" },
      // { id: 3, name: "Terminator" },
      // { id: 4, name: "T-X" },
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
    //For the user/admin to add enw Life Events to
    dialogEvents(val) {
      val || this.closeEvent(0);
    },
    dialogDeleteEvents(val) {
      val || this.closeDeleteEvent(0);
    },
    //For a user/admin to add new relationships to
    dialogRelationship(val) {
      val || this.closeEvent(1);
    },
    dialogDeleteRelationship(val) {
      val || this.closeDeleteEvent(1);
    },
    //For Admins to add new events
    dialogAdminEvent(val) {
      val || this.closeEvent(2);
    },
    dialogDeleteAdminEvent(val) {
      val || this.closeDeleteEvent(2);
    },
    //For Admins to add new Involvment Types
    dialogAdminInvolvment(val) {
      val || this.closeEvent(3);
    },
    dialogDeleteAdminInvolvment(val) {
      val || this.closeDeleteEvent(3);
    },
    //For Admins to add new Ministry Areas
    dialogAdminMinistry(val) {
      val || this.closeEvent(4);
    },
    dialogDeleteAdminMinistry(val) {
      val || this.closeDeleteEvent(4);
    },
  },
  methods: {
    saveDate(Event) {
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
        this.user.gender = this.form.gender;
        this.user.preferred_name = this.form.preferred_name;
        this.user.email = this.form.email;
        this.user.data_Immersed = this.form.data_Immersed;
        this.user.immersed = this.form.immersed;
        this.user.birthday = this.form.birthday;
        this.user.occupation = this.form.occupation;
        this.user.employer = this.form.employer;
        this.user.ministry = this.form.ministry;
        this.user.involment = this.form.involment;
        this.user.phones = this.form.phones;
        this.user.hobbies = this.form.hobbies;
        this.user.LifeEvents = this.form.LifeEvents;
        this.user.Relations = this.form.Relations;
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
    editEvent(Event, type) {
      //Would be life event
      if (type == 0) {
        this.EventsIndex = this.form.LifeEvents.indexOf(Event);
        this.editedEvent = Object.assign({}, Event);
        this.dialogEvents = true;
      } else if (type == 1) {
        //Assume that it is a relationship
        this.EventsIndex = this.form.Relations.indexOf(Event);
        this.editedEvent = Object.assign({}, Event);
        this.dialogRelationship = true;
      } else if(type == 2){ //Event Types
        this.EventsIndex = this.form.LifeEventTypes.indexOf(Event);
        this.editedEvent = Object.assign({}, Event);
        this.dialogAdminEvent = true;
      } else if (type == 3){ //Involvment Types
        this.EventsIndex = this.form.InvolmentTypes.indexOf(Event);
        this.editedEvent = Object.assign({}, Event);
        this.dialogAdminInvolvment = true;
      } else{ //Ministery Areas
        this.EventsIndex = this.form.MinistryTypes.indexOf(Event);
        this.editedEvent = Object.assign({}, Event);
        this.dialogAdminMinistry = true;
      }
    },

    deleteEvent(Event, type) {
      if (type == 0) {
        //Assume that the Event is a Life Event
        this.EventsIndex = this.form.LifeEvents.indexOf(Event);
        this.editedEvent = Object.assign({}, Event);
        this.dialogDeleteEvents = true;
      } else if (type == 1) {
        //Else the Event is a Relationship
        this.EventsIndex = this.form.Relations.indexOf(Event);
        this.editedEvent = Object.assign({}, Event);
        this.dialogDeleteRelationship = true;
      } else if(type == 2) {
        //Else the Event is a EventType
        this.EventsIndex = this.form.LifeEventTypes.indexOf(Event);
        this.editedEvent = Object.assign({}, Event);
        this.dialogDeleteAdminEvent = true;
      } else if(type == 3){
        //Else the Event is a EventType
        this.EventsIndex = this.form.InvolmentTypes.indexOf(Event);
        this.editedEvent = Object.assign({}, Event);
        this.dialogDeleteAdminInvolvment = true;
      } else {
        //Else the Event is a EventType
        this.EventsIndex = this.form.MinistryTypes.indexOf(Event);
        this.editedEvent = Object.assign({}, Event);
        this.dialogDeleteAdminMinistry = true;
        print();
      }
    },

    deleteEventConfirm(type) {
      if (type == 0) {
        this.form.LifeEvents.splice(this.EventsIndex, 1);
      } else if (type == 1) {
        this.form.Relations.splice(this.EventsIndex, 1);
      } else if (type == 2) {
        this.form.LifeEventTypes.splice(this.EventsIndex, 1);
      } else if (type == 3) {
        this.form.InvolmentTypes.splice(this.EventsIndex, 1);
      } else {
        this.form.MinistryTypes.splice(this.EventsIndex, 1);
      }
      this.closeDeleteEvent(type);
    },

    closeEvent(type) {
      if (type == 0) {
        this.dialogEvents = false;
        this.$nextTick(() => {
          this.editedEvent = Object.assign({}, this.defaultLifeEvent);
          this.EventsIndex = -1;
        });
      } else if (type == 1) {
        this.dialogRelationship = false;
        this.$nextTick(() => {
          this.editedEvent = Object.assign({}, this.defaultRelationship);
          this.EventsIndex = -1;
        });
      } else if (type == 2){
        this.dialogAdminEvent = false;
        this.$nextTick(() => {
          this.editedEvent = Object.assign({}, this.defaultEvent);
          this.EventsIndex = -1;
        });
      } else if (type == 3){
        this.dialogAdminInvolvment = false;
        this.$nextTick(() => {
          this.editedEvent = Object.assign({}, this.defaultEvent);
          this.EventsIndex = -1;
        });
      } else {
        this.dialogAdminMinistry = false;
        this.$nextTick(() => {
          this.editedEvent = Object.assign({}, this.defaultEvent);
          this.EventsIndex = -1;
        });
      }
    },

    closeDeleteEvent(type) {
      if (type == 0) {
        this.dialogDeleteEvents = false;
        this.$nextTick(() => {
          this.editedEvent = Object.assign({}, this.defaultLifeEvent);
          this.EventsIndex = -1;
        });
      } else if (type == 1) {
        this.dialogDeleteRelationship = false;
        this.$nextTick(() => {
          this.editedEvent = Object.assign({}, this.defaultRelationship);
          this.EventsIndex = -1;
        });
      } else if (type == 2){
        this.dialogDeleteAdminEvent = false;
        this.$nextTick(() => {
          this.editedEvent = Object.assign({}, this.defaultEvent);
          this.EventsIndex = -1;
        });
      } else if (type == 3){
        this.dialogDeleteAdminInvolvment = false;
        this.$nextTick(() => {
          this.editedEvent = Object.assign({}, this.defaultEvent);
          this.EventsIndex = -1;
        });
      } else {
        this.dialogDeleteAdminMinistry = false;
        this.$nextTick(() => {
          this.editedEvent = Object.assign({}, this.defaultEvent);
          this.EventsIndex = -1;
        });
      }
    },
    saveEvent(type) {
      if (type == 0) {
        if (this.EventsIndex > -1) {
          Object.assign(
            this.form.LifeEvents[this.EventsIndex],
            this.editedEvent
          );
        } else {
          this.form.LifeEvents.push(this.editedEvent);
        }
        this.closeEvent(type);
      } else if (type == 1) {
        if (this.EventsIndex > -1) {
          Object.assign(
            this.form.Relations[this.EventsIndex],
            this.editedEvent
          );
        } else {
          this.form.Relations.push(this.editedEvent);
        }
        this.closeEvent(type);
      } else if(type == 2){
        if (this.EventsIndex > -1) {
          Object.assign(
            this.form.LifeEventTypes[this.EventsIndex],
            this.editedEvent
          );
        } else {
          this.form.LifeEventTypes.push(this.editedEvent);
        }
        this.closeEvent(type);
      } else if (type == 3){
        if (this.EventsIndex > -1) {
          Object.assign(
            this.form.InvolmentTypes[this.EventsIndex],
            this.editedEvent
          );
        } else {
          this.form.InvolmentTypes.push(this.editedEvent);
        }
        this.closeEvent(type);
      } else {
        if (this.EventsIndex > -1) {
          Object.assign(
            this.form.MinistryTypes[this.EventsIndex],
            this.editedEvent
          );
        } else {
          this.form.MinistryTypes.push(this.editedEvent);
        }
        this.closeEvent(type);
      }
    },
    customFilter(item, queryText) {
      const textOne = item.name.toLowerCase();
      const searchText = queryText.toLowerCase();
      if (this.people[textOne.indexOf(searchText)] > -1) {
        const returnValue = this.people[textOne.indexOf(searchText)];
        console.log(returnValue.name + " " + returnValue.id);
        Object.assign(this.editedEvent.person_id, returnValue);
      }
      console.log(
        "After assignment if not Null: " +
          this.editedEvent.person_id.name +
          " " +
          this.editedEvent.person_id.id
      );
    },
    //Function for making axios calls for the phones

    //Function for making axios calls for the Life Events

    //Function for making axios calls for the Relationships
  },
};
</script>