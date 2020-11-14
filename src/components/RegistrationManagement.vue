<template>
  <div class="registration-management">
    <div class="description">
      <md-field>
        <label for="description"> Ausgewähltes Zeitfenster</label>
        <md-input id="description" :value="timeSlotDescription" readonly/>
      </md-field>
    </div>

    <md-card v-for="(guest, index) in guests" :key="guest.name">
      <md-card-header>
        <div @click="deleteGuest(index)">
          {{ index + 1 }}. {{ guest.name }}
          <md-icon style="float: right">close</md-icon>
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

    <RegistrationForm :md-active="registrationDialogOpen" @close="registrationDialogOpen = false"/>

    <!-- TODO Add a dialog to confirm deletion of a guest -->

    <md-button class="md-raised send-guests md-primary" :disabled="!atLeastOneGuestPresent" :md-ripple="false" @click="registerReservation">
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
      registrationDialogOpen: false
    };
  },
  computed: {
    guests() {
      return this.$store.state.guests;
    },
    timeSlotDescription() {
      let t = this.$store.getters.getTimeSlot(this.timeSlotId);
      if (!t) {
        return 'Loading...';
      }
      return `${utils.convertToDate(new Date(t.startDate), '.')} ${utils.convertToClockTime(new Date(t.startDate))}-${utils.convertToClockTime(new Date(t.endDate))}`;
    },
    atLeastOneGuestPresent() {
      return this.$store.state.guests.length > 0;
    }
  },
  methods: {
    async registerReservation() {
      // Call the api and create the reservation, that endpoint should also return the booking code
      await this.$router.push({name: 'confirmation', params: {bookingCode: 'ABC123'}});
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

.send-guests {
  z-index: 10;
  position: fixed;
  bottom: 10px;
  right: 10px;
}
</style>