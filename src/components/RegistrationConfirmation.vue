<template>
  <md-card>
    <md-card-header>
      <div class="md-title">Danke für Ihre Reservierung.</div>
    </md-card-header>

    <md-card-content>
      Eine Kopie dieser Bestätigung wurde an [EMAIL-ADRESSE] gesendet. Bitte bringen Sie den Bestätigungscode (QR-Code)
      unbedingt bei Ihrem Besuch mit, damit Ihr Einlass garantiert ist. Wir freuen uns, Sie bald bei uns begrüßen zu
      dürfen.
      Bitte beachten Sie bei Ihrem Besuch jederzeit die geltenden Hygienevorschriften und halten Sie sich an die
      Anweisungen des Personals vor Ort. Weitere Hinweise zur Reservierung und Ihrem Besuch bei uns erhalten Sie in
      unseren Häufig gestellten Fragen (FAQ).

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