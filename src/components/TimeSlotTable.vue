<template>
  <div class="time-slot-table">
    <div class="md-layout">
      <div class="day md-layout-item" v-for="day in week">
        <div @click="openEditDialog" class="time-slot-card">
          <TimeSlotCard v-for="timeSlot in day" :start-time="timeSlot.startDate" :end-time="timeSlot.endDate"
                        :reserved-slots="timeSlot.reservedSlots" :total-slots="timeSlot.totalSlots"
                        :key="timeSlot.timeSlotId"></TimeSlotCard>
        </div>
      </div>
    </div>
    <md-dialog :md-active.sync="editDialogOpen">
      <md-dialog-title>
        Zeit Slot bearbeiten
      </md-dialog-title>
      <md-dialog-content>
        <md-field>

        </md-field>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="closeEditDialog">Cancel</md-button>
        <md-button class="md-primary" @click="closeEditDialog">Save</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import api from '@/services/api'
import TimeSlotCard from "@/components/TimeSlotCard";

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
  asyncComputed: {
    week: {
      async get() {
        return api.getWeek();
      },
      default: []
    }
  },
  methods: {
    openEditDialog() {
      this.editDialogOpen = true;
    },
    closeEditDialog() {
      this.editDialogOpen = false;
    }
  }
}
</script>

<style scoped>
.time-slot-card {
  cursor: pointer;
}
</style>