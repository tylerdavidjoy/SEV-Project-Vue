<template>
  <v-app id="inspire">
      
    <v-main class="grey lighten-2">
      <v-container>
         <v-card color="gray">
          <v-card-title class="text-center justify-center py-6">
            <h1 class="font-weight-bold display-3 dark--text">
              Help Page
            </h1>
          </v-card-title>
      
          <v-tabs
            v-model="tab"
            color="gray"
            center-active
          >
            <v-tab
              v-for="item in items"
              :key="item"
            >
              {{ item }}
            </v-tab>
          </v-tabs>
      
          <v-tabs-items v-model="tab">
            <!-- The v-Tab for the Account Page -->
            <v-tab-item>
              <v-card color="dark" flat>
                <v-container>
                  <div class="px-6">
                    <v-stepper >
                      <v-stepper-header>
                        <template v-for="n in content.account.steps">
                          <v-stepper-step :key="`${n}-step`" :step="n" editable>Step {{ n }}</v-stepper-step>
                
                          <v-divider v-if="n !== content.account.steps" :key="n"></v-divider>
                        </template>
                      </v-stepper-header>
                
                      <v-stepper-items>
                        <v-stepper-content v-for="n in content.account.steps" :key="`${n}-content`" :step="n">
                          <v-card class="mb-12" color="grey darken-3">
                          <v-img contain :height="300" :src="getImgUrl('account',n)"/>
                          <v-card-title class="text-h2 white--text">Step {{n}}</v-card-title>
                          <v-card-text class="text-h4 white--text">{{content.account.info[n-1]}}</v-card-text>
                          </v-card>
                        </v-stepper-content>
                      </v-stepper-items>
                    </v-stepper>
                  </div>
                </v-container>
              </v-card>
            </v-tab-item>
            <!-- The v-tab for the File Uploading -->
            <v-tab-item>
              <v-card color="dark" flat>
                <v-container>
                  <v-stepper >
                    <v-stepper-header>
                      <template v-for="n in content.fileuploading.steps">
                        <v-stepper-step :key="`${n}-step`" :step="n" editable>Step {{ n }}</v-stepper-step>
              
                        <v-divider v-if="n !== content.fileuploading.steps" :key="n"></v-divider>
                      </template>
                    </v-stepper-header>
              
                    <v-stepper-items>
                      <v-stepper-content v-for="n in content.fileuploading.steps" :key="`${n}-content`" :step="n">
                        <v-card class="mb-12" color="grey darken-3">
                        <v-img contain :height="300" :src="getImgUrl('fileuploading',n)"/>
                        <v-card-title class="text-h2 white--text">Step {{n}}</v-card-title>
                          <v-card-text class="text-h4 white--text">{{content.fileuploading.info[n-1]}}</v-card-text>
                        </v-card>
                      </v-stepper-content>
                    </v-stepper-items>
                  </v-stepper>
                </v-container>
              </v-card>
            </v-tab-item>
            <!-- The v-tab for Groups -->
            <v-tab-item>
                <v-card color="dark" flat>
                  <v-container>
                    <v-stepper >
                      <v-stepper-header>
                        <template v-for="n in content.group.steps">
                          <v-stepper-step :key="`${n}-step`" :step="n" editable>Step {{ n }}</v-stepper-step>
                
                          <v-divider v-if="n !== content.group.steps" :key="n"></v-divider>
                        </template>
                      </v-stepper-header>
                
                      <v-stepper-items>
                        <v-stepper-content v-for="n in content.group.steps" :key="`${n}-content`" :step="n">
                          <v-card class="mb-12" color="grey darken-3">
                          <v-img contain :height="300" :src="getImgUrl('group',n)"/>
                          <v-card-title class="text-h2 white--text">Step {{n}}</v-card-title>
                          <v-card-text class="text-h4 white--text">{{content.group.info[n-1]}}</v-card-text>
                          </v-card>
                        </v-stepper-content>
                      </v-stepper-items>
                    </v-stepper>
                  </v-container>
                </v-card>
            </v-tab-item>
            <!-- The v-tab for Events -->
            <v-tab-item>
              <v-card color="dark" flat>
                <v-container>
                  <v-stepper >
                    <v-stepper-header>
                      <template v-for="n in content.fileuploading.steps">
                        <v-stepper-step :key="`${n}-step`" :step="n" editable>Step {{ n }}</v-stepper-step>
              
                        <v-divider v-if="n !== content.fileuploading.steps" :key="n"></v-divider>
                      </template>
                    </v-stepper-header>
              
                    <v-stepper-items>
                      <v-stepper-content v-for="n in content.fileuploading.steps" :key="`${n}-content`" :step="n">
                        <v-card class="mb-12" color="grey darken-3">
                          <v-img contain :height="300" :src="getImgUrl('account',n)"/>
                        <v-card-title class="text-h2 white--text">Step {{n}}</v-card-title>
                          <v-card-text class="text-h4 white--text">{{content.fileuploading.info[n-1]}}</v-card-text>
                        </v-card>
                      </v-stepper-content>
                    </v-stepper-items>
                  </v-stepper>
                </v-container>
              </v-card>
            </v-tab-item>
            <!-- The v-tab for Printing Reports -->
            <v-tab-item>
              <v-card color="dark" flat>
                <v-container>
                  <v-stepper >
                    <v-stepper-header>
                      <template v-for="n in content.reports.steps">
                        <v-stepper-step :key="`${n}-step`" :step="n" editable>Step {{ n }}</v-stepper-step>
              
                        <v-divider v-if="n !== content.reports.steps" :key="n"></v-divider>
                      </template>
                    </v-stepper-header>
              
                    <v-stepper-items>
                      <v-stepper-content v-for="n in content.reports.steps" :key="`${n}-content`" :step="n">
                        <v-card class="mb-12" color="grey darken-3">
                          <v-img contain :height="300" :src="getImgUrl('report',n)"/>
                        <v-card-title class="text-h2 white--text">Step {{n}}</v-card-title>
                          <v-card-text class="text-h4 white--text">{{content.reports.info[n-1]}}</v-card-text>
                        </v-card>
                      </v-stepper-content>
                    </v-stepper-items>
                  </v-stepper>
                </v-container>
              </v-card>
            </v-tab-item>
            <!-- The v-tab for Searching Directory -->
            <v-tab-item>
              <v-card color="dark" flat>
                <v-container>
                  <v-stepper >
                    <v-stepper-header>
                      <template v-for="n in content.directory.steps">
                        <v-stepper-step :key="`${n}-step`" :step="n" editable>Step {{ n }}</v-stepper-step>
              
                        <v-divider v-if="n !== content.directory.steps" :key="n"></v-divider>
                      </template>
                    </v-stepper-header>
              
                    <v-stepper-items>
                      <v-stepper-content v-for="n in content.directory.steps" :key="`${n}-content`" :step="n">
                        <v-card class="mb-12" color="grey darken-3">
                          <v-img contain :height="300" :src="getImgUrl('directory',n)"/>
                        <v-card-title class="text-h2 white--text">Step {{n}}</v-card-title>
                          <v-card-text class="text-h4 white--text">{{content.directory.info[n-1]}}</v-card-text>
                        </v-card>
                      </v-stepper-content>
                    </v-stepper-items>
                  </v-stepper>
                </v-container>
              </v-card>
            </v-tab-item>
            <!-- The v-tab for Administrators -->
            <v-tab-item>
              <v-card color="dark" flat>
                <v-container>
                  <v-stepper >
                    <v-stepper-header>
                      <template v-for="n in content.administrator.steps">
                        <v-stepper-step :key="`${n}-step`" :step="n" editable>Step {{ n }}</v-stepper-step>
              
                        <v-divider v-if="n !== content.administrator.steps" :key="n"></v-divider>
                      </template>
                    </v-stepper-header>
              
                    <v-stepper-items>
                      <v-stepper-content v-for="n in content.administrator.steps" :key="`${n}-content`" :step="n">
                        <v-card class="mb-12" color="grey darken-3">
                        <v-img contain :height="300" :src="getImgUrl('administrator',n)"/>
                        <v-card-title class="text-h2 white--text">Step {{n}}</v-card-title>
                          <v-card-text class="text-h4 white--text">{{content.administrator.info[n-1]}}</v-card-text>
                        </v-card>
                      </v-stepper-content>
                    </v-stepper-items>
                  </v-stepper>
                </v-container>
              </v-card>
            </v-tab-item>

          </v-tabs-items>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    mounted() {
    },
    data: () => ({
      tab: null,
      items: [
      'Account','Photo Uploading', 'Groups', 'Events','Printing Reports','Searching Directory','Administrators'
      ],
      itemText:[
        'The Account page is for a person to view and edit all their information like phone number and Life Events that a congregation might like to keep track of. Here, we will walk through how to Add,Edit and Delete a Life Event. ',
        ],
      
      content:{
        account:{id:0, steps:[1,2,3,4,5,6],
          info:[
            'The first step in creating a Life Event is to navigate to the Account Page for your account.',
            'After Navigating to the Acconut page, You can look at the Life Events for your account. From here you can Add, Edit, or even remove a Life Event from your Account.',
            'If you want to Add a Life Event, you can click the Add Event button to add a new Life Event to your account. From there, you will be prompted to select the type of event, give a description of the event, and give a date for the event before submitting it. After you submit the event, you will notice that now the event is added to your Life Events.',
            'If you want to edit a Life Event, You can click the Pencil next to the Event to edit information about that Life Event. This will update any information for the Life Event after you submit the changes.',
            'If you want to delete a Life Event, then you can click the Trashcan icon next to the Event. This will prompt you to make sure that you want to delete the Event. If you confirm, then you will notice that the Life Event is no longer showing on your account page.',
            'If you are having trouble with Life Events or any other feature for the Account page, then contact your Administrator and ask for help.',
          ],
        },
        fileuploading:{id:0, steps:[1,2,3,4,],
          info:[
            'When Uploading a Photo or File, you will first need to navigate to a page that contains a section where a photo/file uploading component is located on',
            'For Photo uploading, once you have located the component, you will need to click the choose file button to select the file/photo that you will want to upload',
            'After clicking the button, you will need to select the file/photo to upload and then select save in the file explorer to choose this.',
            'Finally after selecting the file/photo, you will click upload Photo/File to upload it to your profile.',
          ],
        },
        group:{id:0, steps:[1,2,3,4,5],
          info:[
            'To begin finding information on any group(s) you should first click the "Groups" button on the home page or the "Groups" button in the navigation menu on the right.',
            `Searching for a group.
            Need to see announcements or information for a group, but don't want to waste time clicking through the pages of groups?
            The good news is that the Group List page will only show you the groups you are involved in. If you are involved in a group and do not see it, talk to your church administrator.
            Click in the search bar and start typing the name of the group you are looking for. You do not need to get the case of the letters correct, but the spelling needs to be correct.
            The moment you enter a letter into the search bar the site begins to search through all of the groups by name and slowly whittles down the groups by relevancy to what has been typed.`,
            `Viewing a group.
            Once you have found the group you wish to view more information for you can click on the "View Group" button to be taken to that group's page.`,
            `Group Page
            As the page loads you will see the group leader and their public information and contact information in the top left section of the page.
            To the right of the leader section you will see an image of the group.
            Below that section you will find the Announcements panel. That panel will show any and all announcements for that group that any Administration or the Group Leader have posted.
            Below the Announcements panel you will find a list of all group members and their public contact information.`,
            'If you are having trouble with Groups Selection or any other feature for the Groups page, then contact your Administrator and ask for help.',
          ],
        },
        event:{id:0, steps:[1,2,3,4,5,6],
          info:[
            'The first step in creating a Life Event is to navigate to the Account Page for your account.',
            'After Navigating to the Acconut page, You can look at the Life Events for your account. From here you can Add, Edit, or even remove a Life Event from your Account.',
            'If you want to Add a Life Event, you can click the Add Event button to add a new Life Event to your account. From there, you will be prompted to select the type of event, give a description of the event, and give a date for the event before submitting it. After you submit the event, you will notice that now the event is added to your Life Events.',
            'If you want to edit a Life Event, You can click the Pencil next to the Event to edit information about that Life Event. This will update any information for the Life Event after you submit the changes.',
            'If you want to delete a Life Event, then you can click the Trashcan icon next to the Event. This will prompt you to make sure that you want to delete the Event. If you confirm, then you will notice that the Life Event is no longer showing on your account page.',
            'If you are having trouble with Life Events or any other feature for the Account page, then contact your Administrator and ask for help.',
          ],
        },
        reports:{id:0, steps:[1,2,3,4,5,6],
          info:[
            `The system support generating a report for a variety of things such as: \n` +
            `1.Directory\n`+
            `2.List of all Groups\n`+
            `3.List of members of a group\n`+
            `4.Life Events of a specific type for certain time frames\n`+
            `5.Events\n`+
            `6.User role report`,
            `In order to generate a report you will need to navigate to the page that you wish to generate the report for. At the bottom of that page you will find a small settings bar and a button with the name of the report it will generate.`,
            `There are a variety of settings for generating your report such as File Type, Inclusion of Pictures, Date Ranges and More detailed types from within the report.

            File Types allow you to select from either PDF or CSV. CSV's are useful for exporting data from the system but PDF's are more readable for general reports. 

            Inclusion of images will add images for the related data, such as images in the directory of individual people or pictures next to groups. Not checking this box will give you a list of the items in a neatly formatted table.`,
            `Other settings that are more specific for certain reports such as the life events report are the type of event you want the report for and the date range for the report. 

            The type allows you to generate a report of a given category. For example a report of Birthdays. This setting fictions as a drop-down box and allows you to select 1 item.

            The date range allows you to specify when to start and end the report. For example you can get events for a month period, 3 months or maybe you want just this week. This setting functions as two date pickers for selecting the earliest date you want an event from and the latest date you want an event from.`,
            `After you have finalized your settings, just click the generate report button and the file should download automatically and be ready for viewing.`,
            'If you are having trouble with Printing Reports, then contact your Administrator and ask for help.',
          ],
        },
        directory:{id:0, steps:[1,2,3,4,5,],
          info:[
            'The first step in searching the Directory is to navigate to the Directory Page.',
            'After navigating to to the directory page you are given two forms of searching, by individual and by family. When you are viewing by one or the other by what you have selected at the top of the page with the two "People" and "Family" buttons, the search bar at the top will search based on those two options.',
            'Just begin typing the name of the person or family that you are looking for and the results will be filtered accordingly. If you are unable to find someone it is likely they have opted to not be included in the directory.',
            'If you wish to see more information on an individual or a family, simply click on the individual or family and you will be navigated to a page with more info.',
            'If you are having trouble with searching the directory or any other feature for the Directory page, then contact your Administrator and ask for help.',
          ],
        },
        administrator:{id:0, steps:[1,2,3,4,5,6,7,8,],
          info:[
            'There are many abilities that are available to Administrators of this system. This will be a guide to show you all the Abilities that you have in the system that normal users do not.',
            'As an administrator, you may want to create Life Events that are personal notes to you that you may not want the User to see for things like Deaths in the family. As an Administrator, you have the power to check if a Life Event is visible to that user or not. You can do so the Account page when editting or creating a new life event',
            'As an administrator, you will also be able to add different types of Life Events, Involvements, and Ministry Areas for the Church as the demand fits. You can do so on the Account page as well.',
            'Admins are able to add new groups and delete groups. Creating a group must specify the name of the group, the type of group, and the name of the group.',
            'Admins can add individual members or a whole family(ies) to a group. Admins can also remove members individually and change the group leader.',
            'Admins are able to send announcements to the congregation, any group, or any event. Admins are also able to delete announcements to the system. Sending announcements requires specifying the announcement\'s Subject line and Body. A congregation announcement is sent through the home page announcement box, and an announcement for an event or group is sent through that event/group\'s page.',
            'Admins are also able to Add and Remove people and families to the System from the Directory Page. Here you will be asked to input the information for that person or family respectively. Required fields will be noted by the * symbol next to a field.',
            'Admins are able to select a family or individual from the Directory Page and edit their information as well',
          ],
        },
      }
    }),
    methods:{
      getImgUrl(type,n) {
          return require('../assets/HelpPageResources/' + type + n + '.png');
      },
    },
  }
</script>