<template>
    <div class="file-upload" v-if="canEdit">
        <input type="file" @change="onFileChange" accept="image/*"/>
        <div v-if="progress" class="progress-bar" :style="{'width': progress}">
            {{progress}}
        </div>
        <v-btn @click="onUploadFile" class="upload-button"
        :disabled="!this.selectedFile">Save</v-btn>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            selectedFile: "",
            baseURL: "http://team2.eaglesoftwareteam.com/",
            progress: 0,
            // familyImgSrc: ""
        };
    },

    props: {
        canEdit: {
            type: Boolean
        },
        familyId: {
            type: Number
        },
        userId: {
            type: Number
        },
        familyImgSrc: {
            type: String
        },
        personImgSrc: {
            type: String
        },
        isCreateFamily: {
            type: Boolean
        }
    },

    methods: {
        onFileChange(e) {
            const selectedFile = e.target.files[0]; // accessed file
            this.selectedFile = selectedFile;

            var fileReader = new FileReader();
            fileReader.readAsDataURL(this.selectedFile)

            fileReader.onload = (readerEvent) => {
                console.log(readerEvent.target.result);
                // var dataURL = fileReader.result;
                this.$emit("onFileChange", readerEvent.target.result);
                // this.familyImgSrc = readerEvent.target.result;
            }
        },
        onUploadFile() {
            const formData = new FormData();
            formData.append("file", this.selectedFile); // appending file

            // sending file to backend
            if(this.$route.name == "HouseHold" || (this.$route.name == "Directory" && this.isCreateFamily))
            {
                console.log("Uploading photo for household page")
                axios
                .post(this.baseURL + "upload?family_ID=" + this.familyId, formData, {
                    onUploadProgress: ProgressEvent => {
                        let progress = 
                            Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100)
                            +"%";
                            this.progress = progress;
                    }
                })
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                });
            }

            else if(this.$route.name == "Account" || (this.$route.name == "Directory" && !this.isCreateFamily))
            {
                console.log("Uploading photo for the account page")
                axios
                .post(this.baseURL + "upload?person_ID=" + this.userId, formData, {
                    onUploadProgress: ProgressEvent => {
                        let progress = 
                            Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100)
                            +"%";
                            this.progress = progress;
                    }
                })
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                })
            }
        }
    }

}
</script>

<style>
.file-upload {
    box-shadow: 2px 2px 9px 2px #ccc;
    border-radius: 1rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 1rem;
    width: 60%;
    margin: 0 auto;
}

input {
    font-size: 0.9rem;
}

input,
button {
    margin-top: 1rem;
}

.upload-button {
    width: 8rem;
    padding: 0.5rem;
    background-color: #278be9;
    color: #fff;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    border-radius: 1rem;
}

.upload-button:disabled {
    background-color: #b3bcc4;
    cursor: no-drop;
}
</style>