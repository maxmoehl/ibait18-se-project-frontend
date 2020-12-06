<template>
  <div class="reservation-table">
    <div class="filter">
      <md-card>
        <md-card-header>
          <div class="md-title">Zeitfenster</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div
                class="md-layout-item md-xsmall-size-100 md-small-size-40 md-medium-size-40 md-large-size-40 md-xlarge-size-40">
              <md-datepicker :md-disabled-dates="$store.getters.disabledDates" v-model="filter.date">
                <label>Tag wählen</label>
              </md-datepicker>
            </div>
            <div
                class="md-layout-item md-xsmall-size-100 md-small-size-20 md-medium-size-20 md-large-size-20 md-xlarge-size-20">
              <md-field>
                <label for="limit">Max. Einträge</label>
                <md-select id="limit" name="limit" v-model="filter.limit">
                  <md-option :value="25">25</md-option>
                  <md-option :value="50">50</md-option>
                  <md-option :value="100">100</md-option>
                  <md-option :value="200">200</md-option>
                  <md-option :value="500">500</md-option>
                  <md-option :value="1000">1000</md-option>
                  <md-option :value="-1">Alle</md-option>
                </md-select>
              </md-field>
            </div>
          </div>
        </md-card-content>

        <md-card-actions>
          <md-button class="md-primary" @click="updateTimeSlots">Aktualisieren</md-button>
        </md-card-actions>
      </md-card>
    </div>
    <md-table v-model="timeSlots" md-card>
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Datum">
          {{ convertToDate(item.startDate) }}
        </md-table-cell>
        <md-table-cell md-label="Zeitraum">
          {{ getClockTime(item.startDate) }} - {{ getClockTime(item.endDate) }}
        </md-table-cell>
        <md-table-cell md-label="Reservierungen">
          {{ item.reservations }} / {{ item.peopleCount }}
        </md-table-cell>
        <md-table-cell md-label="Aktionen">
          <md-button class="md-icon-button" @click="openEditDialog(item._id)">
            <md-icon>create</md-icon>
          </md-button>
          <md-button class="md-icon-button" @click="openExportDialog(item._id)" :disabled="item.reservations === 0">
            <md-icon>cloud_download</md-icon>
          </md-button>
          <md-button class="md-icon-button" @click="openDeleteDialog(item._id)">
            <md-icon>delete</md-icon>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>

    <md-dialog class="edit-timeslot-dialog" :md-active.sync="editTimeSlot.open">
      <md-dialog-title>
        Neues Zeitfenster anlegen
      </md-dialog-title>
      <md-dialog-content>
        <md-datepicker v-model="editTimeSlot.date">
          <label>Tag wählen</label>
        </md-datepicker>
        <md-field :class="getValidationClass('startTime')">
          <label for="startTime">Startzeit</label>
          <md-input id="startTime" name="startTime" v-model="editTimeSlot.startTime"/>
          <span class="md-error" v-if="!$v.editTimeSlot.startTime.required">Bitte geben Sie eine Startzeit an</span>
          <span class="md-error" v-else-if="!$v.editTimeSlot.startTime.mustBeTime">Ungültiges Format</span>
        </md-field>
        <md-field :class="getValidationClass('endTime')">
          <label for="endTime">Endzeit</label>
          <md-input id="endTime" name="endTime" v-model="editTimeSlot.endTime"/>
          <span class="md-error" v-if="!$v.editTimeSlot.endTime.required">Bitte geben Sie eine Endzeit an</span>
          <span class="md-error" v-else-if="!$v.editTimeSlot.endTime.mustBeTime">Ungültiges Format</span>
        </md-field>
        <md-field :class="getValidationClass('capacity')">
          <label for="capacity">Kapazität</label>
          <md-input id="capacity" name="capacity" v-model.number="editTimeSlot.capacity"/>
          <span class="md-error" v-if="!$v.editTimeSlot.capacity.required">Bitte geben Sie eine Kapazität an</span>
          <span class="md-error"
                v-else-if="!$v.editTimeSlot.capacity.minValue">Mindestens ein Platz ist erforderlich</span>
        </md-field>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="closeEditDialog">Abbrechen</md-button>
        <md-button class="md-primary" @click="confirmEditDialog">Speichern</md-button>
      </md-dialog-actions>
    </md-dialog>

    <ExportDialog :active.sync="exportTimeSlot.open" :time-slot-id="exportTimeSlot.timeSlotId"/>

    <md-dialog class="delete-dialog" :md-active.sync="deleteTimeSlot.open">
      <md-dialog-title>
        <div class="md-title">Zeitfenster löschen</div>
      </md-dialog-title>

      <md-dialog-content>
        Sie sind im Begriff, das ausgewählte Zeitfenster <b>{{ deleteTimeSlotDescription }}</b> und ALLE DAZUGEHÖRIGEN
        RESERVIERUNGEN zu löschen. Wir werden alle registrierten Nutzer per E-Mail darauf hinweisen, dass ihre
        Reservierung vom Veranstalter gelöscht wurde.
      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click="closeDeleteDialog">Abbrechen</md-button>
        <md-button class="md-primary" @click="confirmDeleteDialog">Löschen</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import {convertToClockTime, convertToDate, getTimeSlotDescription, mustBeTime, time} from "@/services/utils";
import {minValue, required} from "vuelidate/lib/validators";
import ExportDialog from "@/components/ExportDialog";

/**
 * This is the central component for managing timeslots.
 */
export default {
  name: "TimeSlotTable",
  components: {ExportDialog},
  data: function () {
    return {
      editTimeSlot: {
        open: false,
        timeSlotId: null,
        date: null,
        startTime: null,
        endTime: null,
        capacity: null
      },
      exportTimeSlot: {
        open: false,
        timeSlotId: null
      },
      deleteTimeSlot: {
        open: false,
        timeSlotId: null
      },
      filter: {
        limit: 100,
        date: null,
      }
    };
  },
  validations: {
    editTimeSlot: {
      startTime: {
        required,
        mustBeTime
      },
      endTime: {
        required,
        mustBeTime
      },
      capacity: {
        required,
        minValue: minValue(1)
      }
    }
  },
  computed: {
    timeSlots() {
      let dateRangeStart, dateRangeEnd = 0
      if (this.filter.date !== null) {
        dateRangeStart = this.filter.date.valueOf();
        dateRangeEnd = dateRangeStart + time.d;
      }

      return this.$store.state.timeSlots.filter((timeSlot, index) => {
        if (index >= this.filter.limit && this.filter.limit !== -1) return false;
        if (dateRangeStart !== 0 && timeSlot.startDate < dateRangeStart) return false;
        if (dateRangeEnd !== 0 && timeSlot.endDate > dateRangeEnd) return false;
        return true;
      });
    },
    deleteTimeSlotDescription() {
      if (this.deleteTimeSlot.timeSlotId === null || this.deleteTimeSlot.timeSlotId === '') {
        return '';
      }
      let timeSlot = this.$store.getters.timeSlot(this.deleteTimeSlot.timeSlotId);
      if (timeSlot === null) {
        return '';
      }
      return getTimeSlotDescription(timeSlot);
    }
  },
  methods: {
    openEditDialog(timeSlotId) {
      console.log(timeSlotId);
      this.editTimeSlot.open = true;
      this.editTimeSlot.timeSlotId = timeSlotId;
      let timeSlot = this.$store.getters.timeSlot(timeSlotId);
      this.editTimeSlot.date = convertToDate(new Date(timeSlot.startDate), '-');
      this.editTimeSlot.startTime = convertToClockTime(new Date(timeSlot.startDate));
      this.editTimeSlot.endTime = convertToClockTime(new Date(timeSlot.endDate));
      this.editTimeSlot.capacity = timeSlot.peopleCount;
    },
    closeEditDialog() {
      this.editTimeSlot.open = false;
      this.editTimeSlot.timeSlotId = null;
      this.editTimeSlot.date = null;
      this.editTimeSlot.startTime = null;
      this.editTimeSlot.endTime = null;
      this.editTimeSlot.capacity = null;
    },
    confirmEditDialog() {
      this.$store.dispatch('updateTimeSlot', {
        _id: this.editTimeSlot.timeSlotId,
        startDate: Date.parse(`${this.editTimeSlot.date}T${this.editTimeSlot.startTime}`),
        endDate: Date.parse(`${this.editTimeSlot.date}T${this.editTimeSlot.endTime}`),
        peopleCount: this.editTimeSlot.capacity
      }).then(() => this.closeEditDialog(), reason => {
        console.error(reason.response.data);
        this.closeEditDialog();
      })
    },
    openExportDialog(timeSlotId) {
      this.exportTimeSlot.open = true;
      this.exportTimeSlot.timeSlotId = timeSlotId;
    },
    openDeleteDialog(timeSlotId) {
      this.deleteTimeSlot.open = true;
      this.deleteTimeSlot.timeSlotId = timeSlotId;
    },
    closeDeleteDialog() {
      this.deleteTimeSlot.open = false;
      this.deleteTimeSlot.timeSlotId = null;
    },
    confirmDeleteDialog() {
      this.$store.dispatch('deleteTimeSlot', this.deleteTimeSlot.timeSlotId).then(() => this.closeDeleteDialog(),
          reason => {
            console.error(reason.response.data);
            this.closeDeleteDialog();
          });
    },
    convertToDate(date) {
      return convertToDate(new Date(date), '.');
    },
    getClockTime(seconds) {
      return convertToClockTime(new Date(seconds));
    },
    updateTimeSlots() {
      this.$store.dispatch('loadTimeSlots');
    },
    /**
     * Helper method to set the proper classes for validation.
     */
    getValidationClass(fieldName) {
      const field = this.$v.editTimeSlot[fieldName];
      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        };
      }
    }
  }
}
</script>

<style scoped>
.filter {
  margin-bottom: 10px;
}
</style>