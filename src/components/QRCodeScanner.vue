<template>
  <md-button @click="openScanner">
    QRCode Scanner öffnen
  </md-button>
</template>

<script>
import QRScanner from 'qr-code-scanner';

export default {
  name: "QRCodeScanner",
  methods: {
    openScanner() {
      QRScanner.initiate({
      match: /[A-Z0-9]{8}/,
      onResult: result => {
        console.log('detected qr code');
        console.log(result);
      },
      onError: reason => {
        console.warn('error occurred');
        console.warn(reason);
      },
      timeout: 10000});
    }
  }
}
</script>

<style scoped>

</style>