<template>
  <md-content>
    <div class="main-content md-layout md-gutter">
      <AdminSidebar class="md-layout-item md-size-25"/>
      <TimeSlotTable class="md-layout-item"></TimeSlotTable>
    </div>
  </md-content>
</template>

<script>
import TimeSlotTable from "@/components/TimeSlotTable";
import AdminSidebar from "@/components/AdminSidebar";

/**
 * This view displays a table of all timeslots that can be filtered and a sidebar to access reservations, create new
 * timeslots.
 */
export default {
  name: "Admin",
  components: {AdminSidebar, TimeSlotTable},
  /**
   * Before the component gets created we trigger a check whether or not the user is still logged in.
   * If not we re-route to the login page. Same goes for the reservations and verify view.
   * We also trigger a reload of the timeslot data in the background to make sure we display up to date data.
   */
  beforeCreate() {
    this.$store.dispatch('updateLoginState').then(loggedIn => {
      if (!loggedIn) {
        this.$router.push({name: 'login'});
      }
    });
  }
}
</script>

<style scoped>

</style>