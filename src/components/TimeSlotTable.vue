<template>
  <md-table v-model="timeSlots" md-card>
    <md-table-row slot="md-table-row" slot-scope="{ item }" @click="openEditDialog(item.timeSlotId)">
      <md-table-cell md-label="Datum">
        {{ convertToDate(item.startDate) }}
      </md-table-cell>
      <md-table-cell md-label="Zeitraum">
        {{ getClockTime(item.startDate) }} - {{ getClockTime(item.endDate) }}
      </md-table-cell>
      <md-table-cell md-label="Reservierungen">
        {{ item.reservations }} / {{ item.peopleCount }}
      </md-table-cell>
    </md-table-row>
  </md-table>
</template>

<script>
import TimeSlotCard from "@/components/TimeSlotCard";
import utils from "@/services/utils";

export default {
  name: "TimeSlotTable",
  components: {TimeSlotCard},
  data: function () {
    return {
      editDialogOpen: false,
      editTimeSlotForm: {
        startDate: "",
        endDate: "",
        totalSlots: 0
      }
    };
  },
  computed: {
    timeSlots() {
      return this.$store.state.timeSlots;
    }
  },
  methods: {
    openEditDialog() {
      this.editDialogOpen = true;
    },
    closeEditDialog() {
      this.editDialogOpen = false;
    },
    convertToDate(date) {
      return utils.convertToDate(new Date(date), '.');
    },
    getClockTime(seconds) {
      return utils.convertToClockTime(new Date(seconds));
    },
  }
}
</script>

<style scoped>

</style>