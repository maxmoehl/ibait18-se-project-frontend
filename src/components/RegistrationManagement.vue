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

    <RegistrationForm :time-slot-id="timeSlotId" :md-active="registrationDialogOpen" @close="registrationDialogOpen = false"/>

    <!-- TODO Add a dialog to confirm deletion of a guest -->

    <md-button class="md-raised send-guests md-primary" :disabled="!atLeastOneGuestPresent" @click="registerReservation">
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
    registerReservation() {
      axios({
        url: '/api/reservations/',
        method: 'post',
        data: this.$store.state.guests
      }).then(response => {
        this.$store.commit('clearGuests');
        return this.$router.push({name: 'confirmation', params: {bookingCode: response.data.bookingCode}});
      }, reason => {
        console.warn(reason);
      });
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
  z-index: 1;
  position: fixed;
  bottom: 10px;
  right: 10px;
}
</style>