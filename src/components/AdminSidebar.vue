<template>
  <div>
    <md-card @click.native="createDialogOpen = true" class="create-timeslot">
      <md-card-header>
        <md-icon>add</md-icon> Neues Zeitfenster
      </md-card-header>
    </md-card>
    <md-card @click.native="$router.push({name: 'reservations'})" class="create-timeslot">
      <md-card-header>
        <md-icon>event</md-icon> Reservierungen verwalten
      </md-card-header>
    </md-card>
    <md-card @click.native="$router.push({name: 'validation'})" class="create-timeslot">
      <md-card-header>
        <md-icon>how_to_reg</md-icon> Reservierungen kontrollieren
      </md-card-header>
    </md-card>


    <md-dialog class="new-timeslot-dialog" :md-active.sync="createDialogOpen">
      <md-dialog-title>
        Neues Zeitfenster anlegen
      </md-dialog-title>
      <md-dialog-content>
        <md-datepicker v-model="createDialogForm.date">
          <label>Tag auswählen</label>
        </md-datepicker>
        <md-field :class="getValidationClass('startTime')">
          <label for="startTime">HH:MM</label>
          <md-input id="startTime" name="startTime" v-model="createDialogForm.startTime" placeholder="Start-Zeit"/>
          <span class="md-error" v-if="!$v.createDialogForm.startTime.required">Bitte geben Sie eine Startzeit an</span>
          <span class="md-error" v-else-if="!$v.createDialogForm.startTime.mustBeTime">Ungültiges Format</span>
        </md-field>
        <md-field :class="getValidationClass('endTime')">
          <label for="endTime">HH:MM</label>
          <md-input id="endTime" name="endTime" v-model="createDialogForm.endTime" placeholder="End-Zeit"/>
          <span class="md-error" v-if="!$v.createDialogForm.endTime.required">Bitte geben Sie eine Endzeit an</span>
          <span class="md-error" v-else-if="!$v.createDialogForm.endTime.mustBeTime">Ungültiges Format</span>
        </md-field>
        <md-field :class="getValidationClass('capacity')">
          <label for="capacity">Kapazität</label>
          <md-input id="capacity" name="capacity" v-model.number="createDialogForm.capacity"/>
          <span class="md-error" v-if="!$v.createDialogForm.capacity.required">Bitte geben Sie eine Kapazität an</span>
          <span class="md-error" v-else-if="!$v.createDialogForm.capacity.minValue">Mindestens ein Platz ist erforderlich</span>
        </md-field>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="closeCreateTimeSlotDialog">Abbrechen</md-button>
        <md-button class="md-primary" @click="addTimeSlot">Hinzufügen</md-button>
      </md-dialog-actions>
    </md-dialog>

    <error-dialog :active.sync="errorDialog.open" :error-code="errorDialog.errorCode"/>
  </div>
</template>

<script>
import axios from 'axios';
import {required, minValue} from 'vuelidate/lib/validators'
import {mustBeTime, convertToDate} from "@/services/utils";
import ErrorDialog from "@/components/ErrorDialog";

/**
 * Gives the user access to admin functionality: Creating new time slots and accessing the reservations.
 */
export default {
  name: "AdminSidebar",
  components: {ErrorDialog},
  data() {
    return {
      createDialogOpen: false,
      createDialogForm: {
        date: convertToDate(new Date(Date.now()), '-'),
        startTime: null,
        endTime: null,
        capacity: null
      },
      errorDialog: {
        open: false,
        errorCode: ''
      }
    }
  },
  validations: {
    createDialogForm: {
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
  methods: {
    /**
     * Checks whether or not a certain date should be available in the date picker.
     * @param date The date to be checked
     * @return {boolean} Whether or not it should be disabled
     */
    disabledDates(date) {
      let d = new Date(Date.parse(date));
      let today = new Date(Date.now());
      today.setHours(0, 0, 0, 0);
      return d < today;
    },
    /**
     * Validates the form to add a new timeslot and sends it on success.
     */
    addTimeSlot() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.$v.$reset();
      // TODO move this to the store
      axios({
        url: '/api/timeslots/',
        method: 'post',
        data: {
          startDate: Date.parse(`${this.createDialogForm.date}T${this.createDialogForm.startTime}`),
          endDate: Date.parse(`${this.createDialogForm.date}T${this.createDialogForm.endTime}`),
          peopleCount: this.createDialogForm.capacity
        }
      }).then(() => this.$store.dispatch('loadTimeSlots'), reason => {
        this.errorDialog.errorCode = reason.response.data.id;
        this.errorDialog.open = true;
      })
      this.closeCreateTimeSlotDialog();
    },
    /**
     * Resets the add timeslot form and closes the dialog.
     */
    closeCreateTimeSlotDialog() {
      this.createDialogForm.date = convertToDate(new Date(Date.now()), '-');
      this.createDialogForm.startTime = null;
      this.createDialogForm.endTime = null;
      this.createDialogForm.capacity = null;
      this.createDialogOpen = false;
    },
    /**
     * Helper method to set the proper classes for validation
     */
    getValidationClass(fieldName) {
      const field = this.$v.createDialogForm[fieldName];
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
.create-timeslot {
  cursor: pointer;
}
</style>