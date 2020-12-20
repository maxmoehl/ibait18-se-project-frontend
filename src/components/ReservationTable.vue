<template>
  <div class="reservation-table">
    <div class="filter">
      <md-card>
        <md-card-header>
          <div class="md-title">Reservierungen</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div
                class="md-layout-item md-xsmall-size-100 md-small-size-33 md-medium-size-20 md-large-size-20 md-xlarge-size-20">
              <md-field>
                <label for="name">Name</label>
                <md-input id="name" name="name" v-model="filter.name"/>
              </md-field>
            </div>
            <div
                class="md-layout-item md-xsmall-size-100 md-small-size-33 md-medium-size-20 md-large-size-20 md-xlarge-size-20">
              <md-field>
                <label for="city">Stadt</label>
                <md-input id="city" name="city" v-model="filter.city"/>
              </md-field>
            </div>
            <div
                class="md-layout-item md-xsmall-size-100 md-small-size-33 md-medium-size-20 md-large-size-20 md-xlarge-size-20">
              <md-datepicker v-model="filter.date">
                <label>
                  Datum
                </label>
              </md-datepicker>
            </div>
            <div
                class="md-layout-item md-xsmall-size-100 md-small-size-33 md-medium-size-20 md-large-size-20 md-xlarge-size-20">
              <md-field>
                <label for="time">HH:MM</label>
                <md-input id="time" name="time" v-model="filter.time" placeholder="Uhrzeit"
                          :disabled="filter.date === null"/>
              </md-field>
            </div>
            <div
                class="md-layout-item md-xsmall-size-100 md-small-size-20 md-medium-size-20 md-large-size-20 md-xlarge-size-20">
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
            <div class="md-layout-item md-xsmall-size-100 md-small-size-45 md-medium-size-40 md-large-size-40 md-xlarge-size-40">
              <md-checkbox v-model="filter.onlyPastReservations">
                Zukünftige Reservierungen ausblenden
              </md-checkbox>
            </div>
            <div class="md-layout-item md-xsmall-size-100 md-small-size-45 md-medium-size-40 md-large-size-40 md-xlarge-size-40">
              <md-checkbox v-model="filter.onlyAttendedReservations">
                Nicht gebuchte Reservierungen ausblenden
              </md-checkbox>
            </div>
          </div>
        </md-card-content>

        <md-card-actions>
          <md-button class="md-primary" @click="dialogs.helpOpen = true">Hilfe</md-button>
          <md-button class="md-primary" @click="dialogs.exportSelectionOpen = true">Exportieren</md-button>
          <md-button class="md-primary" @click="updateReservations">Aktualisieren</md-button>
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
          <md-button class="md-icon-button" @click="openExportDialog(item.timeSlot._id)">
            <md-icon>cloud_download</md-icon>
          </md-button>
          <md-button class="md-icon-button" @click="openDeleteDialog(item.bookingCode)">
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

    <ExportDialog :active.sync="dialogs.exportTimeSlotOpen" :time-slot-id="dialogs.timeSlotId"/>

    <md-dialog class="help-dialog" :md-active.sync="dialogs.helpOpen">
      <md-dialog-title>
        <div class="md-title">Unterstützung bei Filtern</div>
      </md-dialog-title>

      <md-dialog-content>
        Mithilfe der "Filtern"-Funktionalität haben Sie die Möglichkeit, die gespeicherten Besucherdaten auf bestimmte
        Namen, Wohnorte oder auf den Veranstaltungszeitraum einzugrenzen. Die Filter werden bei der Eingabe / Auswahl
        automatisch angewendet, ein erneutes Laden der Seite ist nicht erforderlich.<br>
        Bitte beachten Sie, dass das Filtern nach einer bestimmten Uhrzeit erst nach Eingabe eines konkreten Datums
        möglich ist.<br><br>
        Die Schaltfläche "Aktualisieren" ermöglicht das Laden der aktuellsten Reservierungsdaten vom Server.
      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click="dialogs.helpOpen = false">Schließen</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-dialog class="export-selection-dialog" :md-active.sync="dialogs.exportSelectionOpen">
      <md-dialog-title>
        <div class="md-title">Export</div>
      </md-dialog-title>
      <md-dialog-content>
        Der Export Ihrer aktuellen Auswahl steht bereit.<br><br>
        <span style="color:red">Gäste, die (noch) nicht anwesend waren, werden nicht im Export enthalten sein!</span><br><br>
        <a href="/admin/help">Wie kann ich die exportierte Datei öffnen?</a>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="dialogs.exportSelectionOpen = false">Abbrechen</md-button>
        <md-button class="md-primary" @click="exportSelection">Herunterladen</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-dialog class="deletion-dialog" :md-active.sync="dialogs.deleteOpen">
      <md-dialog-title>
        <div class="md-title">Löschen</div>
      </md-dialog-title>

      <md-dialog-content>
        Sie sind im Begriff die Reservierung mit dem Buchungscode {{dialogs.deletionBookingCode}} für die Person
        {{deletionReservation.name}} zu löschen.
      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click="closeDeleteDialog">Abbrechen</md-button>
        <md-button class="md-primary" @click="confirmDeleteDialog">Löschen</md-button>
      </md-dialog-actions>
    </md-dialog>

    <error-dialog :active.sync="dialogs.errorOpen" :error-code="dialogs.errorCode"/>
  </div>
</template>

<script>
import {exportToCsv, time, getTimeSlotDescription} from "@/services/utils";
import ExportDialog from "@/components/ExportDialog";
import ErrorDialog from "@/components/ErrorDialog";

export default {
  name: "ReservationTable",
  components: {ErrorDialog, ExportDialog},
  data() {
    return {
      filter: {
        name: '',
        city: '',
        date: null,
        time: '',
        limit: 100,
        onlyPastReservations: true,
        onlyAttendedReservations: true
      },
      dialogs: {
        exportTimeSlotOpen: false,
        exportSelectionOpen: false,
        deleteOpen: false,
        helpOpen: false,
        timeSlotId: null,
        deletionBookingCode: null,
        errorOpen: false,
        errorCode: null,
      }
    }
  },
  watch: {
    'filter.date': function (val) {
      if (val === null) {
        this.filter.time = '';
      }
    }
  },
  computed: {
    reservations() {
      let dateRangeStart, dateRangeEnd = 0;
      if (this.filter.date !== null) {
        dateRangeStart = this.filter.date.valueOf();
        dateRangeEnd = dateRangeStart + time.d;
        if (/^\d{1,2}:\d{1,2}$/.test(this.filter.time)) {
          let t = this.filter.time.split(':');
          dateRangeStart += time.h * t[0] * time.m * t[1];
        }
      }

      return this.$store.state.reservations.filter((reservation, index) => {
        if (index >= this.filter.limit && this.filter.limit !== -1) return false;
        if (!reservation.name.toLowerCase().includes(this.filter.name.toLowerCase())) return false;
        if (!reservation.city.toLowerCase().includes(this.filter.city.toLowerCase())) return false;
        if (dateRangeStart !== 0 && reservation.timeSlot.startDate < dateRangeStart) return false;
        if (dateRangeEnd !== 0 && reservation.timeSlot.endDate > dateRangeEnd) return false;
        if (this.filter.onlyPastReservations && reservation.timeSlot.endDate >= Date.now()) return false;
        if (this.filter.onlyAttendedReservations && reservation.attended === false) return false;
        return true;
      });
    },
    deletionReservation() {
      let r = this.$store.getters.reservation(this.dialogs.deletionBookingCode);
      return r === null ? {name: ''} : r;
    }
  },
  methods: {
    clearFilters() {
      this.filter.name = '';
      this.filter.city = '';
      this.filter.date = null;
      this.filter.time = '';
    },
    updateReservations() {
      this.$store.dispatch('loadReservations');
    },
    getTimeSlotDescription(timeSlot) {
      return getTimeSlotDescription(timeSlot);
    },
    openDeleteDialog(bookingCode) {
      this.dialogs.deletionBookingCode = bookingCode;
      this.dialogs.deleteOpen = true;
    },
    closeDeleteDialog() {
      this.dialogs.deletionBookingCode = null;
      this.dialogs.deleteOpen = false;
    },
    confirmDeleteDialog() {
      this.$store.dispatch('deleteReservation', this.dialogs.deletionBookingCode).catch(reason => {
        this.dialogs.errorCode = reason.response.id;
        this.dialogs.errorOpen = true;
      });
      this.closeDeleteDialog();
    },
    openExportDialog(timeSlotId) {
      this.dialogs.timeSlotId = timeSlotId;
      this.dialogs.exportTimeSlotOpen = true;
    },
    exportSelection() {
      exportToCsv(this.reservations);
      this.dialogs.exportSelectionOpen = false
    }
  }
}
</script>

<style scoped>
.filter {
  margin-bottom: 10px;
}
</style>