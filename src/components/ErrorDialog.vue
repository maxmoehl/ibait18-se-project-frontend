<template>
  <md-dialog :md-active.sync="active">
    <md-dialog-title>
      <div class="md-title">Es ist ein Fehler aufgetreten!</div>
    </md-dialog-title>
    <md-dialog-content v-html="errorMessage"></md-dialog-content>
    <md-dialog-actions>
      <md-button class="md-primary" @click="$emit('update:active', false)">Schließen</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
import {Errors} from '@/services/errorMessages';

export default {
  name: "ErrorDialog",
  props: {
    errorCode: String,
    active: Boolean
  },
  computed: {
    errorMessage() {
      if (this.errorCode in Errors) {
        return Errors[this.errorCode];
      } else {
        return 'Unbekannter Fehler.';
      }
    }
  }
}
</script>

<style scoped>

</style>