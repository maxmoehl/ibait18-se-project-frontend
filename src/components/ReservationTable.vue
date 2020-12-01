<template>
  <div class="reservation-table">
    <div class="filter">
      <md-card>
        <md-card-header>
          <div class="md-title">Reservierungen</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-xsmall-size-100 md-small-size-40 md-medium-size-40 md-large-size-40 md-xlarge-size-40">
              <md-field>
                <label for="name">Name</label>
                <md-input id="name" name="name" v-model="filter.name"/>
              </md-field>
            </div>
            <div class="md-layout-item md-xsmall-size-100 md-small-size-40 md-medium-size-40 md-large-size-40 md-xlarge-size-40">
              <md-field>
                <label for="city">Stadt</label>
                <md-input id="city" name="city" v-model="filter.city"/>
              </md-field>
            </div>
            <div class="md-layout-item md-xsmall-size-100 md-small-size-20 md-medium-size-20 md-large-size-20 md-xlarge-size-20">
              <md-field>
                <label for="limit">Max. Einträge</label>
                <md-select id="limit" name="limit" v-model="filter.limit">
                  <md-option :value="25">25</md-option>
                  <md-option :value="50">50</md-option>
                  <md-option :value="100">100</md-option>
                  <md-option :value="200">200</md-option>
                  <md-option :value="500">500</md-option>
                  <md-option :value="1000">1000</md-option>
                  <md-option :value="-1">Alle</md-option>
                </md-select>
              </md-field>
            </div>
          </div>
        </md-card-content>

        <md-card-actions>
          <md-button class="md-primary" @click="updateReservations">
            Aktualisieren
          </md-button>
        </md-card-actions>
      </md-card>
    </div>

    <md-table v-model="reservations" md-card>
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Name">
          {{ item.name }}
        </md-table-cell>
        <md-table-cell md-label="E-Mail">
          {{ item.email }}
        </md-table-cell>
        <md-table-cell md-label="Telefon">
          {{ item.phone }}
        </md-table-cell>
        <md-table-cell md-label="Erste Adresszeile">
          {{ item.addressLineOne }}
        </md-table-cell>
        <md-table-cell md-label="Stadt">
          {{ item.city }}
        </md-table-cell>
        <md-table-cell md-label="Zeitfenster">
          {{ getTimeSlotDescription(item.timeSlot) }}
        </md-table-cell>
        <md-table-cell md-label="Aktionen">
          <md-button class="md-icon-button">
            <md-icon>cloud_download</md-icon>
          </md-button>
          <md-button class="md-icon-button">
            <md-icon>delete</md-icon>
          </md-button>
        </md-table-cell>
      </md-table-row>

      <md-table-empty-state
          md-label="Keine Reservierungen gefunden"
          md-description="Versuchen Sie, die Filter zurückzusetzen oder verwenden Sie andere Suchparameter.">
        <md-button class="md-primary md-raised" @click="clearFilters">Filter zurücksetzen</md-button>
      </md-table-empty-state>
    </md-table>
  </div>
</template>

<script>
import utils from "@/services/utils";

export default {
  name: "ReservationTable",
  data() {
    return {
      filter: {
        name: '',
        city: '',
        limit: 100
      },
      dialogs: {
        exportOpen: false,
        deleteOpen: false,
        timeSlotId: null
      }
    }
  },
  computed: {
    reservations() {
      return this.$store.state.reservations.filter((reservation, index) => {
        if (index >= this.filter.limit && this.filter.limit !== -1) return false;
        if (!reservation.name.toLowerCase().includes(this.filter.name.toLowerCase())) return false;
        if (!reservation.city.toLowerCase().includes(this.filter.city.toLowerCase())) return false;
        return true;
      });
    }
  },
  methods: {
    clearFilters() {
      this.filter.name = '';
      this.filter.city = '';
    },
    updateReservations() {
      this.$store.dispatch('loadReservations');
    },
    getTimeSlotDescription(timeSlot) {
      return utils.getTimeSlotDescription(timeSlot);
    },
    openDeleteDialog(reservationCode) {

    }
  }
}
</script>

<style scoped>
.filter {
  margin-bottom: 10px;
}
</style>