<template>
  <md-content>
    <div class="top-content md-layout md-gutter">
      <div class="placeholder md-layout-item md-size-25"></div>
      <div class="md-layout-item md-title table-title">
        Zeitfenster
      </div>
    </div>
    <div class="main-content md-layout md-gutter">
      <AdminSidebar class="md-layout-item md-size-25"/>
      <TimeSlotTable class="md-layout-item"></TimeSlotTable>
    </div>
  </md-content>
</template>

<script>
import TimeSlotTable from "@/components/TimeSlotTable";
import AdminSidebar from "@/components/AdminSidebar";
export default {
  name: "Admin",
  components: {AdminSidebar, TimeSlotTable}
}
</script>

<style scoped>
.table-title {
  padding: 10px 0 20px;
}
</style>