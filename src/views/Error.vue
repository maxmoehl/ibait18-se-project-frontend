<template>
  <div class="error">
    <div class="md-title" v-html="error.title"></div>
    <div v-html="error.message"></div>
  </div>
</template>

<script>
/**
 * A simple component to show various error messages.
 */
export default {
  name: "Error",
  props: {
    errorCode: String
  },
  computed: {
    /**
     * Returns the appropriate error message for the error code.
     *
     * @return {{title: string, message: string}}
     */
    error() {
      switch (this.errorCode) {
        case 'E0001':
          return {
            title: 'Ein Fehler ist aufgetreten!',
            message: 'Ein internet Serverfehler ist aufgetreten, ein Administrator wurde bereits informiert. Bitte versuchen Sie es zu einem späteren Zeitpunkt nochmal.'
          }
        case 'E0003':
          return {
            title: 'Das Zeitfenster hat nicht genug Kapazität',
            message: 'Leider bietet das von Ihnen gewaählte Zeitfenster nicht genug Kapazität. Bitte wählen Sie ein anderes und versuchen Sie es erneut.'
          }
      }
    }
  }
}
</script>

<style scoped>
.error {
  max-width: 600px;
  margin: auto;
}
</style>