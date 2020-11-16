<template>
  <div class="home">
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