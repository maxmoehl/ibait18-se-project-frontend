<template>
  <div class="reservation-table">
    <div class="filter">
      <md-card>
        <md-card-header>
          Filter
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
                <label for="city">Max. Einträge</label>
                <md-select id="city" name="city" v-model="filter.limit">
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
          <md-button class="md-primary">
            Anwenden
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
        <md-table-cell md-label="Erste Addresszeile">
          {{ item.addressLineOne }}
        </md-table-cell>
        <md-table-cell md-label="Stadt">
          {{ item.city }}
        </md-table-cell>
        <md-table-cell md-label="Land">
          {{ item.country }}
        </md-table-cell>
        <md-table-cell md-label="Zeitfenster">
          TBD
        </md-table-cell>
      </md-table-row>

      <md-table-empty-state
          md-label="Keine Reservierungen gefunden"
          md-description="Versuchen Sie die Filter zurückzusetzen oder andere Suchparameter.">
        <md-button class="md-primary md-raised" @click="clearFilters">Filter zurücksetzen</md-button>
      </md-table-empty-state>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "ReservationTable",
  data() {
    return {
      filter: {
        name: '',
        city: '',
        limit: 100
      }
    }
  },
  computed: {
    reservations() {
      return this.$store.state.reservations.filter((reservation, index) => {
        if (index >= this.filter.limit && this.filter.limit !== -1) return false;
        if (!reservation.name.includes(this.filter.name)) return false;
        if (!reservation.city.includes(this.filter.city)) return false;
        return true;
      });
    }
  },
  methods: {
    clearFilters() {
      this.filter.name = '';
      this.filter.city = '';
    }
  }
}
</script>

<style scoped>
.filter {
  margin-bottom: 10px;
}
</style>