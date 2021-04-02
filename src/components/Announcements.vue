<template>
    <v-carousel
    cycle
    height="250"
    hide-delimiter-background
    hide-delimiters
    show-arrows-on-hover
    >
    <v-carousel-item v-for="announcement in announcements" :key="announcement.ID">
        {{announcement.text}}
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