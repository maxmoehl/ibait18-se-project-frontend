<template>
  <div>
    <md-card @click.native="createDialogOpen = true" class="create-timeslot">
      <md-card-header>
        <md-icon>add</md-icon> Neues Zeitfenster
      </md-card-header>
    </md-card>


    <md-dialog class="new-timeslot-dialog" :md-active.sync="createDialogOpen">
      <md-dialog-title>
        Neues Zeitfenster anlegen
      </md-dialog-title>
      <md-dialog-content>
        <md-datepicker v-model="createDialogForm.date">
          <label>Tag wählen</label>
        </md-datepicker>
        <md-field>
          <label for="startTime">Start-Zeit</label>
          <md-input id="startTime" name="startTime" v-model="createDialogForm.startTime"/>
        </md-field>
        <md-field>
          <label for="endTime">End-Zeit</label>
          <md-input id="endTime" name="endTime" v-model="createDialogForm.endTime"/>
        </md-field>
        <md-field>
          <label for="slotCount">Plätze</label>
          <md-input id="slotCount" name="slotCount" v-model.number="createDialogForm.slotCount"/>
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
import {required, minValue} from 'vuelidate/lib/validators'

const timeRegex = new RegExp(/^[0-2][0-9]:[0-5][0-9]$/).compile();
const mustBeTime = value => timeRegex.test(value);
const mustBeInFuture = value => Date.parse(value) > Date.now() - 1000 * 60 * 60 * 24; // Now - 1d

export default {
  name: "AdminSidebar",
  data() {
    return {
      createDialogOpen: false,
      createDialogForm: {
        date: '',
        startTime: '',
        endTime: '',
        slotCount: null
      }
    }
  },
  validations: {
    createDialog: {
      date: {
        required,
        mustBeInFuture
      },
      startTime: {
        required,
        mustBeTime
      },
      endTime: {
        required,
        mustBeTime
      },
      slots: {
        required,
        minValue: minValue(1)
      }
    }
  },
  methods: {
    addTimeSlot() {
      // TODO store new timeslot
      this.closeCreateTimeSlotDialog();
    },
    closeCreateTimeSlotDialog() {
      // TODO reset form
      this.createDialogOpen = false;
    }
  }
}
</script>

<style scoped>
.create-timeslot {
  cursor: pointer;
}
</style>