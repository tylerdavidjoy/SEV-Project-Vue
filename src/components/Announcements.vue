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
            @click="clickAnnouncement(announcement.ID)"
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
    <v-row justify="center">
                    <v-dialog
                    v-model="dialog2"
                    scrollable
                    max-width="500px"
                    >
                    <v-card>
                        <v-card-title style="text-align:center;">Announcement</v-card-title>
                        <v-divider></v-divider>
                        <v-card-text style="height: 300px;">
                            {{dialog2text}}
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="dialog2 = false"
                        >
                            Close
                        </v-btn>
                        <v-btn
                            v-if="announcements[0].message != 'No announcements to show.'"
                            color="blue darken-1"
                            text
                            @click="deleteAnnouncement()"
                        >
                            Delete
                        </v-btn>
                        </v-card-actions>
                    </v-card>
                    </v-dialog>
                </v-row>
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
                            clearable
                            :rules="[rules.required]"
                        >
                        </v-text-field>
                        <v-textarea
                            v-model="dialogm1message"
                            label="Message"
                            clearable
                            auto-grow
                            :rules="[rules.required]"
                        >
                        </v-textarea>
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

const apiBaseUrl = "http://localhost:3000";

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
            dialog2: false,
            dialog2annID: null,
            dialog2text: "",
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
                    receipient: this.$person.congregation_ID,
                    receipient_type: this.recipientTypes.find(x => x.value === "congregation").ID
                })
                .then(() => {
                    axios.get(`${apiBaseUrl}/message`)
                    .then(messages => {
                        let tempMsg = {ID: messages.data[messages.data.length-1].ID, message: this.dialogm1message};
                        if(this.announcements[0].message === "No announcements to show."){
                            this.announcements = [];
                        }
                        this.announcements.push(tempMsg);
                        this.$set(this.announcements, this.announcements.indexOf(tempMsg), tempMsg);
                        this.dialog = false;
                    })
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
                .then(() => {
                    axios.get(`${apiBaseUrl}/message`)
                    .then(messages => {
                        let tempMsg = {ID: messages.data[messages.data.length-1].ID, message: this.dialogm1message};
                        if(this.announcements[0].message === "No announcements to show."){
                            this.announcements = [];
                        }
                        this.announcements.push(tempMsg);
                        this.$set(this.announcements, this.announcements.indexOf(tempMsg), tempMsg);
                        this.dialog = false;
                    })
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
                .then(() => {
                    axios.get(`${apiBaseUrl}/message`)
                    .then(messages => {
                        let tempMsg = {ID: messages.data[messages.data.length-1].ID, message: this.dialogm1message};
                        if(this.announcements[0].message === "No announcements to show."){
                            this.announcements = [];
                        }
                        this.announcements.push(tempMsg);
                        this.$set(this.announcements, this.announcements.indexOf(tempMsg), tempMsg);
                        this.dialog = false;
                    })
                })
            }
            
        },
        clickAnnouncement: function(annID){
            console.log("Clicked for announcement", annID);
            this.dialog2 = true;
            this.dialog2annID = annID;
            this.dialog2text = this.announcements.find(x => x.ID === annID).message;
        },
        deleteAnnouncement: function(){
            console.log("Delete announcement")
            axios.delete(`${apiBaseUrl}/message?id=${this.dialog2annID}`);
            let tempAnnIndex = this.announcements.indexOf(this.announcements.find(x => x.ID === this.dialog2annID));
            this.$delete(this.announcements, tempAnnIndex)
            if(this.announcements.length === 0)
                this.announcements.push({message: "No announcements to show."});
            this.dialog2 = false;
        }
    }
}
</script>