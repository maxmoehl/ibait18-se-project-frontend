<template>
  <div id="admin-view" class="md-layout">
    <div class="sidebar md-layout-item md-size-25">

    </div>
    <TimeSlotTable class="md-layout-item"></TimeSlotTable>
    <md-speed-dial class="md-bottom-right">
      <md-speed-dial-target class="md-primary">
        <md-icon>add</md-icon>
      </md-speed-dial-target>
    </md-speed-dial>
  </div>
</template>

<script>
import TimeSlotTable from "@/components/TimeSlotTable";
export default {
  name: "Admin",
  components: {TimeSlotTable}
}
</script>

<style scoped>

</style>