<template>
  <div class="confirmation">
    <div class="md-title">Danke für Ihre Reservierung.</div>
    <p>
      Eine Kopie dieser Bestätigung wurde an Ihre E-Mail Adresse(n) gesendet. Bitte bringen Sie den Bestätigungscode
      (QR-Code)
      unbedingt bei Ihrem Besuch mit, damit Ihr Einlass garantiert ist. Wir freuen uns, Sie bald bei uns begrüßen zu
      dürfen.
    </p>
    <p>
      Bitte beachten Sie bei Ihrem Besuch jederzeit die geltenden Hygienevorschriften und halten Sie sich an die
      Anweisungen des Personals vor Ort. Weitere Hinweise zur Reservierung und Ihrem Besuch bei uns erhalten Sie in
      unseren <a href="/faq">Häufig gestellten Fragen (FAQ)</a>.
    </p>
    <p>
      Bitte speichern Sie den Buchungscode und halten Sie ihn bei Ankunft bereit, damit unser Personal
      ihn scannen kann.
    </p>
    <BookingCode v-for="confirmation in confirmations" :key="confirmation._id" :name="confirmation.name"
                 :booking-code="confirmation.bookingCode"/>
  </div>
</template>

<script>
import BookingCode from "@/components/BookingCode";

/**
 * This view displays a success message and a booking code for each reservation that was created.
 * The booking codes are displayed as a qrcode and a string along with the name of the person the
 * code is valid for
 *
 * @see @/components/BookingCode.vue
 */
export default {
  name: "Confirmation",
  components: {BookingCode},
  computed: {
    /**
     * Always represents the confirmations currently stored in our shared state
     */
    confirmations() {
      return this.$store.state.confirmations;
    }
  }
}
</script>

<style scoped>
.confirmation {
  max-width: 600px;
  margin: auto;
}
</style>