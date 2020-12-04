<template>
  <div class="home">
    <div class="header">
      <div class="md-title">
        Fragen?
      </div>
      <p>
        Bei Fragen zu dieser Anwendung, dem Reservierungsprozess oder Ihrem Besuch bei uns, nutzen Sie bitte die
        Informationsmöglichkeit in unseren <a href="/faq">Häufig gestellten Fragen (FAQ)</a>.
      </p>
    </div>
    <TimeSlotSelection></TimeSlotSelection>
  </div>
</template>

<script>
import TimeSlotSelection from "@/components/TimeSlotSelection";

/**
 * The main view every user accessing the website gets sent to. Users can either access the menu to navigate to another
 * page or use the TimeSlotSelection to choose a timeslot to book a reservation.
 */
export default {
  name: 'Home',
  components: {TimeSlotSelection}
}
</script>

<style scoped>
.home {
  max-width: 600px;
  margin: auto;
}
</style>