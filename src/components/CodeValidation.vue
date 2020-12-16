<template>
  <div>
    <div @click="openScanner">
      <md-card>
        <md-card-header>
          <md-icon>qr_code_scanner</md-icon> QR-Code-Scanner öffnen
        </md-card-header>
      </md-card>
    </div>
    <div class="md-layout">
      <div class="md-layout-item md-size-80">
        <md-field>
          <label for="booking-code">Buchungscode</label>
          <md-input id="booking-code" name="booking-code" v-model="bookingCode"/>
        </md-field>
      </div>
      <div class="md-layout-item md-size-20">
        <md-button @click="openConfirmationDialog" class="md-primary">Validieren</md-button>
      </div>
    </div>

    <md-dialog :md-active.sync="confirmationDialog">
      <md-dialog-title>
        Reservierung
      </md-dialog-title>

      <md-dialog-content>
        <p>
          <b>Zeitfenster:</b><br>
          {{ timeSlotDescription }}
        </p>
        <p>
          <b>Name:</b><br>
          {{ reservation.name }}
        </p>
        <p>
          <b>E-Mail-Adresse:</b><br>
          {{ reservation.email }}
        </p>
        <p>
          <b>Telefonnummer:</b><br>
          {{ reservation.phone }}
        </p>
        <p>
          <b>1. Adresszeile:</b><br>
          {{ reservation.addressLineOne }}
        </p>
        <p v-if="reservation.addressLineTwo !== ''">
          <b>2. Adresszeile:</b><br>
          {{ reservation.addressLineTwo }}
        </p>
        <p>
          <b>Stadt:</b><br>
          {{ reservation.city }}
        </p>
        <p>
          <b>PLZ:</b><br>
          {{ reservation.zipCode }}
        </p>
        <p>
          <b>Land:</b><br>
          {{ reservation.country }}
        </p>
        <p>
          <b>Gebucht:</b><br>
          {{ reservation.attended ? 'Ja' : 'Nein' }}
        </p>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click="closeConfirmationDialog">Abbrechen</md-button>
        <md-button class="md-primary" :disabled="reservation.attended" @click="bookReservation">Buchen</md-button>
      </md-dialog-actions>
    </md-dialog>

    <error-dialog :active.sync="errorDialog.open" :error-code="errorDialog.errorCode"/>
  </div>
</template>

<script>
import {getTimeSlotDescription} from "@/services/utils";
import ErrorDialog from "@/components/ErrorDialog";
import QRScanner from "qr-code-scanner";

export default {
  name: "CodeValidation",
  components: {ErrorDialog},
  data() {
    return {
      bookingCode: '',
      reservation: {
        name: '',
        email: '',
        phone: '',
        addressLineOne: '',
        addressLineTwo: '',
        city: '',
        zipCode: '',
        country: '',
        timeSlot: null,
        attended: true
      },
      confirmationDialog: false,
      errorDialog: {
        open: false,
        errorCode: 'E0001'
      }
    }
  },
  computed: {
    timeSlotDescription() {
      if (this.reservation.timeSlot === null) {
        return 'Loading...';
      }
      return getTimeSlotDescription(this.reservation.timeSlot);
    }
  },
  methods: {
    openConfirmationDialog() {
      let r = this.$store.getters.reservation(this.bookingCode);
      if (r === null) {
        this.errorDialog.open = true;
        this.errorDialog.errorCode = 'E0006';
        return;
      }
      this.reservation.name = r.name;
      this.reservation.email = r.email;
      this.reservation.phone = r.phone;
      this.reservation.addressLineOne = r.addressLineOne;
      this.reservation.addressLineTwo = r.addressLineTwo;
      this.reservation.city = r.city;
      this.reservation.zipCode = r.zipCode;
      this.reservation.country = r.country;
      this.reservation.attended = r.attended;
      this.reservation.timeSlot = r.timeSlot;
      this.confirmationDialog = true;
    },
    closeConfirmationDialog() {
      this.reservation.name = '';
      this.reservation.email = '';
      this.reservation.phone = '';
      this.reservation.addressLineOne = '';
      this.reservation.addressLineTwo = '';
      this.reservation.city = '';
      this.reservation.zipCode = '';
      this.reservation.country = '';
      this.reservation.attended = true;
      this.reservation.timeSlot = null;
      this.confirmationDialog = false;
    },
    bookReservation() {
      this.$store.dispatch('bookReservation', this.bookingCode);
      this.closeConfirmationDialog();
    },
    openScanner() {
      QRScanner.initiate({
        match: /[A-Z0-9]{8}/,
        onResult: (result) => {
          this.bookingCode = result;
        },
        onError: function (reason) {
          console.warn('error occurred');
          console.warn(reason);
        },
        timeout: 10000
      });
    }
  }
}
</script>

<style scoped>

</style>