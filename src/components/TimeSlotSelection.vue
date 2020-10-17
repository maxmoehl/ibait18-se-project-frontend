<template>
  <div class="timeslot-selection">
    <md-datepicker v-model="selectedDate" :md-disabled-dates="disabledDates">
      <label>Tag wählen</label>
    </md-datepicker>
    <!--
    <md-table-empty-state
        md-label="Keine freien Plätze"
        md-description="Keine Zeitfenster mit freien Plätzen gefunde, bitte versuchen Sie einen anderen Tag.">
    </md-table-empty-state>
    -->
    <md-table v-model="timeSlots" md-card>
      <md-table-row slot="md-table-row" slot-scope="{ item }" @click="openRegistration(item.timeSlotId)">
        <md-table-cell md-label="Zeitraum" class="text-align-left">
          {{ getClockTime(item.startDate) }} - {{ getClockTime(item.endDate) }}
        </md-table-cell>
        <md-table-cell md-label="Freie Plätze" class="text-align-left">{{ item.availableSlots }}</md-table-cell>
      </md-table-row>
    </md-table>

    <!--<md-table>
      <md-table-row>
        <md-table-head>Zeitraum</md-table-head>
        <md-table-head>Freie Plätze</md-table-head>
      </md-table-row>
      <md-table-row v-for="t in timeSlots" :key="t.timeSlotId" @="openRegistration()">
        <md-table-cell class="text-align-left">
          {{ getClockTime(t.startDate) }} - {{ getClockTime(t.endDate) }}
        </md-table-cell>
        <md-table-cell class="text-align-left">{{ t.availableSlots }}</md-table-cell>
      </md-table-row>
    </md-table>-->
  </div>
</template>

<script>
import api from '../services/api';
import utils from '../services/utils';

export default {
  name: "TimeSlotSelection",
  data: () => {
    return {
      selectedDate: utils.convertToDate(new Date(Date.now()))
    };
  },
  asyncComputed: {
    timeSlots: {
      async get() {
        let timeSlots = await api.getTimeSlots(new Date(Date.parse(this.selectedDate)));
        return timeSlots.filter(t => {
          return t.availableSlots > 0 && t.startDate > Date.now();
        });
      },
      default: []
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
.text-align-left {
  text-align: left;
}
</style>