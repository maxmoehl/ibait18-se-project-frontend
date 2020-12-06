<template>
  <div class="registration-management">
    <div class="description">
      <md-field>
        <label for="description">Ausgewähltes Zeitfenster</label>
        <md-input id="description" name="description" :value="timeSlotDescription" readonly/>
      </md-field>
    </div>

    <md-card v-for="(guest, index) in guests" :key="guest.name">
      <md-card-header>
        <div>
          {{ index + 1 }}. {{ guest.name }}
          <md-icon @click.native="openDeleteGuestDialog(index)" class="remove-guest">delete</md-icon>
        </div>
      </md-card-header>
    </md-card>

    <div @click="registrationDialogOpen = true">
      <md-card>
        <md-card-header>
          <md-icon>add</md-icon>
          Person hinzufügen
        </md-card-header>
      </md-card>
    </div>

    <RegistrationForm :time-slot-id="timeSlotId" :active.sync="registrationDialogOpen"/>

    <md-dialog class="delete-guest-dialog" :md-active.sync="this.deletionDialogOpen">
      <md-dialog-title>
        Gast löschen
      </md-dialog-title>
      <md-dialog-content>
        Sind Sie sicher, dass Sie den Gast <b>{{deleteGuestName}}</b> löschen möchten?
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="closeDeleteGuestDialog">Abbrechen</md-button>
        <md-button class="md-primary" @click="deleteGuest">Löschen</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-button class="md-raised send-guests md-primary" :disabled="!atLeastOneGuestPresent"
               @click="registerReservations">
      Speichern
    </md-button>
  </div>
</template>

<script>
import utils from "@/services/utils";
import RegistrationForm from "@/components/RegistrationForm";

export default {
  name: "RegistrationManagement",
  components: {RegistrationForm},
  props: {
    timeSlotId: null
  },
  data: () => {
    return {
      registrationDialogOpen: false,
      deletionDialogOpen: false,
      deletionGuestId: -1
    };
  },
  computed: {
    guests() {
      return this.$store.state.guests;
    },
    timeSlotDescription() {
      let t = this.$store.getters.timeSlot(this.timeSlotId);
      if (!t) {
        return 'Loading...';
      }
      return utils.getTimeSlotDescription(t);
    },
    atLeastOneGuestPresent() {
      return this.$store.state.guests.length > 0;
    },
    deleteGuestName() {
      if (this.deletionGuestId < 0) {
        return '';
      }
      return this.$store.state.guests[this.deletionGuestId].name
    }
  },
  methods: {
    registerReservations() {
      this.$store.dispatch('sendReservations').then(() => {
            this.$store.commit('clearGuests');
            this.$router.push({name: 'confirmation'});
          }, reason => this.$router.push({name: 'error', params: {errorCode: reason.response.data.id}}));
    },
    openDeleteGuestDialog(guestId) {
      this.deletionGuestId = guestId;
      this.deletionDialogOpen = true;
    },
    closeDeleteGuestDialog() {
      this.deletionGuestId = -1;
      this.deletionDialogOpen = false;
    },
    deleteGuest() {
      this.$store.commit('deleteGuest', this.deletionGuestId);
      this.closeDeleteGuestDialog();
    }
  }
}
</script>

<style scoped>
.description {
  padding: 0 10px;
}

.remove-guest {
  float: right;
  cursor: pointer;
}

.send-guests {
  z-index: 1;
  position: fixed;
  bottom: 10px;
  right: 10px;
}
</style>