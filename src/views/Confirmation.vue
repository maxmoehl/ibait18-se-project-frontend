<template>
  <div class="confirmation">
    <RegistrationConfirmation :booking-code="bookingCode"></RegistrationConfirmation>
  </div>
</template>

<script>
import RegistrationConfirmation from "@/components/RegistrationConfirmation";
export default {
  name: "Confirmation",
  components: {RegistrationConfirmation},
  props: {
    bookingCode: ''
  }
}
</script>

<style scoped>
.confirmation {
  max-width: 600px;
  margin: auto;
}
</style>