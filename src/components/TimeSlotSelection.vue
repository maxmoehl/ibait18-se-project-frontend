<template>
  <div class="timeslot-selection">
    <md-datepicker v-model="selectedDate" :md-disabled-dates="disabledDates">
      <label>Tag auswählen</label>
    </md-datepicker>
    <md-table v-model="timeSlots" md-card>
      <md-table-row slot="md-table-row" slot-scope="{ item }" @click="openRegistration(item._id)">
        <md-table-cell md-label="Zeitfenster">
          {{ getClockTime(item.startDate) }} - {{ getClockTime(item.endDate) }}
        </md-table-cell>
        <md-table-cell md-label="Freie Plätze">
          {{ item.peopleCount - item.reservations }}
        </md-table-cell>
      </md-table-row>

      <md-table-empty-state
          md-label="Keine Zeitfenster gefunden"
          md-description="Versuchen Sie es bitte mit einem anderen Tag.">
      </md-table-empty-state>
    </md-table>
  </div>
</template>

<script>
import utils from '../services/utils';

export default {
  name: "TimeSlotSelection",
  data: function() {
    return {
      selectedDate: utils.convertToDate(new Date(), '-')
    };
  },
  computed: {
    timeSlots() {
      return this.$store.getters.timeSlotsByDate(new Date(Date.parse(this.selectedDate)))
          .filter(t => {
            return t.reservations < t.peopleCount && t.startDate > Date.now();
          })
    },
  },
  methods: {
    disabledDates(date) {
      if (this.$store.getters.disabledDates(date)) {
        return true;
      }
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