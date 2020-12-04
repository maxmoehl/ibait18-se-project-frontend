<template>
  <ReservationTable></ReservationTable>
</template>

<script>
import ReservationTable from "@/components/ReservationTable";

/**
 * This view displays a table containing all reservations that can be filtered.
 */
export default {
  name: "Export",
  components: {ReservationTable},
  /**
   * Before the component gets created we trigger a check whether or not the user is still logged in.
   * If not we re-route to the login page. Same goes for the admin and verify view.
   * We also trigger a reload of the reservation data in the background to make sure we display up to date data.
   */
  beforeCreate() {
    this.$store.dispatch('updateLoginState').then(loggedIn => {
      if (!loggedIn) {
        this.$router.push({name: 'login'});
      } else {
        this.$store.dispatch('loadReservations');
      }
    });
  }
}
</script>

<style scoped>

</style>