<template>
  <md-card class="booking-code">
    <md-card-header>
      <div class="md-title">{{this.name}}</div>
      <div class="md-subhead">{{this.bookingCode}}</div>
    </md-card-header>
    <md-card-content>
      <div class="qrcode">
        <canvas :id="`qrcode-${bookingCode}`"></canvas>
      </div>
    </md-card-content>
  </md-card>
</template>

<script>
import QRCode from 'qrcode';

export default {
  name: "BookingCode",
  props: {
    name: String,
    bookingCode: String
  },
  mounted() {
    QRCode.toCanvas(document.getElementById(`qrcode-${this.bookingCode}`), this.bookingCode, e => {
      if (e) console.error(e);
    });
  }
}
</script>

<style scoped>
.booking-code {
  margin: 10px 0;
  text-align: center;
}
</style>