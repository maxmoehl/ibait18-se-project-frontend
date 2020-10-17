<template>
  <RegistrationConfirmation :booking-code="bookingCode"></RegistrationConfirmation>
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

</style>