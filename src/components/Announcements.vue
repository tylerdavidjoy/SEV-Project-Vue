<template>
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
</template>

<script>
export default {
    name: "AnnouncementViewer",
    props: {
        announcements: [],
    },
}
</script>