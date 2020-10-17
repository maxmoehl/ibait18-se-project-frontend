<template>
  <form novalidate>
    <md-card>
      <md-card-header>
        <div class="md-title">Registrieren</div>
      </md-card-header>

      <md-card-content class="md-layout md-gutter">
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
      </md-card-content>

      <md-card-actions>
        <md-button onclick="this.registerReservation()" class="md-primary">Registrieren</md-button>
      </md-card-actions>
    </md-card>
  </form>
</template>

<script>
import api from '../services/api';
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
        email: null
      }
    };
  },
  asyncComputed: {
    timeSlotDescription: {
      async get() {
        console.log(this.timeSlotId)
        let t = await api.getTimeSlot(this.timeSlotId);
        return `${utils.convertToDate(new Date(t.startDate))} ${utils.convertToClockTime(new Date(t.startDate))}-${utils.convertToClockTime(new Date(t.endDate))}`
      },
      default: 'Loading...'
    }
  },
  methods: {
    async registerReservation() {

    }
  }
}
</script>

<style scoped>

</style>