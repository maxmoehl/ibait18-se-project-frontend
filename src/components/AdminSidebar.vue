<template>
  <div>
    <md-card @click.native="createDialogOpen = true" class="create-timeslot">
      <md-card-header>
        <md-icon>add</md-icon> Neues Zeitfenster
      </md-card-header>
    </md-card>
    <md-card @click.native="navToExports" class="create-timeslot">
      <md-card-header>
        <md-icon>cloud_download</md-icon> Daten exportieren
      </md-card-header>
    </md-card>


    <md-dialog class="new-timeslot-dialog" :md-active.sync="createDialogOpen">
      <md-dialog-title>
        Neues Zeitfenster anlegen
      </md-dialog-title>
      <md-dialog-content>
        <md-datepicker v-model="createDialogForm.date" :md-disabled-dates="disabledDates">
          <label>Tag wählen</label>
        </md-datepicker>
        <md-field :class="getValidationClass('startTime')">
          <label for="startTime">Start-Zeit</label>
          <md-input id="startTime" name="startTime" v-model="createDialogForm.startTime"/>
          <span class="md-error" v-if="!$v.createDialogForm.startTime.required">Bitte geben Sie eine Start-Zeit an</span>
          <span class="md-error" v-else-if="!$v.createDialogForm.startTime.mustBeTime">Ungültiges Format</span>
        </md-field>
        <md-field :class="getValidationClass('endTime')">
          <label for="endTime">End-Zeit</label>
          <md-input id="endTime" name="endTime" v-model="createDialogForm.endTime"/>
          <span class="md-error" v-if="!$v.createDialogForm.endTime.required">Bitte geben Sie eine End-Zeit an</span>
          <span class="md-error" v-else-if="!$v.createDialogForm.endTime.mustBeTime">Ungültiges Format</span>
        </md-field>
        <md-field :class="getValidationClass('capacity')">
          <label for="capacity">Plätze</label>
          <md-input id="capacity" name="capacity" v-model.number="createDialogForm.capacity"/>
          <span class="md-error" v-if="!$v.createDialogForm.capacity.required">Bitte geben Sie eine Platzanzahl an</span>
          <span class="md-error" v-else-if="!$v.createDialogForm.capacity.minValue">Mindestens ein Platz ist nötig</span>
        </md-field>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="closeCreateTimeSlotDialog">Abbrechen</md-button>
        <md-button class="md-primary" @click="addTimeSlot">Hinzufügen</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import {required, minValue} from 'vuelidate/lib/validators'
import utils from "@/services/utils";

const timeRegex = new RegExp(/^[0-2][0-9]:[0-5][0-9]$/);
const mustBeTime = value => timeRegex.test(value);

export default {
  name: "AdminSidebar",
  data() {
    return {
      createDialogOpen: false,
      createDialogForm: {
        date: utils.convertToDate(new Date(Date.now()), '-'),
        startTime: null,
        endTime: null,
        capacity: null
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
    disabledDates(date) {
      let d = new Date(Date.parse(date));
      let today = new Date(Date.now());
      today.setHours(0, 0, 0, 0);
      return d < today;
    },
    addTimeSlot() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.$v.$reset();
      axios({
        url: '/api/timeslots/',
        method: 'post',
        data: {
          startDate: Date.parse(`${this.createDialogForm.date}T${this.createDialogForm.startTime}`),
          endDate: Date.parse(`${this.createDialogForm.date}T${this.createDialogForm.endTime}`),
          peopleCount: this.createDialogForm.capacity
        }
      }).then(() => this.$store.dispatch('loadTimeSlots'), reason => {
        console.warn(reason);
        // TODO something like a popup to inform the user what went wrong
      })
      this.closeCreateTimeSlotDialog();
    },
    closeCreateTimeSlotDialog() {
      this.createDialogForm.date = utils.convertToDate(new Date(Date.now()), '-');
      this.createDialogForm.startTime = null;
      this.createDialogForm.endTime = null;
      this.createDialogForm.capacity = null;
      this.createDialogOpen = false;
    },
    navToExports() {
      this.$router.push({name: 'export'});
    },
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