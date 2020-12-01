<template>
  <div>
    <div class="md-title">Danke für Ihre Reservierung.</div>
    <p>
      Eine Kopie dieser Bestätigung wurde an Ihre E-Mail Adresse(n) gesendet. Bitte bringen Sie den Bestätigungscode (QR-Code)
      unbedingt bei Ihrem Besuch mit, damit Ihr Einlass garantiert ist. Wir freuen uns, Sie bald bei uns begrüßen zu
      dürfen.
    </p>
    <p>
      Bitte beachten Sie bei Ihrem Besuch jederzeit die geltenden Hygienevorschriften und halten Sie sich an die
      Anweisungen des Personals vor Ort. Weitere Hinweise zur Reservierung und Ihrem Besuch bei uns erhalten Sie in
      unseren Häufig gestellten Fragen (FAQ).
    </p>
    <p>
      Bitte speichern Sie den Buchungscode und halten Sie ihn bei Ankunft bereit, damit unser Personal
      ihn scannen kann.
    </p>
    <div class="bookingCode">
      <div class="qrcode">
        <canvas id="qrcode"></canvas>
      </div>
      <small>{{this.bookingCode}}</small>
    </div>
  </div>
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
    QRCode.toCanvas(canvas, this.bookingCode, e => {
      if (e) console.error(e);
    });
  }
}
</script>

<style scoped>
.bookingCode {
  margin-top: 20px;
  text-align: center;
}
</style>