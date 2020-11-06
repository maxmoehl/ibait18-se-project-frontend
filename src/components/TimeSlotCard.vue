<template>
  <md-card @click="console.log('click')">
    <md-card-content>
      {{getClockTime(startTime)}}-{{getClockTime(endTime)}}<br>
      {{reservedSlots}}/{{totalSlots}}
    </md-card-content>
  </md-card>
</template>

<script>
import utils from '../services/utils'

export default {
  name: "TimeSlotCard",
  props: {
    startTime: null,
    endTime: null,
    reservedSlots: null,
    totalSlots: null
  },
  methods: {
    getClockTime(date) {
      return utils.convertToClockTime(new Date(date));
    }
  }
}
</script>

<style scoped>

</style>