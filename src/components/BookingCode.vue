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

/**
 * Extension of MdCard to display a booking code as qrcode and string together with the name of the person
 * that booking code is valid for
 */
export default {
  name: "BookingCode",
  props: {
    name: String,
    bookingCode: String
  },
  /**
   * As soon as the component gets mounted, draw the qr code to the canvas.
   */
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