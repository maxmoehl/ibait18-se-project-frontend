<template>
  <div class="qrcode">
    <div class="md-title">{{code}}</div>
    <div class="qrcode">
      <canvas id="qrcode"></canvas>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcode";

export default {
  name: "QRCode",
  props: {
    code: String
  },
  /**
   * As soon as the component gets mounted, draw the qr code to the canvas.
   */
  mounted() {
    QRCode.toCanvas(document.getElementById('qrcode'), this.code, e => {
      if (e) console.error(e);
    });
  }
}
</script>

<style scoped>
.qrcode {
  max-width: 600px;
  margin: auto;
  text-align: center;
}
</style>