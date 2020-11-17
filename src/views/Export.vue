<template>
  <ReservationTable></ReservationTable>
</template>

<script>
import ReservationTable from "@/components/ReservationTable";
export default {
  name: "Export",
  components: {ReservationTable},
  beforeCreate() {
    this.$store.dispatch('loadReservations');
  }
}
</script>

<style scoped>

</style>