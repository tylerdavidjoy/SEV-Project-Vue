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
                        <PhotoUpload v-bind:canEdit="this.isAdmin" v-bind:userId="this.user.id" v-bind:personImgSrc="this.user.image" @onFileChange="user.image=$event"/>

                        <!-- <v-file-input
                          color="primary"
                          placeholder="Upload Profile Picture"
                          id="fileupload"
                          accept="image/*"
                          small-chips
                          truncate-length="50"
                          @change="getFileObject($event)"
                          :disabled="isViewing"
                        ></v-file-input> -->
                      </div>
                      <!-- <div :class="'px-6'">
                        <v-btn
                          tile
                          outlined
                          color="primary"
                          width="auto"
                          v-on:click="chooseFiles()"
                          :disabled="isViewing"
                        >
                          <v-icon left>mdi-pencil</v-icon>Upload Profile Picture
                        </v-btn>
                      </div> -->
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
                                  {{ user.f_name }}'s 
                                  <br/>
                                  Life Events
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
                                              <v-col cols="12">
                                                <v-list>
                                                  <v-list-item
                                                    v-for="EventType in form.LifeEventTypes"
                                                    v-bind:key="EventType.type"
                                                  >
                                                    <v-list-item-content>
                                                      <v-list-item-title v-text="EventType.type"></v-list-item-title>
                                                    </v-list-item-content>
                                                    <v-list-item-action>
                                                      <div>
                                                        <v-btn
                                                          fab
                                                          icon
                                                          v-on:click="editEvent(EventType,2)"
                                                        >
                                                          <v-icon dark>
                                                            mdi-pencil-outline
                                                          </v-icon>
                                                        </v-btn>
                                                      </div>
                                                      <div>
                                                        <v-btn
                                                          fab
                                                          icon
                                                          v-on:click="deleteEvent(EventType,2)"
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
                                        :disabled="isViewing"
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
                                                item-value="ID"
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
                                                    v-model="editedEvent.convertedDate"
                                                    label="Date of the Event"
                                                    prepend-icon="mdi-calendar"
                                                    readonly
                                                    v-bind="attrs"
                                                    v-on="on"
                                                  ></v-text-field>
                                                </template>
                                                <v-date-picker
                                                  :show-current="new Date().toISOString().substr(0,10)"
                                                  :max="new Date().toISOString().substr(0,10)"
                                                  ref="picker"
                                                  :v-model="editedEvent.date"
                                                  v-on:change="saveDate"
                                                ></v-date-picker>
                                              </v-menu>
                                            </v-col>
                                            <template v-if="isAdmin">
                                              <v-col cols="12" sm="6" md="4">
                                                <v-checkbox
                                                  v-model="editedEvent.visible"
                                                  label="Visible to User"
                                                  hint="This is a private Life Event for the Admins to use"
                                                ></v-checkbox>
                                              </v-col>
                                            </template>
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
                                    v-bind:key="LifeEvent.ID"
                                  >
                                    <template v-if="LifeEvent.visible || (!LifeEvent.visible && isAdmin)">
                                      <v-list-item-content>
                                        <v-list-item-title>{{
                                          LifeEvent.type
                                        }}</v-list-item-title>
                                        <v-list-item-subtitle
                                          >Description:
                                          <br/>
                                          {{LifeEvent.description}}
                                          </v-list-item-subtitle
                                        >
                                        <v-list-item-subtitle>Date:{{new Date(LifeEvent.date).toDateString()}}</v-list-item-subtitle>
                                      </v-list-item-content>
                                      <v-list-item-content>
                                        <v-btn
                                          fab
                                          icon
                                          tile
                                          v-on:click="editEvent(LifeEvent, 0)"
                                          :disabled="isViewing"
                                        >
                                          <v-icon dark>
                                            mdi-pencil-outline
                                          </v-icon>
                                        </v-btn>

                                        <v-btn
                                          fab
                                          icon
                                          tile
                                          v-on:click="deleteEvent(LifeEvent, 0)"
                                          :disabled="isViewing"
                                        >
                                          <v-icon dark>
                                            mdi-trash-can-outline
                                          </v-icon>
                                        </v-btn>
                                      </v-list-item-content>
                                    </template>
                                  </v-list-item>
                                </v-list>
                              </v-card-text>
                            </v-card>
                          </v-tab-item>
                          <v-tab>Relationships</v-tab>
                          <v-tab-item>
                            <v-card flat>
                              <v-card-title class="headline">
                                {{ user.f_name }}'s 
                                <br/>
                                Relationships
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
                                        :disabled="isViewing"
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
                                                item-text="FullName"
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
                                    v-bind:key="Relation.person2_ID"
                                  >
                                    <v-list-item-content>
                                      <v-list-item-title
                                        >Relationship:
                                        {{ Relation.type }}</v-list-item-title
                                      >
                                      <v-list-item-subtitle
                                        >{{ Relation.person.FullName }}</v-list-item-subtitle
                                      >
                                    </v-list-item-content>
                                    <v-list-item-content>
                                      <!-- <v-btn
                                        icon
                                        fab
                                        tile
                                        v-on:click="editEvent(Relation, 1)"
                                      >
                                        <v-icon dark>
                                          mdi-pencil-outline
                                        </v-icon>
                                      </v-btn> -->

                                      <v-btn
                                        icon
                                        fab
                                        tile
                                        v-on:click="deleteEvent(Relation, 1)"
                                        :disabled="isViewing"
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
                          v-model="user.f_name"
                          :counter="15"
                          :rules="nameRules"
                          :label="'First Name: '"
                          required
                        ></v-text-field>
                      </div>

                      <v-divider></v-divider>

                      <div :class="'px-6'">
                        <v-text-field
                          :disabled="!editflag"
                          v-model="user.l_name"
                          :counter="15"
                          :rules="nameRules"
                          :label="'Last Name: '"
                          required
                        ></v-text-field>
                      </div>

                      <v-divider></v-divider>

                      <div :class="'px-6'">
                        <v-text-field
                          :disabled="!editflag"
                          v-model="user.preferred_name"
                          :counter="15"
                          :rules="nameRules"
                          :label="'Preferred Name: '"
                          required
                        ></v-text-field>
                      </div>

                      <v-divider></v-divider>

                      <div :class="'px-6'">
                        <v-text-field
                          v-model="user.email"
                          :label="'E-mail: '"
                          disabled
                        ></v-text-field>
                      </div>

                      <v-divider></v-divider>

                      <div :class="'px-6'">
                        <v-text-field
                          :disabled="!editflag"
                          v-model="user.occupation"
                          :label="'Occupation: '"
                          required
                        ></v-text-field>
                      </div>

                      <v-spacer></v-spacer>

                      <div :class="'px-6'">
                        <v-select
                          :disabled="!editflag"
                          v-model="user.gender"
                          :items="form.GenderTypes"
                          label="Gender: "
                          menu-props="auto"
                          return-object
                          single-line
                        ></v-select>
                      </div>

                      <v-divider></v-divider>

                      <div :class="'px-6'">
                        <v-text-field
                          :disabled="!editflag"
                          v-model="user.employer"
                          :label="'Employer: '"
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
                                    <!-- <v-form ref="form" v-model="ValidPhone" lazy-validation> -->
                                      <v-container>
                                        <v-row>
                                          <v-col cols="12" sm="6" md="4">
                                            <v-form ref="form" v-model="ValidPhone" lazy-validation>
                                              <v-select
                                                v-model="editedItem.type"
                                                :items="form.cellPhoneTypes"
                                                label="Phone Type"
                                                menu-props="auto"
                                                single-line
                                                required
                                              ></v-select>
                                            </v-form>
                                          </v-col>
                                          <v-col cols="12" sm="6" md="4">
                                            <v-form ref="form" v-model="ValidPhone" lazy-validation>
                                              <v-text-field
                                                v-model="editedItem.number"
                                                :rules="phoneRules"
                                                label="Phone Number"
                                                required
                                              ></v-text-field>
                                            </v-form>
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
                                    <!-- </v-form> -->
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
                                      :disabled="!ValidPhone"
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
                            v-bind:key="phone.number"
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
                                  <div>Mobile</div>
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
                          :items="form.HobbyTypes"
                          :search-input.sync="search"
                          item-text="type"
                          label="Hobbies and Interests"
                          dense
                          filled
                          multiple
                          small
                          chips
                          return-object
                          v-on:change="ListChanged(0)"
                        ></v-combobox>
                      </div>

                      <v-divider></v-divider>

                      <div :class="'px-6'">
                        <v-select
                          :disabled="!editflag"
                          v-model="form.involvement"
                          label="Involvement in the Church"
                          :items="form.InvolvementTypes"
                          item-text="type"
                          dense
                          filled
                          multiple
                          small
                          chips
                          return-object
                          v-on:change="ListChanged(1)"
                        ></v-select>
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
                                Open Involvement Types
                              </v-btn>
                            </template>
                            <v-card>
                              <v-card-title>
                                Involvement types
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
                                            >
                                              <div :class="'px-16'" class="mr-16">
                                                <v-text-field
                                                  v-model="editedEvent.type"
                                                  :label="'Involvement Type Name:'"
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
                                        delete this Involvement
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
                                    <v-col cols="12">
                                      <v-list>
                                        <v-list-item
                                          v-for="InvolvmentType in form.InvolvementTypes"
                                          v-bind:key="InvolvmentType.type"
                                        >
                                          <v-list-item-content>
                                            <v-list-item-title v-text="InvolvmentType.type">
                                            </v-list-item-title>
                                          </v-list-item-content>
                                          <v-list-item-action>
                                            <div>
                                              <v-btn
                                                icon
                                                v-on:click="editEvent(InvolvmentType,3)"
                                              >
                                                <v-icon dark>
                                                  mdi-pencil-outline
                                                </v-icon>
                                              </v-btn>
                                            </div>
                                            <div>
                                              <v-btn
                                                icon
                                                v-on:click="deleteEvent(InvolvmentType,3)"
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
                        <v-select
                          :disabled="!editflag"
                          v-model="form.ministry"
                          label="Ministry Interests"
                          :items="form.MinistryTypes"
                          item-text="type"
                          dense
                          filled
                          multiple
                          small
                          chips
                          return-object
                          v-on:change="ListChanged(2)"
                        ></v-select>
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
                                            >
                                              <div :class="'px-16'" class="mr-16">
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
                                    <v-col cols="12">
                                      <v-list>
                                        <v-list-item
                                          v-for="MinistryType in form.MinistryTypes"
                                          v-bind:key="MinistryType.type"
                                        >
                                          <v-list-item-content>
                                            <v-list-item-title v-text="MinistryType.type">
                                            </v-list-item-title>
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
                          :disabled="isViewing"
                        >
                          Edit Info
                        </v-btn>

                        <v-btn
                          :disabled="!valid || !editflag"
                          color="primary"
                          class="mr-4"
                          v-on:click="submit"
                        >
                          Save
                        </v-btn>

                        <v-btn 
                          :disabled="!editflag"
                          color="secondary" 
                          class="mr-4" 
                          v-on:click="reset">
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
import PhotoUpload from "../components/PhotoUpload.vue";
var baseURL = 'http://team2.eaglesoftwareteam.com/';
export default {
  components: {
      PhotoUpload
    },
  mounted() {
    console.log("Params: ", this.$route.params);
    //Get User Info from window.person
    if(this.$route.params.personID == undefined)
      this.user.id = window.person.id;
    else
      this.user.id = this.$route.params.personID;//Figure out some way to set this value before loading page
    if(this.user.id != window.person.personID)
      this.isViewing = true;
    //call Axios all for the Valid_Values, the Congregation, the Relationships, Life Events, and the Person for this person
    axios.all([
      axios.get(baseURL + "valid_value"),
      axios.get(baseURL + "person"),
      axios.get(baseURL + "relationship?person1_ID=" + this.user.id),
      axios.get(baseURL + "life_event?person_id=" + this.user.id),
      axios.get(baseURL + 'person?id='+ this.user.id),
      axios.get(baseURL + 'person_involvement?person_id=' + this.user.id),
      axios.get(baseURL + 'person_ministry?person_id=' + this.user.id),
      axios.get(baseURL + 'person_hobby?person_id=' + this.user.id),
      ])
      .then(axios.spread((validV, persons, relations, lifeEvents, user,involvement, ministry, hobby) => {
        //Section for Getting the User info first to use the ID for all calls.

        //Do a For loop to iterate through the list and then create an Object
        console.log("Loading Valid Values...");
        for( var v = 0; v < validV.data.length; v++)
        {
          var temp = { //setup variable for getting the Valid_values from the array
              ID: validV.data[v].ID,
              value_group:validV.data[v].value_group,
              value:validV.data[v].value,
              type: validV.data[v].value,//Set to the value to make the type that value and then switch on a Put
          }
          this.validvalues.push(temp);
          if(temp.value_group == 'relationship')
          {
            this.form.RelationType.push(temp);
            // console.log("Relationship");
          }
          else if(temp.value_group == 'life_event')
          {
            this.form.LifeEventTypes.push(temp);
            // console.log("Life Events");
          }
          else if(temp.value_group == 'involvement')
          {
            this.form.InvolvementTypes.push(temp)
          }
          else if(temp.value_group == 'ministry')
          {
            this.form.MinistryTypes.push(temp)
          }
          else if(temp.value_group == 'hobby')
          {
            this.form.HobbyTypes.push(temp)
          console.log("Valid Values: " + temp.ID + " " + temp.value_group + " " + temp.value);
          }
        }

        //Do a For loop to iterate through the list and then create an Object for all the information of the person with the added variable of the FullName
        console.log("Loading Congregation Members...");
        for( var c = 0; c < persons.data.length; c++)
        {
          var temp2 = {
              ID: persons.data[c].ID,
              FullName: persons.data[c].f_name + " " + persons.data[c].l_name,
          };
          //If the ID is not the User ID
          if(temp2.ID != this.user.id)
          {
            this.people.push(temp2);
            // console.log("Adding Person");
          }
          // console.log("Person: " + this.people[i].ID + " " + this.people[i].FullName);
        }

        console.log("Loading Relationships for the User...");
        //Loop through and make another axios call for each of the person_ids to get that person with their full name
        for( var r = 0; r < relations.data.length; r++)
        {
          var temp3 = {
              "person1_ID":relations.data[r].person1_ID, //The user's ID
              "person2_ID":relations.data[r].person2_ID, //The other person's ID
              "type_id":relations.data[r].type, //The type of relationship from the Valid Values
              "type": "",
              "person":{},
          };
          /*Iterate through the people array to find the person that matches that ID for person2_ID and 
          1. remove them and 2. assign that person as person*/
          for( var j = 0; j < this.people.length;j++)
          {
            if(this.people[j].ID == temp3.person2_ID)//Assuming that the Axios call for Congregation is returning before this is ran
              {
                //Assign Person to the temp variable
                temp3.person = this.people[j];
                //Remove the perosn from the array that a person can use.
                // this.people.splice(j, 1);
              }
          }
          /*Iterate through Relationship Types to assign the Relationship type*/
          for( var k = 0; k < this.form.RelationType.length; k++)
          {
            if(this.form.RelationType[k].ID == temp3.type_id)
              {
                temp3.type = this.form.RelationType[k].type;
                // console.log("Found Match");
              }
          }
          this.form.Relations.push(temp3);
          // console.log("Relationship Data: " + this.form.Relations[i3].type);
        }

        console.log("Loading User's Life Events...");
        for( var l = 0; l < lifeEvents.data.length; l++)
        {
          var event = {
            ID: lifeEvents.data[l].ID,
            person_id: lifeEvents.data[l].person_ID,
            description: lifeEvents.data[l].description,
            date: lifeEvents.data[l].date,
            type_id: lifeEvents.data[l].type, //The ID for the Type of Life Event
            type: "",
            visible: lifeEvents.data[l].visible,
          }
          for( var lk = 0; lk < this.form.LifeEventTypes.length; lk++)
          {
            // console.log(this.form.LifeEventTypes[lk].type);
            if(this.form.LifeEventTypes[lk].ID == event.type_id)
              {
                // console.log(this.form.LifeEventTypes[lk].ID);
                event.type = this.form.LifeEventTypes[lk].type;
              }
          }
          this.form.LifeEvents.push(event);
        }

        console.log("Loading User Info: ");
        //Set user Info for the V-Form
        if(user.data[0].ID)
        {
          //Section for setting Form data from user data
          this.user.congregation_ID = user.data[0].congregation_ID
          this.user.f_name = user.data[0].f_name;
          this.user.l_name = user.data[0].l_name;
          this.user.email = user.data[0].email;
          this.user.gender = user.data[0].gender;
          this.user.preferred_name = user.data[0].preferred_name;
          this.user.occupation = user.data[0].occupation;
          this.user.employer = user.data[0].employer;
          // this.user.role = user.data[0].role
          this.user.family_ID = user.data[0].family_ID;
          this.user.image = baseURL + "images/" + user.data[0].image;
          //iterate through valid_values to get the Role
          this.isAdmin = false;
          for(var i = 0; i < this.validvalues.length; i++)
          {
            if(this.validvalues[i].ID == window.person.role && this.validvalues[i].value == 'admin')
              this.isAdmin = true;
          }
          //Checking for if the viewing user is an admin or if the viewing user is the user of the account
          if(this.isAdmin || this.user.id == window.person.id)
            this.isViewing = false;
        }

        //Clear both of the arrays
        this.involvementlist = [];
        this.form.involvement = [];

        console.log("Loading Involvement List");
        //Iterate through the list and create new objects that have the ID and the valid_Value.type
        for( k = 0; k < involvement.data.length; k++)
        {
          var involve = {
            "person_ID": involvement.data[k].person_ID,
            "involvement_ID": involvement.data[k].involvement_ID,
          }
          for( j = 0; j < this.form.InvolvementTypes.length; j++)
          {
            if(this.form.InvolvementTypes[j].ID == involve.involvement_ID)
            {
              //Add that Involement Type to the this.form.involvement array since it will just be the types
              this.form.involvement.push(this.form.InvolvementTypes[j]);
            }
          }
          // put into prechange list
          this.involvementlist.push(involve);
        }

        //Clear both of the arrays
        this.ministrylist = [];
        this.form.ministry = [];

        console.log("Loading Ministry Areas");
        //Iterate through the list and create new objects that have the ID and the valid_Value.type
        for(k = 0; k < ministry.data.length; k++)
        {
          temp = {
            "person_ID": ministry.data[k].person_ID,
            "ministry_ID": ministry.data[k].ministry_ID,
          }
          for(j = 0; j < this.form.MinistryTypes.length; j++)
          {
            if(this.form.MinistryTypes[j].ID == temp.ministry_ID)
            {
              //Add that Involement Type to the this.form.ministry array since it will just be the types
              this.form.ministry.push(this.form.MinistryTypes[j]);
            }
          }
          // put into prechange list first
          this.ministrylist.push(temp);
        }

        //Clear both of the arrays
        this.hobbylist = [];
        this.form.hobbies = [];

        console.log("Loading Hobbies and Interests");
        //Iterate through the list and create new objects that have the ID and the valid_Value.type
        for(k = 0; k < hobby.data.length; k++)
        {
          temp = {
            "person_ID": hobby.data[k].person_ID,
            "hobby_ID": hobby.data[k].hobby_ID,
          }
          for(j = 0; j < this.form.HobbyTypes.length; j++)
          {
            if(this.form.HobbyTypes[j].ID == temp.hobby_ID)
            {
              //Add that Involement Type to the this.form.involvement array since it will just be the types
              this.form.hobbies.push(this.form.HobbyTypes[j]);
            }
          }
          // put into prechange list first
          this.hobbylist.push(temp);
        }
      }
    )) 
    //axios call to get phones
    this.GetPhones();
    
    //Section for setting Form data from user data
    this.form.hobbies = this.user.hobbies;
    this.form.ministry = this.user.ministry;
    this.form.involvement = this.user.involvement;
    this.form.phones = this.user.phones;
    this.editedItem = this.defaultItem;
  },

  data: () => ({
    //Flag for viewing person
    isViewing:false,
    //Validation for phone
    ValidPhone: false,
    //For v-form
    valid: false,
    //Array for all the Valid_Values
    validvalues:[],
    //Start array for the Involvement list
    involvementlist:[],
    //Start Array for the Ministry Areas
    ministrylist:[],
    //Start Array for the Hobbies/Interests
    hobbylist:[],
    //Variable for the search function
    search: null,
    //Flag data for the admin
    isAdmin: true,
    //Variables for the Datatable
    dialog: false,
    dialogDelete: false,
    editedIndex: -1,
    editedItem: {
      ID:null,
      number: "",
      can_publish: false,
      type: "",
    },
    defaultItem: {
      ID:0,
      number: "0000000000",
      can_publish: false,
      type: "",
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
      date: new Date().toISOString().substr(0,10),
      convertedDate:"",
      type: "",
      visible:true,
    },
    defaultRelationship: {
      person: {}, //Id of the person that you have a relationship with
      type: "", //relationship type that you can have with the person
    },
    defaultEvent: { //Used for Event Types, Involvment Types, and Ministery Types
      type: "",
    },
    //Variables for the Date picker for the Life Events
    menu: false,
    menuBirthday: false,
    currentDate: new Date().toISOString().substr(0,10),
    //Variables for the Form
    form: {
      cellPhoneTypes: ["Work", "Home", "Mobile"],
      LifeEventTypes: [],
      RelationType: [],
      InvolvementTypes: [],
      MinistryTypes: [],
      HobbyTypes: [],
      GenderTypes: ["male","female","other"],
      ministry: [],
      involvement: [],
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
      congregation_ID: null,
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
      involvement: [],
      phones: [],
      hobbies: [], //Should be comma seperating to keep it all in one field
      LifeEvents: [],
      Relations: [],
      role:null,
      family_ID: null,
      image:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.wKCOPiWXFnsPQdoYbNlZowHaHi%26pid%3DApi&f=1",
    },
    //Test Data for searching for People
    people: [],
    newFile: {},
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 15) || "Name must be less than 10 characters",
    ],
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    phoneRules: [
      value => !!value || 'Required.',
      // value => (value || '').length <= 14 || 'Number is too long.',
      value => (value || '').length == 10 || 'Number is not correct length',
      value => {
        const pattern = /(?:\d{1}\s)?\(?(\d{3})\)?-?\s?(\d{3})-?\s?(\d{4})/g
        return pattern.test(value) || 'Invalid Phone Number. 1111111111'
      },
      // value => {
      //   const pattern2 = /([^A-Z]|[^a-z])/g
      //   return pattern2.test(value) || 'Number contains Letters.'

      // },
      
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
    saveDate (date) {
      this.editedEvent.date = date;
      //Convert the date to mm/dd/yyyy for editedEvent and then use that to display the converted date
      if(this.editedEvent.date != null)
      {
        const [year, month, day] = this.editedEvent.date.split('-');
        this.editedEvent.convertedDate = `${month}/${day}/${year}`;
      }
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
      console.log("PreSubmit");
      if (this.$refs.form.validate()) {
        console.log("PostSubmit");
        this.MakePut(null,5);
      }
      alert('Your information has been saved');
    },
    reset() {
      this.$refs.form.reset();
      //Section for setting Form data from user data
      // this.form.f_name = this.user.f_name;
      // this.form.l_name = this.user.l_name;
      // this.form.gender = this.user.gender;
      // this.form.preferred_name = this.user.preferred_name;
      // this.form.email = this.user.email;
      // this.form.occupation = this.user.occupation;
      // this.form.employer = this.user.employer;
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
      if(item.type == 1)
        this.editedItem.type = this.form.cellPhoneTypes[0];
      else if(item.type == 2)
        this.editedItem.type = this.form.cellPhoneTypes[1];
      else if(item.type == 3)
        this.editedItem.type = this.form.cellPhoneTypes[2];
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.form.phones.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.form.phones.splice(this.editedIndex, 1);
      this.MakeDeletes(this.editedItem,-1);
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
        this.MakePut(this.editedItem,-1);
      } else {
        this.form.phones.push(this.editedItem);
        // console.log("Making Post");
        this.MakePost(this.editedItem,-1);
      }
      this.close();
    },
    //Functions for Events lists
    editEvent(Event, type) {
      //Would be life event
      if (type == 0) {
        this.EventsIndex = this.form.LifeEvents.indexOf(Event);
        this.editedEvent = Object.assign({}, Event);
        this.editedEvent.type = this.searchValidValue(this.editedEvent.type);
        var [year, month, day] = this.editedEvent.date.split('-');
        year = this.editedEvent.date.substr(0,4);
        month = this.editedEvent.date.substr(5,2);//Skip the -
        day = this.editedEvent.date.substr(8,2);
        this.editedEvent.convertedDate = `${month}/${day}/${year}`;
        this.dialogEvents = true;
      } else if (type == 1) {
        //Assume that it is a relationship
        this.EventsIndex = this.form.Relations.indexOf(Event);
        this.editedEvent = Object.assign({}, Event);
        this.editedEvent.type = this.searchValidValue(this.editedEvent.type);
        console.log(this.editedEvent.person2_ID);
        this.dialogRelationship = true;
      } else if(type == 2){ //Event Types
        this.EventsIndex = this.form.LifeEventTypes.indexOf(Event);
        this.editedEvent = Object.assign({}, Event);
        this.dialogAdminEvent = true;
      } else if (type == 3){ //Involvment Types
        this.EventsIndex = this.form.InvolvementTypes.indexOf(Event);
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
        this.EventsIndex = this.form.InvolvementTypes.indexOf(Event);
        this.editedEvent = Object.assign({}, Event);
        this.dialogDeleteAdminInvolvment = true;
      } else {
        //Else the Event is a EventType
        this.EventsIndex = this.form.MinistryTypes.indexOf(Event);
        this.editedEvent = Object.assign({}, Event);
        this.dialogDeleteAdminMinistry = true;
      }
    },

    deleteEventConfirm(type) {
      if (type == 0) {
        this.form.LifeEvents.splice(this.EventsIndex, 1);
        this.MakeDeletes(this.editedEvent,type);
      } else if (type == 1) {
        this.form.Relations.splice(this.EventsIndex, 1);
        this.MakeDeletes(this.editedEvent,type);
      } else if (type == 2) {
        this.form.LifeEventTypes.splice(this.EventsIndex, 1);
        this.MakeDeletes(this.editedEvent,type);
      } else if (type == 3) {
        this.form.InvolvementTypes.splice(this.EventsIndex, 1);
        this.MakeDeletes(this.editedEvent,type);
      } else {
        this.form.MinistryTypes.splice(this.EventsIndex, 1);
        this.MakeDeletes(this.editedEvent,type);
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
          Object.assign(this.form.LifeEvents[this.EventsIndex],this.editedEvent);
          this.MakePut(this.editedEvent,type);
        } else {
          this.form.LifeEvents.push(this.editedEvent);
          // console.log("Making Post");
          this.MakePost(this.editedEvent,type);
        }
        this.closeEvent(type);
      } else if (type == 1) {
        if (this.EventsIndex > -1) {
          Object.assign(this.form.Relations[this.EventsIndex],this.editedEvent);
          this.MakePut(this.editedEvent,type);
        } else {
          this.form.Relations.push(this.editedEvent);
          this.MakePost(this.editedEvent,type);
        }
        this.closeEvent(type);
      } else if(type == 2){
        if (this.EventsIndex > -1) {
          Object.assign(
            this.form.LifeEventTypes[this.EventsIndex],
            this.editedEvent
          );
          this.MakePut(this.editedEvent,type);
        } else {
          this.form.LifeEventTypes.push(this.editedEvent);
          console.log("Making a Post");
          this.MakePost(this.editedEvent,type);
        }
        this.closeEvent(type);
      } else if (type == 3){
        if (this.EventsIndex > -1) {
          Object.assign(
            this.form.InvolvementTypes[this.EventsIndex],
            this.editedEvent
          );
          this.MakePut(this.editedEvent,type);
        } else {
          this.form.InvolvementTypes.push(this.editedEvent);
          this.MakePost(this.editedEvent,type);
        }
        this.closeEvent(type);
      } else {
        if (this.EventsIndex > -1) {
          Object.assign(
            this.form.MinistryTypes[this.EventsIndex],
            this.editedEvent
          );
          this.MakePut(this.editedEvent,type);
        } else {
          this.form.MinistryTypes.push(this.editedEvent);
          this.MakePost(this.editedEvent,type);
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
    //Function for finding the Valid Value for an edit to a Life Event or Relationship
    searchValidValue(value)
    {
      var found = null;
      //Should always find the valid value for ID given
      for(var i = 0; i < this.validvalues.length; i++)
      {
        if(this.validvalues[i].value == value)
          found = this.validvalues[i];
      }
      return found;
    },
    //Function for removing all from backend and posting all in list to backend
    //Function will also be called every time the list is changed
    ListChanged(type)
    {
      var deletes = null;
      var adds = null;
      var flag = false;
      var k;
      var i;
      var j;
      var temp;
      var Data;
      if(type == 0) { //Hobbies and Interests List
        //determine if we need to delete or if we need to add to the current list
        if(this.hobbylist.length > this.form.hobbies.length)
        {
          if(this.form.hobbies.length == 0 )
          {

            deletes = this.hobbylist[0]; //Set if the base array is zero
          }
          else
          {
            flag = false;
            for(i = 0; i < this.hobbylist.length && !flag; i++)
            {
              if(this.form.hobbies[i] == undefined)
                {
                  deletes = this.hobbylist[i];
                }
              else if(this.hobbylist[i].hobby_ID != this.form.hobbies[i].ID)//If the arrays do not match up at a certain point, then that element should be the removed on
                {
                  deletes = this.hobbylist[i];
                  flag = true;
                } 
            }
          }
          //Clear both of the arrays
          this.hobbylist = [];
          this.form.hobbies = [];
          console.log("Deletes: ");
          axios.delete(baseURL + 'person_hobby?person_id=' + this.user.id + '&hobby_id=' + deletes.hobby_ID)
          .finally(() => {
            console.log("Deletes status: ");
            axios.get(baseURL + 'person_hobby?person_id=' + this.user.id)
            .then(get =>{
              console.log("Getting current List");
              //Iterate through the list and create new objects that have the ID and the valid_Value.type
              for(k = 0; k < get.data.length; k++)
              {
                temp = {
                  "person_ID": get.data[k].person_ID,
                  "hobby_ID": get.data[k].hobby_ID,
                }
                for(j = 0; j < this.form.HobbyTypes.length; j++)
                {
                  if(this.form.HobbyTypes[j].ID == temp.hobby_ID)
                  {
                    console.log("Hobby Type: " + this.form.HobbyTypes[j].ID + " " + this.form.HobbyTypes[j].value);
                    //Add that Hobby Type to the this.form.involvement array since it will just be the types
                    this.form.hobbies.push(this.form.HobbyTypes[j]);
                  }
                }
                // put into prechange list first
                this.hobbylist.push(temp);
              }
            })
          })
          this.form.hobbies = this.hobbylist;
        }
        else { //The array is bigger than the prechange list
          //If the user adds one from the autocomplete feature
          if(this.search != null)
          {
            // console.log(this.search);
            Data = {
              ID: -1,
              value_group:null,
              value: this.search,
              type: this.search,
            }
            this.form.hobbies[this.form.hobbies.length-1] = Data;
            this.search = null;
            // console.log(this.form.hobbies.length);
          }
          //If the user adds one from the checkbox feature
          else
          {
            if(this.hobbylist.length == 0 )
            {
              adds = this.form.hobbies[0]; //Set if the base array is zero
            }
            else{
              flag = false;
              for(j = 0; j < this.form.hobbies.length && !flag; j++)//Will be the bigger list to check from
              {
                if(this.hobbylist[j] == undefined)
                  {
                    adds = this.form.hobbies[j];
                  }
                else if( this.form.hobbies[j].ID != this.hobbylist[j].hobby_ID)//If the arrays do not match up at a certain point, then that element should be the added
                  {
                    adds = this.form.hobbies[j];//Will do opposite of Delete side
                    flag = true;
                  }
              }
            }
            Data = {
              ID: adds.ID,
              value_group:adds.value_group,
              value: adds.value,
              type: adds.type,
            }
          }
          //Iterate through and find the Hobbytype for it else post a new type
          flag = false;
          for(j = 0; j < this.form.HobbyTypes.length; j++)
          {
            if(this.form.HobbyTypes[j].value == Data.value)
            {
              //Add that Involement Type to the this.form.involvement array since it will just be the types
              flag = true;
            }
          }
          if(!flag)//Will be true if the Type is never found, which will mean that we do a Post for a new type
          {
            Data = {
                "person_ID": this.user.id,
                "hobby": Data.value,
            }
            //Make Axios call
            //Post if the Hobby is not already a type
            axios.post(baseURL + 'person_hobby?isNewHobby=1',Data)
            .catch(error =>{this.CatchError(error);})
            .finally(() =>{
              console.log("Posting New status: ");
              //Get the Valid Values for the hobby group
              axios.all([
                axios.get(baseURL + 'valid_value?value_group=hobby'),
                axios.get(baseURL + 'person_hobby?person_id=' + this.user.id),
              ])
              .then(axios.spread((response, get)=>{
                //Clear the HobbyTypes array to get the new types
                this.form.HobbyTypes = [];
                console.log("Getting Valid Values for hobby: " + response.status);
                for(var r = 0; r < response.data.length; r++)
                {
                  temp = { //setup variable for getting the Valid_values from the array
                      ID: response.data[r].ID,
                      value_group:response.data[r].value_group,
                      value:response.data[r].value,
                      type: response.data[r].value,//Set to the value to make the type that value and then switch on a Put
                  }
                  this.form.HobbyTypes.push(temp);
                  console.log(`Hobby Types: ${temp.ID} ${temp.value_group} ${temp.value}`);
                }
                //Clear both of the arrays
                this.hobbylist = [];
                this.form.hobbies = [];

                console.log("Getting Hobbies List: " + get.status);
                //Iterate through the list and create new objects that have the ID and the valid_Value.type
                for(k = 0; k < get.data.length; k++)
                {
                  temp = {
                    "person_ID": get.data[k].person_ID,
                    "hobby_ID": get.data[k].hobby_ID,
                  }
                  for(j = 0; j < this.form.HobbyTypes.length; j++)
                  {
                    if(this.form.HobbyTypes[j].ID == temp.hobby_ID)
                    {
                      console.log(`Hobby Type Comparison: ${this.form.HobbyTypes[j].ID} ${this.form.HobbyTypes[j].value} : ${temp.hobby_ID}`)
                      //Add that Involement Type to the this.form.involvement array since it will just be the types
                      this.form.hobbies.push(this.form.HobbyTypes[j]);
                    }
                  }
                  // put into prechange list first
                  this.hobbylist.push(temp);
                }
              }))
              .catch(error=>{this.CatchError(error);})
            })

          }
          else
          {     
            Data = {
                "person_ID": this.user.id,
                "hobby_ID": adds.ID,
            }
            //Post if the Hobby is already a type
            axios.post(baseURL + 'person_hobby?isNewHobby=0',Data)
            .catch(error =>{this.CatchError(error);})
            .finally(() =>{
              console.log("Posting Existing Hobby");
              axios.get(baseURL + 'person_hobby?person_id=' + this.user.id)
              .then(get => {
                //Clear both of the arrays
                this.hobbylist = [];
                this.form.hobbies = [];

                console.log("Getting current List");
                //Iterate through the list and create new objects that have the ID and the valid_Value.type
                for(k = 0; k < get.data.length; k++)
                {
                  console.log("Data: " + get.data[k].hobby_ID);
                  var rtrn = {
                    "person_ID": get.data[k].person_ID,
                    "hobby_ID": get.data[k].hobby_ID,
                  }
                  for(j = 0; j < this.form.HobbyTypes.length; j++)
                  {
                    if(this.form.HobbyTypes[j].ID == rtrn.hobby_ID)
                    {
                      // console.log(`Hobby Types: ${rtrn.hobby_ID}:  ${this.form.HobbyTypes[j].ID} ${this.form.HobbyTypes[j].value}`);
                      //Add that Involement Type to the this.form.involvement array since it will just be the types
                      this.form.hobbies.push(this.form.HobbyTypes[j]);
                    }
                  }
                  // put into prechange list first
                  this.hobbylist.push(rtrn);
                }
              })
              .catch(error =>{this.CatchError(error);})
            });
          }

        }
      } else if(type == 1) { //Involvement List
        //determine if we need to delete or if we need to add to the current list
        if(this.involvementlist.length > this.form.involvement.length)
        {
          if(this.form.involvement.length == 0 )
          {
            deletes = this.involvementlist[0]; //Set if the base array is zero
          }
          else
          {
            flag = false;
            for(i = 0; i < this.involvementlist.length && !flag; i++)
            {
              if(this.form.involvement[i] == undefined)
                {
                  deletes = this.involvementlist[i];
                }
              else if(this.involvementlist[i].involvement_ID != this.form.involvement[i].ID)//If the arrays do not match up at a certain point, then that element should be the removed on
                {
                  deletes = this.involvementlist[i];
                  console.log(this.involvementlist[i].involvement_ID);
                  flag = true;
                } 
            }
            console.log(deletes.involvement_ID);
          }
          console.log("Deletes: ");
          axios.delete(baseURL + 'person_involvement?person_id=' + this.user.id + '&involvement_id=' + deletes.involvement_ID)
          .finally(() => {
              console.log("Deletes status: ");
              axios.get(baseURL + 'person_involvement?person_id=' + this.user.id)
              .then(get =>{
                //Clear both of the arrays
                this.involvementlist = [];
                this.form.involvement = [];

                console.log("Getting current List");
                //Iterate through the list and create new objects that have the ID and the valid_Value.type
                for(k = 0; k < get.data.length; k++)
                {
                  temp = {
                    "person_ID": get.data[k].person_ID,
                    "involvement_ID": get.data[k].involvement_ID,
                  }
                  for(j = 0; j < this.form.InvolvementTypes.length; j++)
                  {
                    if(this.form.InvolvementTypes[j].ID == temp.involvement_ID)
                    {
                      //Add that Involement Type to the this.form.involvement array since it will just be the types
                      this.form.involvement.push(this.form.InvolvementTypes[j]);
                    }
                  }
                  // put into prechange list first
                  this.involvementlist.push(temp);
                }
              })
            })
          this.form.involvement = this.involvementlist;
        }
        else { //The array is bigger than the prechange list
          if(this.involvementlist.length == 0 )
          {
            adds = this.form.involvement[0]; //Set if the base array is zero
          }
          else{
            flag = false;
            for(j = 0; j < this.form.involvement.length && !flag; j++)//Will be the bigger list to check from
            {
              if(this.involvementlist[j] == undefined)
                {
                  adds = this.form.involvement[j];
                }
              else if( this.form.involvement[j].ID != this.involvementlist[j].involvement_ID)//If the arrays do not match up at a certain point, then that element should be the added
                {
                  adds = this.form.involvement[j];//Will do opposite of Delete side
                  flag = true;
                }
            }
          }
          //create the Data var to send to the backend
          Data = {
              "person_ID": this.user.id,
              "involvement_ID": adds.ID,
          }
          //perform an axios all to resolve the post, and the Get for all of the Involvement stuff
          axios.post(baseURL + 'person_involvement',Data)
          .finally(() =>{
            console.log("Posting status: ");
            axios.get(baseURL + 'person_involvement?person_id=' + this.user.id)
            .then(get => {
              //Clear both of the arrays
              this.involvementlist = [];
              this.form.involvement = [];

              console.log("Getting current List");
              //Iterate through the list and create new objects that have the ID and the valid_Value.type
              for(k = 0; k < get.data.length; k++)
              {
                temp = {
                  "person_ID": get.data[k].person_ID,
                  "involvement_ID": get.data[k].involvement_ID,
                }
                for(j = 0; j < this.form.InvolvementTypes.length; j++)
                {
                  if(this.form.InvolvementTypes[j].ID == temp.involvement_ID)
                  {
                    //Add that Involement Type to the this.form.involvement array since it will just be the types
                    this.form.involvement.push(this.form.InvolvementTypes[j]);
                  }
                }
                // put into prechange list first
                this.involvementlist.push(temp);
              }
            })
          });

        }
      } else if(type == 2) { //Ministry Area
        //determine if we need to delete or if we need to add to the current list
        if(this.ministrylist.length > this.form.ministry.length)
        {
          deletes = null;
          if(this.form.ministry.length == 0 )
          {
            deletes = this.ministrylist[0]; //Set if the base array is zero
          }
          else
          {
            flag = false;
            for(i = 0; i < this.ministrylist.length && !flag; i++)
            {
              if(this.form.ministry[i] == undefined)
                {
                  deletes = this.ministrylist[i];
                }
              else if(this.ministrylist[i].ministry_ID != this.form.ministry[i].ID)//If the arrays do not match up at a certain point, then that element should be the removed on
                {
                  deletes = this.ministrylist[i];
                  console.log(this.ministrylist[i].ministry_ID);
                  flag = true;
                } 
            }
            console.log(deletes.ministry_ID);
          }
          console.log("Deletes: ");
          axios.delete(baseURL + 'person_ministry?person_id=' + this.user.id + '&ministry_id=' + deletes.ministry_ID)
          .finally(() => {
              console.log("Deletes status: ");
              axios.get(baseURL + 'person_ministry?person_id=' + this.user.id)
              .then(get =>{
                //Clear both of the arrays
                this.ministrylist = [];
                this.form.ministry = [];

                console.log("Getting current List");
                //Iterate through the list and create new objects that have the ID and the valid_Value.type
                for(k = 0; k < get.data.length; k++)
                {
                  temp = {
                    "person_ID": get.data[k].person_ID,
                    "ministry_ID": get.data[k].ministry_ID,
                  }
                  for(j = 0; j < this.form.InvolvementTypes.length; j++)
                  {
                    if(this.form.MinistryTypes[j].ID == temp.ministry_ID)
                    {
                      //Add that Involement Type to the this.form.ministry array since it will just be the types
                      this.form.ministry.push(this.form.MinistryTypes[j]);
                    }
                  }
                  // put into prechange list first
                  this.ministrylist.push(temp);
                }
              })
            })
          this.form.ministry = this.ministrylist;
        }
        else { //The array is bigger than the prechange list
          adds = null;
          if(this.ministrylist.length == 0 )
          {
            adds = this.form.ministry[0]; //Set if the base array is zero
          }
          else{
            flag = false;
            for(j = 0; j < this.form.ministry.length && !flag; j++)//Will be the bigger list to check from
            {
              if(this.ministrylist[j] == undefined)
                {
                  adds = this.form.ministry[j];
                }
              else if( this.form.ministry[j].ID != this.ministrylist[j].ministry_ID)//If the arrays do not match up at a certain point, then that element should be the added
                {
                  adds = this.form.ministry[j];//Will do opposite of Delete side
                  flag = true;
                }
            }
          }
          //create the Data var to send to the backend
          Data = {
              "person_ID": this.user.id,
              "ministry_ID": adds.ID,
          }
          //perform an axios all to resolve the post, and the Get for all of the Involvement stuff
          axios.post(baseURL + 'person_ministry',Data)
          .finally(() =>{
            console.log("Posting status: ");
            axios.get(baseURL + 'person_ministry?person_id=' + this.user.id)
            .then(get => {
              //Clear both of the arrays
              this.ministrylist = [];
              this.form.ministry = [];

              console.log("Getting Ministry Areas");
              //Iterate through the list and create new objects that have the ID and the valid_Value.type
              for(k = 0; k < get.data.length; k++)
              {
                temp = {
                  "person_ID": get.data[k].person_ID,
                  "ministry_ID": get.data[k].ministry_ID,
                }
                for(j = 0; j < this.form.MinistryTypes.length; j++)
                {
                  if(this.form.MinistryTypes[j].ID == temp.ministry_ID)
                  {
                    //Add that Ministry Area  to the this.form.ministry array since it will just be the types
                    this.form.ministry.push(this.form.MinistryTypes[j]);
                  }
                }
                // put into prechange list first
                this.ministrylist.push(temp);
              }
            })
          });
        }
      }
    },
    //Get Functions
    async GetValidValues()
    {
      //Axios call for getting the Valid_Values
      axios
        .get(baseURL + "valid_value")
        .then((response) => {
          //Clear lists to add the new valid values
          this.validvalues = [];
          this.form.RelationType = [];
          this.form.LifeEventTypes = [];
          this.form.InvolvementTypes =[];
          this.form.MinistryTypes = [];
          //Do a For loop to iterate through the list and then create an Object
          console.log("Loading Valid Values...");
          for( var i = 0; i < response.data.length; i++)
          {
            var temp = { //setup variable for getting the Valid_values from the array
                ID: response.data[i].ID,
                value_group:response.data[i].value_group,
                value:response.data[i].value,
                type: response.data[i].value,//Set to the value to make the type that value and then switch on a Put
            }
            this.validvalues.push(temp);
            if(temp.value_group == 'relationship')
            {
              this.form.RelationType.push(temp);
              // console.log("Relationship");
            }
            else if(temp.value_group == 'life_event')
            {
              this.form.LifeEventTypes.push(temp);
              // console.log("Life Events");
            }
            else if(temp.value_group == 'involvement')
            {
              this.form.InvolvementTypes.push(temp)
            }
            else if(temp.value_group == 'ministry')
            {
              this.form.MinistryTypes.push(temp)
            }
            // console.log(`Valid Value: ${temp.ID} ${temp.value_group} ${temp.value}`);
          }
        })
        .catch((error) => {this.CatchError(error);})
      
    },
    async GetRelations()
    {
      //Axios call for all users for Relationships
      axios
      .get(baseURL + "relationship?person1_ID=" + this.user.id)
      .then((response) => {
        this.form.Relations = [];//Null out array
        //Loop through and make another axios call for each of the person_ids to get that person with their full name
        for( var i = 0; i < response.data.length; i++)
        {
          var temp = {
              "person1_ID":response.data[i].person1_ID, //The user's ID
              "person2_ID":response.data[i].person2_ID, //The other person's ID
              "type_id":response.data[i].type, //The type of relationship from the Valid Values
              "type": "",
              "person":{},
          };
          /*Iterate through the people array to find the person that matches that ID for person2_ID and 
          1. remove them and 2. assign that person as person*/
          if(this.form.RelationType == null)
          {
            console.log("Array is empty");
          }
          for( var j = 0; j < this.people.length;j++)
          {
            if(this.people[j].ID == temp.person2_ID)//Assuming that the Axios call for Congregation is returning before this is ran
              {
                //Assign Person to the temp variable
                temp.person = this.people[j];
                //Remove the perosn from the array that a person can use.
                // this.people.splice(j, 1);
              }
          }
          /*Iterate through Relationship Types to assign the Relationship type*/
          for( var k = 0; k < this.form.RelationType.length; k++)
          {
            if(this.form.RelationType[k].ID == temp.type_id)
              {
                temp.type = this.form.RelationType[k].type;
                // console.log("Found Match");
              }
          }
          this.form.Relations.push(temp);
        }
        console.log("Loading Relationships for the User...");
      })
      .catch((error) => {this.CatchError(error);});
    },
    async GetLifeEvents()
    {
      axios.get(baseURL + "life_event?person_id=" + this.user.id)
      .then(lifeEvents =>{
        console.log("Loading User's Life Events...");
        this.form.LifeEvents = [];//Clear the old array since we are loading in a new one
        for( var l = 0; l < lifeEvents.data.length; l++)
        {
          var event = {
            ID: lifeEvents.data[l].ID,
            person_id: lifeEvents.data[l].person_ID,
            description: lifeEvents.data[l].description,
            date: lifeEvents.data[l].date,
            type_id: lifeEvents.data[l].type, //The ID for the Type of Life Event
            type: "",
            visible: lifeEvents.data[l].visible,
          }
          for( var lk = 0; lk < this.form.LifeEventTypes.length; lk++)
          {
            // console.log(this.form.LifeEventTypes[lk].type);
            if(this.form.LifeEventTypes[lk].ID == event.type_id)
              {
                // console.log(this.form.LifeEventTypes[lk].ID);
                event.type = this.form.LifeEventTypes[lk].type;
              }
          }
          this.form.LifeEvents.push(event);
        }
      })
    },
    async GetCongregation()
    {
      //Axios call for all users for Relationships
      axios
        .get(baseURL + "person")
        .then((response) => {
          console.log("Loading Congregation Members...");
          //Do a For loop to iterate through the list and then create an Object for all the information of the person with the added variable of the FullName
          for( var i = 0; i < response.data.length; i++)
          {
            var temp = {
                ID: response.data[i].ID,
                FullName: response.data[i].f_name + " " + response.data[i].l_name,
            };
            //If the ID is not the User ID
            if(temp.ID != this.user.id)
              {
                this.people.push(temp);
                console.log("Adding Person");
              }
            // console.log("Person: " + this.people[i].ID + " " + this.people[i].FullName);
          }
        })
        .catch((error) => {this.CatchError(error);})
    
    },
    async GetPhones()
    {
      //axios call to get phones
      console.log("Loading Phones...");
      axios
        .get(baseURL + "phone_number?person_ID=" + this.user.id)
        .then((response) => {
          this.form.phones = response.data;
        })
        .catch((error) => {
          this.CatchError(error);
          this.form.phones = [];
        });  
    },
    async GetUser()
    {
      axios.get(baseURL + 'person?email='+ this.user.email)
      .then(user => {
        console.log("Loading User Info: ");
        //Set user Info for the V-Form
        if(user.data[0].f_name)
        {
          //Section for setting Form data from user data
          this.user.congregation_ID = user.data[0].congregation_ID
          this.user.f_name = user.data[0].f_name;
          this.user.l_name = user.data[0].l_name;
          this.user.gender = user.data[0].gender;
          this.user.preferred_name = user.data[0].preferred_name;
          this.user.occupation = user.data[0].occupation;
          this.user.employer = user.data[0].employer;
          this.user.role = user.data[0].role;
          this.user.family_ID = user.data[0].family_ID;
          
        }
      })
      .catch(error =>{this.CatchError(error);})
    },
    //Function for Error Logging on the front-end
    CatchError(error)
    {
      console.log("Fetch Error: ");
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
    },
    //Function for Posts
    MakePost(object, type)
    {
      var Data;
      if( type == -1 )//New Phone
      {
        //Create Object to send from Given Data
        Data = {
          "number": object.number,
          "can_publish": object.can_publish,
          "type": null,
        };
        //If statement for the Valid_values stuff for the phones
        if(object.type == 'Work')
          Data.type = 1;
        else if(object.type == 'Home')
          Data.type = 2;
        else  
          Data.type = 3;
        axios
        .post(baseURL + 'phone_number?id=' + this.user.id, Data)
        .then(response =>
        {
          console.log("Posting to Phones: " + JSON.parse(response.status));
          this.GetPhones();
        })
        .catch(error=>{this.CatchError(error);})
      } else if( type == 0 )//New Life Event
      {
        console.log("Mysterious Object:", object);
        //Create Object to send from Given Data
        if(object.visible == null || object.visible == false)
          object.visible = false;
        Data = {
          "person_ID":this.user.id,
          "description":object.description,
          "date":object.date,
          "type":object.type.ID,
          "visible": object.visible,
        };
        console.log("Data for Life Event: ", Data)
        axios
        .post(baseURL + 'life_event', Data)
        .then(response =>
        {
          console.log("Posting User Life Event: " + response.status);
          this.GetLifeEvents();
        })
        .catch(error=>{this.CatchError(error);})
      } else if( type == 1 )//New Relationship
      {
        //Create Object to send from Given Data
        Data = {
          "person1_ID":this.user.id,
          "person2_ID":object.person.ID,
          "type": object.type.ID,
        };
        axios
        .post(baseURL + 'relationship', Data)
        .then(response =>
        {
          console.log("Posting User Relationship: " + response.status);
          this.GetRelations();
        })
        .catch(error=>{this.CatchError(error);})
      } else if( type == 2 )//New Event Type
      {
        //Create Object to send from Given Data
        Data = {
          "value_group":"life_event",
          "value": object.type,
        };
        axios
        .post(baseURL + 'valid_value', Data)
        .then(response =>
        {
          console.log("Posting to Event Type: " + JSON.parse(response.status));
          this.GetValidValues();
        })
        .catch(error=>{this.CatchError(error);})
      } else if( type == 3 )//New Involement Type
      {
        //Create Object to send from Given Data
        Data = {
          "value_group":"involvement",
          "value": object.type,
        };
        axios
        .post(baseURL + 'valid_value', Data)
        .then(response =>
        {
          console.log("Posting to Involvement Type: " + JSON.parse(response.status));
          this.GetValidValues();
        })
        .catch(error=>{this.CatchError(error);})
      } else if( type == 4 )//New Ministry Area Type
      {
        //Create Object to send from Given Data
        Data = {
          "value_group":"ministry",
          "value": object.type,
        };
        axios
        .post(baseURL + 'valid_value', Data)
        .then(response =>
        {
          console.log("Posting to Ministry Area Type: " + JSON.parse(response.status));
          this.GetValidValues();
        })
        .catch(error=>{this.CatchError(error);})
      }
    },
    //Function for Puts
    MakePut(object, type)
    {
      //Put will not have Relationships, Involvement, Hobbies/Interests, or Ministry Areas
      var Data;
      if( type == -1 )//Updating Phone
      {
        //Create Object to send from Given Data
        Data = {
          "number": object.number,
          "can_publish": object.can_publish,
          "type": null,
        };
        //If statement for the Valid_values stuff for the phones
        if(object.type == 'Work')
          Data.type = 1;
        else if(object.type == 'Home')
          Data.type = 2;
        else  
          Data.type = 3;
        axios
        .put(baseURL + 'phone_number?id=' + object.ID, Data)
        .then(response =>
        {
          console.log("Updating in Phones: " + JSON.parse(response.status));
          this.GetPhones();
        })
        .catch(error=>{this.CatchError(error);})
      } else if( type == 0 )//updating Life Event
      {
        console.log(object.type.ID);
        //Create Object to send from Given Data

        if(object.visible == null || object.visible == false)
          object.visible = false;
        Data = {
          "person_ID":this.user.id,
          "description":object.description,
          "date":object.date,
          "type":object.type.ID,
          "visible": object.visible,
        };
        axios
        .put(baseURL + 'life_event?id=' + object.ID, Data)
        .then(response =>
        {
          console.log("Updating User's Life Events: " + JSON.parse(response.status));
          this.GetLifeEvents();
        })
        .catch(error=>{this.CatchError(error);})
      } else if( type == 2 )//udpating Event Type
      {
        //Create Object to send from Given Data
        Data = {
          "value_group":"life_event",
          "value": object.type,
        };
        axios
        .put(baseURL + 'valid_value?id=' + object.ID, Data)
        .then(response =>
        {
          console.log("Updating Event Type: " + JSON.parse(response.status));
          this.GetValidValues();
        })
        .catch(error=>{this.CatchError(error);})
      } else if( type == 3 )//updating Involement Type
      {
        console.log
        //Create Object to send from Given Data
        Data = {
          "value_group":"involvement",
          "value": object.type,
        };
        axios
        .put(baseURL + 'valid_value?id=' + object.ID, Data)
        .then(response =>
        {
          console.log("Updating Involvement Type: " + JSON.parse(response.status));
          this.GetValidValues();
        })
        .catch(error=>{this.CatchError(error);})
      } else if( type == 4 )//updating Ministry Area Type
      {
        //Create Object to send from Given Data
        Data = {
          "value_group":"ministry",
          "value": object.type,
        };
        axios
        .put(baseURL + 'valid_value?id=' + object.ID, Data)
        .then(response =>
        {
          console.log("Posting to Ministry Area Type: " + JSON.parse(response.status));
          this.GetValidValues();
        })
        .catch(error=>{this.CatchError(error);})
      } else if( type == 5 )//updating User
      {
        Data = {
          "ID": this.user.id,
          "congregation_ID": this.user.congregation_ID,
          "f_name": this.user.f_name,
          "l_name": this.user.l_name,
          "occupation": this.user.occupation,
          "employer": this.user.employer,
          "family_ID": this.user.family_ID,
          "email": this.user.email,
          "gender": this.user.gender,
          "preferred_name": this.user.preferred_name,
          "role": this.user.role,
        }
        console.log(Data);
        axios.put(baseURL + 'person?id=' + this.user.id,Data)
        .catch(error =>{this.CatchError(error);})
        .finally(() => {
            this.GetUser();
        })
      }
    },
    //Function for DELETES
    MakeDeletes(object,type)
    {
      if( type == -1 )//New Phone
      {
        axios
        .delete(baseURL + 'phone_number?id=' + object.ID)
        .then(response =>
        {
          console.log("Deleting Phone: " + JSON.parse(response.status));
          this.GetPhones();
        })
        .catch(error=>{this.CatchError(error);})
      } else if( type == 0 )//New Life Event
      {
        axios
        .delete(baseURL + 'life_event?id=' + object.ID)
        .then(response =>
        {
          console.log("Deleting User Life Event: " + response.status);
          this.GetLifeEvents();
        })
        .catch(error=>{this.CatchError(error);})
      } else if( type == 1 )//New Relationship
      {
        axios
        .delete(baseURL + 'relationship?person1_ID=' + object.person1_ID + '&person2_ID=' + object.person2_ID)
        .then(response =>
        {
          console.log("Deleting User Relationship: " + response.status);
          this.GetRelations();
        })
        .catch(error=>{this.CatchError(error);})
      } else if( type == 2 )//New Event Type
      {
        axios
        .delete(baseURL + 'valid_value?id=' + object.ID)
        .then(response =>
        {
          console.log("Deleting Event Type: " + JSON.parse(response.status));
          this.GetValidValues();
        })
        .catch(error=>{this.CatchError(error);})
      } else if( type == 3 )//New Involement Type
      {
        axios
        .delete(baseURL + 'valid_value?id='+ object.ID)
        .then(response =>
        {
          console.log("Delete Involvement Type: " + JSON.parse(response.status));
          this.GetValidValues();
        })
        .catch(error=>{this.CatchError(error);})
      } else if( type == 4 )//New Ministry Area Type
      {
        axios
        .delete(baseURL + 'valid_value?id=' + object.ID)
        .then(response =>
        {
          console.log("Deleting Ministry Area Type: " + JSON.parse(response.status));
          this.GetValidValues();
        })
        .catch(error=>{this.CatchError(error);})
      }
    }
  },
};
</script>