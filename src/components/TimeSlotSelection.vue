<template>
  <div class="timeslot-selection">
    <md-datepicker v-model="selectedDate" :md-disabled-dates="disabledDates">
      <label>Tag wählen</label>
    </md-datepicker>
    <md-table v-model="timeSlots" md-card>
      <md-table-row slot="md-table-row" slot-scope="{ item }" @click="openRegistration(item._id)">
        <md-table-cell md-label="Zeitraum">
          {{ getClockTime(item.startDate) }} - {{ getClockTime(item.endDate) }}
        </md-table-cell>
        <md-table-cell md-label="Freie Plätze">
          {{ item.peopleCount - item.reservations }}
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import utils from '../services/utils';

export default {
  name: "TimeSlotSelection",
  data: () => {
    return {
      selectedDate: utils.convertToDate(new Date(Date.now()), '-')
    };
  },
  computed: {
    timeSlots() {
      return this.$store.getters.getTimeSlotsByDate(new Date(Date.parse(this.selectedDate)))
          .filter(t => {
            return t.reservations < t.peopleCount && t.startDate > Date.now();
          })
    }
  },
  methods: {
    disabledDates(date) {
      let d = new Date(Date.parse(date));
      let today = new Date(Date.now());
      today.setHours(0, 0, 0, 0);
      return d < today;
    },
    getClockTime(seconds) {
      return utils.convertToClockTime(new Date(seconds));
    },
    openRegistration(timeSlotId) {
      this.$router.push({name: 'register', params: {timeSlotId: timeSlotId}});
    }
  }
}
</script>

<style scoped>

</style>