<template>
    <div>
    <v-carousel
    cycle
    height="250"
    hide-delimiter-background
    hide-delimiters
    show-arrows-on-hover
    >
        <v-carousel-item v-for="announcement in announcements" :key="announcement.ID">
            <v-sheet
            style="background-color:#811429;"
            height="100%"
            tile
            >
                <v-row
                class="fill-height"
                align="center"
                justify="center"
                >
                    <div class="ma-6" style="font-size:24px">
                        {{announcement.message}}
                    </div>
                </v-row>
            </v-sheet>
        </v-carousel-item>
    </v-carousel>
    <v-row justify="center" v-if="isAdmin">
                    <v-dialog
                    v-model="dialog"
                    scrollable
                    max-width="350px"
                    >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                        color="primary"
                        dark
                        v-bind="attrs"
                        v-on="on"
                        >
                        Send Announcement
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-title style="text-align:center;">Set up an announcement to send<br/>to the {{this.$route.name === "Home"?"Congregation":this.$route.name}}.</v-card-title>
                        <v-divider></v-divider>
                        <v-card-text style="height: 300px;">
                        <v-form v-model="isAnnouncementValid">
                        <v-text-field
                            v-model="dialogm1subject"
                            label="Subject"
                            :rules="[rules.required]"
                        >
                        </v-text-field>
                        <v-text-field
                            v-model="dialogm1message"
                            label="Message"
                            :rules="[rules.required]"
                        >
                        </v-text-field>
                        </v-form>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="dialog = false, dialogm1message = '', dialogm1subject = ''"
                        >
                            Cancel
                        </v-btn>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="sendAnnouncement()"
                            :disabled="!isAnnouncementValid"
                        >
                            Send
                        </v-btn>
                        </v-card-actions>
                    </v-card>
                    </v-dialog>
                </v-row>
    </div>
</template>

<script>
import axios from 'axios';

const apiBaseUrl = "http://team2.eaglesoftwareteam.com";

export default {
    name: "AnnouncementViewer",
    props: {
        announcements: [],
        hasPerms: null,
        receipient: null,
        receipientType: null,
    },
    data(){
        return{
            dialogm1subject: "",
            dialogm1message: "",
            dialog: false,
            isAdmin: this.hasPerms,
            messageTypes: [],
            recipientTypes: [],
            isEmail: true,
            rules: {
                required: value => !!value || 'Required.'
            },
            isAnnouncementValid: false,
        }
    },
    beforeCreate(){
        axios.get(`${apiBaseUrl}/valid_value`)
        .then(values => {
            this.messageTypes = values.data.filter(x => x.value_group === "message_type");
            this.recipientTypes = values.data.filter(x => x.value_group === "message");
        })
        .catch(error => {
            console.error(error)
        })
    },
    methods:{
        sendAnnouncement: function(){
            console.log("sending announcement", this.isAdmin);
            if(this.$route.name === "Home"){
                axios.post(`${apiBaseUrl}/message`, {
                    subject: this.dialogm1subject,
                    message: this.dialogm1message,
                    type: this.isEmail?this.messageTypes.find(x => x.value==="email").ID:this.messageTypes.find(x => x.value==="text").ID,
                    timesent: null,
                    receipient: this.$person.congregation_id,
                    receipient_type: this.recipientTypes.find(x => x.value === "congregation").ID
                })
            }
            else if(this.$route.name === "Group"){
                axios.post(`${apiBaseUrl}/message`, {
                    subject: this.dialogm1subject,
                    message: this.dialogm1message,
                    type: this.isEmail?this.messageTypes.find(x => x.value==="email").ID:this.messageTypes.find(x => x.value==="text").ID,
                    timesent: null,
                    receipient: this.$route.params.groupID,
                    receipient_type: this.recipientTypes.find(x => x.value === "group").ID
                })
            }
            else if(this.$route.name === "Event"){
                axios.post(`${apiBaseUrl}/message`, {
                    subject: this.dialogm1subject,
                    message: this.dialogm1message,
                    type: this.isEmail?this.messageTypes.find(x => x.value==="email").ID:this.messageTypes.find(x => x.value==="text").ID,
                    timesent: null,
                    receipient: this.$route.params.eventID,
                    receipient_type: this.recipientTypes.find(x => x.value === "event").ID
                })
            }

            this.dialog = false;
        }
    }
}
</script>