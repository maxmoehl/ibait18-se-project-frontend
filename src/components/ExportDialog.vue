<template>
  <md-dialog class="export-dialog" :md-active.sync="active">
    <md-dialog-title>
      <div class="md-title">Zeitfenster exportieren</div>
    </md-dialog-title>

    <md-dialog-content>
      Ihr Export des Zeitfensters <b>{{ timeSlotDescription }}</b> steht bereit.<br><br>
      <span style="color:red">Gäste, die (noch) nicht anwesend waren, werden nicht im Export enthalten sein!</span><br><br>
      <a href="/admin/help">Wie kann ich die exportierte Datei öffnen?</a>
    </md-dialog-content>

    <md-dialog-actions>
      <md-button class="md-primary" @click="$emit('update:active', false)">Abbrechen</md-button>
      <md-button class="md-primary" @click="exportData">Herunterladen</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
import {getTimeSlotDescription, exportToCsv} from "@/services/utils";

/**
 * A dialog for exporting a timeslot as csv.
 */
export default {
  name: "ExportDialog",
  props: {
    timeSlotId: String,
    active: Boolean
  },
  computed: {
    /**
     * Returns the description for a timeslot in a human readable form.
     * @return {string}
     */
    timeSlotDescription() {
      if (this.timeSlotId === undefined || this.timeSlotId === null || this.timeSlotId === '') {
        return 'ERROR: timeSlotId not set'
      }
      return getTimeSlotDescription(this.$store.getters.timeSlot(this.timeSlotId));
    }
  },
  methods: {
    /**
     * Exports the data to a csv which triggers a download and closes the dialog.
     */
    exportData() {
      exportToCsv(this.$store.getters.reservations(this.timeSlotId));
      this.$emit('update:active', false)
    }
  }
}
</script>

<style scoped>

</style>