<template>
  <div class="home">
    <TimeSlotSelection></TimeSlotSelection>
  </div>
</template>

<script>
import TimeSlotSelection from "@/components/TimeSlotSelection";

export default {
  name: 'Home',
  components: {TimeSlotSelection},
  data: () => {
    return {
      selectedDate: null
    };
  },
  computed: {
    currentEvents() {
      if (this.selectedDate === null) {
        return null;
      }
      return this.events;
    }
  }
}
</script>

<style scoped>

</style>