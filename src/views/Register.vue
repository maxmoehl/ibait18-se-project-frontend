<template>
  <div class="register">
    <register-form :time-slot-id="timeSlotId"></register-form>
  </div>
</template>

<script>
import RegisterForm from "@/components/RegisterForm";

export default {
  name: "Register",
  components: {RegisterForm},
  props: {
    timeSlotId: String
  }
}
</script>

<style scoped>

</style>