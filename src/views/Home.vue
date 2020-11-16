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