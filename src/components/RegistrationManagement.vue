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
          <md-icon @click.native="deleteGuest(index)" class="remove-guest">delete</md-icon>
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

    <RegistrationForm :time-slot-id="timeSlotId" :md-active="registrationDialogOpen"
                      @close="registrationDialogOpen = false"/>

    <!-- TODO Add a dialog to confirm deletion of a guest -->

    <md-button class="md-raised send-guests md-primary" :disabled="!atLeastOneGuestPresent"
               @click="registerReservations">
      Speichern
    </md-button>
  </div>
</template>

<script>
import axios from 'axios';
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
      registrationDialogOpen: false
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
    }
  },
  methods: {
    registerReservations() {
      this.$store.dispatch('sendReservations').then(() => {
            this.$store.commit('clearGuests');
            this.$router.push({name: 'confirmation'});
          }, () => this.$router.push({name: 'error'}));
    },
    deleteGuest(guestId) {
      console.log(guestId)
      this.$store.commit('deleteGuest', guestId);
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