<template>
  <div class="directory">
    <h1>This is a Directory page</h1>
    <DirectoryReportNoImg/>
    <GroupReportNoImg/>
    <LifeEventReport/>
  </div>
</template>


<script>
import DirectoryReportNoImg from "@/components/directory_report.vue";
import GroupReportNoImg from "@/components/group_report.vue";
import LifeEventReport from "@/components/lifeEvent_report.vue";
export default {
  name: "Home",
  components: {
    DirectoryReportNoImg,
    GroupReportNoImg,
    LifeEventReport
  }
};
</script>