<template>
  <md-dialog :md-active.sync="active">
    <md-dialog-title>
      Neuer Gast
    </md-dialog-title>

    <md-dialog-content>
      <md-field :class="getValidationClass('name')">
        <label for="name">Name</label>
        <md-input name="name" id="name" v-model="form.name" autocomplete="name"/>
        <span class="md-error" v-if="!$v.form.name.required">Bitte geben Sie einen Namen an</span>
        <span class="md-error" v-else-if="!$v.form.name.minLength || !$v.form.name.maxLength">Ungültiger Name</span>
      </md-field>
      <md-field :class="getValidationClass('phoneNumber')">
        <label for="phone-number">Telefonnummer</label>
        <md-input name="phone-number" id="phone-number" v-model="form.phoneNumber" autcomplete="tel"/>
        <span class="md-error" v-if="!$v.form.phoneNumber.required">Bitte geben Sie eine Telefonnummer an</span>
        <span class="md-error" v-else-if="!$v.form.phoneNumber.minLength || !$v.form.phoneNumber.maxLength">Ungültige Telefonnummer</span>
      </md-field>
      <md-field :class="getValidationClass('email')">
        <label for="email">E-Mail</label>
        <md-input name="email" id="email" v-model="form.email" autocomplete="email"/>
        <span class="md-error" v-if="!$v.form.email.required">Bitte geben Sie eine E-Mail-Adresse an</span>
        <span class="md-error" v-else-if="!$v.form.email.minLength || !$v.form.email.maxLength">Ungültige E-Mail-Adresse</span>
      </md-field>
      <md-field class="md-layout-item">
        <label for="address-selection">Adresse</label>
        <md-select name="address-selection" id="address-selection" v-model.number="form.addressSelection">
          <md-option :value="-1">
            Neue Adresse
          </md-option>
          <md-option v-for="(guest, index) in guests" :key="`guest-${index}`" :value="index">
            {{ index + 1 }}. {{ guest.name }}
          </md-option>
        </md-select>
      </md-field>
      <md-field :class="getValidationClass('addressLineOne')" v-if="form.addressSelection < 0">
        <label for="address-line-one">Adresszeile 1</label>
        <md-input name="address-line-one" id="address-line-one" v-model="form.addressLineOne" autocomplete="address-line1"/>
        <span class="md-error" v-if="!$v.form.addressLineOne.required">Bitte geben Sie eine Adresszeile an</span>
        <span class="md-error" v-else-if="!$v.form.addressLineOne.minLength || !$v.form.addressLineOne.maxLength">Ungültige Adresszeile</span>
      </md-field>
      <md-field :class="getValidationClass('addressLineTwo')" v-if="form.addressSelection < 0">
        <label for="address-line-two">Adresszeile 2</label>
        <md-input name="address-line-two" id="address-line-two" v-model="form.addressLineTwo" autocomplete="address-line2"/>
        <span class="md-error" v-if="!$v.form.addressLineTwo.maxLength">Ungültige zweite Adresszeile</span>
      </md-field>
      <md-field :class="getValidationClass('city')" v-if="form.addressSelection < 0">
        <label for="city">Stadt</label>
        <md-input name="city" id="city" v-model="form.city" autocomplete="city"/>
        <span class="md-error" v-if="!$v.form.city.required">Bitte geben Sie eine Stadt an</span>
        <span class="md-error" v-else-if="!$v.form.city.minLength || !$v.form.city.maxLength">Ungültige Stadt</span>
      </md-field>
      <md-field :class="getValidationClass('zipCode')" v-if="form.addressSelection < 0">
        <label for="zip-code">PLZ</label>
        <md-input name="zip-code" id="zip-code" v-model="form.zipCode" autocomplete="postal-code"/>
        <span class="md-error" v-if="!$v.form.zipCode.required">Bitte geben Sie eine PLZ an</span>
        <span class="md-error" v-else-if="!$v.form.zipCode.minLength || !$v.form.zipCode.maxLength">Ungültige PLZ</span>
      </md-field>
      <md-field v-if="form.addressSelection < 0">
        <label for="country">Land</label>
        <md-select name="country" id="country" v-model="form.countryCode">
          <md-option v-for="country in countries" :value="country.alpha3Code" :key="country.alpha3Code">
            {{ country.name }}
          </md-option>
        </md-select>
      </md-field>
      <div class="checkboxes">
        <md-checkbox :class="getValidationClass('acceptDataStorage')" v-model="form.acceptDataStorage" class="md-primary" required>
          Hiermit bestätige ich die Richtigkeit aller Angaben und erkläre mich mit der Speicherung meiner Daten
          im Rahmen der Corona-Verordnung einverstanden.
        </md-checkbox>
      </div>
    </md-dialog-content>

    <md-dialog-actions>
      <md-button class="md-primary" @click="closeDialog">Abbrechen</md-button>
      <md-button class="md-primary" @click="saveGuest">Hinzufügen</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
import {email, maxLength, minLength, required, requiredIf} from 'vuelidate/lib/validators'

/**
 * This dialog is for registering a new guest. The form is validated and the guest gets stored in the shared store.
 */
export default {
  name: "RegistrationForm",
  props: {
    active: Boolean,
    timeSlotId: String
  },
  data: function () {
    return {
      form: {
        name: null,
        phoneNumber: null,
        email: null,
        addressSelection: -1,
        addressLineOne: null,
        addressLineTwo: null,
        city: null,
        zipCode: null,
        countryCode: 'DEU',
        acceptDataStorage: false,
        acceptLocalStorage: false,
        confirmationEmail: false
      }
    };
  },
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(50)
      },
      phoneNumber: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(50)
      },
      email: {
        required,
        email,
        minLength: minLength(2),
        maxLength: maxLength(50)
      },
      addressLineOne: {
        requiredIf: requiredIf((vm) => vm.addressSelection === -1),
        minLength: minLength(2),
        maxLength: maxLength(50)
      },
      addressLineTwo: {
        maxLength: maxLength(50)
      },
      city: {
        requiredIf: requiredIf((vm) => vm.addressSelection === -1),
        minLength: minLength(2),
        maxLength: maxLength(50)
      },
      zipCode: {
        requiredIf: requiredIf((vm) => vm.addressSelection === -1),
        minLength: minLength(5),
        maxLength: maxLength(6)
      },
      acceptDataStorage: {
        checked: v => v === true
      }
    }
  },
  methods: {
    /**
     * Clears the contents of the dialog and emits the close event
     */
    closeDialog() {
      this.form.name = null;
      this.form.phoneNumber = null;
      this.form.email = null;
      this.form.addressSelection = -1;
      this.form.addressLineOne = null;
      this.form.addressLineTwo = null;
      this.form.city = null;
      this.form.zipCode = null;
      this.form.countryCode = 'DEU';
      this.form.acceptDataStorage = false;
      this.$emit('update:active', false);
    },
    /**
     * Validates the form, stores the new guest in the vuex store on success and calls closeDialog
     */
    saveGuest() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.$v.$reset();
      let guest = {
        name: this.form.name,
        phone: this.form.phoneNumber,
        email: this.form.email,
        addressLineOne: this.form.addressLineOne,
        addressLineTwo: this.form.addressLineTwo,
        city: this.form.city,
        zipCode: this.form.zipCode,
        country: this.form.countryCode,
        timeSlot: this.timeSlotId
      }
      if (this.form.addressSelection > -1) {
        let referenceGuest = this.$store.state.guests[this.form.addressSelection];
        guest.addressLineOne = referenceGuest.addressLineOne;
        guest.addressLineTwo = referenceGuest.addressLineTwo;
        guest.city = referenceGuest.city;
        guest.zipCode = referenceGuest.zipCode;
        guest.country = referenceGuest.country;
      }
      this.$store.commit('addGuest', guest);
      this.closeDialog()
    },
    /**
     * Helper method to set the proper classes for validation.
     */
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];
      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        };
      }
    }
  },
  computed: {
    /**
     * Return the current guests to display the options for copying addresses
     */
    guests() {
      return this.$store.state.guests;
    },
    /**
     * Returns all countries currently stored in our store
     */
    countries() {
      return this.$store.state.countries;
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
</style>