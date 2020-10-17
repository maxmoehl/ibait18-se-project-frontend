<template>
  <md-card>
    <md-card-header>
      <div class="md-title">Registrierung abgeschlossen!</div>
    </md-card-header>

    <md-card-content>
      Bitte speichern Sie den Buchungscode und halten Sie ihn bei Ankunft bereit damit ein Mitarbeiter
      ihn scannen kann.
      <div class="qrcode">
        <canvas id="qrcode"></canvas>
      </div>
      <small>{{this.bookingCode}}</small>
    </md-card-content>
  </md-card>
</template>

<script>
import QRCode from 'qrcode';

export default {
  name: "RegistrationConfirmation",
  props: {
    bookingCode: null
  },
  mounted() {
    let canvas = document.getElementById('qrcode');
    console.log(this.bookingCode)
    QRCode.toCanvas(canvas, this.bookingCode, e => {
      if (e) console.error(e);
      console.log('generated qrcode');
    });
  },
  asyncComputed: {
    booking: {
      async get() {

      }
    }
  }
}
</script>

<style scoped>
.qrcode {
  margin-top: 20px;
}
</style>