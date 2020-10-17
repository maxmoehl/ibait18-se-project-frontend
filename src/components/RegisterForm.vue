<template>
  <form novalidate>
    <md-card>
      <md-card-header>
        <div class="md-title">Registrierung</div>
      </md-card-header>

      <md-card-content >
        <md-field class="md-layout-item">
          <label for="event">Event</label>
          <md-input name="event" id="event" :value="timeSlotDescription" readonly/>
        </md-field>
        <md-field class="md-layout-item">
          <label for="first-name">Name</label>
          <md-input name="first-name" id="first-name" v-model="form.name"/>
        </md-field>
        <md-field class="md-layout-item">
          <label for="address-line-one">Addresszeile 1</label>
          <md-input name="address-line-one" id="address-line-one" v-model="form.addressLineOne"/>
        </md-field>
        <md-field class="md-layout-item">
          <label for="address-line-two">Addresszeile 2</label>
          <md-input name="address-line-two" id="address-line-two" v-model="form.addressLineTwo"/>
        </md-field>
        <md-field class="md-layout-item">
          <label for="city">Stadt</label>
          <md-input name="city" id="city" v-model="form.city"/>
        </md-field>
        <md-field class="md-layout-item">
          <label for="zip-code">PLZ</label>
          <md-input name="zip-code" id="zip-code" v-model="form.zipCode"/>
        </md-field>
        <md-field class="md-layout-item">
          <label for="country">Land</label>
          <md-select name="country" id="country" v-model="form.countryCode">
            <md-option v-for="country in countries" :value="country.alpha3Code" :key="country.alpha3Code">
              {{ country.name }}
            </md-option>
          </md-select>
        </md-field>
        <md-field class="md-layout-item">
          <label for="phone-number">Telefonnummer</label>
          <md-input name="phone-number" id="phone-number" v-model="form.phoneNumber"/>
        </md-field>
        <md-field class="md-layout-item">
          <label for="email">E-Mail</label>
          <md-input name="email" id="email" v-model="form.email"/>
        </md-field>
        <div class="checkboxes">
          <md-checkbox v-model="form.acceptDataStorage" class="md-primary">
            Hiermit bestätige ich die Richtigkeit aller Angaben und erkläre mich mit der Speicherung meiner Daten,
            im Rahmen der Corona-Verordnung, einverstanden.
          </md-checkbox><br>
          <md-checkbox v-model="form.acceptLocalStorage" class="md-primary" disabled>
            Meine Angaben auf diesem Gerät speichern. <small>(coming soon)</small>
          </md-checkbox><br>
          <a @click="showCookieInfo=true" class="more-information-link">Mehr Informationen</a><br>
          <md-checkbox v-model="form.confirmationEmail" class="md-primary" disabled>
            Reservierung an die angegebene E-Mail-Addresse senden. <small>(coming soon)</small>
          </md-checkbox>
        </div>
      </md-card-content>

      <md-progress-bar md-mode="indeterminate" v-if="sending" />

      <md-card-actions>
        <md-button @click="registerReservation()" class="md-primary">Registrieren</md-button>
      </md-card-actions>
    </md-card>

    <md-dialog :md-active.sync="showCookieInfo">
      <md-dialog-title>Cookie Informationen</md-dialog-title>
      <div class="cookie-info">
        <p>
          Diese Option speichert die Daten in ihren Cookies. Dieses Cookies können bei ihrer nächsten Registrierung
          wieder ausgelesen werden um die Angaben automatisch auszufüllen. Sie haben weiterhin die Möglichkeit
          Korrekturen vorzunehmen. Um die Daten zu löschen können Sie einfach die Cookies dieser Website löschen oder
          den gesamten Browser deinstallieren.
        </p>
        <p>
          Mit dem Aktivieren dieser Option stimmen Sie der Verwendung von Cookies zu.
        </p>
      </div>

      <md-dialog-actions>
        <md-button class="md-primary" @click="showCookieInfo=false">Schließen</md-button>
      </md-dialog-actions>
    </md-dialog>

  </form>
</template>

<script>
import api from '../services/api';
import axios from 'axios';
import utils from '../services/utils';

export default {
  name: "RegisterForm",
  props: {
    timeSlotId: null
  },
  data: function () {
    return {
      countries: [
        {
          'name': 'China',
          'alpha3Code': 'CHN'
        },
        {
          'name': 'Denmark',
          'alpha3Code': 'DNK'
        },
        {
          'name': 'Germany',
          'alpha3Code': 'DEU'
        },
        {
          'name': 'Haiti',
          'alpha3Code': 'HTI'
        }
      ],
      form: {
        name: null,
        addressLineOne: null,
        addressLineTwo: null,
        city: null,
        zipCode: null,
        countryCode: null,
        phoneNumber: null,
        email: null,
        acceptDataStorage: false,
        acceptLocalStorage: false,
        confirmationEmail: false
      },
      showCookieInfo: false,
      sending: false
    };
  },
  asyncComputed: {
    timeSlotDescription: {
      async get() {
        let t = await api.getTimeSlot(this.timeSlotId);
        return `${utils.convertToDate(new Date(t.startDate))} ${utils.convertToClockTime(new Date(t.startDate))}-${utils.convertToClockTime(new Date(t.endDate))}`
      },
      default: 'Loading...'
    }
  },
  methods: {
    async registerReservation() {
      this.sending = true;
      // Call the api and create the reservation, that endpoint should also return the booking code
      await this.$router.push({name: 'confirmation', params: {bookingCode: 'ABC123'}});
    }
  }
}
</script>

<style>
/* WARNING this is not scoped bc otherwise we could not override the material CSS rules */

.checkboxes {
  text-align: left;
}

.md-checkbox .md-checkbox-label {
  height: auto !important;
}

.more-information-link {
  margin-left: 36px;
}

div.cookie-info {
  margin: 0 20px;
}
</style>